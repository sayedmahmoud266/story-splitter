# Story Splitter - Project Overview

## Purpose
Story Splitter is a client-side video splitting application that allows users to divide videos into multiple segments based on configurable maximum lengths. All processing happens in the browser without uploading files to any server.

## Architecture

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

### Application Structure

```
src/
├── App.tsx                    # Main application component with view routing
├── main.tsx                   # Application entry point
├── index.css                  # Global styles with Tailwind imports
├── components/
│   ├── VideoUpload.tsx        # File upload with drag-and-drop
│   ├── VideoEditor.tsx        # Video player with split controls
│   └── ExportView.tsx         # Download interface for segments
└── utils/
    └── videoSplitter.ts       # Client-side video processing logic
```

## Key Features

### 1. Video Upload
- Drag-and-drop interface
- Click to browse file selection
- Accepts all video formats
- Visual feedback during drag operations

### 2. Video Editor
- Custom video player without native controls
- Playback controls (play, pause, stop)
- Seek bar with visual progress
- Configurable maximum segment length (15s, 30s, 59s, custom)
- Automatic split point calculation
- Draggable split markers with constraints
- Real-time segment duration display
- Segments preview panel

### 3. Export & Download
- Client-side video processing using MediaRecorder API
- Individual segment downloads
- Batch download all segments
- Proper file naming: `{original_name}__part_{number}.{extension}`
- Progress indication during processing

## Technical Implementation

### Video Processing
The application uses the following browser APIs:
- **MediaRecorder API**: Records video segments
- **Canvas API**: Captures video frames
- **Web Audio API**: Handles audio tracks
- **File API**: Manages file operations

### Split Point Management
- Split points are calculated based on maximum segment length
- Users can manually adjust split points by dragging markers
- Constraints ensure segments don't exceed maximum length
- Visual feedback shows resulting segment durations

### State Management
- React hooks for local state management
- Three main views: upload, editor, export
- Video file and segments passed between views

## Browser Requirements
- Modern browser with ES2020 support
- MediaRecorder API support
- Canvas API support
- File API support
- Web Audio API support

## Performance Considerations
- Video processing happens asynchronously
- Large videos may take time to process
- Memory usage scales with video size
- Recommended for videos under 500MB
