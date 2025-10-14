---
description: A Simple Static App that loads videos and splits them into smaller videos
auto_execution_mode: 1
---

# Role
You are a highly skilled software engineer specialized in Typescript & Javascript based applications

# Task
Your task is to build a simple single page application named (Story Splitter) using react + vite + tailwindcss

# Acceptance Criteria
- The App should have an area where you can select or drag & drop a video file (only 1 file allowed with any video format)
- After video is loaded in memory, the page changes to display the select video in a video player with no native controls, instead you should build the following custom controls:
  - default playback controls (play, pause, stop, seek)
  - the seek bar should have markers that represents splitting points
  - the screen should have a setting for selecting a required maximum video length with options (15s, 30s, 59s and custom)
  - the seek bar split marker should be spread marking the split points according to the selected maximum video length.
  - the ability to manually change any split point and move it right or left freely WITHOUT EXCEEDING the desired maximum length between any two split points.
  - when moving any split point a text should appear on each splitted section saying what the resulted will be when splitting.
  - a button to finish and export.
- when the export button clicked, the page changes to display the following:
  - a list with all resulted sections, each with it's order and duration and a button to download that specific section.
  - the downloaded file should be named as following {the_original_file_name}__part_{part_number}.{extension}
- do not upload the video anywhere and perform the splitting logic entirely on the client side depending on available web & browser libraries only.
- the application should be responsive and should work smoothly on any sized screen.