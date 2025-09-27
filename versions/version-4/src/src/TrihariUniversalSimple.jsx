/*
Trihari Universal — Simplified version for debugging
*/

import React, {useState, useRef, useEffect} from 'react'
import {motion, useInView, useScroll, useTransform} from 'framer-motion'
import GitHubFormHandler from './utils/GitHubFormHandler'
import logo from './assets/logo.png'

export default function TrihariUniversalSimple(){
  const [dark, setDark] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [igPosts, setIgPosts] = useState([])
  
  // Animation refs
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const containerRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, threshold: 0.3 })
  const servicesInView = useInView(servicesRef, { once: true, threshold: 0.2 })
  
  // Scroll effects
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])
  
  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Fetch latest Instagram posts from a simple JSON manifest in /public
  useEffect(() => {
    fetch('/instagram-latest.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        if (Array.isArray(data)) setIgPosts(data.slice(0, 6))
      })
      .catch(() => {/* silent */})
  }, [])

  // Form submission handler for GitHub Backend
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Show loading state
      const submitButton = e.target.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      submitButton.textContent = 'SENDING...'
      submitButton.disabled = true
      
      // Initialize GitHub form handler
      const githubHandler = new GitHubFormHandler({
        owner: 'jagjeetjenagit',           // Your GitHub username
        repo: 'trihari-universal-website', // Your repository name
        token: 'YOUR_GITHUB_TOKEN'         // Replace with your GitHub token
      })
      
      // Submit to GitHub
      const result = await githubHandler.submitForm(new FormData(e.target))
      
      if (result.success) {
        // Success message with application ID
        alert(`✅ Thank you for your application! Your submission has been received successfully.\n\nApplication ID: ${result.applicationId}\n\nWe will contact you if you are shortlisted.`)
        
        // Reset form
        e.target.reset()
      } else {
        throw new Error(result.error || 'Submission failed')
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      alert('❌ Sorry, there was an error sending your application. Please try again or contact us directly.')
    } finally {
      // Reset button state
      const submitButton = e.target.querySelector('button[type="submit"]')
      submitButton.textContent = 'SUBMIT APPLICATION'
      submitButton.disabled = false
    }
  }

  const services = [
    {title: 'Film Production', desc: 'End-to-end feature & short film production.'},
    {title: 'Commercials & Ads', desc: 'High-impact ad films and branded content.'},
    {title: 'Post Production', desc: 'Editing, color grading, VFX and sound design.'},
    {title: 'Music & Sound', desc: 'Original score, mixing and sound supervision.'}
  ]

  // Featured projects (includes Instagram highlights)
  const projects = [
    // Instagram posts from JSON (first 3 prioritized in grid)
    ...igPosts.slice(0, 3).map(p => ({
      title: p.title || 'Instagram Post',
      category: 'Instagram',
      desc: p.caption || 'From our Instagram',
      link: p.link || 'https://www.instagram.com/trihariuniversal/',
      thumbnail: p.thumbnail,
      source: 'instagram'
    })),
    // Existing placeholders
    { title: 'Corporate Documentary', category: 'Film', desc: 'Award-winning documentary series' },
    { title: 'Brand Campaign', category: 'Commercial', desc: 'Multi-platform advertising campaign' },
    { title: 'Music Video', category: 'Music', desc: 'Cinematic music video production' },
    { title: 'Product Launch', category: 'Commercial', desc: 'High-end product showcase' },
    { title: 'Short Film', category: 'Film', desc: 'Festival-selected narrative film' },
    { title: 'Event Coverage', category: 'Documentary', desc: 'Live event documentation' }
  ]

  // Shared input styles for the audition form
  const inputStyle = `${dark ? 'bg-gray-800/70 border-gray-700 text-white placeholder-white/40' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'} w-full px-4 py-3.5 rounded-md border focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`;
  const selectStyle = `${dark ? 'bg-gray-800/70 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} w-full px-4 py-3.5 rounded-md border focus:ring-2 focus:ring-red-500 focus:border-transparent`;

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'} transition-colors duration-300 relative overflow-hidden`}
    >
      {/* Dynamic Mouse-Following Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: dark 
            ? `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.1) 30%, rgba(0, 0, 0, 0.8) 70%, black 100%)`
            : `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 30%, rgba(255, 255, 255, 0.9) 70%, white 100%)`
        }}
        animate={{
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary Glow Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(239, 68, 68, 0.1) 0%, transparent 60%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Film Grain Effect */}
        <motion.div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px'
          }}
          animate={{ opacity: [0.01, 0.02, 0.01] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Cinematic Light Rays */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${20 + i * 30}%`,
              top: '-10%',
              width: '2px',
              height: '120%',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(239, 68, 68, 0.3) 20%, rgba(239, 68, 68, 0.1) 50%, transparent 100%)',
              transform: `rotate(${-5 + i * 2}deg)`,
              filter: 'blur(1px)'
            }}
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scaleY: [1, 1.1, 1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Lens Flare Elements */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`flare-${i}`}
            className="absolute rounded-full blur-sm"
            style={{
              right: `${10 + i * 40}%`,
              top: `${15 + i * 20}%`,
              width: `${6 + i * 4}px`,
              height: `${6 + i * 4}px`,
              background: `radial-gradient(circle, rgba(239, 68, 68, ${0.4 - i * 0.1}) 0%, transparent 70%)`
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 4,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating Dust Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${5 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
              width: '1px',
              height: '1px',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.5)'
            }}
            animate={{
              y: [0, -60, -120],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 12 + i,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* NAV */}
      <motion.header 
        className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-50 backdrop-blur-sm"
        style={{ y }}
      >
        <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.img 
            src={logo} 
            alt="Trihari Universal" 
            className="h-12 w-12 object-contain rounded-full"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          />
          <span className="hidden sm:inline-block font-semibold tracking-wide">Trihari Universal</span>
        </motion.div>
        <nav className="flex items-center gap-6">
          {['Work', 'Services', 'About', 'Audition', 'Contact'].map((item, i) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="hover:text-red-500 transition-colors duration-300 relative"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
          <motion.button 
            onClick={()=>setDark(!dark)} 
            className="ml-2 px-3 py-1 border rounded-md text-sm hover:bg-red-500 hover:border-red-500 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {dark ? 'Light' : 'Dark'}
          </motion.button>
        </nav>
      </motion.header>

      {/* HERO */}
      <motion.section 
        ref={heroRef}
        className="relative overflow-hidden min-h-screen flex items-center"
        style={{
          background: dark 
            ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.9) 50%, rgba(0, 0, 0, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.9) 50%, rgba(255, 255, 255, 0.95) 100%)'
        }}
      >
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30"></div>
        
        {/* Film Border Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold leading-tight"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              Cinematic stories. 
              <motion.span 
                className="text-red-500 block mt-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Bold visuals.
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 max-w-xl text-lg opacity-80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 0.8, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
            >
              Trihari Universal — a full-service production house crafting films, commercials and branded content with cinematic scale and storytelling edge.
            </motion.p>
            
            <motion.div 
              className="mt-8 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <motion.a 
                href="#work" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-sm font-medium relative overflow-hidden group tracking-wide"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="relative z-10">VIEW WORK</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-800"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <motion.a 
                href="#audition" 
                className={`inline-block ${dark ? 'border-white/20 hover:border-red-500 hover:text-red-500' : 'border-gray-900/20 hover:border-red-500 hover:text-red-500'} border-2 px-8 py-4 rounded-sm font-medium tracking-wide transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                APPLY FOR AUDITION
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 50]) }}
          >
            <motion.div 
              className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative group border border-gray-700/30"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Coming Soon Content */}
              <div className="text-center relative z-10">
                {/* Trihari Universal Logo */}
                <motion.div 
                  className="mb-6"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={heroInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.6 }}
                >
                  <motion.img 
                    src={logo} 
                    alt="Trihari Universal Logo" 
                    className="h-16 w-16 object-contain mx-auto opacity-90 rounded-full"
                    animate={{ 
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>

                <motion.h3 
                  className="text-4xl md:text-5xl font-black tracking-wider mb-2 text-white"
                  style={{
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  COMING
                </motion.h3>
                
                <motion.h3 
                  className="text-4xl md:text-5xl font-black tracking-wider mb-6 text-blue-400"
                  style={{
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  SOON
                </motion.h3>
                
                <motion.div 
                  className="flex items-center justify-center gap-4 mb-4"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="h-px bg-blue-500/60 flex-1 max-w-16"></div>
                  <span className="text-xs uppercase tracking-widest text-blue-400/80 font-medium">
                    Feature Film
                  </span>
                  <div className="h-px bg-blue-500/60 flex-1 max-w-16"></div>
                </motion.div>
                
                <motion.p 
                  className="text-sm text-blue-300/70 font-medium"
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  Next Production
                </motion.p>
              </div>
              
              {/* Subtle Cinematic Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent rounded-xl"
                animate={{ 
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Film Scanlines */}
              <div className="absolute inset-0 opacity-5 rounded-xl" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.1) 2px, rgba(59,130,246,0.1) 4px)'
              }}></div>
              
              {/* Elegant Corner Frames */}
              <div className="absolute top-4 left-4">
                <div className="w-6 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
                <div className="w-px h-6 bg-gradient-to-b from-blue-400/60 to-transparent"></div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-6 h-px bg-gradient-to-l from-blue-400/60 to-transparent ml-auto"></div>
                <div className="w-px h-6 bg-gradient-to-b from-blue-400/60 to-transparent ml-auto"></div>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="w-px h-6 bg-gradient-to-t from-blue-400/60 to-transparent mb-auto"></div>
                <div className="w-6 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="w-px h-6 bg-gradient-to-t from-blue-400/60 to-transparent ml-auto mb-auto"></div>
                <div className="w-6 h-px bg-gradient-to-l from-blue-400/60 to-transparent ml-auto"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* WORK SECTION */}
      <motion.section 
        id="work" 
        className="max-w-7xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm uppercase opacity-70 tracking-wider">Our Portfolio</h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">Featured Work</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Corporate Documentary', category: 'Film', desc: 'Award-winning documentary series' },
            { title: 'Brand Campaign', category: 'Commercial', desc: 'Multi-platform advertising campaign' },
            { title: 'Music Video', category: 'Music', desc: 'Cinematic music video production' },
            { title: 'Product Launch', category: 'Commercial', desc: 'High-end product showcase' },
            { title: 'Short Film', category: 'Film', desc: 'Festival-selected narrative film' },
            { title: 'Event Coverage', category: 'Documentary', desc: 'Live event documentation' }
          ].map((project, i) => (
            <motion.div
              key={i}
              className={`group cursor-pointer relative overflow-hidden rounded-sm ${dark ? 'bg-gray-900/50' : 'bg-gray-100/50'} hover:shadow-xl transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative">
                <div className="text-4xl opacity-30">🎬</div>
                <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider opacity-60">{project.category}</span>
                  <span className="text-red-500 text-xs">View →</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                <p className="text-sm opacity-80">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SERVICES */}
      <motion.section 
        id="services" 
        ref={servicesRef}
        className="relative py-20 overflow-hidden"
        style={{
          background: dark 
            ? 'linear-gradient(135deg, rgba(5, 5, 5, 0.98) 0%, rgba(15, 15, 15, 0.95) 50%, rgba(5, 5, 5, 0.98) 100%)'
            : 'linear-gradient(135deg, rgba(245, 245, 245, 0.98) 0%, rgba(235, 235, 235, 0.95) 50%, rgba(245, 245, 245, 0.98) 100%)'
        }}
      >
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Film Grain */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px'
          }} />
          
          {/* Cinematic Light Beams */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`beam-${i}`}
              className="absolute opacity-[0.04]"
              style={{
                left: `${30 + i * 40}%`,
                top: '-20%',
                width: '1px',
                height: '140%',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
                transform: `rotate(${-3 + i * 6}deg)`,
                filter: 'blur(0.5px)'
              }}
              animate={{
                opacity: [0.02, 0.08, 0.02],
                scaleY: [1, 1.05, 1]
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                delay: i * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] mb-4 px-4 py-2 rounded-sm bg-white/5 border border-white/10 backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={servicesInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)'
              }}
            >
              <span className="text-red-400">What We Do</span>
              <span className="opacity-60">•</span>
              <span className="text-blue-400">Excellence</span>
            </motion.div>
            
            <motion.h2 
              className={`text-4xl md:text-5xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-black'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                textShadow: dark 
                  ? '0 0 30px rgba(255, 255, 255, 0.3)'
                  : '0 0 20px rgba(0, 0, 0, 0.1)',
                transition: 'none !important',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              Our Services
            </motion.h2>

            <motion.div 
              className="flex items-center justify-center gap-4 mt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={servicesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="h-px bg-gradient-to-r from-red-500/40 to-transparent w-20" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/60">From Concept to Screen</span>
              <div className="h-px bg-gradient-to-l from-blue-500/40 to-transparent w-20" />
            </motion.div>
          </motion.div>

          {/* Enhanced Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i} 
                className={`relative overflow-hidden group cursor-pointer h-80 flex flex-col`}
                initial={{ opacity: 0, y: 40 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                whileHover={{ 
                  scale: 1.03,
                  y: -5
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center"
                }}
              >
                {/* Card Background with Cinematic Effects */}
                <div className={`p-8 rounded-2xl border backdrop-blur-sm transition-all duration-500 h-full flex flex-col ${
                  dark 
                    ? 'bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 border-gray-700/50 hover:border-blue-500/60' 
                    : 'bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90 border-gray-200/50 hover:border-blue-500/60'
                } group-hover:shadow-2xl group-hover:shadow-blue-500/15`}>
                  
                  {/* Service Icon/Number */}
                  <motion.div 
                    className="mb-6 relative flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 via-blue-500/15 to-blue-600/25 flex items-center justify-center border border-blue-400/30 relative overflow-hidden">
                      <span className="text-xl font-bold text-blue-400 relative z-10">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-blue-400/10 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 flex-grow flex flex-col">
                    <motion.h3 
                      className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300 flex-shrink-0"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {s.title}
                    </motion.h3>
                    
                    <p className="text-sm opacity-80 leading-relaxed mb-4 flex-grow">
                      {s.desc}
                    </p>
                    
                    <div className="text-xs opacity-60 uppercase tracking-wider flex-shrink-0">
                      Full production, equipment, crew and post.
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-blue-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    initial={{ scale: 0.8, rotate: 0 }}
                    whileHover={{ scale: 1, rotate: 180 }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  {/* Top accent line */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                    <div className="w-4 h-px bg-gradient-to-l from-blue-400/80 to-transparent" />
                    <div className="w-px h-4 bg-gradient-to-b from-blue-400/80 to-transparent ml-auto" />
                  </div>

                  {/* Floating particles on hover */}
                  {[...Array(3)].map((_, pi) => (
                    <motion.div
                      key={`particle-${i}-${pi}`}
                      className="absolute w-0.5 h-0.5 bg-blue-400/60 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${30 + pi * 20}%`,
                        top: `${40 + (pi % 2) * 30}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2 + pi * 0.5,
                        repeat: Infinity,
                        delay: pi * 0.3,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}

                  {/* Additional blue glow particle */}
                  <motion.div
                    className="absolute w-0.5 h-0.5 bg-blue-400/60 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      right: '25%',
                      bottom: '30%',
                    }}
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 0.5,
                      ease: 'easeInOut'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#contact"
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm ${
                dark 
                  ? 'bg-gradient-to-r from-blue-600/20 via-blue-500/15 to-blue-600/20 hover:from-blue-600/30 hover:via-blue-500/25 hover:to-blue-600/30 border border-blue-500/40 hover:border-blue-400/60 text-blue-300 hover:text-blue-200'
                  : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 border border-blue-500 hover:border-blue-600 text-white hover:text-gray-100'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                boxShadow: dark 
                  ? '0 8px 32px rgba(59, 130, 246, 0.15)'
                  : '0 8px 32px rgba(59, 130, 246, 0.25)'
              }}
            >
              <span>Discuss Your Project</span>
              <span className={dark ? 'text-blue-400' : 'text-white'}>→</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <motion.section 
        id="about" 
        className="relative py-20 overflow-hidden"
        style={{
          background: dark 
            ? 'linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.9) 50%, rgba(15, 15, 15, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(250, 250, 250, 0.95) 0%, rgba(240, 240, 240, 0.9) 50%, rgba(250, 250, 250, 0.95) 100%)'
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase opacity-70 tracking-wider">About Us</h3>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Crafting Visual Stories</h2>
              <p className="text-lg opacity-80 leading-relaxed mb-6">
                Founded with a vision to create compelling visual narratives, Trihari Universal has emerged as a leading production house specializing in films, commercials, and branded content.
              </p>
              <p className="opacity-70 leading-relaxed mb-8">
                Our team of experienced filmmakers, directors, and creative professionals brings stories to life through innovative cinematography, cutting-edge post-production, and meticulous attention to detail.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-red-500">50+</div>
                  <div className="text-sm opacity-70">Projects Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">15+</div>
                  <div className="text-sm opacity-70">Award Wins</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">100+</div>
                  <div className="text-sm opacity-70">Happy Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">5+</div>
                  <div className="text-sm opacity-70">Years Experience</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div 
                className="aspect-square rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative group border border-gray-700/30"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* About Banner Content */}
                <div className="text-center relative z-10 p-8">
                  {/* Trihari Universal Logo */}
                  <motion.div 
                    className="mb-6"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.img 
                      src={logo} 
                      alt="Trihari Universal Logo" 
                      className="h-20 w-20 object-contain mx-auto opacity-90 rounded-full"
                      animate={{ 
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                      }}
                      whileHover={{ scale: 1.1 }}
                    />
                  </motion.div>

                  <motion.h3 
                    className="text-2xl md:text-3xl font-black tracking-wider mb-2 text-white"
                    style={{
                      textShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    OUR LEGACY
                  </motion.h3>
                  
                  <motion.h4 
                    className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-blue-400"
                    style={{
                      textShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    viewport={{ once: true }}
                  >
                    IN MOTION
                  </motion.h4>
                  
                  <motion.div 
                    className="flex items-center justify-center gap-3 mb-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-px bg-blue-500/60 flex-1 max-w-12"></div>
                    <span className="text-xs uppercase tracking-widest text-blue-400/80 font-medium">
                      Since 2019
                    </span>
                    <div className="h-px bg-blue-500/60 flex-1 max-w-12"></div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-sm text-blue-300/70 font-medium mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    Crafting Stories
                  </motion.p>

                  <motion.div 
                    className="text-xs text-gray-400/60 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    viewport={{ once: true }}
                  >
                    Excellence • Innovation • Impact
                  </motion.div>
                </div>
                
                {/* Subtle Cinematic Glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent rounded-xl"
                  animate={{ 
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Film Scanlines */}
                <div className="absolute inset-0 opacity-5 rounded-xl" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.1) 2px, rgba(59,130,246,0.1) 4px)'
                }}></div>
                
                {/* Elegant Corner Frames */}
                <div className="absolute top-4 left-4">
                  <div className="w-6 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
                  <div className="w-px h-6 bg-gradient-to-b from-blue-400/60 to-transparent"></div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-px bg-gradient-to-l from-blue-400/60 to-transparent ml-auto"></div>
                  <div className="w-px h-6 bg-gradient-to-b from-blue-400/60 to-transparent ml-auto"></div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-px h-6 bg-gradient-to-t from-blue-400/60 to-transparent mb-auto"></div>
                  <div className="w-6 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-px h-6 bg-gradient-to-t from-blue-400/60 to-transparent ml-auto mb-auto"></div>
                  <div className="w-6 h-px bg-gradient-to-l from-blue-400/60 to-transparent ml-auto"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* AUDITION FORM SECTION */}
      <motion.section 
        id="audition" 
        className="relative py-20 overflow-hidden"
        style={{
          background: dark 
            ? 'linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.9) 50%, rgba(15, 15, 15, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(250, 250, 250, 0.95) 0%, rgba(240, 240, 240, 0.9) 50%, rgba(250, 250, 250, 0.95) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-sm uppercase opacity-70 tracking-wider">Join Our Team</h3>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Apply For Audition</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Showcase your talent and become part of our creative journey. Submit your portfolio and details below.
            </p>
          </motion.div>

          {/* Audition Banner */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center relative border border-blue-500/20"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)'
              }}
            >
              {/* Content */}
              <div className="relative z-10 text-center px-6">
                {/* Trihari Universal Logo */}
                <motion.div 
                  className="mb-4"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.img 
                    src={logo} 
                    alt="Trihari Universal Logo" 
                    className="h-12 w-12 object-contain mx-auto opacity-80 rounded-full ring-1 ring-blue-400/30"
                    animate={{ 
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300/90 border border-blue-400/30 px-4 py-1.5 rounded-sm text-xs uppercase tracking-[0.2em] backdrop-blur-sm mb-3"
                  style={{
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                  }}
                >
                  <span className="inline-block text-red-400">Open</span>
                  <span className="opacity-60">•</span>
                  <span className="inline-block">Auditions</span>
                  <span className="opacity-60">•</span>
                  <span className="inline-block text-blue-400">2025</span>
                </motion.div>

                <motion.h3 
                  className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  Your Next Role Starts Here
                </motion.h3>

                <motion.div 
                  className="flex items-center justify-center gap-3 mb-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="h-px bg-gradient-to-r from-blue-500/60 to-transparent w-16" />
                  <span className="text-[11px] uppercase tracking-[0.25em] text-blue-300/70">Ready • Set • Action</span>
                  <div className="h-px bg-gradient-to-l from-blue-500/60 to-transparent w-16" />
                </motion.div>

                <motion.p 
                  className="text-sm md:text-base text-blue-200/80 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Submit your profile. Shortlisted candidates will be contacted.
                </motion.p>

                <motion.div 
                  className="flex items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {['🎬', '🎭', '🎪'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="text-lg opacity-60"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 0.8, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Enhanced Blue Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-blue-800/10 to-transparent"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Additional Blue Glow Layers */}
              <div className="absolute inset-0 bg-gradient-radial from-blue-400/10 via-transparent to-transparent" />
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-blue-400/20 blur-3xl rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Film Strip Elements */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-500/20 to-transparent">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute bg-blue-600/30 rounded-sm" style={{
                    left: '4px',
                    top: `${15 + i * 15}%`,
                    width: '4px',
                    height: '8px'
                  }} />
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-blue-500/20 to-transparent">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute bg-blue-600/30 rounded-sm" style={{
                    right: '4px',
                    top: `${15 + i * 15}%`,
                    width: '4px',
                    height: '8px'
                  }} />
                ))}
              </div>

              {/* Enhanced Scanlines + grid */}
              <div className="absolute inset-0 opacity-[0.08]" style={{backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(59,130,246,0.3) 2px,rgba(59,130,246,0.3) 4px)'}} />
              <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:'linear-gradient(to right, rgba(59,130,246,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.2) 1px, transparent 1px)', backgroundSize:'24px 24px'}} />

              {/* Enhanced Corner Frames with Blue Glow */}
              <div className="absolute top-4 left-4">
                <div className="w-8 h-px bg-gradient-to-r from-blue-400/80 to-transparent" style={{boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'}}></div>
                <div className="w-px h-8 bg-gradient-to-b from-blue-400/80 to-transparent" style={{boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'}}></div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-8 h-px bg-gradient-to-l from-blue-400/80 to-transparent ml-auto" style={{boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'}}></div>
                <div className="w-px h-8 bg-gradient-to-b from-blue-400/80 to-transparent ml-auto" style={{boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'}}></div>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="w-px h-8 bg-gradient-to-t from-blue-400/80 to-transparent mb-auto" style={{boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'}}></div>
                <div className="w-8 h-px bg-gradient-to-r from-blue-400/80 to-transparent" style={{boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'}}></div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="w-px h-8 bg-gradient-to-t from-blue-400/80 to-transparent ml-auto mb-auto" style={{boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'}}></div>
                <div className="w-8 h-px bg-gradient-to-l from-blue-400/80 to-transparent ml-auto" style={{boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'}}></div>
              </div>

              {/* Floating Particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`${dark ? 'bg-gray-900/60 border-gray-800' : 'bg-white/70 border-gray-200'} border rounded-lg p-8 shadow-lg backdrop-blur-sm`}
            onSubmit={handleFormSubmit}
          >
            {/* BASIC DETAILS */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-red-500">Basic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    autoComplete="address-level2"
                    placeholder="Mumbai, Hyderabad, Chennai..."
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    placeholder="+91 92596 09995"
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    autoComplete="bday"
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <select
                    name="gender"
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-Binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PROFILE */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-red-500">Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Experience *</label>
                  <select
                    name="experience"
                    required
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  >
                    <option value="">Select years</option>
                    <option value="0">0 years</option>
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5+ years</option>
                    <option value="10">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Skills *</label>
                  <input
                    type="text"
                    name="skills"
                    required
                    placeholder="Acting, Dancing, Voiceover, Stunts..."
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram Profile</label>
                  <input
                    type="url"
                    name="instagram"
                    placeholder="https://instagram.com/username"
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">YouTube / Portfolio Link</label>
                  <input
                    type="url"
                    name="portfolio"
                    placeholder="https://youtube.com/... or portfolio URL"
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
              </div>
            </div>

            {/* HEADSHOT / DOCUMENT */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-red-500">Headshot / Document</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <label className="block text-sm font-medium mb-2">Upload (Image or PDF)</label>
                  <input
                    type="file"
                    name="headshot"
                    accept="image/*,application/pdf"
                    className={`w-full px-4 py-2 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                  <p className="text-xs opacity-60 mt-2">Max 10MB. JPG/PNG or a single PDF.</p>
                </div>
                <div className={`${dark ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-md p-4`}>
                  <p className="text-sm opacity-80">Tip: Use a recent, well-lit headshot with a neutral background.</p>
                </div>
              </div>
            </div>

            {/* CONSENT */}
            <div className="mb-8">
              <label className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1" />
                <span className="text-sm">I confirm my details are accurate and consent to be contacted for casting opportunities *</span>
              </label>
            </div>

            {/* SUBMIT */}
            <div className="text-center">
              <motion.button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-md font-medium tracking-wide"
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                SUBMIT APPLICATION
              </motion.button>
              <p className="text-xs opacity-60 mt-3">You’ll receive a confirmation email if shortlisted.</p>
            </div>
          </motion.form>
        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section 
        id="contact" 
        className="max-w-7xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-sm uppercase opacity-70 tracking-wider">Get In Touch</h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Let's Create Together</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Ready to bring your vision to life? Contact us to discuss your next project and discover how we can help tell your story.
          </p>
        </motion.div>

        {/* Founders Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <div className="flex justify-center mb-8">
            {/* Founder - Siddhant Badhani */}
            <motion.div
              className="relative group flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-500/20 via-gray-600/30 to-blue-600/20 border-2 border-blue-400/30 flex items-center justify-center relative overflow-hidden backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-300">
                {/* Placeholder content */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-400/40 to-blue-600/40 flex items-center justify-center">
                  <span className="text-3xl md:text-4xl opacity-70">👤</span>
                </div>
                
                {/* Animated border */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-blue-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-full bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Outer glow ring */}
                <motion.div 
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400/30 via-blue-500/40 to-blue-400/30 opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Founder info */}
              <div className="text-center mt-4 flex flex-col items-center">
                <h4 className="font-semibold text-base md:text-lg mb-1">Siddhant Badhani</h4>
                <p className="text-sm md:text-base opacity-70 mb-2">Founder & Creative Director</p>
                
                {/* Additional glow accent under text */}
                <motion.div 
                  className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Connect text */}
          <motion.p 
            className="text-center text-sm md:text-base opacity-80 max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Connect with our founder to discuss your vision and bring your creative projects to life.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '📧', title: 'Email', detail: 'trihariuniversal@gmail.com', link: 'mailto:trihariuniversal@gmail.com' },
            { icon: '📱', title: 'Phone', detail: '+91 92596 09995', link: 'tel:+919259609995' },
            { icon: '📍', title: 'Studio', detail: 'Mumbai, India', link: '#' }
          ].map((contact, i) => (
            <motion.a
              key={i}
              href={contact.link}
              className={`block p-8 rounded-2xl border transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group relative overflow-hidden ${
                dark 
                  ? 'border-gray-800 hover:border-blue-500/50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20' 
                  : 'border-gray-200 hover:border-blue-500/50 bg-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/10'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ rotateY: 2 }}
              style={{ 
                transformStyle: "preserve-3d"
              }}
            >
              {/* Card Content */}
              <div className="text-center relative z-10">
                <motion.div 
                  className="text-4xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                  whileHover={{ scale: 1.2 }}
                >
                  {contact.icon}
                </motion.div>
                <h3 className="font-semibold mb-2 text-xl group-hover:text-blue-500 transition-colors">
                  {contact.title}
                </h3>
                <p className={`${dark ? 'opacity-80' : 'opacity-70'} mb-4 text-sm`}>
                  {contact.detail}
                </p>
                
                {/* Call to Action */}
                <motion.div 
                  className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                    dark 
                      ? 'text-blue-400 bg-blue-500/10 group-hover:bg-blue-500/20' 
                      : 'text-blue-600 bg-blue-50 group-hover:bg-blue-100'
                  } group-hover:gap-3`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Connect</span>
                  <motion.span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>

              {/* Card Hover Effects */}
              <motion.div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: dark 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 50%, rgba(59, 130, 246, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(59, 130, 246, 0.01) 50%, rgba(59, 130, 246, 0.03) 100%)'
                }}
              />

              {/* Card Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: dark 
                    ? 'inset 0 0 20px rgba(59, 130, 246, 0.1)'
                    : 'inset 0 0 20px rgba(59, 130, 246, 0.05)'
                }}
              />

              {/* Top accent line */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
              />

              {/* Bottom accent line */}
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center delay-100"
              />

              {/* Floating particles */}
              {[...Array(2)].map((_, pi) => (
                <motion.div
                  key={`particle-${i}-${pi}`}
                  className="absolute w-1 h-1 bg-blue-400/60 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    left: `${30 + pi * 40}%`,
                    top: `${25 + pi * 50}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0, 0.8, 0],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2 + pi,
                    repeat: Infinity,
                    delay: pi * 0.5,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer 
        className="border-t border-gray-800/60 mt-4 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img 
              src={logo} 
              alt="logo" 
              className="h-10 w-10 rounded-full"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            />
            <div className="text-sm opacity-80">© {new Date().getFullYear()} Trihari Universal</div>
          </motion.div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms'].map((item, i) => (
              <motion.a 
                key={item}
                href="#" 
                className="text-sm opacity-80 hover:opacity-100 hover:text-red-500 transition-all duration-300"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.div 
              className="text-sm opacity-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              transition={{ delay: 0.2 }}
            >
              trihariuniversal@gmail.com
            </motion.div>
          </div>
        </div>
      </motion.footer>

    </div>
  )
}
