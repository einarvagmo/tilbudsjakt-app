import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
4. Commit

### Steg 3: Slett gamle filer i root

Slett disse fra root (ikke `src/`):
1. Slett `App.jsx` (den i root)
2. Slett `main.jsx` (den i root)

**Behold** disse i root:
- ✅ index.html
- ✅ package.json
- ✅ vite.config.js
- ✅ vercel.json

### Steg 4: Re-deploy

Gå til Vercel → Redeploy

## 📁 Slik skal det se ut:
```
tilbudsjakt-app/
├── src/
│   ├── App.jsx         ← Flyttet hit!
│   └── main.jsx        ← Flyttet hit!
├── index.html          ← I root
├── package.json        ← I root
├── vite.config.js      ← I root
└── vercel.json         ← I root
