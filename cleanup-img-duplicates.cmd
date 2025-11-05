@echo off
setlocal enabledelayedexpansion
REM Move duplicate /img files into a timestamped backup folder (safe cleanup)
for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyyMMdd-HHmmss\")"') do set TS=%%i
set BACKUP=img-dup-backup-!TS!
echo Creating backup folder: !BACKUP!
mkdir "!BACKUP!"

set LIST=img-duplicates-found.txt
if not exist "!LIST!" (
  echo Could not find !LIST! in the current folder. Aborting.
  exit /b 1
)

for /f "usebackq delims=" %%p in ("!LIST!") do (
  set SRC=%%p
  if exist "%%p" (
    set DST=!BACKUP!\%%p
    for %%d in (!DST!) do (
      rem ensure parent directory exists
    )
    call :MKDIRS "!DST!"
    echo Moving "%%p" -> "!DST!"
    move /Y "%%p" "!DST!">nul
  ) else (
    echo Skipping (not found): %%p
  )
)
echo Done. Review "!BACKUP!" then commit the removal. You can delete the backup later.
exit /b 0

:MKDIRS
set "_path=%~dp1"
if not exist "%_path%" mkdir "%_path%"
exit /b 0
