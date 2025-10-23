@echo off
REM Professional Server Management Script for Aflah Islamic Life Coaching Website
REM Batch file wrapper for PowerShell script

setlocal enabledelayedexpansion

REM Default values
set ACTION=status
set ENVIRONMENT=development
set FORCE=false
set VERBOSE=false

REM Parse command line arguments
:parse_args
if "%~1"=="" goto :execute
if "%~1"=="start" set ACTION=start
if "%~1"=="stop" set ACTION=stop
if "%~1"=="restart" set ACTION=restart
if "%~1"=="status" set ACTION=status
if "%~1"=="logs" set ACTION=logs
if "%~1"=="health" set ACTION=health
if "%~1"=="install" set ACTION=install
if "%~1"=="build" set ACTION=build
if "%~1"=="dev" set ACTION=dev
if "%~1"=="clean" set ACTION=clean
if "%~1"=="production" set ENVIRONMENT=production
if "%~1"=="development" set ENVIRONMENT=development
if "%~1"=="--force" set FORCE=true
if "%~1"=="--verbose" set VERBOSE=true
shift
goto :parse_args

:execute
echo.
echo 🌿 Aflah Islamic Life Coaching Website Manager
echo =============================================
echo Action: %ACTION% | Environment: %ENVIRONMENT%
echo.

REM Check if PowerShell is available
powershell -Command "Get-Host" >nul 2>&1
if errorlevel 1 (
    echo ERROR: PowerShell is not available
    echo Please install PowerShell or run the .ps1 file directly
    pause
    exit /b 1
)

REM Execute PowerShell script with parameters
if "%FORCE%"=="true" (
    if "%VERBOSE%"=="true" (
        powershell -ExecutionPolicy Bypass -File "%~dp0manage-aflah-servers.ps1" -Action %ACTION% -Environment %ENVIRONMENT% -Force -ShowVerbose
    ) else (
        powershell -ExecutionPolicy Bypass -File "%~dp0manage-aflah-servers.ps1" -Action %ACTION% -Environment %ENVIRONMENT% -Force
    )
) else (
    if "%VERBOSE%"=="true" (
        powershell -ExecutionPolicy Bypass -File "%~dp0manage-aflah-servers.ps1" -Action %ACTION% -Environment %ENVIRONMENT% -ShowVerbose
    ) else (
        powershell -ExecutionPolicy Bypass -File "%~dp0manage-aflah-servers.ps1" -Action %ACTION% -Environment %ENVIRONMENT%
    )
)

if errorlevel 1 (
    echo.
    echo Operation failed with error code %errorlevel%
    pause
    exit /b %errorlevel%
)

echo.
echo Operation completed successfully!
if "%ACTION%"=="dev" (
    echo.
    echo Development server should be running at: http://localhost:3001
    echo Press Ctrl+C to stop the server
    pause
)

endlocal
