# 🧠 MindWise – Mental Health Companion App

**MindWise** is a modern mental wellness web app offering educational resources, chatbot support, real-time search, and interactive emotional tools. Built using **React + TypeScript**, the app emphasizes clean UI, responsive design, and user personalization through dark/light themes.

🌐 [Live Demo](https://meek-sopapillas-653fbe.netlify.app/)

---

## ✨ Core Features

* 🔍 **Live Search Experience**
  Autocomplete-enabled search bar that dynamically routes to a `/search` results page.

*📓 **AI-Prompted Journal**
Reflective journaling tool with randomized prompts and instant AI-powered sentiment feedback, securely stored locally under /journal.

* 💬 **AI Chatbot Interface**
  Simulated chatbot interface (placeholder for AI/LLM integration).

* 📚 **Educational Hub**
  Centralized mental health knowledge base under `/education`.

* 📰 **Articles Section**
  Curated content for self-help and psychoeducation.

* 🚨 **Crisis Help**
  Emergency guidance and help page for users in distress.

* 🧭 **Navigation & Routing**
  SPA routing with persistent navbar and animated page transitions via `framer-motion`.

* 🌓 **Theme Toggle**
  Light/Dark mode switch stored in `localStorage` via React Context.

---

## 🛠️ Tech Stack

* **Framework**: [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Routing**: React Router
* **Animation**: Framer Motion
* **Icons**: Lucide React
* **State Management**: React Context API

---

## 🧩 Pages & Routes

| Route        | Description                          |
| ------------ | ------------------------------------ |
| `/`          | Home page                            |
| `/education` | Mental health education hub          |
| `/chatbot`   | Chatbot support page                 |
| `/articles`  | Articles and blogs                   |
| `/crisis`    | Crisis help page                     |
| `/about`     | About MindWise                       |
| `/journal    | Journal                              |
| `/search`    | Search results (based on user input) |


---

## 📁 Project Structure (Key Files)

```
project/
│
├── src/
│   ├── components/
│   │   └── Navbar.tsx           # Responsive navigation with theme & search
│   ├── contexts/
│   │   ├── ThemeContext.tsx     # Light/Dark mode with localStorage sync
│   │   └── SearchContext.tsx    # Global search state context
│   ├── pages/                   # Page components for routes
│   ├── App.tsx                  # Main router and layout
│   └── main.tsx                 # React root entry
├── public/
├── index.html                   # Root HTML
├── vite.config.ts               # Vite build setup
├── tailwind.config.js           # Tailwind configuration
└── package.json                 # Scripts & dependencies
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ManotiSparrow/MindWise.git
cd mindwise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Visit `http://localhost:5173` to explore the app locally.

---

## 🧪 Planned Enhancements

* ✅ Connect Firebase for user data persistence
* ✅ Add user-authenticated mood journaling
* ✅ Improve accessibility (ARIA, keyboard nav)
* ✅ Responsive mobile-first layout polish

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgments

Special thanks to all contributors in the AI + Mental Health space. This app is an educational prototype and not a replacement for professional care.

