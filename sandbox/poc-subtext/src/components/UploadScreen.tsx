import { useCallback, useState } from 'react'
import { EXAMPLES } from '../lib/examples'

interface UploadScreenProps {
  onFileSelected: (file: File) => void
  onLoadExample: (exampleId: string) => void
  modelLoading: boolean
  modelProgress: number
}

export function UploadScreen({ onFileSelected, onLoadExample, modelLoading, modelProgress }: UploadScreenProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [loadingExample, setLoadingExample] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        const file = files[0]
        if (file.type.startsWith('video/')) {
          onFileSelected(file)
        }
      }
    },
    [onFileSelected]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        onFileSelected(files[0])
      }
    },
    [onFileSelected]
  )

  return (
    <div className="upload-screen">
      <div className="app-header">
        <h1 className="app-title">Subtext</h1>
        <p className="app-subtitle">Reverse-engineering the storytelling in short-form videos</p>
      </div>
      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <h2>Upload a video</h2>
        <p className="upload-hint">Drag and drop a video file here, or click to browse</p>
        <p className="upload-formats">Supports MP4, WebM, MOV</p>

        <label className="upload-button">
          <input type="file" accept="video/*" onChange={handleFileInput} hidden />
          Choose File
        </label>

        {EXAMPLES.length > 0 && (
          <div className="example-section">
            <span className="example-divider">or try an example</span>
            <div className="example-buttons">
              {EXAMPLES.map((example) => (
                <div key={example.id} className="example-item">
                  <button
                    className="example-button"
                    onClick={() => {
                      setLoadingExample(true)
                      onLoadExample(example.id)
                    }}
                    disabled={loadingExample}
                  >
                  {example.creator && (
                    <a
                      href={example.creator.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="example-creator-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {example.creator.handle}
                    </a>
                  )}
                    {loadingExample ? 'Loading...' : example.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="model-status">
        {modelLoading ? (
          <>
            <div className="model-status-indicator loading" />
            <span>Loading transcription model video... {modelProgress}%</span>
          </>
        ) : (
          <>
            <div className="model-status-indicator ready" />
            <span>Transcription model ready</span>
          </>
        )}
      </div>
    </div>
  )
}
