$testData = @{
    timestamp = (Get-Date).ToString('o')
    fullName = 'PowerShell Test User'
    email = 'pstest@example.com'
    phone = '1234567890'
    city = 'Test City'
    age = '25'
    dateOfBirth = '1999-01-01'
    gender = 'Other'
    experience = 'Beginner'
    skills = 'Testing'
    instagram = '@pstest'
    portfolio = 'https://test.com'
    aboutYourself = 'PowerShell test submission'
    consent = 'Yes'
    photoUrl = ''
    submissionDate = (Get-Date).ToString('dd/MM/yyyy')
    submissionTime = (Get-Date).ToString('HH:mm:ss')
    source = 'PowerShell Direct Test'
    status = 'Test Application'
} | ConvertTo-Json

Write-Host "Testing Google Apps Script URL..."
Write-Host "URL: https://script.google.com/macros/s/AKfycbw6BrIZ3sPHthFNVFro7WxSn7vRLc7Uc1vwB9NmU57DoYjcQAYPhaaGiPpUJgIoDFVo/exec"
Write-Host "Data:" $testData

try {
    $response = Invoke-RestMethod -Uri "https://script.google.com/macros/s/AKfycbw6BrIZ3sPHthFNVFro7WxSn7vRLc7Uc1vwB9NmU57DoYjcQAYPhaaGiPpUJgIoDFVo/exec" -Method POST -Body $testData -ContentType "application/json"
    Write-Host "✅ SUCCESS - Response received:"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ ERROR:"
    Write-Host $_.Exception.Message
    Write-Host "Full Error:"
    $_ | Format-List -Force
}
