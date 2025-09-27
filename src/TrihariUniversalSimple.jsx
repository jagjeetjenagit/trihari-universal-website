/*
Trihari Universal — Simplified version for debugging
*/

import React, {useState, useRef, useEffect} from 'react'
import {motion, useInView, useScroll, useTransform} from 'framer-motion'
import emailjs from '@emailjs/browser'
import GitHubFormHandler from './utils/GitHubFormHandler'
import GoogleSheetsService from './services/GoogleSheetsService'
import GoogleSheetsTestPanel from './components/GoogleSheetsTestPanel'
import logo from './assets/trihari_universal_white.png'
import founderImage from './assets/1000010434.jpg'

// Section Divider Component - Mobile Only
const SectionDivider = () => (
  <div className="block md:hidden w-full py-6 sm:py-8 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 relative">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <motion.div 
            className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          />
          <motion.div 
            className="w-2 h-2 rounded-full bg-blue-500/60 shadow-lg shadow-blue-500/30"
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          />
          <motion.div 
            className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
      
      {/* Mobile-specific visual enhancement dots */}
      <div className="mt-4 opacity-20">
        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-blue-400"
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default function TrihariUniversalSimple(){
  const [dark, setDark] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [igPosts, setIgPosts] = useState([])
  
  // Simple progress popup state
  const [showProgress, setShowProgress] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    const instagramPath = import.meta.env.BASE_URL + 'instagram-latest.json'
    fetch(instagramPath, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        if (Array.isArray(data)) setIgPosts(data.slice(0, 6))
      })
      .catch(() => {/* silent */})
  }, [])



  // Simple Progress Popup Component
  const ProgressPopup = () => {
    if (!showProgress) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4"
        >
          <div className="text-center">
            {isSubmitted ? (
              <>
                {/* Success State */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </motion.svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Submitted ✓</h3>
                <p className="text-gray-600">Your application has been submitted successfully!</p>
              </>
            ) : (
              <>
                {/* Processing State */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Processing...</h3>
                <p className="text-gray-600">Please wait while we submit your application.</p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Form submission handler with EmailJS
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    const submitButton = e.target.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent
    
    // Clear any existing error messages
    const existingErrors = document.querySelectorAll('.error-message')
    existingErrors.forEach(error => error.remove())
    
    const formData = new FormData(e.target)
    
    // Validation - Check all required fields
    const requiredFields = [
      { name: 'fullName', label: 'Full Name', element: e.target.querySelector('[name="fullName"]') },
      { name: 'city', label: 'City', element: e.target.querySelector('[name="city"]') },
      { name: 'email', label: 'Email Address', element: e.target.querySelector('[name="email"]') },
      { name: 'phone', label: 'Phone Number', element: e.target.querySelector('[name="phone"]') },
      { name: 'experience', label: 'Experience', element: e.target.querySelector('[name="experience"]') },
      { name: 'skills', label: 'Primary Skills', element: e.target.querySelector('[name="skills"]') },
      { name: 'consent', label: 'Consent', element: e.target.querySelector('[name="consent"]') }
    ]
    
    let hasErrors = false
    const errors = []
    
    // Check each required field
    for (const field of requiredFields) {
      const value = formData.get(field.name)
      
      if (field.name === 'consent') {
        if (!value) {
          hasErrors = true
          errors.push({ field: field.element, message: `${field.label} is required - You must accept the terms` })
        }
      } else if (!value || value.toString().trim() === '' || value === 'Select years' || value === 'Select Gender') {
        hasErrors = true
        errors.push({ field: field.element, message: `${field.label} is required` })
      }
    }
    
    // Email validation
    const email = formData.get('email')
    if (email && !email.includes('@')) {
      hasErrors = true
      errors.push({ field: e.target.querySelector('[name="email"]'), message: 'Please enter a valid email address' })
    }
    
    // Phone validation (basic)
    const phone = formData.get('phone')
    if (phone && phone.replace(/[^\d]/g, '').length < 10) {
      hasErrors = true
      errors.push({ field: e.target.querySelector('[name="phone"]'), message: 'Please enter a valid phone number (at least 10 digits)' })
    }
    
    // Show errors if any
    if (hasErrors) {
      errors.forEach(error => {
        const errorDiv = document.createElement('div')
        errorDiv.className = 'error-message'
        errorDiv.style.cssText = `
          color: #dc2626;
          font-size: 14px;
          margin-top: 5px;
          font-weight: 500;
          background: rgba(220, 38, 38, 0.1);
          padding: 8px 12px;
          border-radius: 4px;
          border-left: 3px solid #dc2626;
        `
        errorDiv.textContent = error.message
        error.field.parentNode.appendChild(errorDiv)
        
        // Add red border to field
        error.field.style.borderColor = '#dc2626'
        error.field.style.boxShadow = '0 0 0 1px #dc26261a'
      })
      
      // Scroll to first error
      errors[0].field.scrollIntoView({ behavior: 'smooth', block: 'center' })
      errors[0].field.focus()
      
      // Show summary alert
      alert(`❌ Please fill in all required fields:\n\n${errors.map(e => `• ${e.message}`).join('\n')}`)
      
      // Reset button
      submitButton.textContent = originalText
      submitButton.disabled = false
      return
    }
    
    try {
      // Show progress popup
      setShowProgress(true)
      setIsSubmitted(false)
      
      // Show loading state
      submitButton.textContent = 'PROCESSING...'
      submitButton.disabled = true
      
      // Upload photos to Cloudinary
      let photoInfo = '❌ No photos uploaded'
      let photoUrls = []
      let photoHtml = '<div style="color: white !important; padding: 20px; text-align: center;">❌ No photos uploaded</div>'
      
      // Cloudinary configuration - YOUR ACCOUNT
      const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dn78mntyo/image/upload'
      const CLOUDINARY_UPLOAD_PRESET = 'audition_photos' // Create this preset in your dashboard, or will use fallback
      
      const headshotFiles = formData.getAll('headshot')
      
      if (headshotFiles && headshotFiles.length > 0 && headshotFiles[0].size > 0) {
        
        try {
          for (let i = 0; i < headshotFiles.length; i++) {
            const file = headshotFiles[i]
            
            // Create FormData for Cloudinary
            const cloudinaryData = new FormData()
            cloudinaryData.append('file', file)
            cloudinaryData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            cloudinaryData.append('folder', 'auditions') // Organize in auditions folder
            
            // Upload to Cloudinary
            let response = await fetch(CLOUDINARY_UPLOAD_URL, {
              method: 'POST',
              body: cloudinaryData
            })
            
            // If custom preset fails, try with default preset
            if (!response.ok && CLOUDINARY_UPLOAD_PRESET === 'audition_photos') {
              const fallbackData = new FormData()
              fallbackData.append('file', file)
              fallbackData.append('upload_preset', 'ml_default') // Default unsigned preset
              fallbackData.append('folder', 'auditions')
              
              response = await fetch(CLOUDINARY_UPLOAD_URL, {
                method: 'POST',
                body: fallbackData
              })
            }
            
            if (response.ok) {
              const result = await response.json()
              photoUrls.push({
                name: file.name,
                url: result.secure_url,
                publicId: result.public_id,
                size: (file.size / 1024 / 1024).toFixed(2)
              })
              
              // Update progress for each photo processed
              if (i === headshotFiles.length - 1) {

                await new Promise(resolve => setTimeout(resolve, 500))
              }
            } else {
              throw new Error('Failed to upload photo')
            }
          }
          
          // Create photo info with actual URLs and HTML formatting
          photoInfo = `📷 ${photoUrls.length} PHOTO(S) UPLOADED:

${photoUrls.map((photo, index) => `${index + 1}. ${photo.name} (${photo.size} MB)
🔗 View Photo: ${photo.url}
`).join('\n')}

✅ Click the links above to view the actual photos!
📱 You can also WhatsApp: ${formData.get('phone')} for direct contact.`

          // Create HTML photo previews for email
          photoHtml = photoUrls.map((photo, index) => `
            <div class="photo-preview">
              <div class="photo-name">${index + 1}. ${photo.name}</div>
              <div class="photo-size">File Size: ${photo.size} MB</div>
              <img src="${photo.url}" alt="${photo.name}" style="max-width: 100%; height: auto; max-height: 300px; border-radius: 6px; border: 2px solid rgba(255, 255, 255, 0.3); display: block; margin: 10px auto;">
              <a href="${photo.url}" class="photo-link" target="_blank">🔗 Open Full Size</a>
            </div>
          `).join('')
          
        } catch (error) {
          console.error('Photo upload error:', error)
          // Fallback to contact method
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
          const applicantName = formData.get('fullName') || 'Unknown'
          const applicationId = `${applicantName.replace(/\s+/g, '-')}-${timestamp}`
          
          photoInfo = `⚠️ PHOTO UPLOAD FAILED: ${headshotFiles[0].name} (${(headshotFiles[0].size / 1024 / 1024).toFixed(2)} MB)

📱 TO GET PHOTO: WhatsApp ${formData.get('phone')}
📧 OR EMAIL: ${formData.get('email')}
🔖 REFERENCE: ${applicationId}

Ask applicant to resend photos directly.`
        }
        

        submitButton.textContent = 'SENDING EMAIL...'
      }
      
      // EmailJS Configuration
      const EMAILJS_SERVICE_ID = 'service_e0d2vqv'
      const EMAILJS_TEMPLATE_ID = 'template_ycmn1jg'
      const EMAILJS_PUBLIC_KEY = 'fqOBYDBIcQMWMF3Ut'
      
      // Prepare email data
      const phoneNumber = formData.get('phone')
      const cleanPhone = phoneNumber ? phoneNumber.replace(/[^\d]/g, '') : ''
      
      const templateParams = {
        to_name: 'Trihari Universal',
        from_name: 'Trihari Universal Website', 
        full_name: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        phone_clean: cleanPhone,
        city: formData.get('city'),
        age: formData.get('age') || 'Not provided',
        date_of_birth: formData.get('dob') || 'Not provided',
        gender: formData.get('gender') || 'Not specified',
        experience: formData.get('experience') || '0',
        skills: formData.get('skills') || 'Not specified',
        instagram: formData.get('instagram') || '',
        portfolio: formData.get('portfolio') || '',
        about_yourself: formData.get('aboutYourself') || '',
        consent: formData.get('consent') ? '✅ Yes - Terms accepted' : '❌ No consent provided',
        photo_info: photoInfo,
        photo_html: photoHtml,
        application_date: new Date().toLocaleDateString('en-IN', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        application_time: new Date().toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        reply_to: formData.get('email'),
        subject: `🎬 New Audition Application: ${formData.get('fullName')} from ${formData.get('city')}`
      }
      
      // Prepare data for Google Sheets
      const sheetsData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        city: formData.get('city'),
        age: formData.get('age') || '',
        dob: formData.get('dob') || '',
        gender: formData.get('gender') || '',
        experience: formData.get('experience') || '',
        skills: formData.get('skills') || '',
        instagram: formData.get('instagram') || '',
        portfolio: formData.get('portfolio') || '',
        aboutYourself: formData.get('aboutYourself') || '',
        consent: formData.get('consent') || false,
        photoUrl: photoInfo || 'No photo uploaded'
      }

      // Update progress - submitting data

      
      // Submit to both services (parallel execution)
      const emailPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      const sheetsPromise = GoogleSheetsService.submitToSheets(sheetsData)

      // Update progress - processing


      // Wait for both to complete
      const [emailResult, sheetsResult] = await Promise.allSettled([emailPromise, sheetsPromise])

      // Determine success message
      const emailSuccess = emailResult.status === 'fulfilled'
      const sheetsSuccess = sheetsResult.status === 'fulfilled' && sheetsResult.value?.success

      let successMessage = `🎬 Thank you ${formData.get('fullName')}! Your audition application has been processed.

📧 Email: ${emailSuccess ? '✅ Sent successfully' : '❌ Failed to send'}
📊 Database: ${sheetsSuccess ? '✅ Saved to spreadsheet' : '⚠️ Email sent (spreadsheet not configured)'}

We've received your application and will contact you if shortlisted.

${headshotFiles && headshotFiles.length > 0 && headshotFiles[0].size > 0 ? `📱 We may WhatsApp you at ${formData.get('phone')} to request your photos.` : ''}

Good luck! 🌟`

      // Handle specific error cases
      if (!emailSuccess && sheetsSuccess) {
        successMessage = `⚠️ Your application was saved to our database, but the email failed to send. We have your information and will contact you if shortlisted.

Error: ${emailResult.reason?.message || 'Email service unavailable'}`
      } else if (!emailSuccess && !sheetsSuccess) {
        throw new Error('Both email and database submission failed. Please try again.')
      }

      // Show success state
      setIsSubmitted(true)
      
      // Hide progress popup and reset form after success
      setTimeout(() => {
        setShowProgress(false)
        setIsSubmitted(false)
        e.target.reset()
      }, 3000)
      
    } catch (error) {
      console.error('Form submission error:', error)
      
      // Hide progress and show error
      setShowProgress(false)
      alert(`❌ There was an error submitting your application: ${error.message || 'Please check the console for details.'}}`)
    } finally {
      // Reset button state
      submitButton.textContent = originalText
      submitButton.disabled = false
    }
  }

  const services = [
    {title: 'Film Production', desc: 'End-to-end feature & short film production.'},
    {title: 'Commercials & Ads', desc: 'High-impact ad films and branded content.'}
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
    { title: 'Short Film', category: 'Film', desc: 'Festival-selected narrative film' }
  ]

  // Clear error styling function
  const clearFieldError = (e) => {
    if (e.target.value.trim()) {
      e.target.style.borderColor = ''
      e.target.style.boxShadow = ''
      const errorMsg = e.target.parentNode.querySelector('.error-message')
      if (errorMsg) errorMsg.remove()
    }
  }

  // Shared input styles for the audition form
  const inputStyle = `${dark ? 'bg-gray-800/70 border-gray-700 text-white placeholder-white/40' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'} w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-md border focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-sm sm:text-base`;
  const selectStyle = `${dark ? 'bg-gray-800/70 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-md border focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base`;

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen w-full max-w-[100vw] ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'} transition-colors duration-300 relative overflow-x-hidden`}
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

      {/* Progress Popup */}
      {showProgress && <ProgressPopup />}

      {/* NAV */}
      <motion.header 
        className="w-full mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 flex items-center justify-between relative z-50 backdrop-blur-sm"
        style={{ y }}
      >
        <motion.div 
          className="flex items-center gap-2 sm:gap-4 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.img 
            src={logo} 
            alt="Trihari Universal" 
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain rounded-full flex-shrink-0"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          />
          <span className="hidden sm:inline-block font-semibold tracking-wide text-sm sm:text-base">Trihari Universal</span>
        </motion.div>
        <nav className="flex items-center gap-1 sm:gap-2 md:gap-6 flex-shrink-0">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
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
          </div>

          {/* Mobile Navigation - Simplified */}
          <div className="flex md:hidden items-center gap-1 text-xs sm:text-sm">
            <a href="#audition" className="bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-medium whitespace-nowrap">
              Apply
            </a>
            <a href="#work" className="px-1 sm:px-2 py-1 sm:py-1.5 rounded-md whitespace-nowrap">
              Work
            </a>
            <a href="#contact" className="px-1 sm:px-2 py-1 sm:py-1.5 rounded-md whitespace-nowrap">
              Contact
            </a>
          </div>
          <motion.button 
            onClick={()=>setDark(!dark)} 
            className="px-3 py-1 border rounded-md text-sm hover:bg-red-500 hover:border-red-500 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {dark ? '☀️' : '🌙'}
          </motion.button>
        </nav>
      </motion.header>

      {/* HERO */}
      <motion.section 
        ref={heroRef}
        className="relative overflow-hidden min-h-[100vh] sm:min-h-screen flex items-center w-full"
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
        
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 lg:py-20 relative z-20">
          
          {/* Mobile: Coming Soon Banner First */}
          <motion.div 
            className="block md:hidden mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div 
              className="aspect-video rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative group border border-gray-700/30 w-full"
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
                  className="mb-3 sm:mb-4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={heroInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.6 }}
                >
                  <motion.img 
                    src={logo} 
                    alt="Trihari Universal Logo" 
                    className="h-10 w-10 sm:h-12 sm:w-12 object-contain mx-auto opacity-90 rounded-full"
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
                  className="text-xl sm:text-2xl font-black tracking-wider mb-1 text-white"
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
                  className="text-xl sm:text-2xl font-black tracking-wider mb-3 text-blue-400"
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
                  className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="h-px bg-blue-500/60 flex-1 max-w-8 sm:max-w-12"></div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-blue-400/80 font-medium px-1">
                    Feature Film
                  </span>
                  <div className="h-px bg-blue-500/60 flex-1 max-w-8 sm:max-w-12"></div>
                </motion.div>
                
                <motion.p 
                  className="text-xs sm:text-sm text-blue-300/70 font-medium"
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  Next Production
                </motion.p>
              </div>
              
              {/* Subtle Cinematic Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent rounded-lg"
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
              <div className="absolute inset-0 opacity-5 rounded-lg" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.1) 2px, rgba(59,130,246,0.1) 4px)'
              }}></div>
              
              {/* Elegant Corner Frames - Mobile Simplified */}
              <div className="absolute top-2 left-2">
                <div className="w-4 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
                <div className="w-px h-4 bg-gradient-to-b from-blue-400/60 to-transparent"></div>
              </div>
              <div className="absolute top-2 right-2">
                <div className="w-4 h-px bg-gradient-to-l from-blue-400/60 to-transparent ml-auto"></div>
                <div className="w-px h-4 bg-gradient-to-b from-blue-400/60 to-transparent ml-auto"></div>
              </div>
              <div className="absolute bottom-2 left-2">
                <div className="w-px h-4 bg-gradient-to-t from-blue-400/60 to-transparent mb-auto"></div>
                <div className="w-4 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="w-px h-4 bg-gradient-to-t from-blue-400/60 to-transparent ml-auto mb-auto"></div>
                <div className="w-4 h-px bg-gradient-to-l from-blue-400/60 to-transparent ml-auto"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Desktop Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold leading-tight"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                Cinematic stories. 
                <motion.span 
                  className="text-red-500 block mt-1 sm:mt-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Bold visuals.
                </motion.span>
              </motion.h1>
            
              <motion.p 
                className="mt-3 sm:mt-4 md:mt-6 max-w-xl text-sm sm:text-base md:text-lg opacity-80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 0.8, y: 0 } : {}}
                transition={{ duration: 1, delay: 1 }}
              >
                Trihari Universal — a full-service production house crafting films, commercials and branded content with cinematic scale and storytelling edge.
              </motion.p>
              
              <motion.div 
                className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <motion.a 
                  href="#work" 
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-sm font-medium relative overflow-hidden group tracking-wide text-center text-sm sm:text-base"
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
                  className={`inline-block ${dark ? 'border-white/20 hover:border-red-500 hover:text-red-500' : 'border-gray-900/20 hover:border-red-500 hover:text-red-500'} border-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-sm font-medium tracking-wide transition-all duration-300 text-center text-sm sm:text-base`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  APPLY FOR AUDITION
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Desktop: Coming Soon Banner */}
            <motion.div 
              className="relative hidden md:block"
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 50]) }}
            >
            <motion.div 
              className="aspect-video rounded-lg sm:rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative group border border-gray-700/30 w-full"
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
                  className="mb-4 sm:mb-6"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={heroInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.6 }}
                >
                  <motion.img 
                    src={logo} 
                    alt="Trihari Universal Logo" 
                    className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain mx-auto opacity-90 rounded-full"
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
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wider mb-2 text-white"
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
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wider mb-4 sm:mb-6 text-blue-400"
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
                  className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="h-px bg-blue-500/60 flex-1 max-w-12 sm:max-w-16"></div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-blue-400/80 font-medium px-2">
                    Feature Film
                  </span>
                  <div className="h-px bg-blue-500/60 flex-1 max-w-12 sm:max-w-16"></div>
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
        </div>
      </motion.section>

      {/* Section Divider */}
      <SectionDivider />

      {/* WORK SECTION */}
      <section 
        id="work" 
        className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-20"
      >
        <div 
          style={{ 
            transition: 'none !important', 
            animation: 'none !important', 
            transform: 'none !important',
            position: 'static',
            zIndex: 'auto',
            isolation: 'isolate'
          }}
        >
          <h3 
            style={{ 
              transition: 'none !important', 
              animation: 'none !important', 
              transform: 'none !important',
              color: dark ? '#ffffff' : '#111827',
              opacity: '0.7',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'normal',
              margin: '0',
              padding: '0',
              position: 'static'
            }}
          >
            Our Portfolio
          </h3>
          <h2 
            style={{ 
              transition: 'none !important', 
              animation: 'none !important', 
              transform: 'none !important',
              color: dark ? '#ffffff' : '#111827',
              fontSize: 'clamp(1.875rem, 4vw, 2.25rem)',
              fontWeight: '700',
              margin: '0.5rem 0 2rem 0',
              padding: '0',
              position: 'static'
            }}
          >
            Featured Work
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {[
            { title: 'Corporate Documentary', category: 'Film', desc: 'Award-winning documentary series' },
            { title: 'Short Film', category: 'Film', desc: 'Festival-selected narrative film' }
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
      </section>

      {/* Section Divider */}
      <SectionDivider />

      {/* SERVICES */}
      <motion.section 
        id="services" 
        ref={servicesRef}
        className="relative py-16 sm:py-24 overflow-hidden"
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

        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto justify-items-center">
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

      {/* Section Divider */}
      <SectionDivider />

      {/* ABOUT SECTION */}
      <motion.section 
        id="about" 
        className="relative py-16 sm:py-24 overflow-hidden"
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

      {/* Section Divider */}
      <SectionDivider />

      {/* AUDITION FORM SECTION */}
      <motion.section 
        id="audition" 
        className="relative py-16 sm:py-24 overflow-hidden"
        style={{
          background: dark 
            ? 'linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.9) 50%, rgba(15, 15, 15, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(250, 250, 250, 0.95) 0%, rgba(240, 240, 240, 0.9) 50%, rgba(250, 250, 250, 0.95) 100%)'
        }}
      >
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h3 className="text-sm uppercase opacity-70 tracking-wider">Join Our Team</h3>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4 sm:mb-6">Apply For Audition</h2>
            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto">
              Showcase your talent and become part of our creative journey. Submit your portfolio and details below.
            </p>
          </motion.div>

          {/* Audition Banner */}
          <motion.div
            className="mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center relative border border-blue-500/20 w-full"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)'
              }}
            >
              {/* Content */}
              <div className="relative z-10 text-center px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4">
                {/* Trihari Universal Logo */}
                <motion.div 
                  className="mb-3 sm:mb-4"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.img 
                    src={logo} 
                    alt="Trihari Universal Logo" 
                    className="h-10 w-10 sm:h-12 sm:w-12 object-contain mx-auto opacity-80 rounded-full ring-1 ring-blue-400/30"
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
                  className="inline-flex items-center gap-0.5 sm:gap-1 md:gap-2 bg-blue-500/10 text-blue-300/90 border border-blue-400/30 px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-sm text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.2em] backdrop-blur-sm mb-1 sm:mb-2 md:mb-3"
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
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold tracking-tight mb-1 sm:mb-2 leading-tight"
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
                  className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2 md:mb-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="h-px bg-gradient-to-r from-blue-500/60 to-transparent w-6 sm:w-10 md:w-16" />
                  <span className="text-[8px] sm:text-[9px] md:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.25em] text-blue-300/70 px-0.5 sm:px-1 whitespace-nowrap">Ready • Set • Action</span>
                  <div className="h-px bg-gradient-to-l from-blue-500/60 to-transparent w-6 sm:w-10 md:w-16" />
                </motion.div>

                <motion.p 
                  className="text-xs sm:text-sm md:text-base text-blue-200/80 mb-2 sm:mb-3 md:mb-4 leading-tight px-1 sm:px-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Submit your profile. Shortlisted candidates will be contacted.
                </motion.p>

                <motion.div 
                  className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {['🎬', '🎭', '🎪'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="text-sm sm:text-base md:text-lg opacity-60"
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
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg font-semibold mb-4 text-red-500">Basic Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base`}
                    onInput={clearFieldError}
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
                    onInput={clearFieldError}
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
                    onInput={clearFieldError}
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
                    onInput={clearFieldError}
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
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg font-semibold mb-4 text-red-500">Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Experience *</label>
                  <select
                    name="experience"
                    required
                    className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    onChange={(e) => {
                      // Clear error styling when user selects
                      if (e.target.value) {
                        e.target.style.borderColor = ''
                        e.target.style.boxShadow = ''
                        const errorMsg = e.target.parentNode.querySelector('.error-message')
                        if (errorMsg) errorMsg.remove()
                      }
                    }}
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
                    onInput={clearFieldError}
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

            {/* TELL US ABOUT YOURSELF */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-red-500">Tell Us About Yourself</h3>
              <div>
                <label className="block text-sm font-medium mb-2">About Yourself</label>
                <textarea
                  name="aboutYourself"
                  rows="4"
                  placeholder="Tell us about your background, interests, and what makes you unique as a performer..."
                  className={`w-full px-4 py-3 rounded-md border ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical`}
                ></textarea>
                <p className="text-xs opacity-60 mt-2">Optional: Share your story, aspirations, or anything else you'd like us to know.</p>
              </div>
            </div>

            {/* HEADSHOT / DOCUMENT */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg font-semibold mb-4 text-red-500">Headshot / Document</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start sm:items-center">
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
                <input 
                  type="checkbox" 
                  name="consent"
                  required 
                  className="mt-1" 
                  onChange={(e) => {
                    if (e.target.checked) {
                      e.target.parentNode.style.color = ''
                      const errorMsg = e.target.parentNode.parentNode.querySelector('.error-message')
                      if (errorMsg) errorMsg.remove()
                    }
                  }}
                />
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

      {/* Section Divider */}
      <SectionDivider />

      {/* CONTACT SECTION */}
      <motion.section 
        id="contact" 
        className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-16 sm:py-20 md:py-24"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-6">Let's Create Together</h2>
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
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-white/20 flex items-center justify-center relative overflow-hidden group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                {/* Founder Image - Clean and Clear */}
                <img 
                  src={founderImage} 
                  alt="Siddhant Badhani - Founder & Creative Director" 
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Simple subtle border on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/0 group-hover:border-blue-400/60 transition-all duration-300" />
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
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6">
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
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
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

      {/* Development Test Panel */}
      <GoogleSheetsTestPanel />

    </div>
  )
}
