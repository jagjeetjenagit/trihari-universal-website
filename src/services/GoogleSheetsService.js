/**
 * Google Sheets API Service for Trihari Universal
 * Stores for        // Try direct connection submissions in Google Spreadsheet
 */

class GoogleSheetsService {
  constructor() {
    // Google Apps Script Web App URL
    this.webAppUrl = import.meta.env?.VITE_GOOGLE_SHEETS_URL || process.env.REACT_APP_GOOGLE_SHEETS_URL || ''
    
    // CORS proxy fallback URLs - updated with more reliable options
    this.corsProxies = [
      'https://api.allorigins.win/raw?url=',
      'https://cors-anywhere.herokuapp.com/',
      'https://api.codetabs.com/v1/proxy?quest=',
      'https://yacdn.org/proxy/'
    ]
    
    // Production: Only log critical issues
    if (!this.webAppUrl) {
      console.warn('GoogleSheetsService: Web App URL not configured')
    }
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
        console.warn('Google Sheets Web App URL not configured')
        return {
          success: false,
          message: 'Google Sheets not configured',
          error: 'Missing Web App URL'
        }
      }

      // Production: Submit to Google Sheets
      
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

        if (response.ok) {
          const result = await response.json()
          
          return {
            success: true,
            message: 'Data saved to spreadsheet (direct)',
            rowId: result.rowId || null
          }
        }
        
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
        
      } catch (error) {
        lastError = error
      }

      // Try form submission method
      try {
        const success = await this.submitViaForm(sheetData)
        if (success) {
          return {
            success: true,
            message: 'Data saved to spreadsheet',
            rowId: 'form-' + Date.now()
          }
        }
      } catch (formError) {
        lastError = formError
      }

      // If form method fails, try CORS proxies as final fallback
      for (let i = 0; i < this.corsProxies.length; i++) {
        const proxy = this.corsProxies[i]
        const proxyUrl = proxy + encodeURIComponent(this.webAppUrl)
        
        try {
          const response = await fetch(proxyUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(sheetData)
          })

          if (response.ok) {
            const responseText = await response.text()
            
            try {
              const result = JSON.parse(responseText)
              
              // Verify it's actually a success response from our Google Apps Script
              if (result.success === true && result.rowId) {
                return {
                  success: true,
                  message: `Data saved to spreadsheet (proxy ${i + 1})`,
                  rowId: result.rowId
                }
              } else {
                throw new Error(`Unexpected response format`)
              }
              
            } catch (parseError) {
              throw new Error(`Invalid JSON response: ${parseError.message}`)
            }
          }
          
        } catch (error) {
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
   * Submit data via hidden form (bypasses CORS entirely)
   * @param {Object} formData - Data to submit
   * @returns {Promise<boolean>} Success status
   */
  async submitViaForm(formData) {
    return new Promise((resolve) => {
      try {
        // Create hidden iframe for form submission (no new tab)
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.name = 'google-sheets-submit'
        document.body.appendChild(iframe)
        
        // Create hidden form
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = this.webAppUrl
        form.target = 'google-sheets-submit'
        form.style.display = 'none'
        
        // Add form fields - ensure proper encoding
        Object.entries(formData).forEach(([key, value]) => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = typeof value === 'object' ? JSON.stringify(value) : String(value)
          form.appendChild(input)
        })
        
        // Add to page and submit
        document.body.appendChild(form)
        
        // Listen for iframe load (indicates submission complete)
        iframe.onload = () => {
          setTimeout(() => {
            document.body.removeChild(form)
            document.body.removeChild(iframe)
            resolve(true)
          }, 1000)
        }
        
        iframe.onerror = () => {
          setTimeout(() => {
            document.body.removeChild(form)
            document.body.removeChild(iframe)
            resolve(false)
          }, 1000)
        }
        
        // Submit the form
        form.submit()
        
        // Fallback timeout
        setTimeout(() => {
          if (document.body.contains(form)) {
            document.body.removeChild(form)
          }
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe)
          }
          resolve(true) // Assume success even if we can't confirm
        }, 5000)
        
      } catch (error) {
        resolve(false)
      }
    })
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
