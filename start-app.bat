@echo off
chcp 65001 > nul

start "Ollama AI Server" cmd /k "ollama serve"

start "Frontend (React/Vue)" cmd /k "cd /d C:\Users\Jack\Desktop\automated-resume-coverletter\frontend && npm start"

start "Backend (Node.js)" cmd /k "cd /d C:\Users\Jack\Desktop\automated-resume-coverletter\backend && npm run dev"
