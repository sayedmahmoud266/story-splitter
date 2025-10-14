import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Square, Download } from 'lucide-react'
import { VideoSegment } from '../App'
import { splitVideo } from '../utils/videoSplitter'

interface VideoEditorProps {
  videoFile: File
  onExport: (segments: VideoSegment[]) => void
  onCancel: () => void
}

const MAX_LENGTH_OPTIONS = [
  { label: '15s', value: 15 },
  { label: '30s', value: 30 },
  { label: '59s', value: 59 },
  { label: 'Custom', value: 0 },
]

export default function VideoEditor({ videoFile, onExport, onCancel }: VideoEditorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const seekBarRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [maxLength, setMaxLength] = useState(30)
  const [customLength, setCustomLength] = useState(30)
  const [splitPoints, setSplitPoints] = useState<number[]>([])
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState({ current: 0, total: 0 })

  useEffect(() => {
    const url = URL.createObjectURL(videoFile)
    setVideoUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [videoFile])

  useEffect(() => {
    if (duration > 0) {
      calculateSplitPoints()
    }
  }, [duration, maxLength])

  const calculateSplitPoints = () => {
    const points: number[] = []
    let currentPoint = maxLength
    while (currentPoint < duration) {
      points.push(currentPoint)
      currentPoint += maxLength
    }
    
    // Check if last segment is less than 1 second, merge with previous
    if (points.length > 0) {
      const lastSegmentDuration = duration - points[points.length - 1]
      if (lastSegmentDuration < 1) {
        points.pop() // Remove last split point to merge with previous segment
      }
    }
    
    setSplitPoints(points)
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (seekBarRef.current && videoRef.current) {
      const rect = seekBarRef.current.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * duration
    }
  }

  const handleMarkerDragStart = (index: number) => {
    setDraggingIndex(index)
  }

  const handleMarkerDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingIndex !== null && seekBarRef.current) {
      const rect = seekBarRef.current.getBoundingClientRect()
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const newTime = pos * duration

      const prevPoint = draggingIndex === 0 ? 0 : splitPoints[draggingIndex - 1]
      const nextPoint = draggingIndex === splitPoints.length - 1 ? duration : splitPoints[draggingIndex + 1]

      const minTime = prevPoint + 0.1
      const maxTime = Math.min(nextPoint - 0.1, prevPoint + maxLength)

      const clampedTime = Math.max(minTime, Math.min(maxTime, newTime))

      const newSplitPoints = [...splitPoints]
      const oldTime = newSplitPoints[draggingIndex]
      newSplitPoints[draggingIndex] = clampedTime
      
      // If dragging left (reducing duration), realign following split points
      if (clampedTime < oldTime) {
        realignFollowingSplitPoints(newSplitPoints, draggingIndex)
      } else {
        setSplitPoints(newSplitPoints)
      }
    }
  }

  const realignFollowingSplitPoints = (points: number[], fromIndex: number) => {
    const newPoints = [...points]
    
    // Realign all following points
    for (let i = fromIndex + 1; i < newPoints.length; i++) {
      const prevPoint = newPoints[i - 1]
      const idealPoint = prevPoint + maxLength
      
      // Check if current point exceeds max length from previous
      if (newPoints[i] - prevPoint > maxLength) {
        newPoints[i] = idealPoint
      } else {
        // If within bounds, stop realigning
        break
      }
    }
    
    // Check if last segment is less than 1 second, merge with previous
    if (newPoints.length > 0) {
      const lastSegmentDuration = duration - newPoints[newPoints.length - 1]
      if (lastSegmentDuration < 1) {
        newPoints.pop()
      }
    }
    
    setSplitPoints(newPoints)
  }

  const handleMarkerDragEnd = () => {
    setDraggingIndex(null)
  }

  const getSegments = (): VideoSegment[] => {
    const segments: VideoSegment[] = []
    const points = [0, ...splitPoints, duration]

    for (let i = 0; i < points.length - 1; i++) {
      segments.push({
        start: points[i],
        end: points[i + 1],
        duration: points[i + 1] - points[i],
      })
    }

    return segments
  }

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress({ current: 0, total: 0 })
    try {
      const segments = getSegments()
      setExportProgress({ current: 0, total: segments.length })
      
      const segmentsWithBlobs = await splitVideo(
        videoFile, 
        segments,
        (current, total) => {
          setExportProgress({ current, total })
        }
      )
      
      onExport(segmentsWithBlobs)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export video segments')
    } finally {
      setIsExporting(false)
      setExportProgress({ current: 0, total: 0 })
    }
  }

  const handleMaxLengthChange = (value: number) => {
    if (value === 0) {
      setMaxLength(customLength)
    } else {
      setMaxLength(value)
    }
  }

  const segments = getSegments()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10">
        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden mb-6 flex items-center justify-center" style={{ maxHeight: '80vh' }}>
          <video
            ref={videoRef}
            src={videoUrl}
            className="max-w-full max-h-full"
            style={{ maxWidth: '80vw', maxHeight: '80vh', width: 'auto', height: 'auto' }}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Playback Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-full transition-colors shadow-lg shadow-cyan-500/30"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>
            <button
              onClick={handleStop}
              className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-full transition-colors shadow-lg shadow-cyan-500/30"
            >
              <Square className="w-6 h-6 text-white" />
            </button>
            <span className="text-white ml-auto">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Settings Panel - Always Visible */}
          <div className="bg-white/5 rounded-lg p-4 space-y-3">
            <h3 className="text-white font-semibold mb-2">Maximum Video Length</h3>
            <div className="flex flex-wrap gap-2">
              {MAX_LENGTH_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleMaxLengthChange(option.value)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    (option.value === 0 ? customLength : option.value) === maxLength
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-white/10 text-cyan-200 hover:bg-white/20'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {maxLength === customLength && MAX_LENGTH_OPTIONS.find(o => o.value === 0) && (
              <div className="flex items-center gap-2">
                <label className="text-white">Custom length (seconds):</label>
                <input
                  type="number"
                  min="1"
                  max={duration}
                  value={customLength}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1
                    setCustomLength(val)
                    setMaxLength(val)
                  }}
                  className="px-3 py-1 bg-white/10 text-white rounded border border-cyan-400 focus:outline-none focus:border-cyan-300"
                />
              </div>
            )}
          </div>
          <div className="relative">
            <div
              ref={seekBarRef}
              className="relative h-16 bg-white/10 rounded-lg cursor-pointer overflow-visible"
              onClick={handleSeek}
              onMouseMove={draggingIndex !== null ? handleMarkerDrag : undefined}
              onMouseUp={handleMarkerDragEnd}
              onMouseLeave={handleMarkerDragEnd}
            >
              {/* Segment Duration Labels */}
              {segments.map((segment, index) => {
                const startPercent = (segment.start / duration) * 100
                const widthPercent = (segment.duration / duration) * 100
                return (
                  <div
                    key={index}
                    className="absolute top-0 h-full flex items-center justify-center pointer-events-none"
                    style={{
                      left: `${startPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  >
                    <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                      {formatTime(segment.duration)}
                    </span>
                  </div>
                )
              })}

              {/* Progress Bar */}
              <div
                className="absolute top-0 left-0 h-full bg-purple-600/30 pointer-events-none"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />

              {/* Current Time Indicator */}
              <div
                className="absolute top-0 w-1 h-full bg-purple-400 pointer-events-none"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />

              {/* Split Markers */}
              {splitPoints.map((point, index) => (
                <div
                  key={index}
                  className="absolute top-0 h-full w-1 bg-red-500 cursor-ew-resize z-10 group"
                  style={{ left: `${(point / duration) * 100}%` }}
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    handleMarkerDragStart(index)
                  }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatTime(point)}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-purple-200 text-sm mt-2 text-center">
              Drag the red markers to adjust split points
            </p>
          </div>

          {/* Segments Preview */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">
              Segments Preview ({segments.length} parts)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {segments.map((segment, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded p-3 text-center"
                >
                  <div className="text-cyan-300 text-sm font-semibold">
                    Part {index + 1}
                  </div>
                  <div className="text-white text-lg">
                    {formatTime(segment.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Progress */}
          {isExporting && exportProgress.total > 0 && (
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">
                  Processing segments...
                </span>
                <span className="text-cyan-300">
                  {exportProgress.current} / {exportProgress.total}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full transition-all duration-300 ease-out"
                  style={{
                    width: `${(exportProgress.current / exportProgress.total) * 100}%`,
                  }}
                />
              </div>
              <p className="text-cyan-200 text-sm mt-2 text-center">
                {Math.round((exportProgress.current / exportProgress.total) * 100)}% complete
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              disabled={isExporting}
              className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
            >
              <Download className="w-5 h-5" />
              {isExporting ? 'Processing...' : 'Export & Download'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
