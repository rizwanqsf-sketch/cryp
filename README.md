# Antigravity 3D Model Viewer

A minimalist, tech-forward 3D model viewer web application built with React, Three.js, and React Three Fiber. Designed specifically for integration with Google's Antigravity platform.

## Overview

This application provides a production-ready 3D visualization tool with a focus on clarity, performance, and agent-friendly architecture. The viewer follows a minimalist design philosophy with a charcoal dark theme and electric blue accents, creating a professional interface suitable for technical applications.

## Features

**3D Visualization**: Interactive 3D model rendering with smooth camera controls and real-time performance monitoring.

**Real-time Statistics**: Display polygon count, vertex count, and frames per second (FPS) to monitor rendering performance.

**Interactive Controls**: Mouse-based interaction with smooth physics-based animations:
- Left mouse drag to rotate
- Middle mouse drag to pan
- Scroll wheel to zoom

**Minimalist Design**: Tech-forward aesthetic with geometric precision, monospace typography for technical values, and purposeful use of color.

**Responsive Layout**: Asymmetric split-screen layout with the 3D viewport on the left (70%) and control panel on the right (30%).

**Model Loading**: Support for GLTF and GLB 3D model formats with automatic centering and scaling.

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **3D Engine**: Three.js with React Three Fiber
- **Styling**: TailwindCSS 4 with custom design tokens
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Hooks
- **Build Tool**: Vite

## Project Structure

```
antigravity-3d-viewer/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ThreeViewer.tsx       # Main 3D viewer component
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Home page with viewer integration
│   │   │   └── ...
│   │   ├── App.tsx                   # Application root
│   │   ├── main.tsx                  # React entry point
│   │   └── index.css                 # Global styles and design tokens
│   ├── index.html
│   └── public/
├── .agents/
│   └── skills/
│       └── 3d-viewer-skill/
│           └── SKILL.md              # Antigravity skill documentation
├── package.json
└── README.md
```

## Design System

### Color Palette

The application uses a carefully crafted minimalist color scheme:

| Color | Value | Usage |
|-------|-------|-------|
| Background | #1a1a1a | Main background, viewport |
| Foreground | #ffffff | Text, primary content |
| Primary Accent | #0066ff | Buttons, interactive elements |
| Secondary | #404040 | Borders, dividers |
| Muted | #595959 | Secondary text, disabled state |

### Typography

- **Display/Headers**: Roboto, 12px, weight 600, all caps
- **Body Text**: Roboto, 14px, weight 400
- **Technical Values**: IBM Plex Mono, 14px, weight 400
- **Labels**: Roboto, 11px, weight 600

### Spacing & Layout

- Border Radius: 0.375rem (minimal, geometric precision)
- Padding: 1rem (16px)
- Gap: 1.5rem (24px)
- Viewport: 70% width, left-aligned
- Control Panel: 30% width (256px), right-aligned

## Getting Started

### Prerequisites

- Node.js 18+ with pnpm package manager
- Modern web browser with WebGL support

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The development server will start at `http://localhost:3000`.

## Usage

### Basic Implementation

```tsx
import ThreeViewer from '@/components/ThreeViewer';

export default function App() {
  return (
    <div className="w-screen h-screen">
      <ThreeViewer modelUrl="path/to/model.glb" />
    </div>
  );
}
```

### With Statistics Monitoring

```tsx
import React, { useState } from 'react';
import ThreeViewer from '@/components/ThreeViewer';

export default function App() {
  const [stats, setStats] = useState({ polygons: 0, vertices: 0, fps: 0 });

  return (
    <div className="w-screen h-screen">
      <ThreeViewer 
        modelUrl="path/to/model.glb"
        onStatsUpdate={setStats}
      />
      <div className="fixed bottom-4 left-4 bg-black/50 text-white p-4">
        <p>Polygons: {stats.polygons}</p>
        <p>Vertices: {stats.vertices}</p>
        <p>FPS: {stats.fps}</p>
      </div>
    </div>
  );
}
```

## Component API

### ThreeViewer

Main 3D viewer component.

**Props**:
- `modelUrl?: string` - URL to the 3D model file (GLTF/GLB format)
- `onStatsUpdate?: (stats: ViewerStats) => void` - Callback for real-time statistics

**Stats Object**:
```typescript
interface ViewerStats {
  polygons: number;  // Total polygon count
  vertices: number;  // Total vertex count
  fps: number;      // Frames per second
}
```

## Antigravity Integration

This project is designed to work seamlessly with Google's Antigravity platform. The included skill documentation (`.agents/skills/3d-viewer-skill/SKILL.md`) provides agents with clear instructions for integrating and extending the viewer.

### Agent-Friendly Architecture

- **Clear Component Structure**: Modular components with single responsibilities
- **Predictable Behavior**: Consistent interaction patterns and immediate feedback
- **Performance Visibility**: Real-time statistics for performance monitoring
- **Extensibility**: Easy to add features like model manipulation or material editing

## Performance Considerations

The viewer implements several optimization techniques:

- **Shadow Mapping**: 2048x2048 shadow maps for realistic lighting
- **Geometry Caching**: Efficient traversal and caching of geometry data
- **Damped Controls**: Physics-based camera damping to reduce jitter
- **Fog Effect**: Atmospheric fog to improve rendering performance

### Performance Tips

1. **Optimize Models**: Use compressed GLTF files with reasonable polygon counts
2. **Monitor Stats**: Use the stats callback to track performance
3. **Test on Target Devices**: Verify performance on your target hardware
4. **Adjust Shadow Quality**: Reduce shadow map size for better performance on lower-end devices

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 15+
- Edge 90+

All modern browsers with WebGL 2.0 support.

## Development Workflow

### Code Style

- TypeScript for type safety
- React Hooks for state management
- TailwindCSS for styling
- Functional components only

### File Organization

- Components in `client/src/components/`
- Pages in `client/src/pages/`
- Styles in `client/src/index.css`
- Types in component files or shared interfaces

### Testing

Run TypeScript type checking:
```bash
pnpm check
```

Format code:
```bash
pnpm format
```

## Troubleshooting

### Model Not Loading

- Verify the URL is accessible
- Check that the file format is GLTF or GLB
- Look for CORS issues in browser console
- Ensure the model file is not corrupted

### Performance Issues

- Check the polygon count in the stats panel
- Reduce shadow map resolution if needed
- Optimize the 3D model file
- Close other applications to free up system resources

### Canvas Not Rendering

- Verify browser WebGL support
- Check that the parent container has explicit width/height
- Clear browser cache and reload
- Try a different browser to isolate issues

## Future Enhancements

Potential features for future versions:

- Model manipulation tools (translate, rotate, scale)
- Material editor for real-time material adjustments
- Animation timeline and playback controls
- Model comparison and visualization
- Export functionality (screenshots, model formats)
- Advanced lighting controls
- Post-processing effects

## Contributing

This project is designed to be extended and modified. When adding features:

1. Maintain the minimalist design philosophy
2. Keep components modular and focused
3. Update the Antigravity skill documentation
4. Test thoroughly on target devices
5. Document any new APIs or components

## License

MIT License - Feel free to use this project in your applications.

## Support

For issues, questions, or suggestions, please refer to the Antigravity documentation or create an issue in the project repository.

## Acknowledgments

- Built with [React](https://react.dev)
- 3D rendering powered by [Three.js](https://threejs.org)
- React integration via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Styling with [TailwindCSS](https://tailwindcss.com)
- Designed for [Google Antigravity](https://antigravity.google)
