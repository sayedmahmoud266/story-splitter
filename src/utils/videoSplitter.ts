import { VideoSegment } from '../App'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'

// Singleton FFmpeg instance
let ffmpegInstance: FFmpeg | null = null
let ffmpegLoaded = false

// Format time for FFmpeg (HH:MM:SS.mmm)
function formatTimeForFFmpeg(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const milliseconds = Math.floor((seconds % 1) * 1000)
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
}

// Initialize FFmpeg instance
async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpegInstance && ffmpegLoaded) {
    return ffmpegInstance
  }

  if (!ffmpegInstance) {
    ffmpegInstance = new FFmpeg()
    
    // Enable logging for debugging
    ffmpegInstance.on('log', ({ message }) => {
      console.log('[FFmpeg]', message)
    })
  }

  if (!ffmpegLoaded) {
    try {
      // Use jsdelivr CDN which is more reliable
      const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm'
      
      await ffmpegInstance.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      })
      
      ffmpegLoaded = true
      console.log('[FFmpeg] Loaded successfully')
    } catch (error) {
      console.error('[FFmpeg] Load error:', error)
      throw new Error(`Failed to load FFmpeg: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return ffmpegInstance
}

export async function splitVideo(
  videoFile: File,
  segments: VideoSegment[],
  onProgress?: (current: number, total: number) => void,
  onFFmpegLoad?: () => void
): Promise<VideoSegment[]> {
  try {
    // Load FFmpeg
    const ffmpeg = await getFFmpeg()
    
    if (onFFmpegLoad) {
      onFFmpegLoad()
    }

    // Get file extension from original file
    const fileExtension = videoFile.name.split('.').pop() || 'mp4'
    const inputFileName = `input.${fileExtension}`
    
    // Write input file to FFmpeg virtual file system
    const fileData = await videoFile.arrayBuffer()
    await ffmpeg.writeFile(inputFileName, new Uint8Array(fileData))

    const segmentsWithBlobs: VideoSegment[] = []

    // Process segments sequentially
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      const outputFileName = `output_${i}.${fileExtension}`
      
      const startTime = formatTimeForFFmpeg(segment.start)
      const duration = formatTimeForFFmpeg(segment.duration)

      // Use FFmpeg to extract segment
      // -ss: start time, -t: duration, -c copy: copy streams without re-encoding (fast & lossless)
      await ffmpeg.exec([
        '-i', inputFileName,
        '-ss', startTime,
        '-t', duration,
        '-c', 'copy',
        '-avoid_negative_ts', 'make_zero',
        outputFileName
      ])

      // Read the output file
      const data = await ffmpeg.readFile(outputFileName)
      // Convert to regular Uint8Array to avoid SharedArrayBuffer issues
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: `video/${fileExtension}` })

      segmentsWithBlobs.push({ ...segment, blob })

      // Clean up output file
      await ffmpeg.deleteFile(outputFileName)

      // Report progress
      if (onProgress) {
        onProgress(i + 1, segments.length)
      }
    }

    // Clean up input file
    await ffmpeg.deleteFile(inputFileName)

    return segmentsWithBlobs
  } catch (error) {
    console.error('FFmpeg processing error:', error)
    throw new Error(`Video processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Check if FFmpeg is supported in the current browser
export function isFFmpegSupported(): boolean {
  return typeof SharedArrayBuffer !== 'undefined'
}

// Get FFmpeg loading status
export function isFFmpegLoaded(): boolean {
  return ffmpegLoaded
}
