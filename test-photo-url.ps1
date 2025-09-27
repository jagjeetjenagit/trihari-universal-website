$url = "https://script.google.com/macros/s/AKfycbx4_JvZ-taqBMkQYReg-MkM0_ut9apiQggeKu0LmhSfy60lEwjmZXnF_xcnJ_1csaOgOQ/exec"

Write-Host "Testing Photo URL Extraction..."

# Test POST with the actual photo URL format you're getting
try {
    Write-Host "`n=== PHOTO URL EXTRACTION TEST ==="
    $formData = @{
        fullName = "Photo URL Test User"
        email = "phototest@example.com"
        phone = "1234567890"
        city = "Test City"
        photoUrl = "PHOTO UPLOADED: Screenshot 2025-09-27 145221.png View Photo: https://res.cloudinary.com/dn78mntyo/image/upload/v1758989382/auditions/mq3os1odpv5lkbo86jji.png Click the links above to view the actual photos! You can also WhatsApp: +918218186298 for direct contact."
        source = "Photo URL Test"
    }
    
    Write-Host "Sending test with complex photo URL..."
    
    $postResponse = Invoke-RestMethod -Uri $url -Method POST -Body $formData
    Write-Host "POST Success:"
    $postResponse | Format-List
    
    Write-Host "Expected: Only the Cloudinary URL should be saved in the spreadsheet"
    Write-Host "URL: https://res.cloudinary.com/dn78mntyo/image/upload/v1758989382/auditions/mq3os1odpv5lkbo86jji.png"
    
} catch {
    Write-Host "POST Failed:"
    Write-Host $_.Exception.Message
}
