# Nikhil Bhadauriya — Premium 3D Interactive Portfolio

[![React](https://img.shields.io/badge/React-18%2B-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

> An immersive, dark-themed 3D personal portfolio inspired by the **Axevia** visual architecture. Engineered with React, TypeScript, Three.js, and GLSL shaders, featuring an interactive split-lighting particle portrait, 3D perspective project gallery, procedural audio synthesizer, and integrated Curriculum Vitae dossier.

---

## ⚡ Live Preview & Screenshots

- **Local Preview**: `http://localhost:5173/`
- **Official Resume PDF**: Direct download bundled at `/assets/Nikhil_Bhadauriya_Resume.pdf`

---

## ✨ Key Architectural Features

### 1. Interactive 3D Particle Portrait Engine
- **Custom Photogrammetric Segmentation**: Isolates head, facial contours, curly hair, and attire onto a void-black coordinate field using computer-vision segmentation.
- **Axevia Split-Lighting Aesthetic**:
  - **Left Half**: Framed by a rounded glass viewfinder panel (`border border-white/10 bg-black/40 backdrop-blur-[2px]`), displaying smooth monochromatic photographic contours.
  - **Right Half**: Planar, high-density, sharp stipple particle dots (`3.5px` round glowing white points) tracing highlights, hair, cheekbone, and shoulder.
- **Real-Time Physics**: Cursor proximity repels particles in 3D space with natural velocity; harmonic spring restitution pulls them organically back to their home coordinate `(x0, y0, 0)`.
- **GPU Throttling & Visibility Guard**: Automatically pauses rendering loops when the browser tab is hidden to conserve battery and GPU cycles.

### 2. Full Resume / Curriculum Vitae Integration
- **Hero Page Quick Access**: Interactive `[ RESUME / CV ↗ ]` and `[ PDF ↓ ]` buttons placed directly in the main hero view, developer stats card, and ambient ticker.
- **Dedicated About Page Dossier (Section 03)**:
  - **Candidate Profile**: Verified badge, direct email, phone (`+91 9259329680`), and location (*Noida, India*).
  - **Education**: Dr. Bhimrao Ambedkar University (DBRAU), Agra — *Bachelor of Computer Applications (BCA), Computer Science (2024 – 2027)*.
  - **Skills Matrix**: Categorized tags covering Languages (Python, JS, TS, SQL), Frontend (React, Next.js, Tailwind), Backend (Node.js, Express, Flask, REST APIs), Databases (PostgreSQL, MongoDB, Prisma), and Tools.
  - **Work Experience**: Detailed milestones for **DUCAT India** (*MERN Full Stack Apprenticeship*) and **S O Infotech (P) Ltd.** (*Python Full Stack Trainee*).
  - **Certifications**: Credentials from Udemy, freeCodeCamp, and Coursera (University of Michigan).
- **Interactive Full-Screen Resume Modal**: Printable and downloadable directly from anywhere on the site.

### 3. Infinite 3D Perspective Project Gallery
- Perspective-based 3D cards for flagship systems:
  - **CarVerse**: MERN stack vehicle management system with CRUD and real-time inventory tracking.
  - **AI-Powered E-commerce Website**: Full-stack Python & React platform with GenAI product recommendations and checkout.
  - **VidyaSanchar ERP**: Institutional management portal with 3NF PostgreSQL architecture and role-based access.
  - **NagrikSetu & MYSignSetu**: Civic technology transparency and cryptographic document verification.
- Keyboard navigation (`←` / `→`), touch swipe support, and in-depth case study modals.

### 4. Interactive 3D Typography Skills Globe
- Technical competencies distributed across a rotating 3D spherical Fibonacci lattice with category filtering (*3D & Creative, Distributed Systems, Cloud & DevOps, Core*).

### 5. Web Audio API Procedural Synthesizer
- Zero-asset audio engine synthesizing delicate harmonic clicks, boot sweeps, and particle burst resonance in-browser with zero latency.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Core Framework** | React 18 / 19, TypeScript, Vite |
| **3D & Shaders** | Three.js, React Three Fiber, Custom GLSL, BufferGeometry |
| **Motion & Physics** | GSAP, Lenis Smooth Scroll, Web Audio API |
| **Styling & UI** | Tailwind CSS 3.4, Bespoke Axevia CSS Design Tokens |
| **Typography** | Bebas Neue, Syne, JetBrains Mono, Plus Jakarta Sans |
| **Deployment** | Vercel, Production Chunk Splitting |

---

## 📂 Project Structure

```bash
Portfolio/
├── public/
│   ├── assets/
│   │   ├── Nikhil_Bhadauriya_Resume.pdf    # Official Resume PDF for download
│   │   ├── nikhil-clean.jpg                # Segmented portrait
│   │   ├── nikhil-enhanced.jpg             # High-contrast monochrome reference
│   │   ├── nikhil-left-half.png            # Viewfinder left glass silhouette
│   │   └── nikhil-particles-src.jpg        # Right particle engine source
│   └── audio/                              # Ambient soundtrack audio
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── ParticlePortrait.tsx        # 3D Stipple Particle Portrait Engine
│   │   │   └── SkillsGlobe.tsx             # 3D Typography Fibonacci Sphere
│   │   └── ui/
│   │       ├── BootScreen.tsx              # Preloader (0-100% counter & tier toggles)
│   │       ├── HeroSection.tsx             # Axevia Hero Layout & HUD Stats
│   │       ├── InfiniteProjectGallery.tsx  # 3D Perspective Carousel
│   │       ├── Navbar.tsx                  # Top Bar, ECG wave & dynamic scroll spy
│   │       ├── Pages.tsx                   # About, Projects, Journey, Contact
│   │       ├── PhotoUploaderModal.tsx      # Real-time Photo Customizer Modal
│   │       └── ResumeModal.tsx             # Verified Resume Dossier Modal
│   ├── data/
│   │   ├── portfolioData.ts                # Structured TypeScript data models
│   │   └── profile.ts                      # Profile, projects, resume & journey
│   ├── utils/
│   │   ├── audioSynthesizer.ts             # Web Audio API synthesizer
│   │   └── portraitSampler.ts              # Planar point cloud generator
│   ├── App.tsx                             # Master routing & system state
│   ├── main.tsx                            # React root mount
│   ├── index.css                           # Utility styles & typography
│   └── studio.css                          # Bespoke Axevia design system
├── vercel.json                             # Vercel SPA routing & caching
├── tailwind.config.js                      # Custom palette & typography tokens
├── tsconfig.json                           # Strict TypeScript configuration
└── package.json                            # Scripts & dependencies
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### 1. Clone the repository
```bash
git clone https://github.com/Nikhil-beep25/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the portfolio.

### 4. Build for production
```bash
npm run build
```
Generates an optimized production bundle inside the `dist/` directory with code splitting for Three.js and vendor modules.

---

## ☁️ Vercel Deployment

This project includes a production-ready [`vercel.json`](./vercel.json) file configured for single-page app rewrites and asset caching:

1. Push your repository to GitHub.
2. Import the repository into your [Vercel Dashboard](https://vercel.com/new).
3. Keep default settings (`Build Command: npm run build`, `Output Directory: dist`).
4. Click **Deploy**.

---

## 👤 About the Developer

**Nikhil Bhadauriya**  
*Full Stack Developer & Creative Technologist*  
- **Location**: Noida, Uttar Pradesh, India  
- **Email**: [nikhilbhadauriya2500@gmail.com](mailto:nikhilbhadauriya2500@gmail.com)  
- **Phone**: +91 9259329680  
- **GitHub**: [@Nikhil-beep25](https://github.com/Nikhil-beep25)  
- **LinkedIn**: [nikhil-bhadauriya-308414321](https://linkedin.com/in/nikhil-bhadauriya-308414321)  

---

## 📄 License

MIT License © 2026 Nikhil Bhadauriya.  
*Design visual language inspired by the Axevia portfolio theme by PixelAxis.*

# My-Portfolio
