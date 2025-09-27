/**
 * Google Sheets API Service for Trihari Universal
 * Stores form submissions in Google Spreadsheet
 */

class GoogleSheetsService {
  constructor() {
    // Google Apps Script Web App URL
    this.webAppUrl = import.meta.env?.VITE_GOOGLE_SHEETS_URL || process.env.REACT_APP_GOOGLE_SHEETS_URL || ''
    
    // CORS proxy fallback URLs
    this.corsProxies = [
      'https://api.allorigins.win/raw?url=',
      'https://corsproxy.io/?',
      'https://thingproxy.freeboard.io/fetch/'
    ]
    
    // Debug logging
    console.log('🔧 GoogleSheetsService initialized:', {
      webAppUrl: this.webAppUrl ? '✅ Set' : '❌ Missing',
      url: this.webAppUrl,
      corsProxies: this.corsProxies.length
    })
  }

  /**
   * Submit form data to Google Sheets
   * @param {Object} formData - Form submission data
   * @returns {Promise<Object>} Response from Google Sheets
   */
  async submitToSheets(formData) {
    try {
      // Check if Web App URL is configured
      if (!this.webAppUrl) {
        console.warn('⚠️ Google Sheets Web App URL not configured')
        console.log('Debug - Environment check:', {
          VITE_GOOGLE_SHEETS_URL: import.meta.env?.VITE_GOOGLE_SHEETS_URL,
          REACT_APP_GOOGLE_SHEETS_URL: process.env.REACT_APP_GOOGLE_SHEETS_URL
        })
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
      const sheetData = {
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

      let lastError = null
      
      // Try direct connection first
      try {
        console.log('� Attempting direct connection to Google Sheets...')
        
        const response = await fetch(this.webAppUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sheetData),
          mode: 'cors'
        })

        console.log('📡 Direct response received:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        })

        if (response.ok) {
          const result = await response.json()
          console.log('✅ Direct connection successful:', result)
          
          return {
            success: true,
            message: 'Data saved to spreadsheet (direct)',
            rowId: result.rowId || null
          }
        }
        
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
        
      } catch (error) {
        console.log('⚠️ Direct connection failed:', error.message)
        lastError = error
      }

      // If direct connection fails, try CORS proxies
      for (let i = 0; i < this.corsProxies.length; i++) {
        const proxy = this.corsProxies[i]
        const proxyUrl = proxy + encodeURIComponent(this.webAppUrl)
        
        try {
          console.log(`🔄 Attempting CORS proxy ${i + 1}:`, proxy)
          
          const response = await fetch(proxyUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(sheetData)
          })

          console.log(`📡 Proxy ${i + 1} response:`, {
            status: response.status,
            ok: response.ok
          })

          if (response.ok) {
            const result = await response.json()
            console.log(`✅ CORS proxy ${i + 1} successful:`, result)
            
            return {
              success: true,
              message: `Data saved to spreadsheet (proxy ${i + 1})`,
              rowId: result.rowId || null
            }
          }
          
        } catch (error) {
          console.log(`⚠️ CORS proxy ${i + 1} failed:`, error.message)
          lastError = error
        }
      }

      // All attempts failed
      throw lastError || new Error('All connection attempts failed')

    } catch (error) {
      console.error('❌ Error saving to Google Sheets:', error)
      
      // Don't throw error - allow form submission to continue even if sheets fails
      return {
        success: false,
        message: 'Failed to save to spreadsheet, but email was sent',
        error: error.message
      }
    }
  }

  /**
   * Get submission statistics from Google Sheets
   * @returns {Promise<Object>} Statistics data
   */
  async getStats() {
    try {
      const response = await fetch(`${this.webAppUrl}?action=stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const stats = await response.json()
      return stats

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
   * Test connection to Google Sheets
   * @returns {Promise<boolean>} Connection status
   */
  async testConnection() {
    try {
      if (!this.webAppUrl) {
        console.error('❌ Web App URL not configured')
        return false
      }

      console.log('🔍 Testing connection to:', this.webAppUrl)
      
      // Try the basic endpoint first (more reliable)
      const response = await fetch(this.webAppUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        mode: 'cors'
      })
      
      console.log('📡 Connection test response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })
      
      if (!response.ok) {
        console.error('❌ HTTP Error:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('Error text:', errorText)
        return false
      }

      const result = await response.json()
      console.log('✅ Connection test result:', result)
      
      return response.ok
    } catch (error) {
      console.error('❌ Connection test failed:', error)
      return false
    }
  }
}

export default new GoogleSheetsService()
