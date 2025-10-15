import { useState } from 'react'
import VideoUpload from './components/VideoUpload'
import VideoEditor from './components/VideoEditor'
import ExportView from './components/ExportView'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import LicenseModal from './components/LicenseModal'
import InstallPrompt from './components/InstallPrompt'
import PWAUpdatePrompt from './components/PWAUpdatePrompt'

export type AppView = 'upload' | 'editor' | 'export'

export interface VideoSegment {
  start: number
  end: number
  duration: number
  blob?: Blob
}

function App() {
  const [view, setView] = useState<AppView>('upload')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [segments, setSegments] = useState<VideoSegment[]>([])
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showLicense, setShowLicense] = useState(false)

  const handleVideoSelect = (file: File) => {
    setVideoFile(file)
    setView('editor')
  }

  const handleExport = (exportedSegments: VideoSegment[]) => {
    setSegments(exportedSegments)
    setView('export')
  }

  const handleReset = () => {
    setVideoFile(null)
    setSegments([])
    setView('upload')
  }

  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Prismatic Aurora Burst - Multi-layered Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
            #000000
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Story Splitter</h1>
            <p className="text-cyan-200/80">Split your videos into perfect segments</p>
            
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <a
                href="https://github.com/sayedmahmoud266/story-splitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/github/stars/sayedmahmoud266/story-splitter?style=social"
                  alt="GitHub stars"
                  className="h-6"
                />
              </a>
              <a
                href="https://www.buymeacoffee.com/sayedmahmoud266"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black"
                  alt="Buy Me A Coffee"
                  className="h-6"
                />
              </a>
            </div>
          </header>

          {view === 'upload' && <VideoUpload onVideoSelect={handleVideoSelect} />}
          {view === 'editor' && videoFile && (
            <VideoEditor videoFile={videoFile} onExport={handleExport} onCancel={handleReset} />
          )}
          {view === 'export' && videoFile && (
            <ExportView segments={segments} videoFile={videoFile} onReset={handleReset} />
          )}
        </div>

        <Footer
          onPrivacyClick={() => setShowPrivacy(true)}
          onLicenseClick={() => setShowLicense(true)}
        />
      </div>

      {/* Modals */}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showLicense && <LicenseModal onClose={() => setShowLicense(false)} />}

      {/* Install Prompt */}
      <InstallPrompt />
      
      {/* PWA Update Prompt */}
      <PWAUpdatePrompt />
    </div>
  )
}

export default App
