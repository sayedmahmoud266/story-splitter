# Changelog

All notable changes to the Story Splitter project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
