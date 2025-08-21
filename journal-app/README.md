# Daily Journal - Personal Journaling App

A beautiful, offline-first personal journaling application built with React, TypeScript, and modern web technologies.

## Features

- 📅 **Calendar View**: Visual heatmap showing your journaling activity and moods
- ✍️ **Daily Entries**: Write and edit journal entries with mood tracking (1-5 scale)
- 🔍 **Smart Search**: Fuzzy search through all your entries to find specific content
- 🔥 **Streak Tracking**: Monitor your journaling consistency with streak counters
- 📊 **Statistics**: View monthly stats including mood distribution and word counts
- 📁 **Export**: Export your entries to Markdown format (all, current month, or current year)
- 🏠 **Offline-First**: All data stored locally in your browser using IndexedDB
- 🎨 **Beautiful UI**: Clean, responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: IndexedDB (via Dexie.js)
- **Search**: Fuse.js (fuzzy search)
- **Date Handling**: date-fns
- **Export**: file-saver
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd Daily_Journal/journal-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Go to `http://localhost:5173`
   - The app will automatically open in your default browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint

## How to Use

### Creating Journal Entries

1. Click on any date in the calendar to select it
2. Write your journal entry in the text area
3. Select your mood for the day (1 = Very Bad, 5 = Excellent)
4. Click "Save Entry" to store your entry

### Viewing & Editing Entries

- Days with entries are highlighted in the calendar with mood colors
- Click on a day with an entry to view it
- Click "Edit" to modify an existing entry
- Click "Delete" to remove an entry (with confirmation)

### Searching Entries

1. Click on the "Search" tab in the header
2. Type keywords to search through all your entries
3. Results are ranked by relevance
4. Click on any result to view that entry

### Exporting Data

1. Click the "Export" button in the header
2. Choose from:
   - Export All Entries
   - Export Current Month
   - Export Current Year
3. A Markdown file will be downloaded to your computer

### Understanding the Widgets

- **Streak Widget**: Shows your current writing streak and motivational messages
- **Stats Widget**: Displays monthly statistics including entry count, average mood, and mood distribution

## Data Storage

All your journal entries are stored locally in your browser using IndexedDB. This means:

- ✅ Your data never leaves your device
- ✅ Works completely offline
- ✅ Fast access to all your entries
- ❗ Data is tied to your browser - clear browser data will delete entries
- ❗ Data won't sync across different devices/browsers

## Privacy & Security

- **100% Local**: No data is sent to any servers
- **No Tracking**: No analytics or tracking scripts
- **No Accounts**: No sign-up or login required
- **Your Data**: You have complete control over your journal entries

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### App won't start
- Ensure Node.js v16+ is installed
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

### Data not saving
- Check if your browser supports IndexedDB
- Ensure you haven't disabled local storage
- Try refreshing the page

### Export not working
- Ensure your browser allows file downloads
- Check if popup blockers are interfering

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── Calendar/       # Calendar grid and day components
│   ├── Entry/          # Entry editor, viewer, mood selector
│   ├── Search/         # Search bar and results
│   ├── Widgets/        # Streak and stats widgets
│   └── Layout/         # Header and layout components
├── store/              # Zustand state management
├── services/           # Business logic (database, search, export)
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

### Adding New Features

The app is designed to be modular and extensible:

- Add new components in the appropriate folder
- Create new services for business logic
- Use custom hooks for reusable state logic
- Update types for TypeScript safety

## Contributing

This is a personal project, but feel free to fork and modify for your own use!

## License

MIT License - feel free to use this code for your own projects.

---

**Happy Journaling! 📝✨**
