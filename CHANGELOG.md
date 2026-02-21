# Changelog

All notable changes to the Story Splitter project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.3] - 2026-02-22

### ✨ Feature & Bug Fix

**Fast / Accurate Split Mode Toggle + Overlap Fix**

### Added
- **Split Mode Toggle**: New UI control in the editor lets users choose between two processing modes:
  - **⚡ Fast** — Stream copy (`-c copy`), nearly instant. Cuts snap to the nearest keyframe, which may cause a few seconds of overlap between adjacent segments.
  - **🎯 Accurate** — Re-encodes with `libx264 -preset ultrafast -crf 18`, slower but produces frame-exact cuts with no overlap and no black frames.

### Fixed
- **Segment Overlap**: The keyframe-snapping behaviour introduced in v0.2.2 (input-side `-ss`) caused adjacent segments to overlap by several seconds. Accurate mode resolves this by re-encoding from the exact requested frame.

### Technical Details
```typescript
// Fast mode — stream copy, keyframe-aligned (may overlap):
await ffmpeg.exec(['-ss', startTime, '-i', input, '-t', duration, '-c', 'copy', ...])

// Accurate mode — re-encode for frame-exact cuts (no overlap, no black frames):
await ffmpeg.exec(['-ss', startTime, '-i', input, '-t', duration,
  '-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '18', '-c:a', 'aac', ...])
```

---

## [0.2.2] - 2026-02-20

### 🔧 Bug Fix

**Fixed Black Frames at the Start of Split Segments**

### Fixed
- **Black Screen on Segment Start**: Eliminated black frames appearing at the beginning of each exported segment
- **Input-Side Seeking**: Moved the `-ss` flag before `-i` in the FFmpeg command so FFmpeg seeks to the nearest keyframe *before* the requested timestamp, ensuring the output always starts on a valid keyframe
- **Stream Copy Compatibility**: Previously, using `-ss` after `-i` (output-side seek) with `-c copy` caused FFmpeg to begin copying from a non-keyframe, which video decoders cannot render — resulting in a black screen until the next keyframe

### Technical Details
```typescript
// Before (output-side seek — causes black frames with -c copy):
await ffmpeg.exec(['-i', inputFileName, '-ss', startTime, '-t', duration, '-c', 'copy', ...])

// After (input-side seek — snaps to nearest keyframe, no black frames):
await ffmpeg.exec(['-ss', startTime, '-i', inputFileName, '-t', duration, '-c', 'copy', ...])
```

---

## [0.2.1] - 2025-10-15

### 🔧 Bug Fix

**Fixed TypeScript Build Error**

### Fixed
- **SharedArrayBuffer Type Error**: Fixed TypeScript compilation error in `videoSplitter.ts`
- **Blob Creation**: Convert FFmpeg FileData to regular Uint8Array for Blob compatibility
- **Production Builds**: Ensures clean builds without type errors

### Technical Details
```typescript
// Fixed: Type 'Uint8Array<ArrayBufferLike>' is not assignable to type 'BlobPart'
const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: `video/${fileExtension}` })
```

---

## [0.2.0] - 2025-10-15

### 📱 PWA Update: Offline Support & Installability

**NEW**: Story Splitter is now a Progressive Web App!

### ✨ Added
- **PWA Support**: Full Progressive Web App functionality
- **Offline Mode**: Works completely offline after first visit
- **Install Prompt**: Smart install banner for desktop and mobile
- **Update Notifications**: Automatic update detection with reload prompt
- **App Icons**: Proper manifest with app icons for all platforms
- **Standalone Mode**: Runs like a native app when installed
- **Service Worker**: Caches all assets for offline use
- **FFmpeg Caching**: CDN files cached for 1 year (offline FFmpeg!)

### 🚀 Features
- **Install on Desktop**: Add to desktop/dock on Windows, Mac, Linux
- **Install on Mobile**: Add to home screen on iOS and Android
- **Offline Processing**: Process videos without internet connection
- **Auto Updates**: Automatic service worker updates with user prompt
- **Fast Loading**: Instant loading after first visit
- **Background Sync**: Service worker keeps app updated

### 🔧 Technical Implementation
- **vite-plugin-pwa**: PWA plugin for Vite
- **Workbox**: Google's service worker library
- **CacheFirst Strategy**: FFmpeg CDN files cached aggressively
- **Auto Registration**: Service worker auto-registers and updates
- **Manifest**: Complete web app manifest with icons and metadata

### 📦 Dependencies
- Added `vite-plugin-pwa@^0.20.5`
- Added `workbox-window@^7.3.0`

### 🎨 UI Enhancements
- Install prompt with slide-up animation
- Update notification with slide-down animation
- Dismissible prompts with 7-day memory
- Beautiful gradient cards for prompts

---

## [0.1.0] - 2025-10-15

### 🚀 Major Update: FFmpeg.wasm Integration

**BREAKING CHANGE**: Replaced canvas-based video processing with professional FFmpeg.wasm

### ✨ Added
- **FFmpeg.wasm Integration**: Professional video processing using WebAssembly
- **Lossless Splitting**: Uses `-c copy` for stream copying without re-encoding
- **Original Format Preservation**: Maintains original video codec and quality
- **FFmpeg Loading Indicator**: Visual feedback during FFmpeg initialization
- **Better Error Handling**: Comprehensive error messages for FFmpeg operations

### 🎯 Improved
- **Video Quality**: No quality loss - uses stream copy instead of re-encoding
- **Processing Speed**: Significantly faster with `-c copy` (no transcoding)
- **Format Support**: Supports all formats FFmpeg supports (MP4, AVI, MOV, MKV, etc.)
- **Audio Quality**: Perfect audio preservation with original codec
- **File Size**: Smaller output files due to no re-encoding overhead

### 🔧 Technical Changes
- Replaced MediaRecorder API with FFmpeg.wasm
- Removed Canvas API frame capture
- Removed Web Audio API gain nodes
- Added SharedArrayBuffer support requirements
- Updated Vite config with COOP/COEP headers
- Added FFmpeg singleton pattern for efficiency

### 📦 Dependencies
- Added `@ffmpeg/ffmpeg@^0.12.10`
- Added `@ffmpeg/core@^0.12.6`
- Added `@ffmpeg/util@^0.12.1`

### ⚠️ Requirements
- Browser must support SharedArrayBuffer
- HTTPS required for production (or localhost for development)
- Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers required

---

## [0.0.1] - 2025-10-15

### 🎉 Initial Release

A free, open-source video splitter that runs entirely in your browser with zero data collection.

### ✨ Features

#### Core Functionality
- **Video Upload**: Drag-and-drop or click to upload video files
- **Automatic Splitting**: Intelligently splits videos based on maximum segment length
- **Manual Adjustment**: Drag split points to customize segment boundaries
- **Smart Validation**: Automatically merges segments shorter than 1 second
- **Intelligent Realignment**: Automatically adjusts following split points when dragging
- **High-Quality Export**: 24-30 FPS output with 5 Mbps bitrate
- **Audio Preservation**: Full audio capture with silent processing

#### User Interface
- **Prismatic Aurora Burst Gradient**: Beautiful multi-layered gradient background
- **Modern Design**: Cyan/blue gradient theme with glow effects
- **Real-Time Preview**: Video player with playback controls
- **Visual Timeline**: Interactive seek bar with split point markers
- **Segment Preview**: Grid view of all segments with durations
- **Progress Indicator**: Real-time progress bar during export
- **Responsive Design**: Works on desktop, tablet, and mobile

#### Video Processing
- **Client-Side Processing**: Everything happens in your browser
- **No Uploads**: Videos never leave your device
- **Silent Processing**: No audio playback during export
- **RequestAnimationFrame**: Smooth 24-30 FPS frame capture
- **VP9/VP8 Codecs**: High-quality video compression
- **Gain Node Audio**: Silent monitoring with full audio capture

#### Settings & Controls
- **Preset Lengths**: Quick options (15s, 30s, 60s, 90s, 120s)
- **Custom Length**: Set any duration between 1s and video length
- **Always-Visible Settings**: No hidden controls
- **Playback Controls**: Play, pause, stop, and seek
- **Video Player Sizing**: Constrained to 80% viewport for optimal viewing

#### Export & Download
- **Batch Export**: Process all segments sequentially
- **Individual Downloads**: Download segments one by one
- **Batch Download**: Download all segments with one click
- **Progress Tracking**: See exactly which segment is processing
- **WebM Format**: Universal browser support

#### Privacy & Legal
- **Privacy Policy**: Comprehensive privacy information
- **MIT License**: Free and open source
- **No Data Collection**: Zero tracking or analytics
- **No Servers**: No backend infrastructure
- **Footer Links**: Easy access to legal information

#### Branding & Community
- **GitHub Integration**: Star counter badge in header
- **Buy Me a Coffee**: Support link for the developer
- **Footer Credits**: Attribution with links
- **Professional Badges**: Social proof and support options

### 🛠️ Technical Details

#### Technologies Used
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool
- **Tailwind CSS v4**: Utility-first styling
- **Lucide React**: Beautiful icons

#### Browser APIs
- **MediaRecorder API**: Video recording
- **Canvas API**: Frame capture with requestAnimationFrame
- **Web Audio API**: Audio processing with gain nodes
- **File API**: File handling and downloads

#### Performance
- **Sequential Processing**: One segment at a time for progress tracking
- **Memory Efficient**: Processes segments individually
- **High Bitrate**: 5 Mbps for professional quality
- **Optimized Codecs**: VP9 → VP8 → Default fallback chain

### 📝 Documentation

- Comprehensive README with setup instructions
- Detailed technical documentation in `/docs` folder
- Privacy policy and license information
- Code comments and type definitions

### 🎨 Design Credits

- **Logo & Favicon**: Generated using Gemini & Nano Banana
- **UI Design**: Modern gradient theme with glassmorphism
- **Color Palette**: Cyan/blue with pink/purple accents

### ⚡ Development

- **Vibe Coded**: Built using Windsurf and Claude Sonnet 4.5
- **Development Time**: Less than 2 hours
- **Code Quality**: TypeScript with strict mode
- **Best Practices**: Modern React patterns and hooks

### 🔒 Privacy Guarantee

- ✅ No data collection
- ✅ No analytics or tracking
- ✅ No uploads to servers
- ✅ No cookies (except browser functionality)
- ✅ Complete client-side processing
- ✅ Open source for verification

### 📦 What's Included

- Full source code
- Documentation
- MIT License
- Privacy Policy
- Example workflows
- TypeScript definitions

---

**Full Changelog**: https://github.com/sayedmahmoud266/story-splitter/commits/main
