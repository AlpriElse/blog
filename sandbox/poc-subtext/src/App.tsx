import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import { UploadScreen } from './components/UploadScreen'
import { ProcessingScreen } from './components/ProcessingScreen'
import { ResultsScreen } from './components/ResultsScreen'
import { detectScenes, generateThumbnail } from './lib/sceneDetector'
import { loadVideoMetadata, extractAudio } from './lib/videoUtils'
import { saveVideo, getVideo, fileToBlob } from './lib/storage'
import { loadExample, getExampleById } from './lib/examples'
import type { AppScreen, ProcessingStage, VideoManifest, TranscriptSegment, WhisperWorkerMessage } from './types'

function App() {
  const [screen, setScreen] = useState<AppScreen>('upload')
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelProgress, setModelProgress] = useState(0)
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle')
  const [processingProgress, setProcessingProgress] = useState(0)
  const [manifest, setManifest] = useState<VideoManifest | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)
  const [currentVideoName, setCurrentVideoName] = useState<string>('')
  const [isLoadingExample, setIsLoadingExample] = useState(false)

  const workerRef = useRef<Worker | null>(null)
  const transcriptResolveRef = useRef<((segments: TranscriptSegment[]) => void) | null>(null)
  const transcriptRejectRef = useRef<((error: Error) => void) | null>(null)
  const modelLoadedRef = useRef(false)

  // Initialize worker and preload model on mount
  useEffect(() => {
    const worker = new Worker(new URL('./workers/whisper.worker.ts', import.meta.url), {
      type: 'module',
    })

    worker.onmessage = (e: MessageEvent<WhisperWorkerMessage>) => {
      const { type } = e.data

      if (type === 'progress') {
        setModelProgress(e.data.progress)
      } else if (type === 'ready') {
        setModelLoaded(true)
        modelLoadedRef.current = true
        setModelProgress(100)
      } else if (type === 'result') {
        if (transcriptResolveRef.current) {
          transcriptResolveRef.current(e.data.data)
          transcriptResolveRef.current = null
          transcriptRejectRef.current = null
        }
      } else if (type === 'error') {
        if (transcriptRejectRef.current) {
          transcriptRejectRef.current(new Error(e.data.error))
          transcriptResolveRef.current = null
          transcriptRejectRef.current = null
        }
      }
    }

    workerRef.current = worker

    // Start loading model immediately
    worker.postMessage({ type: 'load' })

    return () => {
      worker.terminate()
    }
  }, [])

  // Process video when file is selected
  const processVideo = useCallback(
    async (file: File) => {
      setScreen('processing')
      setError(null)
      setProcessingProgress(0)

      try {
        // Create object URL for video
        const url = URL.createObjectURL(file)
        setVideoUrl(url)

        // Load video metadata
        setProcessingStage('extracting-audio')
        const { video, metadata } = await loadVideoMetadata(file)

        // Wait for video to be fully loaded for seeking
        await new Promise<void>((resolve) => {
          if (video.readyState >= 3) {
            resolve()
          } else {
            video.oncanplay = () => resolve()
          }
        })

        // Extract audio for transcription
        setProcessingProgress(5)
        const audioData = await extractAudio(file, (p) => {
          setProcessingProgress(5 + p * 0.15) // 5-20%
        })

        // Wait for model to be loaded if not ready
        if (!modelLoadedRef.current) {
          setProcessingStage('loading-model')
          await new Promise<void>((resolve) => {
            const checkLoaded = () => {
              if (modelLoadedRef.current) {
                resolve()
              } else {
                setTimeout(checkLoaded, 100)
              }
            }
            checkLoaded()
          })
        }

        // Transcribe audio
        setProcessingStage('transcribing')
        setProcessingProgress(20)

        const transcript = await new Promise<TranscriptSegment[]>((resolve, reject) => {
          transcriptResolveRef.current = resolve
          transcriptRejectRef.current = reject
          workerRef.current?.postMessage({ type: 'transcribe', audio: audioData })
        })

        setProcessingProgress(50)

        // Detect scenes
        setProcessingStage('detecting-scenes')
        const scenes = await detectScenes(video, { threshold: 27.0, minSceneLength: 0.5 }, (p) => {
          setProcessingProgress(50 + p * 0.3) // 50-80%
        })

        setProcessingProgress(80)

        // Generate thumbnails sequentially (can't seek video in parallel)
        setProcessingStage('generating-thumbnails')
        const screenshots = []
        for (let index = 0; index < scenes.length; index++) {
          const scene = scenes[index]
          const dataUrl = await generateThumbnail(video, scene.timestamp)
          setProcessingProgress(80 + ((index + 1) / scenes.length) * 20) // 80-100%
          screenshots.push({
            index,
            timestamp: scene.timestamp,
            filename: `scene_${index}.jpg`,
            dataUrl,
          })
        }

        // Build manifest
        const newManifest: VideoManifest = {
          video: {
            filename: metadata.filename,
            duration: metadata.duration,
            width: metadata.width,
            height: metadata.height,
          },
          transcript,
          screenshots,
        }

        setManifest(newManifest)
        setCurrentVideoName(metadata.filename)
        setProcessingStage('complete')
        setProcessingProgress(100)

        // Save to IndexedDB for persistence
        try {
          const videoBlob = fileToBlob(file)
          const savedId = await saveVideo(metadata.filename, newManifest, videoBlob)
          setCurrentVideoId(savedId)
        } catch (e) {
          console.warn('Failed to save video to IndexedDB:', e)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred during processing')
        setProcessingStage('idle')
      }
    },
    []
  )

  const handleFileSelected = useCallback(
    (file: File) => {
      processVideo(file)
    },
    [processVideo]
  )

  const handleViewResults = useCallback(() => {
    setScreen('results')
  }, [])

  const handleLoadExample = useCallback(async (exampleId: string) => {
    const example = getExampleById(exampleId)
    if (!example) return

    setScreen('processing')
    setError(null)
    setIsLoadingExample(true)
    setProcessingStage('idle')
    setProcessingProgress(0)

    try {
      const { manifest: exampleManifest, videoBlob } = await loadExample(example)

      const url = URL.createObjectURL(videoBlob)
      setVideoUrl(url)
      setManifest(exampleManifest)
      setCurrentVideoId(exampleId)
      setCurrentVideoName(example.name)
      setIsLoadingExample(false)
      setProcessingStage('complete')
      setProcessingProgress(100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load example')
      setIsLoadingExample(false)
      setProcessingStage('idle')
    }
  }, [])

  const handleSelectExample = useCallback(async (exampleId: string) => {
    // If we're already viewing this example, do nothing
    if (currentVideoId === exampleId) return
    await handleLoadExample(exampleId)
    setScreen('results')
  }, [currentVideoId, handleLoadExample])

  const handleSelectStoredVideo = useCallback(async (videoId: string) => {
    // If we're already viewing this video, do nothing
    if (currentVideoId === videoId) return

    try {
      const storedVideo = await getVideo(videoId)
      if (!storedVideo) {
        setError('Video not found')
        return
      }

      const url = URL.createObjectURL(storedVideo.videoBlob)
      setVideoUrl(url)
      setManifest(storedVideo.manifest)
      setCurrentVideoId(storedVideo.id)
      setCurrentVideoName(storedVideo.name)
      setScreen('results')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load video')
    }
  }, [currentVideoId])

  const handleBackToUpload = useCallback(() => {
    setScreen('upload')
  }, [])

  // Render current screen
  if (screen === 'upload') {
    return (
      <UploadScreen
        onFileSelected={handleFileSelected}
        onLoadExample={handleLoadExample}
        modelLoading={!modelLoaded}
        modelProgress={modelProgress}
      />
    )
  }

  if (screen === 'processing') {
    return (
      <ProcessingScreen
        modelLoaded={modelLoaded}
        modelProgress={modelProgress}
        processingStage={processingStage}
        processingProgress={processingProgress}
        onViewResults={handleViewResults}
        error={error}
        isLoadingExample={isLoadingExample}
      />
    )
  }

  if (screen === 'results' && manifest && videoUrl) {
    return (
      <ResultsScreen
        manifest={manifest}
        videoUrl={videoUrl}
        currentVideoId={currentVideoId}
        currentVideoName={currentVideoName}
        onSelectExample={handleSelectExample}
        onSelectStoredVideo={handleSelectStoredVideo}
        onBackToUpload={handleBackToUpload}
      />
    )
  }

  return <div className="error">Something went wrong</div>
}

export default App
