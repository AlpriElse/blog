/**
 * Scene Detection Algorithm
 * Port of PySceneDetect's ContentDetector using HSV color analysis
 */

interface HSV {
  h: number // 0-1
  s: number // 0-1
  v: number // 0-1
}

interface SceneDetectorOptions {
  threshold?: number // Default: 27.0 (same as PySceneDetect)
  minSceneLength?: number // Minimum seconds between cuts
  sampleRate?: number // Frames per second to analyze
}

interface DetectedScene {
  timestamp: number
  score: number
}

/**
 * Convert RGB to HSV color space
 */
function rgbToHsv(r: number, g: number, b: number): HSV {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min

  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return { h, s, v }
}

/**
 * Calculate the content score between two frames
 * Higher score = more difference = potential scene cut
 */
function calculateFrameScore(current: ImageData, previous: ImageData): number {
  const pixels = current.data
  const prevPixels = previous.data

  let sumHueDiff = 0
  let sumSatDiff = 0
  let sumLumDiff = 0

  // Sample every 4th pixel for performance (still accurate enough)
  const step = 4
  let sampledPixels = 0

  for (let i = 0; i < pixels.length; i += 4 * step) {
    const currentHsv = rgbToHsv(pixels[i], pixels[i + 1], pixels[i + 2])
    const prevHsv = rgbToHsv(prevPixels[i], prevPixels[i + 1], prevPixels[i + 2])

    // Hue needs special handling for circular values
    let hueDiff = Math.abs(currentHsv.h - prevHsv.h)
    if (hueDiff > 0.5) hueDiff = 1 - hueDiff

    sumHueDiff += hueDiff * 255
    sumSatDiff += Math.abs(currentHsv.s - prevHsv.s) * 255
    sumLumDiff += Math.abs(currentHsv.v - prevHsv.v) * 255
    sampledPixels++
  }

  // Weighted average matching PySceneDetect defaults
  const avgHueDiff = sumHueDiff / sampledPixels
  const avgSatDiff = sumSatDiff / sampledPixels
  const avgLumDiff = sumLumDiff / sampledPixels

  // Equal weights for H, S, V (PySceneDetect default)
  const frameScore = (avgHueDiff + avgSatDiff + avgLumDiff) / 3

  return frameScore
}

/**
 * Extract a frame from video at a specific timestamp
 */
async function extractFrameAtTime(
  video: HTMLVideoElement,
  timestamp: number,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked)
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      resolve(imageData)
    }

    video.addEventListener('seeked', onSeeked)
    video.currentTime = Math.min(timestamp, video.duration - 0.001)

    // Timeout fallback
    setTimeout(() => {
      video.removeEventListener('seeked', onSeeked)
      reject(new Error('Seek timeout'))
    }, 5000)
  })
}

/**
 * Detect scene changes in a video
 */
export async function detectScenes(
  videoElement: HTMLVideoElement,
  options: SceneDetectorOptions = {},
  onProgress?: (progress: number) => void
): Promise<DetectedScene[]> {
  const { threshold = 27.0, minSceneLength = 0.5, sampleRate = 2 } = options

  const duration = videoElement.duration
  const interval = 1 / sampleRate
  const scenes: DetectedScene[] = [{ timestamp: 0, score: 0 }] // Always include start

  // Create canvas for frame extraction (downscale for performance)
  const canvas = document.createElement('canvas')
  const scale = Math.min(1, 320 / videoElement.videoWidth)
  canvas.width = Math.floor(videoElement.videoWidth * scale)
  canvas.height = Math.floor(videoElement.videoHeight * scale)
  const ctx = canvas.getContext('2d', { willReadFrequently: true })

  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  let previousFrame: ImageData | null = null
  let lastSceneTime = 0
  let processedFrames = 0
  const totalFrames = Math.ceil(duration / interval)

  for (let t = 0; t < duration; t += interval) {
    try {
      const currentFrame = await extractFrameAtTime(videoElement, t, canvas, ctx)

      if (previousFrame && t - lastSceneTime >= minSceneLength) {
        const score = calculateFrameScore(currentFrame, previousFrame)

        if (score >= threshold) {
          scenes.push({ timestamp: t, score })
          lastSceneTime = t
        }
      }

      previousFrame = currentFrame
      processedFrames++

      if (onProgress) {
        onProgress(Math.round((processedFrames / totalFrames) * 100))
      }
    } catch {
      // Skip failed frames
      processedFrames++
    }
  }

  return scenes
}

/**
 * Generate a thumbnail at a specific timestamp
 */
export async function generateThumbnail(
  video: HTMLVideoElement,
  timestamp: number,
  width = 160,
  height?: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const aspectRatio = video.videoHeight / video.videoWidth
    const thumbHeight = height || Math.round(width * aspectRatio)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = thumbHeight
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Could not get canvas context'))
      return
    }

    const targetTime = Math.min(timestamp, video.duration - 0.001)

    const drawAndResolve = () => {
      ctx.drawImage(video, 0, 0, width, thumbHeight)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
      resolve(dataUrl)
    }

    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked)
      // Small delay to ensure the frame is fully rendered
      requestAnimationFrame(() => {
        drawAndResolve()
      })
    }

    // If we're already at the target time (within 0.1s), just draw immediately
    if (Math.abs(video.currentTime - targetTime) < 0.1) {
      requestAnimationFrame(() => {
        drawAndResolve()
      })
      return
    }

    video.addEventListener('seeked', onSeeked)
    video.currentTime = targetTime

    setTimeout(() => {
      video.removeEventListener('seeked', onSeeked)
      // Try to draw anyway even on timeout - might still work
      try {
        drawAndResolve()
      } catch {
        reject(new Error('Thumbnail generation timeout'))
      }
    }, 5000)
  })
}

/**
 * Generate thumbnails for all detected scenes
 */
export async function generateAllThumbnails(
  video: HTMLVideoElement,
  scenes: DetectedScene[],
  onProgress?: (progress: number) => void
): Promise<Map<number, string>> {
  const thumbnails = new Map<number, string>()

  for (let i = 0; i < scenes.length; i++) {
    try {
      const thumbnail = await generateThumbnail(video, scenes[i].timestamp)
      thumbnails.set(scenes[i].timestamp, thumbnail)
    } catch {
      // Skip failed thumbnails
    }

    if (onProgress) {
      onProgress(Math.round(((i + 1) / scenes.length) * 100))
    }
  }

  return thumbnails
}
