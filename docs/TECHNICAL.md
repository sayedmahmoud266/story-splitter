# Story Splitter - Technical Documentation

## Overview

Story Splitter is a client-side video processing application that splits videos into segments based on user-defined maximum lengths. All processing happens entirely in the browser with zero data collection.

---

## Architecture

### Technology Stack

- **React 18**: Modern UI framework with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS v4**: Utility-first styling
- **Lucide React**: Icon library

### Project Structure

```
story-splitter/
├── src/
│   ├── components/
│   │   ├── VideoUpload.tsx      # File upload interface
│   │   ├── VideoEditor.tsx      # Main editor with timeline
│   │   ├── ExportView.tsx       # Download interface
│   │   ├── Footer.tsx           # App footer
│   │   ├── PrivacyPolicy.tsx    # Privacy modal
│   │   └── LicenseModal.tsx     # License modal
│   ├── utils/
│   │   └── videoSplitter.ts     # Core video processing logic
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── public/
│   ├── logo.png                 # App logo
│   └── favicon.png              # Favicon
└── docs/                        # Documentation
```

---

## Core Features

### 1. Video Upload
- Drag-and-drop support
- Click to browse files
- Accepts all video formats
- Visual feedback during drag

### 2. Video Editor
- Custom video player with controls
- Interactive timeline with split points
- Draggable markers for adjustment
- Real-time segment preview
- Preset and custom length options

### 3. Video Processing
- Client-side only (no uploads)
- High-quality output (24-30 FPS)
- Audio preservation
- Silent processing
- Progress tracking

### 4. Export & Download
- Individual segment downloads
- Batch download all segments
- WebM format output
- Automatic file naming

---

## Video Processing Pipeline

### Step 1: Video Upload
```typescript
// User selects video file
const handleVideoSelect = (file: File) => {
  setVideoFile(file)
  setView('editor')
}
```

### Step 2: Calculate Split Points
```typescript
const calculateSplitPoints = () => {
  const points: number[] = []
  let currentTime = maxLength
  
  while (currentTime < duration) {
    points.push(currentTime)
    currentTime += maxLength
  }
  
  // Validate last segment
  if (points.length > 0) {
    const lastSegmentDuration = duration - points[points.length - 1]
    if (lastSegmentDuration < 1) {
      points.pop() // Merge with previous
    }
  }
  
  setSplitPoints(points)
}
```

### Step 3: Extract Segments
```typescript
async function extractSegment(
  videoUrl: string,
  startTime: number,
  endTime: number
): Promise<Blob> {
  // 1. Create video element
  const video = document.createElement('video')
  video.src = videoUrl
  
  // 2. Set up canvas for frame capture
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // 3. Create audio context with gain node
  const audioContext = new AudioContext()
  const source = audioContext.createMediaElementSource(video)
  const destination = audioContext.createMediaStreamDestination()
  const gainNode = audioContext.createGain()
  gainNode.gain.value = 0 // Silent
  
  source.connect(destination)
  source.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  // 4. Set up MediaRecorder
  const stream = canvas.captureStream()
  destination.stream.getAudioTracks().forEach(track => {
    stream.addTrack(track)
  })
  
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9,opus',
    videoBitsPerSecond: 5000000
  })
  
  // 5. Capture frames with requestAnimationFrame
  const captureFrame = () => {
    if (video.currentTime >= endTime) {
      video.pause()
      mediaRecorder.stop()
      return
    }
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    requestAnimationFrame(captureFrame)
  }
  
  // 6. Start recording
  video.currentTime = startTime
  video.play()
  mediaRecorder.start(100)
  captureFrame()
  
  // 7. Return blob when done
  return blob
}
```

---

## Browser APIs Used

### MediaRecorder API
Records video stream from canvas with audio.

**Codec Chain:**
1. VP9 (5 Mbps) - Best quality
2. VP8 (5 Mbps) - Fallback
3. Default - Final fallback

### Canvas API
Captures video frames using `requestAnimationFrame`.

**Benefits:**
- ~60 Hz capture rate
- Synchronized with browser rendering
- Smooth 24-30 FPS output

### Web Audio API
Processes audio without playback.

**Components:**
- `AudioContext` - Audio processing environment
- `MediaElementSource` - Audio from video
- `MediaStreamDestination` - Output for recording
- `GainNode` - Silent monitoring (gain = 0)

### File API
Handles file operations and downloads.

---

## Key Algorithms

### Smart Segment Validation

Prevents segments shorter than 1 second:

```typescript
if (points.length > 0) {
  const lastSegmentDuration = duration - points[points.length - 1]
  if (lastSegmentDuration < 1) {
    points.pop() // Merge with previous
  }
}
```

### Intelligent Realignment

Maintains max length when dragging split points:

```typescript
const realignFollowingSplitPoints = (points: number[], fromIndex: number) => {
  const newPoints = [...points]
  
  for (let i = fromIndex + 1; i < newPoints.length; i++) {
    const prevPoint = newPoints[i - 1]
    const idealPoint = prevPoint + maxLength
    
    if (newPoints[i] - prevPoint > maxLength) {
      newPoints[i] = idealPoint
    } else {
      break // Already within bounds
    }
  }
  
  // Validate last segment
  if (newPoints.length > 0) {
    const lastSegmentDuration = duration - newPoints[newPoints.length - 1]
    if (lastSegmentDuration < 1) {
      newPoints.pop()
    }
  }
  
  return newPoints
}
```

---

## Performance Optimizations

### Sequential Processing
- Processes one segment at a time
- Lower memory usage
- Better progress tracking
- Prevents browser overload

### RequestAnimationFrame
- Captures frames at display refresh rate
- More efficient than event-based capture
- Results in smooth output

### High Bitrate
- 5 Mbps for professional quality
- Balances file size and quality
- Better than default settings

---

## Privacy & Security

### No Data Collection
- No analytics
- No tracking
- No cookies (except browser functionality)
- No external requests

### Client-Side Only
- All processing in browser
- No server uploads
- No backend infrastructure
- Complete privacy

### Open Source
- Full source code available
- Verifiable privacy claims
- Community auditable
- MIT License

---

## Browser Compatibility

### Required APIs
- MediaRecorder API
- Canvas API (2D context)
- Web Audio API
- File API
- Blob API

### Supported Browsers
- Chrome 90+
- Firefox 85+
- Safari 14.1+
- Edge 90+

### Codec Support
| Browser | VP9 | VP8 |
|---------|-----|-----|
| Chrome  | ✅  | ✅  |
| Firefox | ✅  | ✅  |
| Safari  | ❌  | ✅  |
| Edge    | ✅  | ✅  |

---

## Development

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

### Type Checking
```bash
npm run type-check
```

---

## Future Enhancements

### Potential Features
1. **Format Options**: MP4, AVI, MOV support
2. **Quality Presets**: Low, Medium, High, Ultra
3. **Hardware Acceleration**: WebCodecs API
4. **Batch Processing**: Multiple videos at once
5. **Trim & Cut**: Additional editing features
6. **Filters & Effects**: Basic video effects
7. **Audio Options**: Codec and bitrate selection
8. **Keyboard Shortcuts**: Power user features

### Technical Improvements
1. **Web Workers**: Offload processing
2. **IndexedDB**: Cache processed segments
3. **Service Worker**: Offline support
4. **WebAssembly**: Faster processing
5. **Streaming**: Handle large files better

---

## Credits

- **Development**: Built with Windsurf and Claude Sonnet 4.5
- **Design**: Gemini and Nano Banana for logo/favicon
- **Framework**: React, TypeScript, Vite, Tailwind CSS
- **Icons**: Lucide React

---

## License

MIT License - See [LICENSE](../LICENSE) for details

Copyright (c) 2025 sayedmahmoud266
