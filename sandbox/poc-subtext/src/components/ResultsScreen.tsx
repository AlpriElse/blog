import { useState, useRef, useEffect, useCallback } from 'react'
import type { VideoManifest } from '../types'
import { formatTime } from '../lib/videoUtils'
import { VideoSelector } from './VideoSelector'

interface ResultsScreenProps {
  manifest: VideoManifest
  videoUrl: string
  currentVideoId: string | null
  currentVideoName: string
  onSelectExample: (exampleId: string) => void
  onSelectStoredVideo: (videoId: string) => void
  onBackToUpload: () => void
}

export function ResultsScreen({
  manifest,
  videoUrl,
  currentVideoId,
  currentVideoName,
  onSelectExample,
  onSelectStoredVideo,
  onBackToUpload,
}: ResultsScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineScrollRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(manifest.video.duration)
  const [isPlaying, setIsPlaying] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1) // 1 = fit to view, higher = more zoomed in

  // Panel resize state
  const [transcriptWidth, setTranscriptWidth] = useState(400)
  const [timelineHeight, setTimelineHeight] = useState(180)
  const isResizingHorizontal = useRef(false)
  const isResizingVertical = useRef(false)

  // Video event handlers with high-frequency time updates
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let animationFrameId: number
    let lastUpdateTime = 0
    const UPDATE_INTERVAL = 50 // Update every 50ms for smooth highlighting

    const updateTime = () => {
      const now = performance.now()
      if (now - lastUpdateTime >= UPDATE_INTERVAL) {
        setCurrentTime(video.currentTime)
        lastUpdateTime = now
      }
      animationFrameId = requestAnimationFrame(updateTime)
    }

    const startAnimationLoop = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateTime)
    }

    const stopAnimationLoop = () => {
      cancelAnimationFrame(animationFrameId)
    }

    const handleDurationChange = () => setDuration(video.duration)
    const handlePlay = () => {
      setIsPlaying(true)
      startAnimationLoop()
    }
    const handlePause = () => {
      setIsPlaying(false)
      stopAnimationLoop()
      setCurrentTime(video.currentTime) // Ensure final position is accurate
    }
    const handleEnded = () => {
      setIsPlaying(false)
      stopAnimationLoop()
      setCurrentTime(video.duration)
    }
    // Fallback for when animation loop isn't running
    const handleTimeUpdate = () => {
      if (video.paused) {
        setCurrentTime(video.currentTime)
      }
    }
    // Sync state on initial load and when video source changes
    const handleLoadedData = () => {
      setIsPlaying(!video.paused)
      setCurrentTime(video.currentTime)
      setDuration(video.duration)
    }

    video.addEventListener('durationchange', handleDurationChange)
    video.addEventListener('play', handlePlay)
    video.addEventListener('playing', handlePlay) // Also listen to 'playing' for reliability
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadeddata', handleLoadedData)

    // Sync initial state
    setIsPlaying(!video.paused)
    if (!video.paused) {
      startAnimationLoop()
    }

    return () => {
      video.removeEventListener('durationchange', handleDurationChange)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('playing', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadeddata', handleLoadedData)
      stopAnimationLoop()
    }
  }, [videoUrl])

  // Auto-scroll transcript to active segment
  useEffect(() => {
    if (!transcriptRef.current) return
    const activeIndex = getActiveSegmentIndex()
    if (activeIndex >= 0) {
      const activeElement = transcriptRef.current.querySelector(`[data-index="${activeIndex}"]`)
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [currentTime])

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.code === 'Space') {
        e.preventDefault() // Prevent page scroll
        togglePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Horizontal resize (transcript panel width)
  const handleHorizontalResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isResizingHorizontal.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    const startX = e.clientX
    const startWidth = transcriptWidth

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingHorizontal.current) return
      const newWidth = Math.max(200, Math.min(800, startWidth + (e.clientX - startX)))
      setTranscriptWidth(newWidth)
    }

    const handleMouseUp = () => {
      isResizingHorizontal.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [transcriptWidth])

  // Vertical resize (timeline panel height)
  const handleVerticalResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isResizingVertical.current = true
    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'

    const startY = e.clientY
    const startHeight = timelineHeight

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingVertical.current) return
      // Note: dragging up increases height, so we subtract
      const newHeight = Math.max(100, Math.min(400, startHeight - (e.clientY - startY)))
      setTimelineHeight(newHeight)
    }

    const handleMouseUp = () => {
      isResizingVertical.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [timelineHeight])

  const seekTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    // Use the video element's actual state, not React state, to avoid race conditions
    if (video.paused) {
      video.play().catch((error) => {
        // Handle autoplay restrictions or other play failures
        console.warn('Video play failed:', error)
      })
    } else {
      video.pause()
    }
  }

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || !timelineScrollRef.current) return
    const scrollContainer = timelineScrollRef.current
    const rect = timelineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left + scrollContainer.scrollLeft
    const totalWidth = rect.width * zoomLevel
    const percent = x / totalWidth
    seekTo(percent * duration)
  }

  const getActiveSegmentIndex = () => {
    return manifest.transcript.findIndex((seg) => currentTime >= seg.start && currentTime < seg.end)
  }

  const getActiveScreenshotIndex = () => {
    for (let i = manifest.screenshots.length - 1; i >= 0; i--) {
      if (currentTime >= manifest.screenshots[i].timestamp) {
        return i
      }
    }
    return 0
  }

  return (
    <div className="app">
      <VideoSelector
        currentVideoId={currentVideoId}
        currentVideoName={currentVideoName}
        onSelectExample={onSelectExample}
        onSelectStoredVideo={onSelectStoredVideo}
        onBackToUpload={onBackToUpload}
      />
      <div className="main-content">
        {/* Left Panel - Transcript */}
        <div className="panel transcript-panel" style={{ width: transcriptWidth }}>
          <h2>Transcript</h2>
          <div className="transcript-list" ref={transcriptRef}>
            {manifest.transcript.length === 0 ? (
              <div className="transcript-empty">No speech detected in video</div>
            ) : (
              manifest.transcript.map((segment, index) => (
                <div
                  key={index}
                  data-index={index}
                  className={`transcript-segment ${getActiveSegmentIndex() === index ? 'active' : ''}`}
                  onClick={() => seekTo(segment.start)}
                >
                  <span className="timestamp">{formatTime(segment.start)}</span>
                  <span className="text">{segment.text}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Horizontal Resize Handle */}
        <div className="resize-handle resize-handle-horizontal" onMouseDown={handleHorizontalResizeStart} />

        {/* Right Panel - Video Player */}
        <div className="panel video-panel">
          <h2>Video</h2>
          <div className="video-container">
            <video ref={videoRef} src={videoUrl} onClick={togglePlayPause} />
            <div className="video-controls">
              <button onClick={togglePlayPause} className="play-button">
                {isPlaying ? '\u23F8' : '\u25B6'}
              </button>
              <span className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Resize Handle */}
      <div className="resize-handle resize-handle-vertical" onMouseDown={handleVerticalResizeStart} />

      {/* Bottom Panel - Timeline */}
      <div className="panel timeline-panel" style={{ height: timelineHeight }}>
        <h2>Timeline ({manifest.screenshots.length} cuts)</h2>
        <div className="timeline-container">
          <div className="timeline-scroll" ref={timelineScrollRef}>
            <div
              className="timeline"
              ref={timelineRef}
              onClick={handleTimelineClick}
              style={{ width: `${zoomLevel * 100}%` }}
            >
              {/* Playhead */}
              <div className="timeline-playhead" style={{ left: `${(currentTime / duration) * 100}%` }} />

              {/* Clip segments with thumbnails */}
              <div className="timeline-clips">
                {manifest.screenshots.map((screenshot, index) => {
                  const clipStart = screenshot.timestamp
                  const clipEnd =
                    index < manifest.screenshots.length - 1 ? manifest.screenshots[index + 1].timestamp : duration
                  const clipDuration = clipEnd - clipStart
                  const leftPercent = (clipStart / duration) * 100
                  const widthPercent = (clipDuration / duration) * 100

                  return (
                    <div
                      key={index}
                      className={`timeline-clip ${getActiveScreenshotIndex() === index ? 'active' : ''}`}
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        seekTo(screenshot.timestamp)
                      }}
                      title={`Clip ${index + 1}: ${formatTime(clipStart)} - ${formatTime(clipEnd)}`}
                    >
                      <div className="clip-thumbnail">
                        {screenshot.dataUrl ? (
                          <img src={screenshot.dataUrl} alt={`Scene at ${formatTime(screenshot.timestamp)}`} loading="lazy" />
                        ) : (
                          <div className="clip-placeholder" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="timeline-toolbar">
            <div className="zoom-control">
              <svg className="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M8 11h6" />
              </svg>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                className="zoom-slider"
              />
              <svg className="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
