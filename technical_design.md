# High-Level Architecture & Design

## Architecture Overview
```
┌─────────────────────────────────────────────────┐
│                 React Frontend                  │
├─────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  Calendar   │  │   Entry     │  │   Streak    │ │
│  │  Component  │  │  Component  │  │   Widget    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
├─────────────────────────────────────────────────┤
│                Zustand Store                    │
├─────────────────────────────────────────────────┤
│                Data Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  IndexedDB  │  │    Search   │  │   Export    │ │
│  │   (Dexie)   │  │  (Fuse.js)  │  │(File-saver) │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────┘
```

## Design Decisions & Rationale

### **Offline-First Architecture**
- **Decision**: Store all data locally using IndexedDB
- **Why**: Journal entries are personal and sensitive. Local storage ensures privacy, instant access, and works without internet connection. Users maintain full control of their data.

### **Component-Based UI Structure**
- **Decision**: Separate components for Calendar, Entry, and Widgets
- **Why**: Modular design allows independent development and testing. Calendar can update without affecting entry editing. Each component has single responsibility.

### **State Management with Zustand**
- **Decision**: Use Zustand over Redux or Context API
- **Why**: Simpler API reduces boilerplate. No providers needed. Perfect for small-to-medium apps. Easy to implement time-travel debugging for journal entries.

### **7×6 Calendar Grid Design**
- **Decision**: Fixed grid layout showing 6 weeks
- **Why**: Covers any month layout. Consistent visual space. Users can see patterns across weeks. Familiar calendar interface reduces learning curve.

### **IndexedDB for Data Persistence**
- **Decision**: IndexedDB with Dexie.js wrapper over localStorage
- **Why**: localStorage has 5-10MB limit. IndexedDB supports structured queries, indexing, and transactions. Better performance for searching through journal entries.

### **Client-Side Search Implementation**
- **Decision**: Use Fuse.js for fuzzy search
- **Why**: No server dependency. Instant results. Works offline. Fuzzy matching handles typos and partial matches common in journal searching.

### **Mood Tracking (1-5 Scale)**
- **Decision**: Simple numeric scale instead of complex mood tracking
- **Why**: Quick to input. Easy to visualize in heatmap. Reduces friction in daily journaling habit. Can show trends over time.

## Data Flow
1. User inputs journal entry + mood rating
2. Zustand store updates immediately (optimistic UI)
3. Data persists to IndexedDB asynchronously
4. Calendar heatmap re-renders based on new mood data
5. Search index updates for new content
6. Streak calculations update in real-time

## Recommended Folder Structure

```
Daily_Journal/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── CalendarGrid.tsx
│   │   │   ├── CalendarDay.tsx
│   │   │   └── CalendarHeatmap.tsx
│   │   ├── Entry/
│   │   │   ├── EntryEditor.tsx
│   │   │   ├── EntryViewer.tsx
│   │   │   └── MoodSelector.tsx
│   │   ├── Widgets/
│   │   │   ├── StreakWidget.tsx
│   │   │   └── StatsWidget.tsx
│   │   ├── Search/
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchResults.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Layout.tsx
│   ├── store/
│   │   ├── journalStore.ts
│   │   ├── settingsStore.ts
│   │   └── types.ts
│   ├── services/
│   │   ├── database.ts          # IndexedDB/Dexie setup
│   │   ├── search.ts            # Fuse.js search logic
│   │   ├── export.ts            # Markdown export
│   │   └── streak.ts            # Streak calculation
│   ├── utils/
│   │   ├── dateHelpers.ts       # date-fns utilities
│   │   ├── validation.ts        # Input validation
│   │   └── constants.ts         # App constants
│   ├── hooks/
│   │   ├── useJournalEntries.ts
│   │   ├── useSearch.ts
│   │   └── useStreak.ts
│   ├── types/
│   │   ├── journal.ts
│   │   └── index.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── components.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── project_description.md
└── technical_design.md
```

### Structure Benefits
- **Feature-based components** - Easy to locate and maintain
- **Separated concerns** - Store, services, and utils clearly divided
- **Custom hooks** - Reusable logic abstraction
- **Type safety** - Dedicated types folder for TypeScript definitions
- **Service layer** - Clean separation of business logic from UI

## Modularity & Extensibility Analysis

### ✅ Confirmed: Highly Modular Architecture

**Component Isolation:**
- Each feature has its own folder (Calendar, Entry, Widgets, Search)
- Service layer separation - Business logic isolated from UI components
- Store modularity - Separate stores (journalStore, settingsStore) prevent coupling
- Custom hooks - Reusable logic that can be shared across components

### Future Feature Extensibility

**Easy additions:**
- **New widgets** → Add to `components/Widgets/`
- **Different views** → Add to `components/` (Timeline, Stats, Goals)
- **Export formats** → Extend `services/export.ts`
- **Data sources** → Add to `services/` (sync, backup, import)
- **Themes** → Extend `styles/` and `store/settingsStore.ts`

**Architecture supports:**
- **Plugin system** - Services can be easily swapped/extended
- **Multiple data stores** - Zustand allows independent store modules
- **Component composition** - React components can be combined flexibly
- **Hook reusability** - Custom hooks work across different features

**Scalability examples:**
```
Future features can add:
├── components/Goals/          # Goal tracking
├── components/Analytics/      # Advanced analytics  
├── services/sync.ts          # Cloud synchronization
├── services/backup.ts        # Data backup/restore
├── hooks/useGoals.ts         # Goal-specific logic
└── store/goalsStore.ts       # Goal state management
```

The architecture follows SOLID principles and allows independent feature development without breaking existing functionality.