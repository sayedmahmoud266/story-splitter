import { useRef, useState } from 'react'
import { Upload, Video } from 'lucide-react'

interface VideoUploadProps {
  onVideoSelect: (file: File) => void
}

export default function VideoUpload({ onVideoSelect }: VideoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      onVideoSelect(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onVideoSelect(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`
          relative border-4 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out backdrop-blur-sm
          ${
            isDragging
              ? 'border-cyan-400 bg-cyan-500/20 scale-105 shadow-lg shadow-cyan-500/50'
              : 'border-cyan-300/30 bg-white/5 hover:bg-white/10 hover:border-cyan-300/50 hover:shadow-lg hover:shadow-cyan-500/20'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          {isDragging ? (
            <Video className="w-20 h-20 text-cyan-400 animate-bounce" />
          ) : (
            <Upload className="w-20 h-20 text-cyan-300" />
          )}

          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              {isDragging ? 'Drop your video here' : 'Upload a video'}
            </h2>
            <p className="text-cyan-200/80">
              Drag and drop or click to select a video file
            </p>
            <p className="text-cyan-300/60 text-sm mt-2">
              Supports all video formats
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
