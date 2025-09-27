/**
 * Enhanced Google Sheets Service with CORS Proxy Fallback
 * This version tries direct connection first, then falls back to CORS proxy
 */

class GoogleSheetsService {
  constructor() {
    // Try to get the URL from environment variables
    this.webAppUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL || 
                     import.meta.env.REACT_APP_GOOGLE_SHEETS_URL ||
                     'https://script.google.com/macros/s/AKfycbw6BrIZ3sPHthFNVFro7WxSn7vRLc7Uc1vwB9NmU57DoYjcQAYPhaaGiPpUJgIoDFVo/exec'
    
    // CORS proxy as fallback
    this.corsProxyUrl = 'https://api.allorigins.win/raw?url='
    
    console.log('🔧 GoogleSheetsService initialized:', {
      webAppUrl: this.webAppUrl ? '✅ Set' : '❌ Missing',
      url: this.webAppUrl
    })
  }

  /**
   * Submit form data to Google Sheets with CORS fallback
   */
  async submitToSheets(formData) {
    try {
      if (!this.webAppUrl) {
        console.warn('⚠️ Google Sheets Web App URL not configured')
        return {
          success: false,
          message: 'Google Sheets not configured',
          error: 'Missing Web App URL'
        }
      }

      console.log('📊 Submitting to Google Sheets...', {
        url: this.webAppUrl,
        data: formData
      })

      // Prepare data for Google Sheets
      const sheetsData = {
        timestamp: new Date().toISOString(),
        fullName: formData.fullName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        city: formData.city || '',
        age: formData.age || '',
        dateOfBirth: formData.dob || '',
        gender: formData.gender || '',
        experience: formData.experience || '',
        skills: formData.skills || '',
        instagram: formData.instagram || '',
        portfolio: formData.portfolio || '',
        aboutYourself: formData.aboutYourself || '',
        consent: formData.consent ? 'Yes' : 'No',
        photoUrl: formData.photoUrl || '',
        submissionDate: new Date().toLocaleDateString('en-IN'),
        submissionTime: new Date().toLocaleTimeString('en-IN'),
        source: 'Trihari Universal Website',
        status: 'New Application'
      }

      // Try direct connection first
      try {
        console.log('🚀 Attempting direct connection...')
        const directResponse = await this.directSubmit(sheetsData)
        return directResponse
      } catch (directError) {
        console.warn('⚠️ Direct connection failed, trying CORS proxy...', directError.message)
        
        // Fallback to CORS proxy
        try {
          const proxyResponse = await this.proxySubmit(sheetsData)
          return proxyResponse
        } catch (proxyError) {
          console.error('❌ Both direct and proxy methods failed')
          throw proxyError
        }
      }

    } catch (error) {
      console.error('❌ Error saving to Google Sheets:', error)
      return {
        success: false,
        message: 'Failed to save to spreadsheet, but email was sent',
        error: error.message
      }
    }
  }

  /**
   * Direct submission to Google Apps Script
   */
  async directSubmit(data) {
    console.log('📡 Direct submission to:', this.webAppUrl)
    
    const response = await fetch(this.webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'cors'
    })

    console.log('📡 Direct response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ Direct submission successful:', result)
    
    return {
      success: true,
      message: 'Data saved to spreadsheet',
      rowId: result.rowId || null,
      method: 'direct'
    }
  }

  /**
   * Submission via CORS proxy
   */
  async proxySubmit(data) {
    console.log('🔄 Proxy submission via:', this.corsProxyUrl)
    
    const proxyUrl = `${this.corsProxyUrl}${encodeURIComponent(this.webAppUrl)}`
    
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    console.log('📡 Proxy response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Proxy error! status: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ Proxy submission successful:', result)
    
    return {
      success: true,
      message: 'Data saved to spreadsheet (via proxy)',
      rowId: result.rowId || null,
      method: 'proxy'
    }
  }

  /**
   * Get submission statistics
   */
  async getStats() {
    try {
      const statsUrl = `${this.webAppUrl}?action=stats`
      
      // Try direct first, then proxy
      try {
        const response = await fetch(statsUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        return await response.json()
      } catch (directError) {
        console.warn('Stats direct failed, trying proxy...', directError.message)
        
        const proxyUrl = `${this.corsProxyUrl}${encodeURIComponent(statsUrl)}`
        const response = await fetch(proxyUrl)
        
        if (!response.ok) {
          throw new Error(`Proxy error! status: ${response.status}`)
        }
        
        return await response.json()
      }
      
    } catch (error) {
      console.error('❌ Error fetching stats:', error)
      return {
        totalSubmissions: 0,
        todaySubmissions: 0,
        error: error.message
      }
    }
  }

  /**
   * Test connection to Google Apps Script
   */
  async testConnection() {
    try {
      if (!this.webAppUrl) {
        console.error('❌ Web App URL not configured')
        return false
      }

      console.log('🔍 Testing connection to:', this.webAppUrl)
      
      // Try direct connection first
      try {
        const response = await fetch(this.webAppUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
          mode: 'cors'
        })

        console.log('📡 Direct connection test response:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        })

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        console.log('✅ Direct connection test result:', result)
        return response.ok
        
      } catch (directError) {
        console.warn('Direct connection test failed, trying proxy...', directError.message)
        
        // Try proxy
        const proxyUrl = `${this.corsProxyUrl}${encodeURIComponent(this.webAppUrl)}`
        const response = await fetch(proxyUrl)
        
        if (!response.ok) {
          throw new Error(`Proxy Error: ${response.status} ${response.statusText}`)
        }
        
        const result = await response.json()
        console.log('✅ Proxy connection test result:', result)
        return true
      }
      
    } catch (error) {
      console.error('❌ Connection test failed:', error)
      return false
    }
  }
}

// Export singleton instance
const GoogleSheetsServiceInstance = new GoogleSheetsService()
export default GoogleSheetsServiceInstance
