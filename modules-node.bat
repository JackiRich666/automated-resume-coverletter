@echo off
chcp 65001 > nul
title Установка зависимостей проекта: automated-resume-coverletter

echo =======================================================
echo   Запуск установки окружения для проекта
echo   automated-resume-coverletter
echo =======================================================
echo.

:: Проверка наличия Node.js в системе
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ОШИБКА] Node.js не найден!
    echo Пожалуйста, установите Node.js с сайта https://nodejs.org перед запуском.
    pause
    exit /b
)

:: Определение базовой папки (директория, где лежит сам .bat)
set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%"

echo [1/3] Установка модулей в корневой папке проекта...
if exist package.json (
    call npm install
) else (
    echo [ПРОПУЩЕНО] В корне проекта нет package.json
)
echo.

echo [2/3] Переход в папку frontend и установка зависимостей...
if exist "%BASE_DIR%frontend" (
    cd /d "%BASE_DIR%frontend"
    call npm install
) else (
    echo [ОШИБКА] Папка "%BASE_DIR%frontend" не найдена!
)
echo.

echo [3/3] Переход в папку backend и установка зависимостей...
if exist "%BASE_DIR%backend" (
    cd /d "%BASE_DIR%backend"
    call npm install
) else (
    echo [ОШИБКА] Папка "%BASE_DIR%backend" не найдена!
)
echo.

cd /d "%BASE_DIR%"
echo =======================================================
echo   Установка успешно завершена!
echo   Теперь вы можете запустить проект через ваш стартовый .bat
echo =======================================================
pause
