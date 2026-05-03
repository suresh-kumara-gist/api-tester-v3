# API Tester v3 🚀

A production-ready, Postman-like API testing desktop application built with React, Electron, and Vite. Test your REST APIs with a beautiful, lightweight native desktop app.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-macOS%20|%20Windows%20|%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Electron](https://img.shields.io/badge/Electron-27.1.3-47848f)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Usage Guide](#usage-guide)
- [Package Details](#package-details)
- [GitHub Actions CI/CD](#github-actions-cicd)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Features
- **Request Builder**: Supports GET, POST, PUT, DELETE methods
- **Multi-Tab System**: Work on multiple requests simultaneously
- **Headers Editor**: JSON format headers configuration
- **Body Editor**: Raw JSON request body with syntax highlighting
- **Response Viewer**: Pretty-printed JSON responses
- **Request History**: Stores last 20 requests with metadata
- **Collections**: Save and load named requests
- **Authentication**: Bearer token support with automatic header injection

### UI Features
- Clean, modern dark mode interface
- Responsive layout with resizable panels
- Response time tracking
- Status code color coding
- Copy response to clipboard
- Persistent state across sessions

## 🛠 Tech Stack

### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| **React** | 18.2.0 | UI framework for building component-based interfaces |
| **React DOM** | 18.2.0 | DOM rendering for React components |
| **Zustand** | 4.4.7 | Lightweight state management with persist middleware |

### Desktop Framework
| Package | Version | Purpose |
|---------|---------|---------|
| **Electron** | 27.1.3 | Desktop application framework |
| **Electron Builder** | 24.9.1 | Build and package Electron apps |

### Build Tools
| Package | Version | Purpose |
|---------|---------|---------|
| **Vite** | 5.0.8 | Next-generation frontend build tool |
| **@vitejs/plugin-react** | 4.2.1 | React support for Vite |

### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| **@types/react** | 18.2.43 | TypeScript definitions for React |
| **@types/react-dom** | 18.2.17 | TypeScript definitions for React DOM |

## 🏗 Architecture

### Application Flow

```
    User Interface (React)
    ↓
    Zustand Store (State Management)
    ↓
    API Module (Fetch Wrapper)
    ↓
    Electron Main (Desktop Integration)
```

### State Management (Zustand)
The app uses Zustand with persistence for:
- **Tabs State**: Multiple request tabs with independent configurations
- **History**: Last 20 requests with full metadata
- **Collections**: Saved requests with custom names
- **Responses**: Per-tab response caching

### Electron Integration
- **Main Process**: Handles window creation and app lifecycle
- **Preload Script**: Exposes limited APIs to renderer (security)
- **Context Isolation**: Separates main and renderer processes

## 📁 Project Structure

```
api-tester-v3/
├── electron/ # Electron main process files
│ ├── main.js # Main electron process, window creation
│ └── preload.js # Secure preload script for IPC
│
├── src/ # React application source
│ ├── components/ # Reusable UI components
│ │ ├── Tabs.jsx # Multi-tab management
│ │ ├── Tabs.css
│ │ ├── RequestBuilder.jsx # HTTP request construction UI
│ │ ├── RequestBuilder.css
│ │ ├── ResponseViewer.jsx # API response display
│ │ ├── ResponseViewer.css
│ │ ├── History.jsx # Request history panel
│ │ ├── History.css
│ │ ├── Collections.jsx # Saved requests panel
│ │ └── Collections.css
│ │
│ ├── utils/ # Utility functions
│ │ └── storage.js # localStorage helpers
│ │
│ ├── api.js # Fetch wrapper with timing
│ ├── store.js # Zustand state management
│ ├── App.jsx # Root React component
│ ├── App.css # Global styles
│ └── main.jsx # React entry point
│
├── public/ # Static assets
│ └── icon.png # Application icon (512x512)
│
├── .github/workflows/ # CI/CD pipelines
│ └── build.yml # GitHub Actions workflow
│
├── index.html # Main HTML entry
├── package.json # Dependencies and scripts
├── vite.config.js # Vite build configuration
├── electron-builder.json # Electron packaging config
└── README.md # This file

```


## 💻 Installation

### Prerequisites
- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** (optional, for cloning)

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/api-tester-v3.git
cd api-tester-v3

# Install dependencies
npm install

# Generate package-lock.json (if not present)
npm install --package-lock-only
```

## 🚀 Development

### Development Modes

### 1. Web Development Mode (Browser)
```
npm run dev
```

Starts Vite dev server on http://localhost:3000
Hot module replacement enabled
Best for UI development

### 2. Electron Development Mode

```
# Terminal 1: Start Vite server
npm run dev

# Terminal 2: Launch Electron
npm run electron:dev
```

Opens Electron window with dev tools

Full desktop experience with hot reload

## Available Scripts

Script	Description
npm run dev	Start Vite development server
npm run build	Build React app to /dist folder
npm run preview	Preview production build locally
npm run electron:dev	Run Electron in development mode
npm run electron:build	Build and package Electron app
npm run dist	Build for current platform
npm run dist:mac	Build macOS DMG


## 🏭 Building for Production

### Platform-Specific Builds

macOS (Intel)

```
npm run dist:mac -- --x64 --mac
```

Output: release/API Tester v3-1.0.0-x64.dmg


macOS (Apple Silicon)

```
npm run dist:mac -- --arm64 --mac
```

Output: release/API Tester v3-1.0.0-arm64.dmg

macOS (Universal)

```
npm run dist:mac -- --universal --mac
```
Output: release/API Tester v3-1.0.0-universal.dmg



Windows


```
npm run dist -- --win --x64
```
Output: release/API Tester v3 Setup 1.0.0.exe



Linux

```
npm run dist -- --linux --x64
```
Output: release/API Tester v3-1.0.0.AppImage


## Build Configuration

The electron-builder.json file controls packaging:

```
{
  "appId": "com.apitester.v3",
  "productName": "API Tester v3",
  "mac": {
    "target": "dmg",
    "category": "public.app-category.developer-tools"
  },
  "win": {
    "target": "nsis",
    "icon": "public/icon.png"
  },
  "linux": {
    "target": "AppImage",
    "icon": "public/icon.png"
  }
}
```

## 📖 Usage Guide

# Making Your First Request

Launch the app (double-click after approving security prompt)
Configure the request:

Select HTTP method (GET, POST, PUT, DELETE)
Enter URL (e.g., https://jsonplaceholder.typicode.com/posts)
Add headers in JSON format: {"Content-Type": "application/json"}
Add body for POST/PUT requests
Enter Bearer token if needed
Send request - Click "Send" button
View response:

Status code (color-coded)
Response time in milliseconds
Formatted JSON response body

# Managing Tabs

New Tab: Click "+ New Tab" button
Rename Tab: Click on tab name and edit
Switch Tabs: Click on any tab
Close Tab: Click '×' on tab (minimum 1 tab remains)

## Using History

History automatically saves last 20 requests
Each history item shows: Method, URL, Status, Time
Click any history item to load into current tab

# Working with Collections

Save current request:

Click "Save to Collection" button
Enter a name for the collection
Request is saved with all parameters
Load saved request:

Go to Collections tab in sidebar
Click "Load Request" on any collection
Delete collection:

Click "Delete" button next to collection


# Authentication (Bearer Token)

Enter token in "Auth (Bearer Token)" field
Token automatically added to Authorization header
Header format: Authorization: Bearer <your-token>

# Response Features

Pretty JSON: Automatic formatting of JSON responses
Raw fallback: Non-JSON responses shown as text
Copy Response: Copy response body to clipboard
Headers view: Response headers (coming in v2)

# 📦 Package Details

## Core Dependencies Explained

### React 18.2.0

Concurrent rendering features
Automatic batching for better performance
Transition API for non-urgent updates

### Zustand 4.4.7

Minimal state management
No boilerplate like Redux
Built-in persist middleware
TypeScript-ready

### Electron 27.1.3

Chromium 118.0.5993.159
Node.js 18.16.1
Full desktop API access

### Vite 5.0.8

ESM-based build system
Hot Module Replacement (HMR)
Optimized dependency pre-bundling
Fast cold starts

# Key Features Implementation

## HTTP Request Function (src/api.js)

```
// Measures response time automatically
// Handles JSON parsing
// Returns formatted response object
```

State Persistence

Uses localStorage via Zustand persist middleware
Saves: history, collections, tabs
Restores state on app restart


Security (Electron)

Context isolation enabled
Node integration disabled
Preload script exposes only needed APIs

# 🔄 GitHub Actions CI/CD

## Workflow File: .github/workflows/build.yml

```
name: Build Electron App for macOS

on:
  workflow_dispatch:  # Manual trigger
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  build-mac:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run dist:mac -- --publish=never
      - uses: actions/upload-artifact@v4
        with:
          name: api-tester-macos
          path: release/*.dmg
```

How to Use GitHub Actions

Push code to GitHub repository
Go to Actions tab in your repository
Select workflow "Build Electron App for macOS"
Click "Run workflow" button
Wait for build to complete (2-3 minutes)
Download DMG from artifacts section


Environment Variables (Optional)

Variable	Purpose
GH_TOKEN	GitHub token for automatic releases
CSC_LINK	Certificate for code signing
CSC_KEY_PASSWORD	Certificate password

# 🐛 Troubleshooting

## Common Issues and Solutions

1. "App can't be opened because it's from unidentified developer"

Solution:

```
# Right-click app and select "Open"
# OR remove quarantine flag
xattr -d com.apple.quarantine /Applications/API\ Tester\ v3.app

```

2. Blank screen when launching Electron

Solution:

```
# Clear Vite cache
rm -rf node_modules/.vite
# Rebuild
npm run build
npm run electron:dev
```

3. Dependencies lock file not found in CI

Solution:

```
# Generate and commit package-lock.json
npm install --package-lock-only
git add package-lock.json
git commit -m "Add package-lock.json"
```

4. Build fails with "GitHub Personal Access Token is not set"

Solution:
Add --publish=never flag to build command:

```
"dist:mac": "electron-builder --mac --publish=never"
```

5. App built for ARM64 but running on Intel

Solution:
Build specifically for x64:

```
npm run dist:mac -- --x64
```

# Development Tips

## Clear App Data

```
// In DevTools Console
localStorage.clear();
location.reload();
```

Debug Electron Main Process


```
// In electron/main.js
mainWindow.webContents.openDevTools();
```

Monitor State Changes

```
// In React DevTools
// Check Zustand tab for state changes
```

## 🤝 Contributing

# Development Workflow

Fork the repository
Create feature branch: git checkout -b feature/amazing-feature
Commit changes: git commit -m 'Add amazing feature'
Push to branch: git push origin feature/amazing-feature
Open Pull Request

# Coding Standards

Use functional React components with hooks
Follow ESLint rules (if configured)
Comment complex logic
Test on both web and Electron modes

## Adding Features

### Adding New HTTP Method

Update method select in RequestBuilder.jsx
No changes needed in api.js (fetch supports all methods)

### Adding New Auth Type

Add field in RequestBuilder.jsx
Modify headers in api.js
Update store schema

# 📄 License

This project is licensed under the MIT License - see below:


```
MIT License

Copyright (c) 2024 API Tester v3

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions...

Full license text: https://opensource.org/licenses/MIT

```

# 🙏 Acknowledgments

Postman - Inspiration for UI/UX design
React - Amazing UI library
Electron - Desktop app framework
Vite - Blazing fast build tool
Zustand - Simple state management

## 📞 Support

Issues: GitHub Issues
Discussions: GitHub Discussions

## 🗺 Roadmap

### Version 1.1 (Planned)

Environment variables
Request/response export/import
GraphQL support
WebSocket testing
Request chaining


### Version 2.0 (Future)

Automated testing
Team collaboration
Cloud sync
Plugin system
OpenAPI/Swagger import

# ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

### Built with ❤️ using React, Electron, and Vite

