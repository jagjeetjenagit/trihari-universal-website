/*
Trihari Universal — Simplified version for debugging
*/

import React, {useState, useRef, useEffect} from 'react'
import {motion, useInView, useScroll, useTransform} from 'framer-motion'

export default function TrihariUniversalSimple(){
  const [dark, setDark] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  
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

  const services = [
    {title: 'Film Production', desc: 'End-to-end feature & short film production.'},
    {title: 'Commercials & Ads', desc: 'High-impact ad films and branded content.'},
    {title: 'Post Production', desc: 'Editing, color grading, VFX and sound design.'},
    {title: 'Music & Sound', desc: 'Original score, mixing and sound supervision.'}
  ]

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
            src="/circular logog trihari.png" 
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
                    src="/circular logog trihari.png" 
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
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-sm uppercase opacity-70">What we do</h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Services</h2>
        </motion.div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              className={`p-6 rounded-2xl border ${dark ? 'border-gray-800 hover:border-red-500/50' : 'border-gray-200 hover:border-red-500/50'} bg-opacity-20 relative overflow-hidden group transition-all duration-300 hover:shadow-2xl cursor-pointer`}
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                rotateX: 5,
                z: 50
              }}
              style={{ 
                transformStyle: "preserve-3d",
                transformOrigin: "center center"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 0, rotate: 0 }}
                whileHover={{ scale: 1, rotate: 180 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="relative z-10">
                <motion.div 
                  className="text-xl font-semibold"
                  whileHover={{ scale: 1.05, color: "#ef4444" }}
                  transition={{ duration: 0.2 }}
                >
                  {s.title}
                </motion.div>
                <div className="mt-3 text-sm opacity-80">{s.desc}</div>
                <div className="mt-4 text-xs opacity-60">Full production, equipment, crew and post.</div>
              </div>
            </motion.div>
          ))}
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
                      src="/circular logog trihari.png" 
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
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Audition Banner */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-8"
            >
              <motion.div 
                className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative group border border-gray-700/30"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Audition Banner Content */}
                <div className="text-center relative z-10 p-8">
                  {/* Spotlight Icon/Logo */}
                  <motion.div 
                    className="mb-6"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(168, 85, 247, 0.4)',
                          '0 0 40px rgba(168, 85, 247, 0.6)',
                          '0 0 20px rgba(168, 85, 247, 0.4)'
                        ]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                      </svg>
                    </motion.div>
                  </motion.div>

                  <motion.h3 
                    className="text-3xl md:text-4xl font-black tracking-wider mb-2 text-white"
                    style={{
                      textShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    YOUR STAGE
                  </motion.h3>
                  
                  <motion.h4 
                    className="text-2xl md:text-3xl font-bold tracking-wide mb-6 text-purple-400"
                    style={{
                      textShadow: '0 0 15px rgba(168, 85, 247, 0.4)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    viewport={{ once: true }}
                  >
                    AWAITS
                  </motion.h4>
                  
                  <motion.div 
                    className="flex items-center justify-center gap-3 mb-6"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-px bg-purple-500/60 flex-1 max-w-12"></div>
                    <span className="text-xs uppercase tracking-widest text-purple-400/80 font-medium">
                      Auditions Open
                    </span>
                    <div className="h-px bg-purple-500/60 flex-1 max-w-12"></div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-sm text-purple-300/80 font-medium mb-4 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    Showcase your talent and join our creative journey. Every great story needs exceptional performers.
                  </motion.p>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-xs text-gray-400/80 font-medium">
                      ✨ All Categories Welcome
                    </div>
                    <div className="text-xs text-gray-400/80 font-medium">
                      🎬 Professional Productions
                    </div>
                    <div className="text-xs text-gray-400/80 font-medium">
                      🌟 Career Opportunities
                    </div>
                  </motion.div>
                </div>
                
                {/* Cinematic Effects */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent rounded-xl"
                  animate={{ 
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Spotlight Effect */}
                <motion.div 
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
                  }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Film Scanlines */}
                <div className="absolute inset-0 opacity-5 rounded-xl" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,85,247,0.1) 2px, rgba(168,85,247,0.1) 4px)'
                }}></div>
                
                {/* Corner Frames */}
                <div className="absolute top-4 left-4">
                  <div className="w-6 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
                  <div className="w-px h-6 bg-gradient-to-b from-purple-400/60 to-transparent"></div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-px bg-gradient-to-l from-purple-400/60 to-transparent ml-auto"></div>
                  <div className="w-px h-6 bg-gradient-to-b from-purple-400/60 to-transparent ml-auto"></div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-px h-6 bg-gradient-to-t from-purple-400/60 to-transparent mb-auto"></div>
                  <div className="w-6 h-px bg-gradient-to-r from-purple-400/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-px h-6 bg-gradient-to-t from-purple-400/60 to-transparent ml-auto mb-auto"></div>
                  <div className="w-6 h-px bg-gradient-to-l from-purple-400/60 to-transparent ml-auto"></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Audition Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h3 className="text-sm uppercase opacity-70 tracking-wider">Join Our Team</h3>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Apply For Audition</h2>
                <p className="text-lg opacity-80">
                  Submit your details and portfolio below to be considered for our upcoming productions.
                </p>
              </div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${dark ? 'bg-gray-900/50 border-gray-800' : 'bg-white/50 border-gray-200'} border rounded-lg p-8 shadow-xl backdrop-blur-sm h-[600px] flex flex-col`}
          >
            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-500">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm opacity-60">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  initial={{ width: "25%" }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-hidden">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <h3 className="text-xl font-semibold mb-6 text-purple-500">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input 
                          type="text" 
                          className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <input 
                          type="email" 
                          className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <input 
                          type="tel" 
                          className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                        <input 
                          type="date" 
                          className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Gender *</label>
                        <select className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}>
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">City *</label>
                        <input 
                          type="text" 
                          className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                          placeholder="Your current city"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Professional Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <h3 className="text-xl font-semibold mb-6 text-purple-500">Professional Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <select className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}>
                          <option value="">Select Category</option>
                          <option value="actor">Actor</option>
                          <option value="actress">Actress</option>
                          <option value="model">Model</option>
                          <option value="dancer">Dancer</option>
                          <option value="singer">Singer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Experience Level *</label>
                        <select className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}>
                          <option value="">Select Experience</option>
                          <option value="beginner">Beginner (0-1 years)</option>
                          <option value="intermediate">Intermediate (2-5 years)</option>
                          <option value="experienced">Experienced (5+ years)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Skills & Specializations *</label>
                      <textarea 
                        rows="4"
                        className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none`}
                        placeholder="List your key skills, specializations, and talents..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Languages Known *</label>
                      <input 
                        type="text" 
                        className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                        placeholder="Hindi, English, Telugu, Tamil..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Portfolio & Media */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <h3 className="text-xl font-semibold mb-6 text-purple-500">Portfolio & Media</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Profile Photo *</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Demo Reel</label>
                        <input 
                          type="file" 
                          accept="video/*"
                          className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Social Media Links</label>
                      <input 
                        type="url" 
                        className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                        placeholder="Instagram, YouTube, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Previous Work Experience</label>
                      <textarea 
                        rows="5"
                        className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none`}
                        placeholder="List your previous films, TV shows, commercials, theater work..."
                      ></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Final Details */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <h3 className="text-xl font-semibold mb-6 text-purple-500">Final Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Why Trihari Universal? *</label>
                      <textarea 
                        rows="4"
                        className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none`}
                        placeholder="Tell us why you want to work with Trihari Universal..."
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Availability *</label>
                        <select className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}>
                          <option value="">Select Availability</option>
                          <option value="immediately">Immediately</option>
                          <option value="within-month">Within a month</option>
                          <option value="within-3months">Within 3 months</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Willing to Travel</label>
                        <select className={`w-full px-4 py-3 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}>
                          <option value="">Select Option</option>
                          <option value="yes">Yes, anywhere</option>
                          <option value="limited">Limited travel</option>
                          <option value="no">No travel</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="text-purple-500 focus:ring-purple-500" required />
                        <span className="text-sm">I declare that all information provided is accurate and consent to its use for audition purposes.</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-700/30">
              <motion.button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  currentStep === 1 
                    ? 'opacity-50 cursor-not-allowed bg-gray-700' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
                whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
                whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
              >
                Previous
              </motion.button>
              
              {currentStep < totalSteps ? (
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next Step
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Application
                </motion.button>
              )}
            </div>
          </motion.form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section 
        id="contact" 
        className="max-w-7xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                  <input 
                    type="date" 
                    className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Gender *</label>
                  <select className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-Binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </motion.div>
              </div>
            </div>

            {/* PHYSICAL CHARACTERISTICS */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-red-500">Physical Characteristics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Height *</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      className={`flex-1 px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                      placeholder="170"
                    />
                    <span className="px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-sm text-sm flex items-center">cm</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Weight *</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      className={`flex-1 px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                      placeholder="65"
                    />
                    <span className="px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-sm text-sm flex items-center">kg</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Body Type</label>
                  <select className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}>
                    <option value="">Select Body Type</option>
                    <option value="slim">Slim</option>
                    <option value="athletic">Athletic</option>
                    <option value="medium">Medium Build</option>
                    <option value="heavy">Heavy Build</option>
                    <option value="muscular">Muscular</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Eye Color</label>
                  <select className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}>
                    <option value="">Select Eye Color</option>
                    <option value="brown">Brown</option>
                    <option value="black">Black</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="hazel">Hazel</option>
                    <option value="gray">Gray</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Hair Color</label>
                  <select className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}>
                    <option value="">Select Hair Color</option>
                    <option value="black">Black</option>
                    <option value="brown">Brown</option>
                    <option value="blonde">Blonde</option>
                    <option value="red">Red</option>
                    <option value="gray">Gray/Silver</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Skin Tone</label>
                  <select className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}>
                    <option value="">Select Skin Tone</option>
                    <option value="fair">Fair</option>
                    <option value="medium">Medium</option>
                    <option value="olive">Olive</option>
                    <option value="tan">Tan</option>
                    <option value="dark">Dark</option>
                  </select>
                </motion.div>
              </div>
            </div>

            {/* PROFESSIONAL DETAILS */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-red-500">Professional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Acting Experience *</label>
                  <select className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}>
                    <option value="">Select Experience</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="experienced">Experienced (5-10 years)</option>
                    <option value="veteran">Veteran (10+ years)</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Current Location *</label>
                  <input 
                    type="text" 
                    className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                    placeholder="City, State"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <label className="block text-sm font-medium mb-2">Special Skills (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Dancing', 'Singing', 'Martial Arts', 'Horse Riding', 'Swimming', 'Driving', 'Musical Instruments', 'Languages', 'Comedy', 'Action Stunts', 'Voice Acting', 'Modeling'].map((skill, i) => (
                    <label key={skill} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        value={skill.toLowerCase().replace(' ', '-')}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 border-red-500 mr-3 relative`}>
                        <div className="w-2 h-2 rounded bg-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"></div>
                      </div>
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* PORTFOLIO & MEDIA */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-red-500">Portfolio & Media</h3>
              <div className="grid grid-cols-1 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Portfolio/Demo Reel URL *</label>
                  <input 
                    type="url" 
                    className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                    placeholder="https://your-portfolio-link.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.9 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Recent Headshot URL</label>
                  <input 
                    type="url" 
                    className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                    placeholder="https://link-to-your-headshot.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-2">Social Media/IMDB Profile</label>
                  <input 
                    type="url" 
                    className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Instagram, IMDB, or professional profile link"
                  />
                </motion.div>
              </div>
            </div>

            {/* ADDITIONAL INFORMATION */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-red-500">Additional Information</h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.1 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <label className="block text-sm font-medium mb-2">Previous Work Experience *</label>
                <textarea 
                  rows="4"
                  className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none`}
                  placeholder="List your previous films, TV shows, commercials, theater work, or any relevant experience..."
                ></textarea>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <label className="block text-sm font-medium mb-2">Why do you want to work with Trihari Universal? *</label>
                <textarea 
                  rows="3"
                  className={`w-full px-4 py-3 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none`}
                  placeholder="Tell us what attracts you to our projects and what you can bring to our team..."
                ></textarea>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.3 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 border-red-500 mr-3 relative`}>
                    <div className="w-2 h-2 rounded bg-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"></div>
                  </div>
                  <span className="text-sm">I am available for travel and flexible scheduling *</span>
                </label>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-sm font-medium tracking-wide relative overflow-hidden group"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="relative z-10">SUBMIT AUDITION APPLICATION</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-800"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <p className="text-xs opacity-60 mt-4">
                Our casting team will review your application and contact you within 5-7 business days if you're selected for the next round.
              </p>
            </motion.div>
          </motion.form>
            </motion.div>
          </div>
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '📧', title: 'Email', detail: 'info@trihariuniversal.com', link: 'mailto:info@trihariuniversal.com' },
            { icon: '📱', title: 'Phone', detail: '+91 98765 43210', link: 'tel:+919876543210' },
            { icon: '📍', title: 'Studio', detail: 'Mumbai, India', link: '#' }
          ].map((contact, i) => (
            <motion.a
              key={i}
              href={contact.link}
              className={`block p-8 rounded-sm border ${dark ? 'border-gray-800 hover:border-red-500/50' : 'border-gray-200 hover:border-red-500/50'} text-center transition-all duration-300 hover:shadow-lg group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-3xl mb-4">{contact.icon}</div>
              <h3 className="font-semibold mb-2 group-hover:text-red-500 transition-colors">{contact.title}</h3>
              <p className="opacity-80">{contact.detail}</p>
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
              src="/circular logog trihari.png" 
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
              info@trihariuniversal.com
            </motion.div>
          </div>
        </div>
      </motion.footer>

    </div>
  )
}
