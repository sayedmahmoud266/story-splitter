import { VideoSegment } from '../App'

export async function splitVideo(
  videoFile: File,
  segments: VideoSegment[],
  onProgress?: (current: number, total: number) => void
): Promise<VideoSegment[]> {
  const videoUrl = URL.createObjectURL(videoFile)
  
  try {
    const segmentsWithBlobs: VideoSegment[] = []
    
    // Process segments sequentially to track progress
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      const blob = await extractSegment(videoUrl, segment.start, segment.end)
      segmentsWithBlobs.push({ ...segment, blob })
      
      // Report progress
      if (onProgress) {
        onProgress(i + 1, segments.length)
      }
    }
    
    return segmentsWithBlobs
  } finally {
    URL.revokeObjectURL(videoUrl)
  }
}

async function extractSegment(
  videoUrl: string,
  startTime: number,
  endTime: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = videoUrl
    video.crossOrigin = 'anonymous'
    video.playsInline = true
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'))
      return
    }

    let mediaRecorder: MediaRecorder | null = null
    const chunks: Blob[] = []
    let animationFrameId: number | null = null

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Create a stream from the canvas - don't specify FPS, let it be driven by requestAnimationFrame
      const stream = canvas.captureStream()
      
      // Add audio track if available
      const audioContext = new AudioContext()
      const source = audioContext.createMediaElementSource(video)
      const destination = audioContext.createMediaStreamDestination()
      
      // Create a gain node set to 0 to prevent playback but allow capture
      const gainNode = audioContext.createGain()
      gainNode.gain.value = 0 // Silent output
      
      source.connect(destination) // For recording
      source.connect(gainNode) // For silent monitoring
      gainNode.connect(audioContext.destination) // Connect to output but with 0 gain
      
      if (destination.stream.getAudioTracks().length > 0) {
        destination.stream.getAudioTracks().forEach(track => {
          stream.addTrack(track)
        })
      }

      // Set up MediaRecorder with higher bitrate for better quality
      let options: MediaRecorderOptions = { 
        mimeType: 'video/webm;codecs=vp9,opus',
        videoBitsPerSecond: 5000000 // 5 Mbps
      }
      
      try {
        mediaRecorder = new MediaRecorder(stream, options)
      } catch (e) {
        // Fallback to vp8
        try {
          options = { 
            mimeType: 'video/webm;codecs=vp8,opus',
            videoBitsPerSecond: 5000000
          }
          mediaRecorder = new MediaRecorder(stream, options)
        } catch (e2) {
          // Fallback to default codec
          mediaRecorder = new MediaRecorder(stream, { videoBitsPerSecond: 5000000 })
        }
      }

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId)
        }
        const blob = new Blob(chunks, { type: 'video/webm' })
        resolve(blob)
        audioContext.close()
      }

      // Start recording
      video.currentTime = startTime
    })

    video.addEventListener('seeked', () => {
      if (mediaRecorder && mediaRecorder.state === 'inactive') {
        mediaRecorder.start(100) // Collect data every 100ms
        video.playbackRate = 1.0 // Ensure normal playback speed
        video.play()
        // Start the animation loop for consistent frame capture
        captureFrame()
      }
    })

    // Use requestAnimationFrame for consistent frame capture
    const captureFrame = () => {
      if (video.currentTime >= endTime) {
        video.pause()
        if (mediaRecorder && mediaRecorder.state === 'recording') {
          mediaRecorder.stop()
        }
        return
      }
      
      if (!video.paused && !video.ended) {
        // Draw current frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        // Request next frame
        animationFrameId = requestAnimationFrame(captureFrame)
      }
    }

    video.addEventListener('error', () => {
      reject(new Error('Video loading error'))
    })

    video.load()
  })
}
