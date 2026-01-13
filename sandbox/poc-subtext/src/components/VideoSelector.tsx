import { useState, useEffect } from 'react'
import { EXAMPLES, type Example } from '../lib/examples'
import { getAllVideos, type StoredVideo } from '../lib/storage'

interface VideoSelectorProps {
  currentVideoId: string | null
  currentVideoName: string
  onSelectExample: (exampleId: string) => void
  onSelectStoredVideo: (videoId: string) => void
  onBackToUpload: () => void
}

export function VideoSelector({
  currentVideoId,
  currentVideoName,
  onSelectExample,
  onSelectStoredVideo,
  onBackToUpload,
}: VideoSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [storedVideos, setStoredVideos] = useState<StoredVideo[]>([])

  useEffect(() => {
    getAllVideos().then(setStoredVideos)
  }, [isOpen])

  const handleSelect = (type: 'example' | 'stored', id: string) => {
    setIsOpen(false)
    if (type === 'example') {
      onSelectExample(id)
    } else {
      onSelectStoredVideo(id)
    }
  }

  return (
    <div className="video-selector-toolbar">
      <button className="back-button" onClick={onBackToUpload} title="Back to upload">
        ←
      </button>

      <div className="video-dropdown">
        <button className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
          <span className="current-video-name">{currentVideoName}</span>
          <svg
            className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {EXAMPLES.length > 0 && (
              <div className="dropdown-section">
                <div className="dropdown-section-label">Examples</div>
                {EXAMPLES.map((example: Example) => (
                  <button
                    key={example.id}
                    className={`dropdown-item ${currentVideoId === example.id ? 'active' : ''}`}
                    onClick={() => handleSelect('example', example.id)}
                  >
                    <span className="item-name">{example.name}</span>
                    {example.creator && (
                      <a
                        href={example.creator.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="item-creator-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {example.creator.handle}
                      </a>
                    )}
                  </button>
                ))}
              </div>
            )}

            {storedVideos.length > 0 && (
              <div className="dropdown-section">
                <div className="dropdown-section-label">My Videos</div>
                {storedVideos.map((video) => (
                  <button
                    key={video.id}
                    className={`dropdown-item ${currentVideoId === video.id ? 'active' : ''}`}
                    onClick={() => handleSelect('stored', video.id)}
                  >
                    <span className="item-name">{video.name}</span>
                    <span className="item-description">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {EXAMPLES.length === 0 && storedVideos.length === 0 && (
              <div className="dropdown-empty">No videos available</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
