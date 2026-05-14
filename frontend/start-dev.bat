@echo off
title Amdox ERP - Dev Server
cd /d "%~dp0"
echo Starting Amdox ERP Dev Server...
echo.
npx vite --port 3000 --host 0.0.0.0
pause
