import type { VideoManifest } from '../types'

// Get the base path from Vite's import.meta.env
const BASE_PATH = import.meta.env.BASE_URL || '/'

export interface Example {
  id: string
  name: string
  description: string
  basePath: string // Base path in public folder (relative to base URL)
  creator?: {
    handle: string // e.g. "@simonkim"
    instagramUrl: string // e.g. "https://www.instagram.com/simonkim/"
  }
}

// Available examples - the manifest and video are loaded dynamically
export const EXAMPLES: Example[] = [
  {
    id: 'simon-kim',
    name: 'The Cost of Ambition',
    description: 'Simon Kim on entrepreneurship and sacrifice',
    basePath: '/examples/simon-kim',
    creator: {
      handle: '@simonkim',
      instagramUrl: 'https://www.instagram.com/simonkim/',
    },
  },
  {
    id: 'alex-ke',
    name: 'Seattle Center',
    description: 'Alex Ke at Seattle Center',
    basePath: '/examples/alex-ke',
    creator: {
      handle: '@westcoastcapone',
      instagramUrl: 'https://www.instagram.com/westcoastcapone/',
    },
  },
]

export interface LoadedExample {
  manifest: VideoManifest
  videoBlob: Blob
}

export async function loadExample(example: Example): Promise<LoadedExample> {
  // Construct full path with base URL
  const fullBasePath = `${BASE_PATH}${example.basePath.replace(/^\//, '')}`

  // Load manifest
  const manifestResponse = await fetch(`${fullBasePath}/manifest.json`)
  if (!manifestResponse.ok) {
    throw new Error(`Failed to fetch example manifest: ${manifestResponse.statusText}`)
  }
  const manifest: VideoManifest = await manifestResponse.json()

  // Load video
  const videoResponse = await fetch(`${fullBasePath}/video.mp4`)
  if (!videoResponse.ok) {
    throw new Error(`Failed to fetch example video: ${videoResponse.statusText}`)
  }
  const videoBlob = await videoResponse.blob()

  // Load screenshot images and convert to dataUrls
  const screenshotsWithDataUrls = await Promise.all(
    manifest.screenshots.map(async (screenshot) => {
      try {
        const imgResponse = await fetch(`${fullBasePath}/screenshots/${screenshot.filename}`)
        if (imgResponse.ok) {
          const blob = await imgResponse.blob()
          const dataUrl = await blobToDataUrl(blob)
          return { ...screenshot, dataUrl }
        }
      } catch (e) {
        console.warn(`Failed to load screenshot ${screenshot.filename}:`, e)
      }
      return screenshot
    })
  )

  return {
    manifest: {
      ...manifest,
      screenshots: screenshotsWithDataUrls,
    },
    videoBlob,
  }
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export function getExampleById(id: string): Example | undefined {
  return EXAMPLES.find((e) => e.id === id)
}
