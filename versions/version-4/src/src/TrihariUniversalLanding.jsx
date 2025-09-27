/*
Trihari Universal — Enhanced Single-file React component (Tailwind CSS)
Enhanced with scroll animations, glowing backgrounds, and parallax effects

How to use:
1. Place your logo asset in the public directory as:
   - /circular logog trihari.png
2. Install and configure Tailwind CSS in your React/Next project.
3. Drop this component into your pages or App and import Framer Motion if you want the animations to run.

This file is intentionally self-contained for layout and UI structure.
Replace placeholder images, videos, and copy with real content.
*/

import React, {useState, useEffect} from 'react'
import {motion, useScroll, useTransform, useInView} from 'framer-motion'

export default function TrihariUniversalLanding(){
  const [dark, setDark] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Scroll progress for parallax and 3D effects
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  // 3D Camera transformations based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -5, 5, -3, 3, 0])
  const rotateY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 2, -2, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0.95, 0.95, 1])
  const perspective = useTransform(scrollYProgress, [0, 0.5, 1], [1200, 800, 1200])
  
  // Enhanced 3D mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Enhanced animation variants with 3D transforms
  const fadeInUp3D = {
    hidden: { 
      y: 100, 
      opacity: 0, 
      rotateX: -15,
      transformPerspective: 1000
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      transformPerspective: 1000,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      } 
    }
  }
  
  const staggerChildren3D = {
    visible: { 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      } 
    }
  }
  
  const scaleIn3D = {
    hidden: { 
      scale: 0.6, 
      opacity: 0, 
      rotateY: -30,
      transformPerspective: 1000
    },
    visible: { 
      scale: 1, 
      opacity: 1, 
      rotateY: 0,
      transformPerspective: 1000,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 120
      } 
    }
  }

  const float3D = {
    animate: {
      y: [0, -20, 0],
      rotateX: [0, 5, 0],
      rotateY: [0, 10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const services = [
    {title: 'Film Production', desc: 'End-to-end feature & short film production.'},
    {title: 'Commercials & Ads', desc: 'High-impact ad films and branded content.'},
    {title: 'Post Production', desc: 'Editing, color grading, VFX and sound design.'},
    {title: 'Music & Sound', desc: 'Original score, mixing and sound supervision.'}
  ]

  const reels = [
    {title: 'Action Short', thumb: 'https://picsum.photos/seed/1/800/450'},
    {title: 'Branded Spot', thumb: 'https://picsum.photos/seed/2/800/450'},
    {title: 'Documentary Clip', thumb: 'https://picsum.photos/seed/3/800/450'},
    {title: 'Music Video', thumb: 'https://picsum.photos/seed/4/800/450'}
  ]

  return (
    <motion.div 
      className={`min-h-screen ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'} transition-colors duration-300 relative overflow-hidden`}
      style={{
        perspective: perspective,
        transformStyle: "preserve-3d"
      }}
    >
      
      {/* 3D Camera Container */}
      <motion.div
        className="relative w-full"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          transformOrigin: "center center"
        }}
      >
      
      {/* Enhanced Animated Background Elements with 3D */}
      <div className="fixed inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
        {/* 3D Gradient Orbs */}
        <motion.div 
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${dark ? '#ef4444' : '#dc2626'} 0%, transparent 70%)`,
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
            z: mousePosition.x * 0.1,
            left: '10%',
            top: '20%',
            transformStyle: "preserve-3d"
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            rotateX: [0, 15, 0],
            rotateY: [0, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute w-64 h-64 rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, ${dark ? '#3b82f6' : '#1d4ed8'} 0%, transparent 70%)`,
            x: mousePosition.x * -0.03,
            y: mousePosition.y * -0.03,
            z: mousePosition.y * -0.1,
            right: '15%',
            top: '60%',
            transformStyle: "preserve-3d"
          }}
          animate={{
            scale: [1.2, 0.8, 1.2],
            rotate: [360, 180, 0],
            rotateX: [0, -25, 0],
            rotateZ: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* 3D Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute rounded-full ${dark ? 'bg-gradient-to-br from-red-500/20 to-blue-500/20' : 'bg-gradient-to-br from-red-300/20 to-blue-300/20'}`}
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transformStyle: "preserve-3d"
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              rotateX: [0, 360, 0],
              rotateY: [0, -360, 0],
              rotateZ: [0, 180, 360],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Enhanced Floating Particles with 3D movement */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute rounded-full ${dark ? 'bg-white' : 'bg-gray-600'} opacity-30`}
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transformStyle: "preserve-3d"
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, 20, -10, 0],
              z: [0, 30, -20, 0],
              rotateX: [0, 360],
              rotateY: [0, -360],
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* 3D Morphing Background Grid */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(90deg, ${dark ? '#ef4444' : '#dc2626'} 1px, transparent 1px), 
                             linear-gradient(${dark ? '#ef4444' : '#dc2626'} 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            transformStyle: "preserve-3d"
          }}
          animate={{
            rotateX: [0, 5, -5, 0],
            rotateY: [0, -3, 3, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* 3D Enhanced Navigation */}
      <motion.header 
        className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-50"
        initial={{ y: -100, opacity: 0, rotateX: -90 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ 
          scale: 1.02, 
          rotateX: 2,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >
        <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.05, z: 20 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.img 
            src="/circular logog trihari.png" 
            alt="Trihari Universal" 
            className="h-12 w-12 object-contain rounded-full ring-2 ring-red-500/20"
            whileHover={{ 
              rotate: 360,
              rotateY: 180,
              scale: 1.2,
              boxShadow: `0 0 40px ${dark ? '#ef4444' : '#dc2626'}`,
              filter: "drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))"
            }}
            transition={{ duration: 1, type: "spring" }}
            style={{ transformStyle: "preserve-3d" }}
          />
          <span className="hidden sm:inline-block font-semibold tracking-wide">Trihari Universal</span>
        </motion.div>
        <nav className="flex items-center gap-6">
          {['Work', 'Services', 'About', 'Contact'].map((item, i) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="hover:underline relative group"
              initial={{ y: -20, opacity: 0, rotateX: -30 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
              whileHover={{ 
                y: -5, 
                rotateX: 5,
                scale: 1.1,
                textShadow: `0 0 10px ${dark ? '#ffffff' : '#000000'}`
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {item}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"
                whileHover={{ boxShadow: "0 0 10px #ef4444" }}
              />
            </motion.a>
          ))}
          <motion.button 
            onClick={()=>setDark(!dark)} 
            aria-label="toggle theme" 
            className="ml-2 px-3 py-1 border rounded-md text-sm relative overflow-hidden group"
            whileHover={{ 
              scale: 1.1, 
              rotateY: 10,
              boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.9, rotateY: -10 }}
            initial={{ rotate: 0 }}
            animate={{ rotate: dark ? 0 : 180 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="relative z-10">{dark ? 'Light' : 'Dark'}</span>
          </motion.button>
        </nav>
      </motion.header>

      {/* 3D ENHANCED HERO */}
      <motion.section 
        className="relative overflow-hidden min-h-screen flex items-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 3D Parallax Background with depth layers */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            y, 
            transformStyle: "preserve-3d"
          }}
        >
          <motion.div 
            className={`absolute inset-0 ${dark ? 'bg-gradient-to-br from-gray-900 via-black to-red-900/20' : 'bg-gradient-to-br from-gray-50 via-white to-red-50'}`}
            animate={{
              rotateX: [0, 1, -1, 0],
              scale: [1, 1.02, 0.98, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* 3D Depth layers */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`depth-layer-${i}`}
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at ${50 + i * 10}% ${50 + i * 5}%, ${dark ? '#ef4444' : '#dc2626'} 0%, transparent 50%)`,
                transform: `translateZ(${i * 20}px)`,
                transformStyle: "preserve-3d"
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren3D}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1 
              variants={fadeInUp3D}
              className="text-4xl md:text-6xl font-extrabold leading-tight relative"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                textShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
              }}
            >
              <motion.span
                className="inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  rotateX: [0, 2, -2, 0],
                }}
                transition={{
                  backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  background: `linear-gradient(90deg, ${dark ? '#ffffff' : '#000000'} 0%, #ef4444 50%, ${dark ? '#ffffff' : '#000000'} 100%)`,
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  transformStyle: "preserve-3d"
                }}
              >
                Cinematic stories.
              </motion.span>{' '}
              <motion.span 
                className="text-red-500 inline-block"
                whileHover={{ 
                  scale: 1.2,
                  rotateY: 15,
                  textShadow: "0 0 30px #ef4444",
                  filter: "drop-shadow(0 0 20px #ef4444)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
                animate={{
                  rotateZ: [0, 1, -1, 0],
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                Bold visuals.
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp3D}
              className="mt-6 max-w-xl text-lg opacity-80"
              whileHover={{ 
                opacity: 1, 
                scale: 1.02,
                rotateX: 2
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              Trihari Universal — a full-service production house crafting films, commercials and branded content with cinematic scale and storytelling edge.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp3D}
              className="mt-8 flex gap-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.a 
                href="#work" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 5,
                  rotateX: -5,
                  boxShadow: "0 15px 40px rgba(239, 68, 68, 0.4)",
                  z: 20
                }}
                whileTap={{ scale: 0.9, rotateY: -5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10">View Work</span>
              </motion.a>
              
              <motion.a 
                href="#contact" 
                className={`inline-block ${dark ? 'border-white hover:bg-white hover:text-black' : 'border-gray-900 hover:bg-gray-900 hover:text-white'} border px-6 py-3 rounded-md transition-all duration-300 group`}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: -5,
                  rotateX: 5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  z: 20
                }}
                whileTap={{ scale: 0.9, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="group-hover:animate-pulse">Let's Collaborate</span>
              </motion.a>
            </motion.div>

            <motion.div 
              variants={fadeInUp3D}
              className="mt-10 flex gap-6 items-center opacity-90"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.15, 
                  rotateY: 10,
                  boxShadow: "0 5px 20px rgba(239, 68, 68, 0.2)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-xs uppercase opacity-70">Founded</div>
                <div className="font-semibold">2022</div>
              </motion.div>
              <div className="border-l h-6"/>
              <motion.div 
                whileHover={{ 
                  scale: 1.15, 
                  rotateY: -10,
                  boxShadow: "0 5px 20px rgba(59, 130, 246, 0.2)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-xs uppercase opacity-70">Projects</div>
                <div className="font-semibold">50+</div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ scale: 0.6, opacity: 0, rotateY: -30 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotateY: 0,
              y: [0, -20, 0],
              rotateX: [0, 5, 0]
            }}
            transition={{ 
              scale: { duration: 1.5, delay: 0.5, type: "spring", stiffness: 100 },
              opacity: { duration: 1.5, delay: 0.5 },
              rotateY: { duration: 1.5, delay: 0.5 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div 
              className="aspect-video rounded-lg overflow-hidden shadow-2xl relative"
              style={{
                background: `linear-gradient(135deg, ${dark ? '#1f2937' : '#f3f4f6'} 0%, ${dark ? '#000000' : '#e5e7eb'} 100%)`,
                transformStyle: "preserve-3d"
              }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                rotateX: 5,
                boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                z: 50
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Enhanced 3D glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-60"
                animate={{
                  boxShadow: [
                    "0 0 30px #ef4444, 0 0 60px #ef4444",
                    "0 0 50px #3b82f6, 0 0 80px #3b82f6", 
                    "0 0 40px #8b5cf6, 0 0 70px #8b5cf6",
                    "0 0 30px #ef4444, 0 0 60px #ef4444"
                  ],
                  scale: [1, 1.02, 1.01, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img 
                  src="/circular logog trihari.png" 
                  alt="logo big" 
                  className="h-32 w-32 object-contain opacity-90 rounded-full"
                  animate={{
                    rotate: [0, 360],
                    rotateY: [0, 180, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{
                    filter: "drop-shadow(0 0 40px #ef4444) drop-shadow(0 0 20px #3b82f6)",
                    scale: 1.3
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                />
              </div>
              
              {/* 3D Floating elements around logo */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`floating-${i}`}
                  className="absolute w-2 h-2 bg-gradient-to-br from-red-500 to-blue-500 rounded-full"
                  style={{
                    left: `${20 + (i * 12)}%`,
                    top: `${30 + Math.sin(i) * 20}%`,
                    transformStyle: "preserve-3d"
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, -5, 0],
                    rotateZ: [0, 360],
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced 3D divider with animated gradient */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${dark ? '#000000' : '#ffffff'} 100%)`,
            transformStyle: "preserve-3d"
          }}
          animate={{
            rotateX: [0, 2, -2, 0],
            scaleY: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.section>

      {/* ENHANCED 3D SERVICES */}
      <motion.section 
        id="services" 
        className="max-w-7xl mx-auto px-6 py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren3D}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div variants={fadeInUp3D}>
          <h3 className="text-sm uppercase opacity-70">What we do</h3>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mt-2"
            style={{
              background: "linear-gradient(45deg, #ef4444, #3b82f6, #8b5cf6, #ef4444)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Services
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerChildren3D}
          style={{ transformStyle: "preserve-3d" }}
        >
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              variants={scaleIn3D}
              className={`p-6 rounded-2xl border ${dark ? 'border-gray-800 bg-gray-900/20' : 'border-gray-200 bg-white/50'} 
                backdrop-blur-sm relative group overflow-hidden`}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
                boxShadow: dark 
                  ? "0 25px 50px rgba(239, 68, 68, 0.2)" 
                  : "0 25px 50px rgba(0, 0, 0, 0.15)",
                z: 30
              }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Enhanced 3D gradient background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, #ef4444 0%, #3b82f6 50%, #8b5cf6 100%)`
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* 3D Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.3)",
                    "0 0 30px rgba(59, 130, 246, 0.3)",
                    "0 0 25px rgba(139, 92, 246, 0.3)",
                    "0 0 20px rgba(239, 68, 68, 0.3)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="text-xl font-semibold mb-3"
                  whileHover={{ 
                    scale: 1.1, 
                    rotateZ: 2,
                    textShadow: "0 0 10px rgba(239, 68, 68, 0.5)"
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {s.title}
                </motion.div>
                <motion.div 
                  className="text-sm opacity-80 mb-4"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {s.desc}
                </motion.div>
                <motion.div 
                  className="text-xs opacity-60"
                  whileHover={{ 
                    opacity: 0.8, 
                    scale: 1.05,
                    color: "#ef4444"
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  Full production, equipment, crew and post.
                </motion.div>
              </div>
              
              {/* Enhanced 3D corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-500/30 via-blue-500/20 to-transparent rounded-br-2xl"
                initial={{ scale: 0, rotate: 45, opacity: 0 }}
                whileHover={{ 
                  scale: 1, 
                  rotate: 45, 
                  opacity: 1,
                  boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transformStyle: "preserve-3d" }}
              />
              
              {/* 3D floating particles */}
              {[...Array(3)].map((_, pi) => (
                <motion.div
                  key={`service-particle-${i}-${pi}`}
                  className="absolute w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-60"
                  style={{
                    left: `${20 + pi * 25}%`,
                    top: `${30 + pi * 15}%`,
                    transformStyle: "preserve-3d"
                  }}
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 5, -5, 0],
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 2 + pi * 0.5,
                    repeat: Infinity,
                    delay: pi * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* WORK / REELS */}
      <motion.section 
        id="work" 
        className="max-w-7xl mx-auto px-6 py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={fadeInUp}
        >
          <div>
            <h3 className="text-sm uppercase opacity-70">Selected Work</h3>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Reels & Films
            </h2>
          </div>
          <motion.a 
            href="#portfolio" 
            className="text-sm opacity-80 hover:underline group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="group-hover:text-red-500 transition-colors">See all projects</span>
            <motion.span
              className="inline-block ml-1"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerChildren}
        >
          {reels.map((r, i) => (
            <motion.a 
              key={i} 
              href="#" 
              variants={scaleIn}
              className="group rounded-xl overflow-hidden shadow-xl relative"
              style={{
                background: `linear-gradient(135deg, ${dark ? '#1f2937' : '#f3f4f6'} 0%, ${dark ? '#111827' : '#e5e7eb'} 100%)`
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                z: 50,
                boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Glowing border */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, #ef4444, #3b82f6, #8b5cf6)`,
                  padding: '2px',
                }}
              />
              
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <motion.img 
                  src={r.thumb} 
                  alt={r.title} 
                  className="object-cover w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Overlay gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 0.8 }}
                />
                
                {/* Play button overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.2,
                      backgroundColor: "rgba(239, 68, 68, 0.3)"
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(255, 255, 255, 0.4)",
                        "0 0 0 10px rgba(255, 255, 255, 0)",
                        "0 0 0 20px rgba(255, 255, 255, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  >
                    <motion.div
                      className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"
                      whileHover={{ scale: 1.2 }}
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <motion.div 
                    className="bg-black/50 backdrop-blur-sm rounded-md px-3 py-2 text-sm font-medium"
                    whileHover={{ 
                      backgroundColor: "rgba(239, 68, 68, 0.5)",
                      scale: 1.05 
                    }}
                  >
                    {r.title}
                  </motion.div>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.section>

      {/* ABOUT */}
      <motion.section 
        id="about" 
        className="max-w-6xl mx-auto px-6 py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div variants={fadeInUp3D}>
            <h3 className="text-sm uppercase opacity-70">About</h3>
            <motion.h2 
              className="text-3xl font-bold mt-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              We make stories that travel beyond the screen.
            </motion.h2>
            <motion.p 
              className="mt-6 text-lg opacity-80"
              whileInView={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Trihari Universal is a collaborative studio specialising in cinematic direction, production design, and post-production. Our team blends technical craft with storytelling to build emotionally resonant films and ads.
            </motion.p>
            <motion.ul 
              className="mt-6 space-y-2"
              variants={staggerChildren3D}
            >
              {[
                '• Experienced directors & cinematographers',
                '• In-house edit suite & color grading',
                '• Full location & studio production support'
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  variants={fadeInUp3D}
                  whileHover={{ 
                    x: 10, 
                    color: "#ef4444",
                    scale: 1.02 
                  }}
                  className="cursor-default"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div variants={scaleIn3D}>
            <motion.div 
              className={`rounded-xl overflow-hidden ${dark ? 'bg-gray-900/40' : 'bg-gray-100/40'} backdrop-blur-sm p-6 relative`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: dark 
                  ? "0 20px 40px rgba(139, 92, 246, 0.1)" 
                  : "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 opacity-5"
                animate={{
                  background: [
                    "linear-gradient(45deg, #ef4444, #3b82f6)",
                    "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                    "linear-gradient(45deg, #8b5cf6, #ef4444)"
                  ]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="text-sm uppercase opacity-60 mb-4">Key Team</div>
              <div className="grid grid-cols-1 gap-4 relative z-10">
                {[
                  { initials: 'AD', name: 'Arjun Sharma', role: 'Creative Director' },
                  { initials: 'RP', name: 'Rhea Patel', role: 'Producer' }
                ].map((member, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.05, x: 10 }}
                    variants={fadeInUp}
                  >
                    <motion.div 
                      className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center text-white font-bold"
                      whileHover={{ 
                        rotate: 360,
                        boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)"
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      {member.initials}
                    </motion.div>
                    <div>
                      <motion.div 
                        className="font-semibold"
                        whileHover={{ color: "#ef4444" }}
                      >
                        {member.name}
                      </motion.div>
                      <div className="text-xs opacity-70">{member.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section 
        id="contact" 
        className="max-w-4xl mx-auto px-6 py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp3D}
      >
        <motion.div 
          className={`relative p-8 rounded-2xl backdrop-blur-sm border ${dark ? 'border-gray-800' : 'border-gray-200'} overflow-hidden`}
          style={{
            background: `linear-gradient(135deg, ${dark ? 'rgba(17, 24, 39, 0.4)' : 'rgba(249, 250, 251, 0.4)'} 0%, transparent 100%)`
          }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundImage: [
                "radial-gradient(circle at 20% 50%, #ef4444 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%)",
                "radial-gradient(circle at 50% 20%, #8b5cf6 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, #ef4444 0%, transparent 50%)"
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.h3 
            className="text-sm uppercase opacity-70"
            variants={fadeInUp3D}
          >
            Contact
          </motion.h3>
          <motion.h2 
            className="text-2xl font-bold mt-2 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent"
            variants={fadeInUp3D}
          >
            Start a project with us
          </motion.h2>
          
          <motion.form 
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"
            variants={staggerChildren3D}
          >
            {[
              { placeholder: "Your name", colSpan: "col-span-1" },
              { placeholder: "Email", colSpan: "col-span-1" },
              { placeholder: "Project brief or message", colSpan: "sm:col-span-2" }
            ].map((field, i) => (
              <motion.input 
                key={i}
                className={`p-3 rounded-md bg-transparent border ${dark ? 'border-gray-700 focus:border-red-500' : 'border-gray-300 focus:border-red-500'} 
                  ${field.colSpan} focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                placeholder={field.placeholder}
                variants={fadeInUp3D}
                whileFocus={{ 
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(239, 68, 68, 0.1)"
                }}
              />
            ))}
            
            <motion.button 
              className="sm:col-span-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                px-4 py-3 rounded-md mt-2 font-medium relative overflow-hidden group"
              variants={fadeInUp3D}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
              <span className="relative z-10">Send message</span>
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer 
        className={`border-t ${dark ? 'border-gray-800/60' : 'border-gray-200/60'} mt-4 relative`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Footer background effect */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "linear-gradient(90deg, #ef4444 0%, transparent 50%, #3b82f6 100%)",
              "linear-gradient(90deg, #3b82f6 0%, transparent 50%, #8b5cf6 100%)",
              "linear-gradient(90deg, #8b5cf6 0%, transparent 50%, #ef4444 100%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img 
              src="/circular logog trihari.png" 
              alt="logo" 
              className="h-10 w-10 rounded-full"
              whileHover={{ 
                rotate: 360,
                boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)"
              }}
              transition={{ duration: 0.8 }}
            />
            <motion.div 
              className="text-sm opacity-80"
              whileHover={{ opacity: 1 }}
            >
              © {new Date().getFullYear()} Trihari Universal
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-6"
            variants={staggerChildren3D}
            initial="hidden"
            whileInView="visible"
          >
            {['Privacy', 'Terms'].map((link, i) => (
              <motion.a 
                key={link}
                href="#" 
                className="text-sm opacity-80 hover:opacity-100 hover:text-red-500 transition-all duration-300"
                variants={fadeInUp3D}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {link}
              </motion.a>
            ))}
            <motion.div 
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
              variants={fadeInUp3D}
              whileHover={{ scale: 1.05 }}
            >
              info@trihariuniversal.com
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>

      </motion.div>
    </motion.div>
  )
}
