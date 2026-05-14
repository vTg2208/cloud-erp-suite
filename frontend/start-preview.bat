@echo off
title Amdox ERP - Preview Server
cd /d "%~dp0\dist"
echo Starting Amdox ERP Preview Server...
echo.
npx --yes http-server . -p 4173 -c-1 --cors
pause
