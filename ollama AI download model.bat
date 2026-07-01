@echo off
chcp 65001 > nul
title Установка ИИ модели Qwen 2.5 (14B) через Ollama

echo =======================================================
echo   Автоматическая загрузка ИИ модели для Ollama
echo   Модель: qwen2.5:14b
echo =======================================================
echo.

:: Проверка, запущен ли Ollama в системе
tasklist /FI "IMAGENAME eq ollama.exe" 2>NUL | find /I /N "ollama.exe">NUL
if %errorlevel% equ 0 (
    echo [ИНФО] Сервис Ollama уже запущен.
    goto download
)

:: Проверка наличия Ollama в переменной PATH
where ollama >nul 2>nul
if %errorlevel% neq 0 (
    echo [ОШИБКА] Утилита ollama не найдена в системе!
    echo Пожалуйста, скачайте и установите Ollama с https://ollama.com
    pause
    exit /b
)

echo [ИНФО] Запуск приложения Ollama...
start "" "ollama app"
:: Ожидание 5 секунд для инициализации сервиса
timeout /t 5 /nobreak >nul

:download
echo [ПРОЦЕСС] Начинается скачивание модели qwen2.5:14b...
echo Это может занять некоторое время (размер ~9 ГБ). Не закрывайте окно!
echo.

ollama run qwen2.5:14b "Привет! Если ты ответишь, значит установка прошла успешно. Кратко поздоровайся."

echo.
echo =======================================================
echo   Модель qwen2.5:14b успешно скачана и готова к работе!
echo =======================================================
pause
