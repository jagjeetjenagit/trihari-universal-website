// Serverless Form Handler for GitHub Pages
// Uses GitHub API to store form submissions as files

export default class GitHubFormHandler {
  constructor(config) {
    this.config = {
      owner: config.owner, // Your GitHub username
      repo: config.repo,   // Your repository name
      token: config.token, // GitHub Personal Access Token
      branch: config.branch || 'main'
    }
  }

  async submitForm(formData) {
    try {
      // Generate unique application ID
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const applicationId = `APP_${timestamp}_${Math.random().toString(36).substr(2, 6)}`
      
      // Prepare submission data
      const submissionData = {
        applicationId,
        submittedAt: new Date().toISOString(),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        city: formData.get('city'),
        dateOfBirth: formData.get('dob'),
        gender: formData.get('gender'),
        experience: formData.get('experience'),
        skills: formData.get('skills'),
        instagram: formData.get('instagram'),
        portfolio: formData.get('portfolio'),
        hasFile: formData.get('headshot') && formData.get('headshot').size > 0
      }

      // Create file content
      const fileContent = JSON.stringify(submissionData, null, 2)
      const encodedContent = btoa(unescape(encodeURIComponent(fileContent)))
      
      // GitHub API request to create file
      const response = await fetch(`https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/submissions/${applicationId}.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `New audition application: ${submissionData.fullName}`,
          content: encodedContent,
          branch: this.config.branch
        })
      })

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      // Send notification email using GitHub Actions
      await this.triggerEmailNotification(submissionData)
      
      return {
        success: true,
        applicationId,
        message: 'Application submitted successfully!'
      }

    } catch (error) {
      console.error('Submission error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async triggerEmailNotification(data) {
    // Trigger GitHub Action for email notification
    try {
      await fetch(`https://api.github.com/repos/${this.config.owner}/${this.config.repo}/dispatches`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'new_audition_application',
          client_payload: data
        })
      })
    } catch (error) {
      console.warn('Email notification failed:', error)
    }
  }
}
