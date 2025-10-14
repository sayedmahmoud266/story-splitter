import { Download, Home } from 'lucide-react'
import { VideoSegment } from '../App'

interface ExportViewProps {
  segments: VideoSegment[]
  videoFile: File
  onReset: () => void
}

export default function ExportView({ segments, videoFile, onReset }: ExportViewProps) {
  const handleDownload = (segment: VideoSegment, index: number) => {
    if (!segment.blob) return

    const originalName = videoFile.name
    const extensionMatch = originalName.match(/\.([^.]+)$/)
    const extension = extensionMatch ? extensionMatch[1] : 'mp4'
    const nameWithoutExt = originalName.replace(/\.[^.]+$/, '')
    
    const fileName = `${nameWithoutExt}__part_${index + 1}.${extension}`
    
    const url = URL.createObjectURL(segment.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadAll = () => {
    segments.forEach((segment, index) => {
      setTimeout(() => handleDownload(segment, index), index * 500)
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Export Complete!</h2>
          <p className="text-cyan-200/80">
            Your video has been split into {segments.length} segments
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={handleDownloadAll}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold shadow-lg shadow-cyan-500/30"
          >
            <Download className="w-5 h-5" />
            Download All Segments
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <div className="flex-1">
                <div className="text-white font-semibold">
                  Part {index + 1}
                </div>
                <div className="text-cyan-200/80 text-sm">
                  Duration: {formatTime(segment.duration)} ({formatTime(segment.start)} - {formatTime(segment.end)})
                </div>
              </div>
              <button
                onClick={() => handleDownload(segment, index)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/30"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onReset}
          className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Start Over
        </button>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
