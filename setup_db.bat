@echo off
echo Stopping any lingering Node processes (Optional, skipping for safety)
:: taskkill /F /IM node.exe

echo ---------------------------------------
echo 1. Regenerating Prisma Client...
echo ---------------------------------------
cd server
call npx prisma generate
if %errorlevel% neq 0 (
    echo [ERROR] Failed to generate Prisma Client. Make sure the server is STOPPED.
    pause
    exit /b %errorlevel%
)

echo.
echo ---------------------------------------
echo 2. Running Migrations...
echo ---------------------------------------
call npx prisma migrate dev --name add_testimonial_model
if %errorlevel% neq 0 (
    echo [WARNING] Migration might have failed or already applied. Continuing...
)

echo.
echo ---------------------------------------
echo 3. Seeding Database...
echo ---------------------------------------
node seedTestimonials.js
if %errorlevel% neq 0 (
    echo [ERROR] Seeding failed.
    pause
    exit /b %errorlevel%
)

echo.
echo ---------------------------------------
echo ✅ DONE! You can now restart your server with 'npm run dev'
echo ---------------------------------------
pause
