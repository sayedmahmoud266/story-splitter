<div align="center">

![Story Splitter Logo](public/logo.png)

# Story Splitter

**Split your videos into perfect segments - Free, open source, and privacy-focused**

[![GitHub stars](https://img.shields.io/github/stars/sayedmahmoud266/story-splitter?style=social)](https://github.com/sayedmahmoud266/story-splitter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/sayedmahmoud266)

A powerful **Progressive Web App** for video splitting powered by **FFmpeg.wasm**. Professional-grade video processing with **zero quality loss** that works **100% offline**. Install as a native app on any device. No uploads, no tracking, no servers - just pure client-side processing.

[Live Demo](https://story-splitter.netlify.app) • [Report Bug](https://github.com/sayedmahmoud266/story-splitter/issues) • [Request Feature](https://github.com/sayedmahmoud266/story-splitter/issues)

</div>

---

## ✨ Features

### 🎬 Professional Video Processing
- **FFmpeg.wasm Powered**: Industry-standard FFmpeg running in your browser via WebAssembly
- **Zero Quality Loss**: Uses stream copy (`-c copy`) - no re-encoding, no quality degradation
- **Original Format Preservation**: Keeps your video's original codec, bitrate, and quality
- **Universal Format Support**: Works with MP4, AVI, MOV, MKV, WebM, and all formats FFmpeg supports
- **Perfect Audio**: Maintains original audio codec and quality

### 🎯 Smart Splitting
- **Drag & Drop Upload**: Easy video file upload with visual feedback
- **Intelligent Segmentation**: Automatic split point calculation based on max length
- **Manual Adjustment**: Drag split markers to fine-tune segment boundaries
- **Smart Validation**: Automatically merges segments shorter than 1 second
- **Real-time Preview**: See segment durations as you adjust split points

### 🚀 User Experience
- **Custom Video Player**: Built-in player with full playback controls
- **Progress Tracking**: Real-time progress indicator during processing
- **Batch Download**: Download all segments at once or individually
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Beautiful gradient design with glassmorphism effects

### 🔒 Privacy First
- **100% Client-Side**: All processing happens in your browser
- **No Uploads**: Your videos never leave your device
- **No Tracking**: Zero data collection or analytics
- **Open Source**: Full source code available for verification

### 📱 Progressive Web App
- **Install Anywhere**: Add to desktop (Windows, Mac, Linux) or home screen (iOS, Android)
- **100% Offline**: Works completely offline after first visit
- **Native Experience**: Runs like a native app when installed
- **Auto Updates**: Automatic updates with user notification
- **Fast Loading**: Instant loading with service worker caching
- **FFmpeg Offline**: Even FFmpeg.wasm works offline (cached for 1 year)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

2. **Adjust Settings**: Choose maximum segment length (15s, 30s, 59s, or custom)
3. **Fine-tune Splits**: Drag red markers on the seek bar to adjust split points
4. **Export**: Click "Export & Download" to process the video
5. **Download**: Download individual segments or all at once

## Tech Stack

### Core Technologies
- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Beautiful icon library

### Video Processing
- **FFmpeg.wasm** - Professional video processing via WebAssembly
- **@ffmpeg/core** - FFmpeg WebAssembly core
- **@ffmpeg/util** - FFmpeg utility functions

- **File API** - File handling and blob creation
- **SharedArrayBuffer** - Required for FFmpeg.wasm
- **WebAssembly** - High-performance video processing
- **Canvas API** - Frame capture

## Browser Support

### Requirements
- **SharedArrayBuffer** support (required for FFmpeg.wasm)
- **WebAssembly** support
- **Modern browser** (Chrome 90+, Firefox 85+, Safari 15.2+, Edge 90+)
- **HTTPS** (or localhost for development)

### Supported Browsers
- Chrome/Edge 90+
- Firefox 85+
- Safari 15.2+ (with proper headers)
- Older browsers without SharedArrayBuffer support

**Note**: SharedArrayBuffer requires Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers, which are automatically configured in development.

## Privacy & Security

- **No Data Collection**: We don't collect, store, or transmit any of your data
- **Client-Side Processing**: All video processing happens in your browser
- **Open Source**: Full source code available for review

## 🎨 Design & Development

### Visual Assets
- **Logo & Favicon**: Generated using [Gemini](https://gemini.google.com/) and [Nano Banana](https://nanobanana.ai/)
- **UI Design**: Prismatic Aurora Burst gradient with modern glassmorphism

### Development
- **Vibe Coded**: Built using [Windsurf](https://codeium.com/windsurf) and [Claude Sonnet 4.5](https://www.anthropic.com/claude)
- **Development Time**: Less than 2 hours ⚡
- **Code Quality**: TypeScript with strict mode and modern React patterns

## 💖 Support

If you find this project useful, consider:
- ⭐ Starring the repository on [GitHub](https://github.com/sayedmahmoud266/story-splitter)
- ☕ [Buying me a coffee](https://www.buymeacoffee.com/sayedmahmoud266)
- 🐛 [Reporting bugs](https://github.com/sayedmahmoud266/story-splitter/issues)
- 💡 [Suggesting features](https://github.com/sayedmahmoud266/story-splitter/issues)

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

Copyright (c) 2025 [sayedmahmoud266](https://sayedmahmoud266.website)

---

<div align="center">

**Made with ❤️ by [sayedmahmoud266](https://sayedmahmoud266.website)**

*No data collection • No uploads • No tracking • 100% client-side*

</div>
