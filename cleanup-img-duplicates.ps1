$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = "img-dup-backup-$timestamp"
Write-Host "Creating backup folder: $backup"
New-Item -ItemType Directory -Force -Path $backup | Out-Null

$list = "img-duplicates-found.txt"
if (!(Test-Path $list)) { Write-Error "Cannot find $list in current folder."; exit 1 }

Get-Content $list | ForEach-Object {
  $src = $_.Trim()
  if ($src -eq "") { return }
  if (Test-Path $src) {
    $dst = Join-Path $backup $src
    New-Item -ItemType Directory -Force -Path (Split-Path $dst) | Out-Null
    Write-Host "Moving $src -> $dst"
    Move-Item -Force -Path $src -Destination $dst
  } else {
    Write-Host "Skipping (not found): $src"
  }
}
Write-Host "Done. Review $backup then commit."
