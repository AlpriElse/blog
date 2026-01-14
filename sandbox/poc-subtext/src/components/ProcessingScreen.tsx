import { useEffect } from 'react'
import type { ProcessingStage } from '../types'

interface ProcessingScreenProps {
  modelLoaded: boolean
  modelProgress: number
  processingStage: ProcessingStage
  processingProgress: number
  onViewResults: () => void
  error: string | null
  isLoadingExample?: boolean
}

function getStageLabel(stage: ProcessingStage): string {
  switch (stage) {
    case 'idle':
      return 'Preparing...'
    case 'loading-model':
      return 'Loading transcription model...'
    case 'extracting-audio':
      return 'Extracting audio...'
    case 'transcribing':
      return 'Transcribing speech...'
    case 'detecting-scenes':
      return 'Detecting scene cuts...'
    case 'generating-thumbnails':
      return 'Generating thumbnails...'
    case 'complete':
      return 'Processing complete!'
    default:
      return 'Processing...'
  }
}

export function ProcessingScreen({
  modelLoaded,
  modelProgress,
  processingStage,
  processingProgress,
  onViewResults,
  error,
  isLoadingExample,
}: ProcessingScreenProps) {
  const isComplete = processingStage === 'complete'

  // Auto-navigate to results when processing completes
  useEffect(() => {
    if (isComplete) {
      onViewResults()
    }
  }, [isComplete, onViewResults])

  if (error) {
    return (
      <div className="processing-screen">
        <div className="processing-container">
          <div className="processing-error">
            <div className="error-icon">!</div>
            <h2>Processing Failed</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // Simple loading UI for examples
  if (isLoadingExample) {
    return (
      <div className="processing-screen">
        <div className="processing-container">
          <div className="example-loading">
            <div className="loading-spinner" />
            <p>Loading example (this may take a minute)...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="processing-screen">
      <div className="processing-container">
        <h1>Analyzing Video</h1>

        <div className="progress-section">
          <div className="progress-item">
            <div className="progress-header">
              <span className="progress-label">Transcription Model</span>
              <span className="progress-value">{modelLoaded ? 'Ready' : `${modelProgress}%`}</span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill ${modelLoaded ? 'complete' : ''}`}
                style={{ width: modelLoaded ? '100%' : `${modelProgress}%` }}
              />
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-header">
              <span className="progress-label">{getStageLabel(processingStage)}</span>
              <span className="progress-value">{isComplete ? 'Done' : `${processingProgress}%`}</span>
            </div>
            <div className="progress-bar">
              <div className={`progress-fill ${isComplete ? 'complete' : ''}`} style={{ width: `${processingProgress}%` }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
