import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TrihariUniversalSimple() {
  const [dark, setDark] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  
  // Audition form pagination state
  const [currentFormPage, setCurrentFormPage] = useState(1)
  const [formData, setFormData] = useState({})
  const totalFormPages = 4

  return (
    <div className={`min-h-screen transition-all duration-500 ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* NAVIGATION */}
      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${dark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md border-b ${dark ? 'border-gray-800' : 'border-gray-200'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
            <span className="text-xl font-bold">Trihari Universal</span>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              {['Home', 'About', 'Audition', 'Contact'].map((item, i) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm opacity-80 hover:opacity-100 hover:text-red-500 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <motion.button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-full ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {dark ? '☀️' : '🌙'}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <motion.section 
        id="home" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: dark 
            ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(15, 15, 15, 0.8) 50%, rgba(0, 0, 0, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 250, 250, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            className={`inline-block px-8 py-4 rounded-xl mb-8 ${dark ? 'bg-blue-900/30 border border-blue-800/40' : 'bg-blue-100 border border-blue-200'} backdrop-blur-sm`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <motion.h2 
              className={`text-2xl md:text-3xl font-bold ${dark ? 'text-blue-400' : 'text-blue-600'} mb-2`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Coming Soon
            </motion.h2>
            <motion.p 
              className={`text-lg ${dark ? 'text-blue-300/80' : 'text-blue-500/80'} font-medium`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Crafting Cinematic Excellence
            </motion.p>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Trihari Universal
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl opacity-80 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where Stories Come to Life Through the Magic of Cinema
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#audition"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-sm font-medium transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(220, 38, 38, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Join Our Journey
            </motion.a>
            <motion.a
              href="#about"
              className={`inline-block border ${dark ? 'border-gray-600 hover:border-white text-white hover:bg-white hover:text-black' : 'border-gray-300 hover:border-black text-black hover:bg-black hover:text-white'} px-8 py-4 rounded-sm font-medium transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <motion.section 
        id="about" 
        className="py-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About Banner */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative group border border-gray-700/30"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-center relative z-10 p-8">
                  <motion.div 
                    className="mb-6"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center"
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(239, 68, 68, 0.4)',
                          '0 0 40px rgba(239, 68, 68, 0.6)',
                          '0 0 20px rgba(239, 68, 68, 0.4)'
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-2xl">🎬</span>
                    </motion.div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    OUR LEGACY
                  </motion.h3>
                  
                  <motion.div 
                    className="flex items-center justify-center mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-px bg-red-500/60 flex-1 max-w-12"></div>
                    <span className="text-xs uppercase tracking-widest text-red-400/80 font-medium px-4">
                      IN MOTION
                    </span>
                    <div className="h-px bg-red-500/60 flex-1 max-w-12"></div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-sm text-red-300/80 font-medium mb-4 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    Decades of storytelling excellence, bringing dreams to the silver screen with passion and precision.
                  </motion.p>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-xs text-gray-400/80 font-medium">
                      🏆 Award-Winning Productions
                    </div>
                    <div className="text-xs text-gray-400/80 font-medium">
                      🌟 Industry Recognition
                    </div>
                    <div className="text-xs text-gray-400/80 font-medium">
                      🎭 Cinematic Excellence
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm uppercase opacity-70 tracking-wider">Our Story</h3>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Crafting Cinema</h2>
                <p className="text-lg opacity-80">
                  From vision to reality, we transform ideas into compelling visual narratives that resonate with audiences worldwide.
                </p>
              </motion.div>
              
              <div className="space-y-6">
                {[
                  { icon: '🎥', title: 'Production Excellence', detail: 'State-of-the-art equipment and experienced crews' },
                  { icon: '✨', title: 'Creative Vision', detail: 'Innovative storytelling with artistic integrity' },
                  { icon: '🌟', title: 'Industry Impact', detail: 'Building careers and creating lasting entertainment' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`p-6 rounded-sm border ${dark ? 'border-gray-800' : 'border-gray-200'} hover:border-red-500/50 transition-all duration-300`}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="opacity-80 text-sm">{item.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
            {/* Left: Audition Banner */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-8"
            >
              <motion.div 
                className="aspect-square rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative group border border-gray-700/30"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-center relative z-10 p-8">
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
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl md:text-4xl font-black tracking-wider mb-2 text-white"
                    style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    YOUR STAGE
                  </motion.h3>

                  <motion.h4 
                    className="text-2xl md:text-3xl font-bold tracking-wide mb-6 text-purple-400"
                    style={{ textShadow: '0 0 15px rgba(168, 85, 247, 0.4)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    viewport={{ once: true }}
                  >
                    AWAITS
                  </motion.h4>
                  
                  <motion.div 
                    className="flex items-center justify-center gap-3 mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
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
                    <div className="text-xs text-gray-400/80 font-medium">✨ All Categories Welcome</div>
                    <div className="text-xs text-gray-400/80 font-medium">🎬 Professional Productions</div>
                    <div className="text-xs text-gray-400/80 font-medium">🌟 Career Opportunities</div>
                  </motion.div>
                </div>

                {/* Background Effects */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent rounded-xl"
                  animate={{ 
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
                  }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div 
                  className="absolute inset-0 opacity-5 rounded-xl"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168, 85, 247, 0.1) 2px, rgba(168, 85, 247, 0.1) 4px)'
                  }}
                />

                {/* Corner decorations */}
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

            {/* Right: Audition Form Container - Same size as banner */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="aspect-square rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 relative border border-gray-700/30 p-8"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Form Header */}
                <div className="mb-6">
                  <h3 className="text-sm uppercase opacity-70 tracking-wider">Join Our Team</h3>
                  <h2 className="text-2xl font-bold mt-2 mb-4">Apply For Audition</h2>
                  <p className="text-sm opacity-80">
                    Step {currentFormPage} of {totalFormPages}
                  </p>
                </div>

                {/* Form Content Area */}
                <div className="flex-1 overflow-y-auto max-h-[calc(100%-200px)]">
                  {currentFormPage === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-purple-400 mb-4">Personal Information</h3>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input 
                          type="text" 
                          className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <input 
                          type="email" 
                          className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <input 
                          type="tel" 
                          className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                          <input 
                            type="date" 
                            className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Gender *</label>
                          <select className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentFormPage === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-purple-400 mb-4">Physical Details</h3>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">Height (cm) *</label>
                          <input 
                            type="number" 
                            className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}
                            placeholder="170"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Weight (kg) *</label>
                          <input 
                            type="number" 
                            className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}
                            placeholder="65"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Eye Color</label>
                        <select className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}>
                          <option value="">Select Eye Color</option>
                          <option value="brown">Brown</option>
                          <option value="black">Black</option>
                          <option value="blue">Blue</option>
                          <option value="green">Green</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Hair Color</label>
                        <select className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}>
                          <option value="">Select Hair Color</option>
                          <option value="black">Black</option>
                          <option value="brown">Brown</option>
                          <option value="blonde">Blonde</option>
                          <option value="red">Red</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Acting Experience *</label>
                        <select className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}>
                          <option value="">Select Experience</option>
                          <option value="beginner">Beginner (0-1 years)</option>
                          <option value="intermediate">Intermediate (2-5 years)</option>
                          <option value="experienced">Experienced (5+ years)</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {currentFormPage === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-purple-400 mb-4">Skills & Portfolio</h3>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Special Skills</label>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {['Dancing', 'Singing', 'Martial Arts', 'Swimming', 'Driving', 'Languages'].map((skill) => (
                            <label key={skill} className="flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only" />
                              <div className="w-3 h-3 rounded border border-purple-400 mr-2 relative">
                                <div className="w-1.5 h-1.5 rounded bg-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"></div>
                              </div>
                              <span className="text-xs">{skill}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Portfolio URL *</label>
                        <input 
                          type="url" 
                          className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}
                          placeholder="https://your-portfolio.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Location *</label>
                        <input 
                          type="text" 
                          className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm`}
                          placeholder="City, State"
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentFormPage === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-purple-400 mb-4">Additional Information</h3>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Previous Experience *</label>
                        <textarea 
                          rows="3"
                          className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none text-sm`}
                          placeholder="List your previous work experience..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Why Trihari Universal? *</label>
                        <textarea 
                          rows="3"
                          className={`w-full px-3 py-2 rounded-sm border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none text-sm`}
                          placeholder="What attracts you to our projects..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="flex items-center cursor-pointer text-sm">
                          <input type="checkbox" className="sr-only" />
                          <div className="w-4 h-4 rounded border border-purple-400 mr-3 relative">
                            <div className="w-2 h-2 rounded bg-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"></div>
                          </div>
                          <span className="text-xs">Available for travel and flexible scheduling *</span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700/30">
                  <motion.button
                    type="button"
                    onClick={() => setCurrentFormPage(Math.max(1, currentFormPage - 1))}
                    disabled={currentFormPage === 1}
                    className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                      currentFormPage === 1 
                        ? 'opacity-30 cursor-not-allowed bg-gray-700' 
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                    whileHover={currentFormPage > 1 ? { scale: 1.05 } : {}}
                    whileTap={currentFormPage > 1 ? { scale: 0.95 } : {}}
                  >
                    Previous
                  </motion.button>
                  
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((page) => (
                      <div
                        key={page}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          page === currentFormPage ? 'bg-purple-400' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    type="button"
                    onClick={() => {
                      if (currentFormPage < totalFormPages) {
                        setCurrentFormPage(currentFormPage + 1)
                      } else {
                        // Submit form
                        console.log('Form submitted!')
                      }
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentFormPage === totalFormPages ? 'Submit' : 'Next'}
                  </motion.button>
                </div>

                {/* Background Effects */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent rounded-xl pointer-events-none"
                  animate={{ 
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
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
                <div className="text-center relative z-10 p-8">
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
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-2xl">🎭</span>
                    </motion.div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    YOUR STAGE
                  </motion.h3>
                  
                  <motion.div 
                    className="flex items-center justify-center mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-px bg-purple-500/60 flex-1 max-w-12"></div>
                    <span className="text-xs uppercase tracking-widest text-purple-400/80 font-medium px-4">
                      AWAITS
                    </span>
                    <div className="h-px bg-purple-500/60 flex-1 max-w-12"></div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-sm text-purple-300/80 font-medium mb-4 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    Showcase your talent and join our creative journey. Every great story needs exceptional performers.
                  </motion.p>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
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
              </motion.div>
            </motion.div>

            {/* Form Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm uppercase opacity-70 tracking-wider">Join Our Team</h3>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Apply For Audition</h2>
                <p className="text-lg opacity-80">
                  Submit your details and portfolio below to be considered for our upcoming productions.
                </p>
              </motion.div>

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
              </motion.div>
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
