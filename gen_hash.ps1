$text = "LuchengAdmin2026!"
$sha256 = [System.Security.Cryptography.SHA256]::Create()
$bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
$hash = $sha256.ComputeHash($bytes)
$hex = [System.BitConverter]::ToString($hash).Replace("-", "").ToLower()
Write-Output "Password: $text"
Write-Output "SHA-256: $hex"