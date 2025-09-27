import React, { useState, useEffect } from 'react'
import GoogleSheetsService from '../services/GoogleSheetsService'

const GoogleSheetsTestPanel = () => {
  const [stats, setStats] = useState({ totalSubmissions: 0, todaySubmissions: 0 })
  const [connectionStatus, setConnectionStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkConnection()
    loadStats()
  }, [])

  const checkConnection = async () => {
    setLoading(true)
    try {
      const isConnected = await GoogleSheetsService.testConnection()
      setConnectionStatus(isConnected)
    } catch (error) {
      setConnectionStatus(false)
    }
    setLoading(false)
  }

  const loadStats = async () => {
    try {
      const statsData = await GoogleSheetsService.getStats()
      setStats(statsData)
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const testSubmission = async () => {
    setLoading(true)
    try {
      const testData = {
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '9999999999',
        city: 'Test City',
        experience: '2 years',
        skills: 'Acting',
        consent: true
      }

      console.log('🧪 Starting test submission...')
      const result = await GoogleSheetsService.submitToSheets(testData)
      
      const message = result.success 
        ? `✅ Test submission successful!\nRow ID: ${result.rowId || 'Unknown'}`
        : `❌ Test submission failed\nError: ${result.error || result.message}`
      
      alert(message)
      
      if (result.success) {
        loadStats() // Refresh stats
      }
    } catch (error) {
      console.error('🚨 Test submission error:', error)
      alert(`❌ Test failed: ${error.message}\n\nCheck console for details.`)
    }
    setLoading(false)
  }

  if (process.env.NODE_ENV === 'production') {
    return null // Hide in production
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#1f2937',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: 9999,
      minWidth: '250px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#60a5fa' }}>📊 Google Sheets Status</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Connection: </strong>
        <span style={{ 
          color: connectionStatus === true ? '#10b981' : connectionStatus === false ? '#ef4444' : '#f59e0b' 
        }}>
          {connectionStatus === true ? '✅ Connected' : connectionStatus === false ? '❌ Failed' : '⏳ Testing...'}
        </span>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Total Submissions:</strong> {stats.totalSubmissions}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Today:</strong> {stats.todaySubmissions}
      </div>

      <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
        <button
          onClick={checkConnection}
          disabled={loading}
          style={{
            padding: '6px 12px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '11px'
          }}
        >
          {loading ? '⏳ Testing...' : '🔄 Test Connection'}
        </button>

        <button
          onClick={testSubmission}
          disabled={loading || !connectionStatus}
          style={{
            padding: '6px 12px',
            background: connectionStatus ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading || !connectionStatus ? 'not-allowed' : 'pointer',
            fontSize: '11px'
          }}
        >
          {loading ? '⏳ Testing...' : '🧪 Test Submission'}
        </button>

        <button
          onClick={loadStats}
          disabled={loading}
          style={{
            padding: '6px 12px',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '11px'
          }}
        >
          {loading ? '⏳ Loading...' : '📈 Refresh Stats'}
        </button>
      </div>

      {stats.error && (
        <div style={{ 
          marginTop: '10px', 
          color: '#ef4444', 
          fontSize: '10px',
          background: '#1f1f1f',
          padding: '8px',
          borderRadius: '4px'
        }}>
          <strong>Error:</strong> {stats.error}
        </div>
      )}
    </div>
  )
}

export default GoogleSheetsTestPanel
