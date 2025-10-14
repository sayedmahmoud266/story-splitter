# Story Splitter - User Guide

## Getting Started

### Running the Application

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to the URL shown in terminal (typically http://localhost:5173)

---

## Using Story Splitter

### Step 1: Upload Video

1. You'll see a drag-and-drop zone on the home screen
2. Either:
   - **Drag & Drop**: Drag a video file from your computer and drop it in the zone
   - **Click to Browse**: Click anywhere in the zone to open file browser

**Supported Formats**: All video formats supported by your browser (MP4, WebM, MOV, AVI, etc.)

---

### Step 2: Configure Split Settings

Once your video loads, you'll see the video editor interface.

#### Maximum Segment Length

1. Click the **Settings** button (gear icon)
2. Choose from preset options:
   - **15s**: Split video into 15-second segments
   - **30s**: Split video into 30-second segments (default)
   - **59s**: Split video into 59-second segments
   - **Custom**: Enter your own maximum length

3. For custom length:
   - Select "Custom" option
   - Enter desired seconds in the input field
   - Split points will update automatically

---

### Step 3: Adjust Split Points

#### Automatic Split Points
- Red vertical markers appear on the seek bar
- These mark where the video will be split
- Automatically calculated based on maximum length

#### Manual Adjustment
1. **Hover** over any red marker to see its timestamp
2. **Click and drag** the marker left or right
3. **Constraints**:
   - Cannot exceed maximum length between any two points
   - Cannot overlap with adjacent markers
   - Minimum 0.1 second spacing

#### Visual Feedback
- **Duration Labels**: Each segment shows its duration on the seek bar
- **Segments Preview**: Grid below shows all segments with durations
- **Current Time**: Purple indicator shows playback position

---

### Step 4: Preview Playback

Use the playback controls to review your video:

- **Play/Pause**: Toggle video playback
- **Stop**: Stop and return to beginning
- **Seek**: Click anywhere on the seek bar to jump to that position

---

### Step 5: Export Segments

1. Click **Export & Download** button
2. Wait for processing (progress shown on button)
3. Processing time depends on:
   - Video length
   - Number of segments
   - Computer performance

---

### Step 6: Download Segments

After export completes, you'll see the download interface:

#### Individual Downloads
- Each segment listed with:
  - Part number
  - Duration
  - Time range
- Click **Download** button for specific segment

#### Batch Download
- Click **Download All Segments** at the top
- All segments download sequentially
- Small delay between downloads (browser limitation)

#### File Naming
Downloaded files follow this format:
```
{original_filename}__part_{number}.{extension}
```

**Example:**
- Original: `my-video.mp4`
- Segments: `my-video__part_1.mp4`, `my-video__part_2.mp4`, etc.

---

### Step 7: Start Over

Click **Start Over** to return to upload screen and process another video.

---

## Tips & Best Practices

### Video Selection
- **Smaller videos process faster** (under 100MB recommended)
- **Higher quality = longer processing** time
- **Test with short videos** first to verify settings

### Split Point Adjustment
- **Use playback** to find exact moments for splits
- **Pause at key frames** before adjusting markers
- **Check segment durations** in preview grid

### Performance
- **Close other tabs** for better performance
- **Allow browser permissions** if prompted
- **Wait for processing** to complete (don't close tab)

### Downloads
- **Check download folder** for saved segments
- **Browser may ask permission** for multiple downloads
- **Sequential downloads** prevent browser blocking

---

## Troubleshooting

### Video Won't Upload
- **Check file format**: Ensure it's a video file
- **Check file size**: Very large files may cause issues
- **Try different browser**: Some formats have limited support

### Processing Fails
- **Reduce video size**: Try a smaller or shorter video
- **Check browser support**: Use Chrome, Firefox, or Edge
- **Clear browser cache**: May resolve codec issues

### Downloads Don't Start
- **Check browser settings**: Allow downloads from site
- **Disable popup blocker**: May block download triggers
- **Try individual downloads**: If batch fails

### Poor Performance
- **Close other applications**: Free up system resources
- **Use fewer segments**: Reduce split points
- **Update browser**: Ensure latest version

---

## Keyboard Shortcuts

Currently, the application uses mouse/touch controls only. Future versions may include:
- Space: Play/Pause
- Arrow keys: Seek forward/backward
- Enter: Export
- Esc: Cancel/Go back

---

## Browser Compatibility

### Fully Supported
- Chrome 80+
- Firefox 75+
- Edge 80+
- Safari 14.1+

### Partially Supported
- Older browsers may have limited codec support
- Some features may not work on mobile browsers

### Not Supported
- Internet Explorer (all versions)
- Very old browser versions

---

## Privacy & Security

### Your Data is Safe
- **No uploads**: All processing happens in your browser
- **No tracking**: No analytics or data collection
- **No storage**: Videos not saved on any server
- **Local only**: Files never leave your computer

### Permissions
- **File access**: Only for files you explicitly select
- **Download**: To save processed segments
- **No network**: No external requests made
