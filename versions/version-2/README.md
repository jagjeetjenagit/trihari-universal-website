# Trihari Universal Website

A modern, responsive website for Trihari Universal - a cinematic production house specializing in films, commercials, and branded content.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme Toggle**: User-friendly theme switching
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Modern UI**: Built with Tailwind CSS for clean, professional aesthetics
- **Fast Performance**: Built with Vite for optimal loading speeds

## Tech Stack

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Vite**: Next-generation frontend tooling

## Getting Started

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

## Project Structure

```
trihari-universal/
├── public/
│   ├── circular logog trihari.png    # Your logo file
│   └── logo-instructions.md          # Logo placement instructions
├── src/
│   ├── TrihariUniversalLanding.jsx   # Main component
│   ├── main.jsx                      # App entry point
│   └── index.css                     # Global styles & Tailwind imports
├── index.html                        # HTML template
├── package.json                      # Dependencies & scripts
├── tailwind.config.js               # Tailwind configuration
├── vite.config.js                   # Vite configuration
└── postcss.config.js               # PostCSS configuration
```

## Sections

1. **Navigation**: Logo, menu links, and theme toggle
2. **Hero**: Main headline with call-to-action buttons
3. **Services**: Film production, commercials, post-production, music & sound
4. **Work**: Portfolio showcase with project reels
5. **About**: Company story and key team members
6. **Contact**: Contact form for new projects
7. **Footer**: Company info and links

## Customization

### Colors
Update the color scheme in `tailwind.config.js` or modify the component directly.

### Content
Edit the content directly in `TrihariUniversalLanding.jsx`:
- Services array
- Team members
- Company information
- Contact details

### Images
- Replace placeholder images in the reels section with actual project thumbnails
- Update team member photos
- Add additional portfolio pieces

## Performance

- Optimized images are recommended (WebP format)
- Lazy loading is implemented for portfolio images
- Minimal JavaScript bundle size with tree-shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to customize and use for your projects.
