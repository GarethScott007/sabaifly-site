$ts = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = "img-dup-backup-$ts"; New-Item -ItemType Directory -Force -Path $backup | Out-Null
Get-Content "img-duplicates-found.txt" | ForEach-Object {
  $p = $_.Trim(); if ($p -eq "") { return }
  if (Test-Path $p) { $dst = Join-Path $backup $p; New-Item -ItemType Directory -Force -Path (Split-Path $dst) | Out-Null; Move-Item -Force $p $dst; Write-Host "Moved: $p" }
  else { Write-Host "Skipped: $p" }
}
Write-Host "Done. Review $backup then commit."
