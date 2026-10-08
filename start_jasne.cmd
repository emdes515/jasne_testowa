@echo off
title JASNE Dev Server (http://localhost:3000)
cd /d "%~dp0"
echo ===================================================
echo   Uruchamianie JASNE Dev Server (BFF + Vite)...
echo ===================================================
echo   Adres: http://localhost:3000
echo ===================================================
npm run dev
pause
