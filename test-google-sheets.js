// Test script for Google Sheets CORS proxy
import fetch from 'node-fetch'

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzVwjO8Auk9lAMYf8K-e-fWV9ZtKplkP0N6z0z5g7X98I7O3oKmInSHO5kLBqDSFaIl/exec'

const corsProxies = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://thingproxy.freeboard.io/fetch/'
]

const testData = {
  timestamp: new Date().toISOString(),
  fullName: 'Test User',
  email: 'test@example.com',
  phone: '1234567890',
  city: 'Test City',
  age: '25',
  dateOfBirth: '1999-01-01',
  gender: 'Other',
  experience: 'Beginner',
  skills: 'Testing',
  instagram: '@test',
  portfolio: 'https://test.com',
  aboutYourself: 'This is a test submission',
  consent: 'Yes',
  photoUrl: '',
  submissionDate: new Date().toLocaleDateString('en-IN'),
  submissionTime: new Date().toLocaleTimeString('en-IN'),
  source: 'CORS Proxy Test',
  status: 'Test Application'
}

async function testDirectConnection() {
  console.log('🔄 Testing direct connection...')
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })
    
    if (response.ok) {
      const result = await response.json()
      console.log('✅ Direct connection successful:', result)
      return true
    } else {
      console.log('❌ Direct connection failed:', response.status, response.statusText)
      return false
    }
  } catch (error) {
    console.log('❌ Direct connection error:', error.message)
    return false
  }
}

async function testCorsProxies() {
  console.log('\n🔄 Testing CORS proxies...')
  
  for (let i = 0; i < corsProxies.length; i++) {
    const proxy = corsProxies[i]
    const proxyUrl = proxy + encodeURIComponent(GOOGLE_SHEETS_URL)
    
    try {
      console.log(`\n🔄 Testing proxy ${i + 1}: ${proxy}`)
      
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testData)
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log(`✅ Proxy ${i + 1} successful:`, result)
        return true
      } else {
        console.log(`❌ Proxy ${i + 1} failed:`, response.status, response.statusText)
      }
      
    } catch (error) {
      console.log(`❌ Proxy ${i + 1} error:`, error.message)
    }
  }
  
  return false
}

async function runTests() {
  console.log('🧪 Starting Google Sheets CORS Proxy Tests\n')
  
  const directSuccess = await testDirectConnection()
  
  if (!directSuccess) {
    const proxySuccess = await testCorsProxies()
    
    if (!proxySuccess) {
      console.log('\n❌ All connection methods failed')
    } else {
      console.log('\n✅ CORS proxy method successful!')
    }
  } else {
    console.log('\n✅ Direct connection successful!')
  }
}

runTests().catch(console.error)
