@echo off
setlocal enabledelayedexpansion
for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyyMMdd-HHmmss\")"') do set TS=%%i
set BACKUP=img-dup-backup-!TS!
mkdir "!BACKUP!"
set LIST=img-duplicates-found.txt
if not exist "!LIST!" ( echo Missing !LIST! & exit /b 1 )
for /f "usebackq delims=" %%p in ("!LIST!") do (
  if exist "%%p" (
    set DST=!BACKUP!\%%p
    call :MKDIRS "!DST!"
    move /Y "%%p" "!DST!" >nul
    echo Moved: %%p
  ) else (
    echo Skipped: %%p
  )
)
echo Done. Review !BACKUP! then commit.
exit /b 0
:MKDIRS
set "_p=%~dp1"
if not exist "%_p%" mkdir "%_p%"
exit /b 0
