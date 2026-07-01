@echo off
chcp 65001 > nul

set "BASE_DIR=%~dp0"

start "Ollama AI Server" cmd /k "ollama serve"

start "Frontend (React)" cmd /k "cd /d "%BASE_DIR%frontend" && npm start"

start "Backend (Node.js)" cmd /k "cd /d "%BASE_DIR%backend" && npm run dev"
