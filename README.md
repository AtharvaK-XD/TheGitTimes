<div align="center">

# 📰 The Git Times

### *All the Commits Fit to Print*

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-the--git--times.vercel.app-d4a84a?style=for-the-badge&logo=vercel&logoColor=white)](https://the-git-times.vercel.app)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  <b>Transform any GitHub profile into an authentic 1920s vintage broadside newspaper dispatch.</b><br/>
  Featuring real-time GitHub REST API telemetry, a 52-week sepia contribution heatmap, an interactive 2.2x brass magnifying glass loupe, tactile mechanical audio, and AI-generated vintage journalistic copy.
</p>

---

[🌐 Try Live Demo](https://the-git-times.vercel.app) • [✨ Features](#-key-features) • [🛠️ Tech Stack](#️-tech-stack) • [⚡ Quick Start](#-quick-start) • [📜 License](#-license)

</div>

---

## 🌟 Overview

**The Git Times** bridges modern open-source software engineering with 19th and early 20th-century print journalism. Enter any valid GitHub username, and our Postal Telegraph Desk live-fetches profile telemetry, repositories, stars, followers, and contribution heatmaps to typeset a custom 1920s broadside newspaper edition.

> *"Extra! Extra! Read all about your GitHub commits in an authentic daily broadside."*

---

## ✨ Key Features

### 🗞️ Authentic 1920s Newspaper Aesthetic
* **Broadsheet Layout**: Multi-column broadside layout featuring halftone portrait photography, deckled paper edges, aged discoloration overlays, and foxing spots.
* **19th-Century Telegraph Bureau**: Postal Telegraph Dispatch Blank form landing page with vintage press buttons and archived popular developer editions.

### 📊 Real Live GitHub Telemetry & Links
* **Direct Profile Links**: Clickable links for Followers, Following, Repositories, Stars, and Merged Pull Requests pointing directly to the user's official GitHub pages.
* **Strict Validation**: Real-time error alerts if a typed username does not exist on GitHub, preventing invalid newspaper generation.

### 📜 Sepia 52-Week Contribution Heatmap Grid
* **Newspaper-Themed Colors**: Custom 364-day contribution heatmap styled in vintage sepia ink tones (`Sepia Gold`, `Aged Bronze`, `Deep Oak`, `Victorian Dark Black`).
* **Interactive Lightbox Modal**: Click the broadsheet contribution clipping to expand a full-screen enlarged lightbox with month headers, day labels, hover tooltips, and density legend.

### 🚀 Popular Repositories & Project Launcher
* **Live Application Demos**: Features the developer's top starred public repositories with description, language tags, star/fork counts, and a direct `Live Demo ↗` launch button when a homepage URL is present.

### 🔍 2.2x Brass Magnifying Glass Loupe
* **Optical Magnification**: Toggleable antique brass loupe with convex glass reflections providing 2.2x optical zoom over the broadsheet text as you move your mouse.

### 🎵 Tactile Web Audio Engine
* **Mechanical SFX**: Custom Web Audio API sound engine generating real-time typewriter keystrokes, carriage returns, rubber stamp thuds, and authentic paper rustles.

### ✍️ AI-Powered Journalist Copy (Google Gemini API)
* **Witty Vintage Articles**: Integrates Google Gemini API to write dramatic 1920s newspaper headlines, sub-headlines, editorial news reports, weather forecasts, sticky quotes, classified ads, and tech horoscopes.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Client-side application rendering |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe code architecture |
| **Build Tool** | [Vite](https://vitejs.dev/) | Lightning-fast development & production bundling |
| **Styling** | Vanilla CSS3 & [Tailwind CSS](https://tailwindcss.com/) | Custom keyframe animations & responsive layout |
| **Icons** | [Lucide React](https://lucide.dev/) | Modern vector icons |
| **APIs** | [GitHub REST API](https://docs.github.com/en/rest) | Real-time user stats, repos, events & PR telemetry |
| | [Google Gemini AI API](https://ai.google.dev/) | Vintage 1920s newspaper copy generation |
| | [jogruber Contributions API](https://github.com/jogruber/github-contributions-api) | 365-day contribution heat map grid data |
| **Audio** | Web Audio API | Synthesized mechanical sound effects |
| **Deployment** | [Vercel](https://vercel.com/) | Global edge network hosting |

---

## 📁 Repository Structure

```
TheGitTimes/
├── public/
│   └── assets/             # Newspaper textures, background images & audio assets
├── src/
│   ├── components/         # React UI Components
│   │   ├── DeskScene.tsx   # 3D Mahogany Desk & Parallax Paper Container
│   │   ├── FrontPage.tsx   # Newspaper Page 1 (Masthead, Headline, Telemetry, Bio)
│   │   ├── PageTwo.tsx     # Newspaper Page 2 (Popular Repos, Crossword, Horoscope)
│   │   ├── LandingPage.tsx # 19th-Century Telegraph Dispatch Blank Form
│   │   ├── ContributionsGrid.tsx # 52-Week Sepia Contribution Heatmap Grid
│   │   ├── PopularRepos.tsx# Top Repositories with Live Demo Launch Buttons
│   │   ├── ClippingModal.tsx# Lightbox Modal for enlarged clipping inspection
│   │   └── AudioControls.tsx# Ambient sound & volume toggles
│   ├── services/           # Service Integrations
│   │   ├── githubService.ts# GitHub REST API data fetcher
│   │   ├── geminiService.ts# Google Gemini AI copy generator
│   │   └── audioEngine.ts  # Web Audio API sound synthesizer
│   ├── data/               # Types & Fallback Profiles
│   ├── App.tsx             # Root Application State & Routing
│   └── index.css           # Custom CSS Keyframes & Paper Textures
├── package.json
└── vite.config.ts
```

---

## ⚡ Quick Start

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AtharvaK-XD/TheGitTimes.git
   cd TheGitTimes
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   Create a `.env` file in the root directory and add your Google Gemini API key to enable AI-generated vintage copy:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: If no API key is provided, the application automatically uses built-in smart copy fallbacks!)*

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/AtharvaK-XD/TheGitTimes/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

**Created with ☕ & 📜 by Atharva Kulkarni**  
[GitHub Profile](https://github.com/AtharvaK-XD) • [Live Website](https://the-git-times.vercel.app)

</div>
