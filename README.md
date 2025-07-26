Here’s the updated and refined `README.md` that includes the **📓 AI-Prompted Journal** feature and adjusts relevant sections accordingly:

---

# 🧠 MindWise – Mental Health Companion App

**MindWise** is a modern mental wellness web app offering educational resources, chatbot support, AI journaling, real-time search, and emotional check-ins. Built using **React + TypeScript**, the app emphasizes clean UI, responsive design, and personalized experiences through themes and local journaling.

🌐 [Live Demo](https://meek-sopapillas-653fbe.netlify.app/)

---

## ✨ Core Features

* 🔍 **Live Search Experience**
  Autocomplete-enabled search bar that dynamically routes to a `/search` results page.

* 💬 **AI Chatbot Interface**
  A fully functional AI-powered chatbot located at /chatbot, capable of engaging users in mental health–oriented conversations, offering support, and simulating therapeutic dialogue.

* 📚 **Educational Hub**
  Centralized mental health knowledge base under `/education`.

* 📰 **Articles Section**
  Curated content for self-help, psychoeducation, and blog-style mental health articles.

* 🚨 **Crisis Help**
  Emergency guidance and quick links for users in distress.

* 📓 **AI-Prompted Journal**
  Reflective journaling tool at `/journal` with randomized prompts, AI-powered sentiment feedback, and secure localStorage-based entry saving.

* 🌗 **Theme Toggle**
  Light/Dark mode toggle using React Context, with persistent theme state stored in `localStorage`.

* 🧭 **Navigation & Routing**
  SPA routing with animated transitions powered by `framer-motion`.

---

## 🛠️ Tech Stack

* **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Routing**: React Router
* **Animation**: Framer Motion
* **Icons**: Lucide React
* **State Management**: React Context API
* **Storage**: Browser `localStorage` (for journal data)

---

## 🧩 Pages & Routes

| Route        | Description                                   |
| ------------ | --------------------------------------------- |
| `/`          | Home page                                     |
| `/education` | Mental health education hub                   |
| `/chatbot`   | Chatbot support page                          |
| `/articles`  | Articles and blogs                            |
| `/crisis`    | Crisis help and emergency resources           |
| `/about`     | About MindWise                                |
| `/search`    | Live search results page                      |
| `/journal`   | AI-generated journaling prompts & reflections |

---

## 📁 Project Structure (Key Files)

```
project/
│
├── src/
│   ├── components/
│   │   └── Navbar.tsx           # Responsive navbar with theme + search
│   ├── contexts/
│   │   ├── ThemeContext.tsx     # Light/Dark theme toggle via Context API
│   │   └── SearchContext.tsx    # Global search term/state context
│   ├── pages/                   # Routes: Home, Journal, Chatbot, etc.
│   ├── App.tsx                  # Main app router with transitions
│   └── main.tsx                 # React DOM root
├── public/
├── index.html                   # Base HTML template
├── vite.config.ts               # Vite build config
├── tailwind.config.js           # Tailwind setup
└── package.json                 # Project metadata and dependencies
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

### 3. Run the app locally

```bash
npm run dev
```

Visit `http://localhost:5173` to start exploring the app in your browser.

---

## 🧪 Planned Enhancements

* ✅ Add Firebase or Supabase backend for user login + synced journaling.
* ✅ Improve accessibility (voice input, screen reader support).
* ✅ Expand journaling dashboard with mood trend analytics.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgments

Special thanks to all contributors in the AI + Mental Health space. MindWise is a creative educational prototype designed to support mental health awareness. It is not intended to replace professional psychological or psychiatric care.


