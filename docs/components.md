# Components Documentation

## App.tsx

Main application component that manages the overall application state and view routing.

### State
- `view`: Current view ('upload' | 'editor' | 'export')
- `videoFile`: Selected video file
- `segments`: Processed video segments with blobs

### Props
None (root component)

### Key Functions
- `handleVideoSelect`: Transitions to editor view with selected video
- `handleExport`: Transitions to export view with processed segments
- `handleReset`: Returns to upload view and clears state

---

## VideoUpload.tsx

Handles video file selection through drag-and-drop or file browser.

### Props
- `onVideoSelect: (file: File) => void`: Callback when video is selected

### State
- `isDragging`: Tracks drag-over state for visual feedback

### Features
- Drag-and-drop zone with visual feedback
- Click to open file browser
- Video format validation
- Animated icons during interaction

---

## VideoEditor.tsx

Main video editing interface with custom controls and split point management.

### Props
- `videoFile: File`: Video file to edit
- `onExport: (segments: VideoSegment[]) => void`: Callback for export
- `onCancel: () => void`: Callback to cancel and return

### State
- `isPlaying`: Video playback state
- `duration`: Total video duration
- `currentTime`: Current playback position
- `maxLength`: Maximum segment length setting
- `customLength`: Custom length value
- `showSettings`: Settings panel visibility
- `splitPoints`: Array of split point timestamps
- `draggingIndex`: Index of currently dragged marker
- `videoUrl`: Object URL for video file
- `isExporting`: Export processing state

### Key Functions
- `calculateSplitPoints()`: Auto-generates split points based on max length
- `togglePlay()`: Plays/pauses video
- `handleStop()`: Stops playback and resets to start
- `handleSeek()`: Seeks to clicked position
- `handleMarkerDrag()`: Updates split point position with constraints
- `getSegments()`: Calculates segment data from split points
- `handleExport()`: Processes video and exports segments

### Features
- Custom video player controls
- Interactive seek bar
- Draggable split markers with constraints
- Real-time segment duration display
- Settings panel for max length configuration
- Segments preview grid
- Visual feedback during marker dragging

---

## ExportView.tsx

Displays processed segments and provides download functionality.

### Props
- `segments: VideoSegment[]`: Array of processed segments with blobs
- `videoFile: File`: Original video file (for naming)
- `onReset: () => void`: Callback to start over

### State
None (stateless component)

### Key Functions
- `handleDownload()`: Downloads individual segment
- `handleDownloadAll()`: Downloads all segments with delay

### Features
- List of all segments with metadata
- Individual download buttons
- Batch download all functionality
- Proper file naming convention
- Duration and time range display
- Start over button

---

## Common Types

### VideoSegment
```typescript
interface VideoSegment {
  start: number      // Start time in seconds
  end: number        // End time in seconds
  duration: number   // Segment duration in seconds
  blob?: Blob        // Video blob (after processing)
}
```

### AppView
```typescript
type AppView = 'upload' | 'editor' | 'export'
```

---

## Utility Functions

### formatTime(seconds: number): string
Formats seconds into MM:SS format for display.

**Example:**
```typescript
formatTime(90) // "1:30"
formatTime(5)  // "0:05"
```
