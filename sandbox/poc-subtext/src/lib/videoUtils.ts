/**
 * Video processing utilities
 * - Audio extraction for Whisper
 * - Video metadata extraction
 */

export interface VideoMetadata {
  duration: number
  width: number
  height: number
  filename: string
}

/**
 * Load video and extract metadata
 */
export async function loadVideoMetadata(file: File): Promise<{ video: HTMLVideoElement; metadata: VideoMetadata }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.playsInline = true

    const url = URL.createObjectURL(file)
    video.src = url

    video.onloadedmetadata = () => {
      resolve({
        video,
        metadata: {
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          filename: file.name,
        },
      })
    }

    video.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load video metadata'))
    }
  })
}

/**
 * Extract audio from video file as Float32Array for Whisper
 * Resamples to 16kHz mono as required by Whisper
 */
export async function extractAudio(file: File, onProgress?: (progress: number) => void): Promise<Float32Array> {
  onProgress?.(0)

  // Create audio context with target sample rate
  const audioContext = new AudioContext({ sampleRate: 16000 })

  try {
    // Read file as array buffer
    onProgress?.(10)
    const arrayBuffer = await file.arrayBuffer()

    // Decode audio data
    onProgress?.(30)
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

    onProgress?.(60)

    // Convert to mono if stereo
    const numberOfChannels = audioBuffer.numberOfChannels
    const length = audioBuffer.length
    const sampleRate = audioBuffer.sampleRate

    // If already at 16kHz, just get the channel data
    if (sampleRate === 16000 && numberOfChannels === 1) {
      onProgress?.(100)
      return audioBuffer.getChannelData(0)
    }

    // Mix down to mono
    const monoData = new Float32Array(length)
    for (let i = 0; i < length; i++) {
      let sum = 0
      for (let channel = 0; channel < numberOfChannels; channel++) {
        sum += audioBuffer.getChannelData(channel)[i]
      }
      monoData[i] = sum / numberOfChannels
    }

    onProgress?.(80)

    // Resample if needed
    if (sampleRate !== 16000) {
      const resampledData = resample(monoData, sampleRate, 16000)
      onProgress?.(100)
      return resampledData
    }

    onProgress?.(100)
    return monoData
  } finally {
    await audioContext.close()
  }
}

/**
 * Simple linear resampling
 */
function resample(data: Float32Array, fromRate: number, toRate: number): Float32Array {
  const ratio = fromRate / toRate
  const newLength = Math.round(data.length / ratio)
  const result = new Float32Array(newLength)

  for (let i = 0; i < newLength; i++) {
    const srcIndex = i * ratio
    const srcIndexFloor = Math.floor(srcIndex)
    const srcIndexCeil = Math.min(srcIndexFloor + 1, data.length - 1)
    const t = srcIndex - srcIndexFloor

    // Linear interpolation
    result[i] = data[srcIndexFloor] * (1 - t) + data[srcIndexCeil] * t
  }

  return result
}

/**
 * Format seconds as MM:SS.ms
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toFixed(2).padStart(5, '0')}`
}
