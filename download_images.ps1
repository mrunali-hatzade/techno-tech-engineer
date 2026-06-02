$ErrorActionPreference = 'Stop'

$imagesDir = "assets/images"
if (-not (Test-Path -Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
}

$urls = Get-Content "image_urls.txt"

foreach ($url in $urls) {
    if (-not [string]::IsNullOrWhiteSpace($url)) {
        $filename = Split-Path $url -Leaf
        $dest = Join-Path -Path $imagesDir -ChildPath $filename
        Write-Host "Downloading $filename..."
        try {
            Invoke-WebRequest -Uri $url -OutFile $dest
        } catch {
            Write-Host "Failed to download $url"
        }
    }
}

Write-Host "Download complete."
