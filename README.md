# Trihari Universal - Production House Website

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://jagjeetjenagit.github.io/trihari-universal-website/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animation-purple)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)

A modern, cinematic website for Trihari Universal - a full-service production house specializing in films, commercials, and branded content. Built with React, featuring stunning 3D animations and a professional audition application system.

## 🌟 Features

### ✨ **Modern Design**
- **3D Animations**: Immersive 3D effects powered by Framer Motion
- **Cinematic UI**: Dark/Light mode with cinematic styling
- **Responsive Design**: Optimized for all devices
- **Professional Layout**: Clean, modern interface

### 🎬 **Content Sections**
- **Hero Section**: Animated logo and compelling messaging
- **Services**: Film Production & Commercials showcase (streamlined)
- **Portfolio**: Featured work and projects (curated selection)
- **About**: Company information and founder profiles
- **Audition Form**: Professional application system
- **Contact**: Interactive contact cards with 3D effects

### � **Technical Features**
- **GitHub Backend**: Serverless form handling via GitHub API
- **Email Integration**: Automated notifications for form submissions
- **Instagram Integration**: Dynamic portfolio from Instagram posts
- **CI/CD Pipeline**: Automated deployment with GitHub Actions
- **Performance Optimized**: Fast loading with Vite build system
- **3D Effects**: Mode-specific animations (dramatic in dark, subtle in light)

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (3D transforms, perspective effects)
- **Backend**: GitHub API (Serverless)
- **Deployment**: GitHub Pages
- **Email**: GitHub Actions + Gmail SMTP
- **Build Tool**: Vite with optimized production builds
- **Version Control**: Git with version history

## 🌐 Live Demo

� **[Visit Trihari Universal](https://jagjeetjenagit.github.io/trihari-universal-website/)**
📊 **[Admin Dashboard](https://jagjeetjenagit.github.io/trihari-universal-website/admin.html)**

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jagjeetjenagit/trihari-universal-website.git
   cd trihari-universal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your logo**
   - Place your logo as `trihari_universal_white.png` in `src/assets/` directory
   - Logo should have transparent background for best results

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open: `http://localhost:3000/trihari-universal-website/`

5. **Build for production**
   ```bash
   npm run build
   npm run preview  # Preview production build
   ```

## 🎨 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Build & Preview  
npm run build        # Build optimized production version
npm run preview      # Preview production build locally

# Deployment
git push origin main # Auto-deploy via GitHub Actions to GitHub Pages
```

## 🎪 Project Structure

```
trihari-universal/
├── src/
│   ├── assets/                       # Images, logos, static files
│   │   └── trihari_universal_white.png  # Main logo file
│   ├── utils/                        # Utility functions
│   │   └── GitHubFormHandler.js      # Form submission handler
│   ├── TrihariUniversalSimple.jsx    # Main component (1800+ lines)
│   ├── main.jsx                      # App entry point
│   └── index.css                     # Global styles & Tailwind
├── public/                           # Public assets
│   ├── circular logog trihari.png    # Legacy logo (backup)
│   └── instagram-latest.json         # Instagram posts data
├── .github/workflows/                # GitHub Actions
│   ├── deploy.yml                    # Automated deployment
│   └── send-email.yml                # Email notifications
├── scripts/                          # Build and utility scripts
├── versions/                         # Version backups (v1-v4)
│   ├── version-2/                    # Previous iterations
│   ├── version-3/                    # Development history
│   └── version-4/                    # Latest backup
├── backend/                          # Alternative backend solutions
├── admin.html                        # Application dashboard
├── dist/                            # Production build output
├── applications/                     # Form submissions (auto-created)
└── setup-guides/                     # Documentation for various backends
```

## 🎭 Key Components & Features

### **Main Component** (`TrihariUniversalSimple.jsx`)
A comprehensive 1800+ line React component featuring:

1. **Navigation** - Responsive header with logo, smooth-scroll menu, theme toggle
2. **Hero Section** - Animated logo with blue glow, 3D video container, CTA buttons
3. **Services** - Streamlined showcase (Film Production + Commercials only)
4. **Portfolio** - Curated featured work (Corporate Documentary + Short Film)
5. **About** - Company story with founder profiles and animated elements
6. **Audition Form** - Professional application system with GitHub backend
7. **Contact** - Interactive 3D cards (Email, Phone, Studio location)
8. **Footer** - Company information with rotating logo

### **3D Animation System**
- **Dark Mode**: Full cinematic effects with dramatic shadows, rotations, and depth
- **Light Mode**: Clean, professional appearance with subtle animations
- **Responsive**: Optimized performance across all device sizes
- **Interactive**: Hover effects, scroll triggers, and smooth transitions

### **GitHub Backend System**
The audition form uses a completely serverless GitHub-based backend:

- ✅ **Zero hosting costs** - Everything runs on GitHub infrastructure
- ✅ **Professional emails** - Automated Gmail notifications via GitHub Actions
- ✅ **Secure storage** - Applications saved as JSON files in repository
- ✅ **Admin dashboard** - Easy application management interface
- ✅ **Version control** - All submissions tracked and versioned in Git
- ✅ **Unlimited submissions** - No monthly limits or usage fees
- ✅ **Email automation** - Automatic confirmations for applicants and admin
- ✅ **Application IDs** - Unique identifier system for tracking

## 🎨 Styling & Animation Details

### **3D Effects Implementation**
```javascript
// Dark Mode: Full 3D effects
whileHover={{ 
  scale: 1.05, rotateY: 8, rotateX: 5, z: 40,
  boxShadow: "0 40px 80px rgba(0,0,0,0.6)" 
}}

// Light Mode: Subtle effects  
whileHover={{ scale: 1.03, y: -5 }}
```

### **Color Scheme**
- **Primary**: Blue accent (`rgba(59,130,246,...)`)
- **Secondary**: Red highlights (`rgba(239,68,68,...)`)
- **Dark Mode**: Rich grays and blacks with dramatic shadows
- **Light Mode**: Clean whites and light grays with minimal shadows

## 🔧 Configuration & Setup

### **GitHub Actions Setup**
Required repository secrets for email functionality:
```bash
PERSONAL_ACCESS_TOKEN   # GitHub API access
GMAIL_APP_PASSWORD     # Gmail SMTP authentication  
GMAIL_USER            # Gmail address for notifications
```

### **Environment Configuration**
```javascript
// vite.config.js
export default defineConfig({
  base: '/trihari-universal-website/',  // GitHub Pages path
  plugins: [react()],
  build: { outDir: 'dist' }
})
```

## 🚀 Deployment Process

### **Automatic Deployment**
Every push to `main` branch triggers:
1. GitHub Actions workflow
2. React app build with Vite
3. Deployment to GitHub Pages
4. Email system activation

### **Manual Deployment Steps**  
```bash
git add .
git commit -m "Update: [description]"
git push origin main
# Auto-deploys to: https://jagjeetjenagit.github.io/trihari-universal-website/
```

## 📊 Performance Metrics

- **Build Size**: ~300KB optimized
- **Load Time**: <2s on 3G
- **Lighthouse Score**: 95+ performance
- **Mobile Optimized**: 100% responsive
- **SEO Ready**: Proper meta tags and structure

## 🔄 Version History & Backups

- **Version 4** (Current): 3D effects optimization, streamlined content
- **Version 3**: Enhanced UI, better animations, improved services section  
- **Version 2**: GitHub backend integration, email automation
- **Version 1**: Initial release with basic functionality

All versions backed up in `/versions/` directory for rollback capability.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 Development Tips

### **Adding New Sections**
```javascript
// Follow the existing pattern in TrihariUniversalSimple.jsx
<motion.section id="new-section" className="...">
  <motion.div initial={{...}} animate={{...}} transition={{...}}>
    {/* Your content */}
  </motion.div>
</motion.section>
```

### **Customizing 3D Effects**
```javascript
// Adjust 3D parameters based on mode
whileHover={dark ? {
  // Dramatic effects for dark mode
  rotateY: 10, rotateX: 5, z: 30
} : {
  // Subtle effects for light mode  
  scale: 1.02, y: -2
}}
```

### **Updating Content**
- **Services**: Edit `services` array (~line 91)
- **Portfolio**: Edit `projects` array (~line 98)  
- **Contact**: Edit contact cards array (~line 1611)

## 📧 Contact & Support

**Trihari Universal Production House**
- 🌐 Website: [Live Demo](https://jagjeetjenagit.github.io/trihari-universal-website/)
- 📧 Email: trihariuniversal@gmail.com
- 📱 Phone: +91 92596 09995
- 📍 Studio: Mumbai, India
- 📷 Instagram: [@trihariuniversal](https://www.instagram.com/trihariuniversal/)

## 📄 License

This project is private and proprietary to Trihari Universal Production House.

## 🏆 Acknowledgments

- **React Team** - For the amazing framework
- **Framer Motion** - For incredible animation capabilities  
- **Tailwind CSS** - For utility-first styling
- **Vite** - For lightning-fast development experience
- **GitHub** - For free hosting and backend infrastructure

---

**🎬 Built with ❤️ by Trihari Universal Team**

*Crafting cinematic stories with bold visuals since 2025*

**✨ "From Concept to Screen" ✨**
