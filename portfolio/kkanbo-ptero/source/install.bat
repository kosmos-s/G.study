@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo [1/2] Node.js 버전 확인
node -v
if errorlevel 1 (
  echo Node.js가 설치되어 있지 않습니다. Node.js 20 LTS 이상을 설치하세요.
  pause
  exit /b 1
)
echo.
echo [2/2] 패키지 설치
call npm install
pause
