# Start & Stop Daily Journal Application

Complete instructions for launching and closing your Daily Journal application.

## 🚀 How to Launch the Application

### Method 1: From Terminal (Recommended)
```bash
# Navigate to the project folder
cd Daily_Journal/journal-app

# Start the development server
npm run dev
```

### Method 2: From Any Location
```bash
# Use full path
cd /Users/sachinpallavi/Documents/Claude_Code/Daily_Journal/journal-app && npm run dev
```

### Method 3: Using Absolute Path
```bash
# Direct navigation and start
cd /Users/sachinpallavi/Documents/Claude_Code/Daily_Journal/journal-app
npm run dev
```

## ✅ Success Indicators

When successfully launched, you'll see:
```
VITE v7.1.3  ready in 367 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Then:** Open your browser to `http://localhost:5173/`

---

## ⛔ How to Close/Exit the Application

### Method 1: Stop the Server (Recommended)
In the terminal where the app is running:
- **Windows/Linux:** Press `Ctrl + C`
- **Mac:** Press `Cmd + C` or `Ctrl + C`
- **Alternative:** Press `Ctrl + Z` to suspend

### Method 2: Close Terminal
- Simply close the terminal window/tab where `npm run dev` is running
- This will automatically stop the development server

### Method 3: Kill Process (Emergency)
If the application becomes unresponsive:
```bash
# Find the process running on port 5173
lsof -i :5173

# Kill the process (replace [PID] with actual process ID)
kill -9 [PID]
```

### Method 4: Force Kill Node Processes
```bash
# Kill all node processes (use with caution)
pkill -f node
```

---

## 💡 Resource Management

### ✅ When Server is Stopped:
- ✅ No CPU/memory usage
- ✅ Port 5173 becomes available
- ✅ All development resources freed
- ✅ Browser can still show cached content

### ❗ Understanding Browser vs Server:
- **Server stopped** = No development features, no live updates
- **Browser closed** = UI gone but server still running (uses resources)
- **Both closed** = Complete shutdown ✅ (Recommended)

---

## 📝 Quick Reference Commands

| Action | Command | Description |
|--------|---------|-------------|
| **Start App** | `npm run dev` | Launch development server |
| **Stop App** | `Ctrl + C` | Stop development server |
| **Build for Production** | `npm run build` | Create production build |
| **Preview Production** | `npm run preview` | Test production build |
| **Run Tests** | `npm run test` | Execute test suite |
| **Check Running Apps** | `lsof -i :5173` | See what's using port 5173 |
| **Check Node Processes** | `ps aux \| grep node` | List all Node.js processes |

---

## 🎯 Best Practice Workflow

### Daily Usage:
1. **Start:** `npm run dev`
2. **Use:** Open browser to `http://localhost:5173/`
3. **Develop:** Make entries, see live updates
4. **Stop:** `Ctrl + C` when finished
5. **Close:** Close browser tab

### Troubleshooting:
1. **Port in use?** Kill existing process: `lsof -i :5173`
2. **Not responding?** Force quit: `Ctrl + C` then `pkill -f node`
3. **Changes not showing?** Hard refresh browser: `Ctrl + Shift + R`
4. **Dependencies error?** Reinstall: `npm install`

---

## 🔧 Additional Commands

### Development Commands:
```bash
# Install dependencies (if needed)
npm install

# Clear cache and reinstall
rm -rf node_modules package-lock.json && npm install

# Check for updates
npm outdated

# Update packages
npm update
```

### Production Commands:
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Serve production build
npm run preview
```

---

## ⚠️ Important Notes

1. **Always stop the server when done** to free up system resources
2. **Don't run multiple instances** on the same port
3. **Keep terminal open** while using the application
4. **Use Ctrl+C (not just closing terminal)** for clean shutdown
5. **Check port availability** if you encounter startup issues

---

## 🆘 Emergency Procedures

### If Application Won't Start:
1. Check if port 5173 is in use: `lsof -i :5173`
2. Kill conflicting process: `kill -9 [PID]`
3. Try starting again: `npm run dev`
4. If still failing, restart terminal and try again

### If Application Won't Stop:
1. Try `Ctrl + C` multiple times
2. Close terminal window
3. Use process killer: `pkill -f node`
4. Restart terminal

### If Browser Shows Errors:
1. Hard refresh: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
2. Clear browser cache
3. Check browser console for errors
4. Restart development server

---

**Remember:** This ensures zero resource usage when you're not using the Daily Journal app! 🚀✨