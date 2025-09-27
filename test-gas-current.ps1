$url = "https://script.google.com/macros/s/AKfycbx4_JvZ-taqBMkQYReg-MkM0_ut9apiQggeKu0LmhSfy60lEwjmZXnF_xcnJ_1csaOgOQ/exec"

Write-Host "Testing Google Apps Script URL..."
Write-Host "URL: $url"

# Test GET request
try {
    Write-Host "`n=== GET REQUEST TEST ==="
    $getResponse = Invoke-RestMethod -Uri $url -Method GET
    Write-Host "✅ GET Success:"
    Write-Host $getResponse
} catch {
    Write-Host "❌ GET Failed:"
    Write-Host $_.Exception.Message
}

# Test POST with form data
try {
    Write-Host "`n=== POST REQUEST TEST ==="
    $formData = @{
        fullName = "PowerShell Test User"
        email = "test@example.com"
        phone = "1234567890"
        city = "Test City"
        age = "25"
        source = "PowerShell Direct Test"
    }
    
    Write-Host "Sending form data:"
    $formData | Format-Table
    
    $postResponse = Invoke-RestMethod -Uri $url -Method POST -Body $formData
    Write-Host "✅ POST Success:"
    $postResponse | Format-List
} catch {
    Write-Host "❌ POST Failed:"
    Write-Host $_.Exception.Message
    Write-Host "Response:" $_.Exception.Response
}
