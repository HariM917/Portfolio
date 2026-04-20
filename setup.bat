@echo off
REM Color codes for Windows
REM This is a Windows batch version of setup script

echo.
echo ==============================
echo Portfolio Setup Guide (Windows)
echo ==============================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed
    echo Download from: https://nodejs.org/
    exit /b 1
)

echo [OK] Node.js found
node --version
npm --version
echo.

REM Backend setup
echo Setting up Backend...
cd backend

if not exist .env (
    echo Creating .env from template...
    copy .env.example .env
    echo [WARNING] Update backend\.env with your MongoDB URI
)

echo Installing backend dependencies...
call npm install

echo [OK] Backend setup complete!
cd ..
echo.

REM Frontend setup
echo Setting up Frontend...
cd frontend

if not exist .env (
    echo Creating .env from template...
    copy .env.example .env
)

echo Installing frontend dependencies...
call npm install

echo [OK] Frontend setup complete!
echo.

REM Summary
echo.
echo ==============================
echo Setup Complete!
echo ==============================
echo.
echo Next steps:
echo.
echo 1. Update MongoDB connection string:
echo    - Edit backend\.env
echo    - Add your MongoDB Atlas URI
echo.
echo 2. Start the backend (Terminal 1):
echo    cd backend
echo    npm run dev
echo.
echo 3. Start the frontend (Terminal 2):
echo    cd frontend
echo    npm start
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo Need help?
echo - Check README.md for full documentation
echo - Check DEPLOYMENT.md for deployment instructions
echo.
