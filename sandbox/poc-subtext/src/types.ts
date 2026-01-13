export interface TranscriptSegment {
  start: number
  end: number
  text: string
}

export interface Screenshot {
  index: number
  timestamp: number
  filename: string
  dataUrl?: string // For browser-generated thumbnails
}

export interface VideoManifest {
  video: {
    filename: string
    duration: number
    width: number
    height: number
  }
  transcript: TranscriptSegment[]
  screenshots: Screenshot[]
}

export type AppScreen = 'upload' | 'processing' | 'results'

export type ProcessingStage =
  | 'idle'
  | 'loading-model'
  | 'extracting-audio'
  | 'transcribing'
  | 'detecting-scenes'
  | 'generating-thumbnails'
  | 'complete'

export interface AppState {
  screen: AppScreen
  videoFile: File | null
  videoUrl: string | null
  modelLoadProgress: number
  modelLoaded: boolean
  processingProgress: number
  processingStage: ProcessingStage
  manifest: VideoManifest | null
  error: string | null
}

// Worker message types
export interface WorkerProgressMessage {
  type: 'progress'
  progress: number
  stage?: string
}

export interface WorkerReadyMessage {
  type: 'ready'
}

export interface WorkerResultMessage {
  type: 'result'
  data: TranscriptSegment[]
}

export interface WorkerErrorMessage {
  type: 'error'
  error: string
}

export type WhisperWorkerMessage =
  | WorkerProgressMessage
  | WorkerReadyMessage
  | WorkerResultMessage
  | WorkerErrorMessage

export interface WhisperWorkerCommand {
  type: 'load' | 'transcribe'
  audio?: Float32Array
}
