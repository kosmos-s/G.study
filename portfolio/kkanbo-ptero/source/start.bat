@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist .env (
  echo .env 파일이 없습니다.
  echo .env.example을 복사해 .env로 만들고 값을 입력하세요.
  pause
  exit /b 1
)
call npm start
pause
