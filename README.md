# Trihari Universal - Cinematic Production House

🎬 **Professional website for Trihari Universal with integrated audition form system**

A modern, responsive website for Trihari Universal - a cinematic production house specializing in films, commercials, and branded content.

## Features

- ✨ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🌓 **Dark/Light Theme Toggle** - User-friendly theme switching
- 🎭 **Audition Form** - Professional application system with GitHub backend
- 📧 **Email Notifications** - Automatic confirmations for applicants and admin
- 📊 **Admin Dashboard** - View and manage applications
- 🎬 **Smooth Animations** - Powered by Framer Motion for engaging user experience
- 🔒 **Secure Storage** - GitHub-powered backend with zero hosting costs
- 📱 **Mobile Friendly** - Optimized for all devices
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Vite** - Next-generation frontend tooling

### Backend & Hosting
- **GitHub API** - Serverless form backend
- **GitHub Actions** - Email automation
- **GitHub Pages** - Free hosting
- **JSON Storage** - Application data storage

## Live Site

🌐 **[Visit Trihari Universal](https://YOUR_USERNAME.github.io/trihari-universal-website)**
🎭 **[Admin Dashboard](https://YOUR_USERNAME.github.io/trihari-universal-website/admin.html)**

## Getting Started

### Quick Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Your Logo**
   - Place your circular logo file as `circular logog trihari.png` in the `public` directory
   - The logo should have a transparent background for best results

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

### GitHub Backend Setup

For the audition form backend, see `GITHUB_HOSTING_GUIDE.md` for complete setup instructions.

## Project Structure

```
trihari-universal/
├── public/
│   ├── circular logog trihari.png    # Your logo file
│   └── instagram-latest.json         # Instagram posts data
├── src/
│   ├── TrihariUniversalSimple.jsx    # Main website component
│   ├── utils/
│   │   └── GitHubFormHandler.js      # Form submission handler
│   ├── main.jsx                      # App entry point
│   └── index.css                     # Global styles & Tailwind imports
├── .github/
│   └── workflows/
│       └── send-email.yml            # Email automation
├── backend/                          # PHP backend alternative
├── admin.html                        # Applications dashboard
├── index.html                        # HTML template
├── submissions/                      # Application storage (auto-created)
└── setup guides/                     # Various setup options
```

## Audition Form Backend

The audition form uses a serverless GitHub-based backend:

- ✅ **No hosting costs** - Everything runs on GitHub
- ✅ **Professional emails** - Automatic notifications
- ✅ **Secure storage** - Applications saved as JSON files
- ✅ **Admin dashboard** - Easy application management
- ✅ **Version control** - All submissions tracked in Git
- ✅ **Unlimited applications** - No monthly limits

## Sections

1. **Navigation** - Logo, menu links, and theme toggle
2. **Hero** - Main headline with call-to-action buttons
3. **Services** - Film production, commercials, post-production, music & sound
4. **Work** - Portfolio showcase with Instagram integration
5. **About** - Company story and founders
6. **Audition Form** - Professional application system
7. **Contact** - Get in touch cards (email, phone, location)
8. **Footer** - Company info and links

## Backend Options

Multiple backend solutions available:

1. **GitHub Backend** (Recommended) - `GITHUB_HOSTING_GUIDE.md`
   - Completely free
   - No third-party dependencies
   - Professional email system

2. **Self-Hosted PHP** - `SELFHOSTED_SETUP_GUIDE.md`
   - Complete control
   - File upload support
   - Traditional hosting

3. **EmailJS Integration** - `EMAILJS_SETUP_GUIDE.md`
   - Quick setup
   - Direct email delivery

4. **Google Forms** - `GOOGLE_FORMS_SETUP.md`
   - Simple integration
   - Google's infrastructure

## Contact Information

**Trihari Universal**
- 📧 Email: Contact via website form
- 📱 Phone: +91 92596 09995
- 📍 Location: India
- 📷 Instagram: [@trihariuniversal](https://www.instagram.com/trihariuniversal/)

## License

MIT License - Feel free to customize and use for your projects.

---

*Built with ❤️ for the film industry*
