# Video Processing Documentation

## Overview

The video splitting functionality is implemented entirely client-side using browser APIs. No video data is uploaded to any server.

## Implementation: videoSplitter.ts

### Main Function: splitVideo()

```typescript
async function splitVideo(
  videoFile: File,
  segments: VideoSegment[]
): Promise<VideoSegment[]>
```

**Purpose**: Processes a video file and splits it into multiple segments.

**Parameters:**
- `videoFile`: The original video file
- `segments`: Array of segment definitions (start/end times)

**Returns**: Array of segments with blob data

**Process:**
1. Creates object URL from video file
2. Processes each segment in parallel using Promise.all
3. Extracts each segment using extractSegment()
4. Returns segments with blob data
5. Cleans up object URL

---

### Helper Function: extractSegment()

```typescript
async function extractSegment(
  videoUrl: string,
  startTime: number,
  endTime: number
): Promise<Blob>
```

**Purpose**: Extracts a single segment from a video.

**Process:**

1. **Video Setup**
   - Creates hidden video element
   - Sets video source to object URL
   - **Mutes video** to prevent audio playback during processing
   - Sets playsInline for better mobile support
   - Waits for metadata to load

2. **Canvas Setup**
   - Creates canvas matching video dimensions
   - Gets 2D rendering context
   - Sets up dynamic capture stream (driven by requestAnimationFrame)

3. **Audio Setup**
   - Creates AudioContext
   - Creates media element source from video
   - Connects to destination stream (but NOT to output)
   - Adds audio tracks to canvas stream
   - **Audio captured but not played** during processing

4. **Recording Setup**
   - Creates MediaRecorder with optimized codec chain:
     - Primary: VP9 with 5 Mbps bitrate
     - Fallback: VP8 with 5 Mbps bitrate
     - Final fallback: Default codec with 5 Mbps bitrate
   - Sets up data collection every 100ms for smooth recording
   - Sets up animation frame tracking for cleanup

5. **Recording Process**
   - Seeks video to start time
   - Starts recording when seek completes
   - Sets playback rate to 1.0 (normal speed)
   - Plays video (muted)
   - **Uses requestAnimationFrame loop** for consistent frame capture
   - Draws each frame to canvas at ~60 Hz
   - Monitors current time
   - Stops recording when end time reached
   - Cancels animation frame on stop

6. **Finalization**
   - Combines chunks into single blob
   - Closes audio context
   - Returns video blob

---

## Browser APIs Used

### MediaRecorder API
Records the video stream from canvas.

**Codec Preference Chain:**
1. Primary: `video/webm;codecs=vp9,opus` (5 Mbps)
2. Fallback: `video/webm;codecs=vp8,opus` (5 Mbps)
3. Final fallback: Browser default (5 Mbps)

**Why This Chain?**
- VP9: Best compression and quality (modern browsers)
- VP8: Good quality with wider support
- High bitrate (5 Mbps): Professional quality output
- WebM: Wide browser support, good compression

### Canvas API
Captures video frames for recording.

**Configuration:**
- Frame capture: Dynamic (driven by requestAnimationFrame)
- Update rate: ~60 Hz (display refresh rate)
- Dimensions: Match original video
- Context: 2D

**Why RequestAnimationFrame?**
- Synchronized with browser rendering
- Consistent frame timing
- Much higher capture rate than timeupdate events
- Results in smooth 24-30 FPS output

### Web Audio API
Handles audio track processing.

**Components:**
- AudioContext: Audio processing environment
- MediaElementSource: Audio from video element (muted)
- MediaStreamDestination: Output stream for recording

**Silent Processing:**
- Video element is muted during processing
- Audio NOT connected to output destination
- Audio still captured in recording
- No sound plays during export

### File API
Manages file operations and blob creation.

**Operations:**
- Create object URLs
- Generate blobs from chunks
- Trigger downloads

---

## Limitations

### Browser Support
Not all browsers support all required APIs:
- MediaRecorder: Chrome, Firefox, Edge, Safari 14.1+
- Canvas capture: All modern browsers
- Web Audio: All modern browsers

### Performance
- Large videos require more memory
- Processing time scales with video size
- Multiple segments processed in parallel
- Recommended maximum: 500MB per video

### Format Constraints
- Output format: WebM (video/webm)
- Original format preserved in filename
- Actual content is WebM regardless of extension

### Quality
- Output frame rate: 24-30 FPS (optimized)
- Bitrate: 5 Mbps (high quality)
- Codec: VP9 or VP8 (best available)
- Audio quality: Opus codec (high quality)

---

## Error Handling

### Common Errors

1. **Canvas Context Error**
   - Cause: Failed to get 2D context
   - Solution: Browser compatibility check

2. **Video Loading Error**
   - Cause: Corrupted or unsupported video
   - Solution: Validate file before processing

3. **MediaRecorder Error**
   - Cause: Codec not supported
   - Solution: Fallback to default codec

4. **Memory Error**
   - Cause: Video too large
   - Solution: Reduce video size or split fewer segments

---

## Future Improvements

### Potential Enhancements
1. **Format Options**: Support multiple output formats (MP4, etc.)
2. **Quality Settings**: User-configurable bitrate and resolution
3. **Progress Tracking**: Real-time processing progress with frame count
4. **Batch Processing**: Queue multiple videos
5. **Hardware Acceleration**: WebCodecs API for GPU encoding
5. **Web Workers**: Offload processing to background thread
6. **Streaming**: Process large videos in chunks
7. **Codec Selection**: User-selectable output codec

### Performance Optimizations
1. Sequential processing for memory efficiency
2. Adjustable frame rate
3. Resolution scaling options
4. Compression settings
