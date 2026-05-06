@echo off
echo Cleaning up redundant files from LearnFlow Platform...

:: Frontend Files
del /q frontend\CODE_CLEANUP_SUMMARY.md 2>nul
del /q frontend\FIX_SELECT_SCROLL_ISSUE.md 2>nul
del /q frontend\TYPESCRIPT_TO_JAVASCRIPT_CONVERSION.md 2>nul
del /q frontend\src\AppTest.jsx 2>nul
del /q frontend\src\mainTest.jsx 2>nul

:: Server Files
del /q server\addApnaCollege.js 2>nul
del /q server\checkDb.js 2>nul
del /q server\fetchYtCourses.js 2>nul
del /q server\seedCategory.js 2>nul
del /q server\seedCourses.js 2>nul
del /q server\seedExtra.js 2>nul
del /q server\seedTestimonials.js 2>nul
del /q server\test_api.js 2>nul
del /q server\test_db.js 2>nul
del /q server\test_post.js 2>nul
del /q server\error.log 2>nul
del /q server\seedExtra.log 2>nul
del /q server\yt_1.xml 2>nul
del /q server\yt_temp.xml 2>nul
del /q server\DEPLOYMENT_CHANGES.md 2>nul
del /q server\RENDER_DEPLOYMENT.md 2>nul
del /q server\RENDER_FIX.md 2>nul

:: Directories
if exist server\.node_modules_backup (
    echo Removing backup directory...
    rd /s /q server\.node_modules_backup 2>nul
)

echo Cleanup complete!
pause
