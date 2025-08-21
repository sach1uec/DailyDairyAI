# Project Description
<Project Description>
Build /journal with a calendar heatmap (7×6 grid), per-day entry, mood (1–5). Store locally. Add search, export to Markdown, and a 'streak' widget.
</Project Descripiton>

## Recommended Tech Stack
<Tech Stack>
### Frontend
- **React + TypeScript** - Component-based architecture perfect for calendar grid and widgets
- **CSS Grid/Flexbox** - Native layout for 7×6 calendar heatmap
- **Chart.js or D3.js** - For heatmap visualization and streak charts

### Local Storage
- **IndexedDB** (via Dexie.js) - Better than localStorage for structured journal data
- **LocalForage** - Clean API wrapper for IndexedDB with localStorage fallback

### State Management
- **Zustand** - Lightweight state management for journal entries and settings
- **React Query/TanStack Query** - Caching and synchronization for local data

### Additional Libraries
- **date-fns** - Date manipulation for calendar logic
- **Fuse.js** - Fuzzy search functionality
- **File-saver** - Markdown export functionality
- **Tailwind CSS** - Rapid styling for calendar and widgets

### Build Tool
- **Vite** - Fast development and optimized builds

This stack provides offline-first functionality, smooth calendar interactions, and easy data export while keeping the app lightweight and performant.
</tech stack>

