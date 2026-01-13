// @ts-expect-error - @huggingface/transformers types incompatible with bundler moduleResolution
import { pipeline } from '@huggingface/transformers'
import type { TranscriptSegment } from '../types'

// Group word-level segments into sentence-like chunks for readability
// while preserving accurate start/end times for highlighting
function groupIntoSentences(segments: TranscriptSegment[]): TranscriptSegment[] {
  if (segments.length === 0) return segments

  const grouped: TranscriptSegment[] = []
  let currentGroup: TranscriptSegment[] = []

  const sentenceEnders = /[.!?]$/
  const maxWordsPerGroup = 15
  const maxDurationPerGroup = 8 // seconds

  for (const segment of segments) {
    currentGroup.push(segment)

    const wordCount = currentGroup.reduce((acc, s) => acc + s.text.split(/\s+/).length, 0)
    const duration = segment.end - currentGroup[0].start
    const endsWithPunctuation = sentenceEnders.test(segment.text.trim())

    // Flush group if: sentence ends, too many words, or too long duration
    if (endsWithPunctuation || wordCount >= maxWordsPerGroup || duration >= maxDurationPerGroup) {
      grouped.push({
        start: currentGroup[0].start,
        end: currentGroup[currentGroup.length - 1].end,
        text: currentGroup.map((s) => s.text).join(' ').trim(),
      })
      currentGroup = []
    }
  }

  // Flush any remaining words
  if (currentGroup.length > 0) {
    grouped.push({
      start: currentGroup[0].start,
      end: currentGroup[currentGroup.length - 1].end,
      text: currentGroup.map((s) => s.text).join(' ').trim(),
    })
  }

  return grouped
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let transcriber: any = null

self.onmessage = async (e: MessageEvent) => {
  const { type } = e.data

  if (type === 'load') {
    try {
      self.postMessage({ type: 'progress', progress: 0, stage: 'Initializing...' })

      transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base', {
        dtype: 'fp32',
        device: 'webgpu',
        progress_callback: (progress: { status: string; progress?: number; file?: string }) => {
          if (progress.status === 'progress' && progress.progress !== undefined) {
            self.postMessage({
              type: 'progress',
              progress: Math.round(progress.progress),
              stage: `Loading model: ${progress.file || ''}`,
            })
          } else if (progress.status === 'done') {
            self.postMessage({ type: 'progress', progress: 100, stage: 'Model loaded' })
          }
        },
      })

      self.postMessage({ type: 'ready' })
    } catch {
      // Fallback to WASM if WebGPU fails
      try {
        self.postMessage({ type: 'progress', progress: 0, stage: 'WebGPU unavailable, using CPU...' })

        transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base', {
          dtype: 'fp32',
          device: 'wasm',
          progress_callback: (progress: { status: string; progress?: number; file?: string }) => {
            if (progress.status === 'progress' && progress.progress !== undefined) {
              self.postMessage({
                type: 'progress',
                progress: Math.round(progress.progress),
                stage: `Loading model: ${progress.file || ''}`,
              })
            }
          },
        })

        self.postMessage({ type: 'ready' })
      } catch (fallbackError) {
        self.postMessage({
          type: 'error',
          error: `Failed to load model: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`,
        })
      }
    }
  }

  if (type === 'transcribe') {
    if (!transcriber) {
      self.postMessage({ type: 'error', error: 'Model not loaded' })
      return
    }

    try {
      const audio = e.data.audio as Float32Array

      self.postMessage({ type: 'progress', progress: 0, stage: 'Transcribing...' })

      // Enable word-level timestamps for more accurate sync
      const result = await transcriber(audio, {
        chunk_length_s: 30,
        stride_length_s: 5,
        return_timestamps: 'word',
      })

      // Process result into segments
      const segments: TranscriptSegment[] = []
      const audioDuration = audio.length / 16000 // 16kHz sample rate

      if (Array.isArray(result)) {
        // Multiple chunks from long audio
        for (const chunk of result) {
          if (chunk.chunks && Array.isArray(chunk.chunks)) {
            // Word/phrase level chunks with timestamps
            for (const item of chunk.chunks) {
              const startTime = Array.isArray(item.timestamp) ? (item.timestamp[0] ?? 0) : 0
              const endTime = Array.isArray(item.timestamp) ? (item.timestamp[1] ?? startTime + 5) : startTime + 5
              segments.push({
                start: startTime,
                end: endTime,
                text: (item.text || '').trim(),
              })
            }
          } else if (chunk.text) {
            // Single chunk without timestamps
            segments.push({
              start: 0,
              end: audioDuration,
              text: chunk.text.trim(),
            })
          }
        }
      } else if (result) {
        // Single result object
        if (result.chunks && Array.isArray(result.chunks)) {
          for (const item of result.chunks) {
            const startTime = Array.isArray(item.timestamp) ? (item.timestamp[0] ?? 0) : 0
            const endTime = Array.isArray(item.timestamp) ? (item.timestamp[1] ?? startTime + 5) : startTime + 5
            segments.push({
              start: startTime,
              end: endTime,
              text: (item.text || '').trim(),
            })
          }
        } else if (result.text) {
          // No chunks, just full text - split into approximate segments
          const text = result.text.trim()
          const words = text.split(/\s+/)
          const wordsPerSegment = 20
          const segmentDuration = audioDuration / Math.ceil(words.length / wordsPerSegment)

          for (let i = 0; i < words.length; i += wordsPerSegment) {
            const segmentWords = words.slice(i, i + wordsPerSegment)
            const segmentIndex = Math.floor(i / wordsPerSegment)
            segments.push({
              start: segmentIndex * segmentDuration,
              end: Math.min((segmentIndex + 1) * segmentDuration, audioDuration),
              text: segmentWords.join(' '),
            })
          }
        }
      }

      // If no segments were created, add a fallback
      if (segments.length === 0 && result?.text) {
        segments.push({
          start: 0,
          end: audioDuration,
          text: result.text.trim(),
        })
      }

      // Group word-level segments into sentences for better readability
      const groupedSegments = groupIntoSentences(segments)

      self.postMessage({ type: 'result', data: groupedSegments })
    } catch (error) {
      self.postMessage({
        type: 'error',
        error: `Transcription failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }
  }
}
