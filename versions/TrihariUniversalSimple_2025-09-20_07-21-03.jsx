/*
Trihari Universal — Simplified version for debugging
*/

import React, {useState, useRef, useEffect} from 'react'
import {motion, useInView, useScroll, useTransform} from 'framer-motion'

export default function TrihariUniversalSimple(){
  const [dark, setDark] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
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

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`${dark ? 'bg-gray-900/60 border-gray-800' : 'bg-white/70 border-gray-200'} border rounded-lg p-8 shadow-lg backdrop-blur-sm`}
            onSubmit={(e) => e.preventDefault()}
          >
            {/* BASIC DETAILS */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-red-500">Basic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
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
                    required
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <input
                    type="date"
                    autoComplete="bday"
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <select
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
                    required
                    placeholder="Acting, Dancing, Voiceover, Stunts..."
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram Profile</label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/username"
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">YouTube / Portfolio Link</label>
                  <input
                    type="url"
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
