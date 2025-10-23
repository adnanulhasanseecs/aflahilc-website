# Professional Server Management Script for Aflah Islamic Life Coaching Website
# This script provides enterprise-grade server management for the Aflah website

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("start", "stop", "restart", "status", "logs", "monit", "install", "uninstall", "health", "build", "dev")]
    [string]$Action = "status",
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("development", "production")]
    [string]$Environment = "development",
    
    [Parameter(Mandatory=$false)]
    [switch]$Force,
    
    [Parameter(Mandatory=$false)]
    [switch]$ShowVerbose
)

# Configuration
$ProjectRoot = "C:\Users\office\.cursor\aflah-website"
$LogDir = "$ProjectRoot\logs"
$Port = 3001  # Using port 3001 to avoid conflict with dcube (3000)

# Colors for output
function Write-ColorOutput {
    param($Message, $Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

function Write-Success { param($Message) Write-ColorOutput "SUCCESS: $Message" "Green" }
function Write-Error { param($Message) Write-ColorOutput "ERROR: $Message" "Red" }
function Write-Warning { param($Message) Write-ColorOutput "WARNING: $Message" "Yellow" }
function Write-Info { param($Message) Write-ColorOutput "INFO: $Message" "Cyan" }

function Test-Prerequisites {
    Write-Info "Checking prerequisites..."
    
    # Check if we're in the right directory
    if (-not (Test-Path "package.json")) {
        Write-Error "Please run this script from the aflah-website project directory"
        Write-Info "Expected file: package.json"
        Write-Info "Current directory: $(Get-Location)"
        return $false
    }
    
    # Verify this is the aflah-website package.json
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    if ($packageJson.name -ne "aflah-website") {
        Write-Error "This is not the aflah-website project directory"
        Write-Info "Expected package name: aflah-website"
        Write-Info "Found package name: $($packageJson.name)"
        return $false
    }
    
    # Check Node.js
    try {
        $nodeVersion = node --version
        Write-Success "Node.js version: $nodeVersion"
    } catch {
        Write-Error "Node.js is not installed or not in PATH"
        return $false
    }
    
    # Check npm
    try {
        $npmVersion = npm --version
        Write-Success "npm version: $npmVersion"
    } catch {
        Write-Error "npm is not installed or not in PATH"
        return $false
    }
    
    return $true
}

function Install-Dependencies {
    Write-Info "Installing project dependencies..."
    
    try {
        # Clear npm cache
        Write-Info "Clearing npm cache..."
        npm cache clean --force
        
        # Install dependencies
        Write-Info "Installing dependencies with verbose output..."
        npm install --verbose
        
        Write-Success "Dependencies installed successfully"
        
        # Create logs directory
        if (-not (Test-Path $LogDir)) {
            New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
            Write-Success "Created logs directory: $LogDir"
        }
        
        return $true
    } catch {
        Write-Error "Failed to install dependencies: $($_.Exception.Message)"
        return $false
    }
}

function Start-DevelopmentServer {
    Write-Info "Starting development server..."
    
    try {
        # Clear cache and build
        Write-Info "Clearing Next.js cache..."
        if (Test-Path ".next") {
            Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
        }
        
        # Start development server in background
        Write-Info "Starting Next.js development server on port $Port..."
        $env:PORT = $Port
        
        # Start the process in background using cmd
        $process = Start-Process -FilePath "cmd" -ArgumentList "/c", "npm run dev" -PassThru -WindowStyle Hidden
        
        # Wait a moment for the server to start
        Start-Sleep 8
        
        # Check if the process is running
        if (-not $process.HasExited) {
            Write-Success "Development server started successfully!"
            Write-Info "Process ID: $($process.Id)"
            Write-Info "Visit: http://localhost:$Port"
            return $true
        } else {
            Write-Error "Development server failed to start"
            return $false
        }
        
    } catch {
        Write-Error "Failed to start development server: $($_.Exception.Message)"
        return $false
    }
}

function Build-Production {
    Write-Info "Building production version..."
    
    try {
        # Clear cache
        Write-Info "Clearing Next.js cache..."
        if (Test-Path ".next") {
            Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
        }
        
        # Build the project
        Write-Info "Building project with verbose output..."
        npm run build --verbose
        
        Write-Success "Production build completed successfully"
        return $true
    } catch {
        Write-Error "Failed to build production version: $($_.Exception.Message)"
        return $false
    }
}

function Start-ProductionServer {
    Write-Info "Starting production server..."
    
    try {
        # Build first
        if (-not (Build-Production)) {
            return $false
        }
        
        # Start production server
        Write-Info "Starting Next.js production server on port $Port..."
        $env:PORT = $Port
        npm start
        
        return $true
    } catch {
        Write-Error "Failed to start production server: $($_.Exception.Message)"
        return $false
    }
}

function Stop-Server {
    Write-Info "Stopping server..."
    
    try {
        # Find and kill processes on port 3001
        $processes = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
        if ($processes) {
            foreach ($process in $processes) {
                $processId = $process.OwningProcess
                Write-Info "Stopping process $processId on port $Port..."
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
            }
            Write-Success "Server stopped successfully"
        } else {
            Write-Info "No server running on port $Port"
        }
        
        # Also kill any npm processes that might be running
        $npmProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
            $_.CommandLine -like "*npm*" -and $_.CommandLine -like "*dev*"
        }
        if ($npmProcesses) {
            foreach ($process in $npmProcesses) {
                Write-Info "Stopping npm process $($process.Id)..."
                Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
            }
        }
        
        return $true
    } catch {
        Write-Error "Failed to stop server: $($_.Exception.Message)"
        return $false
    }
}

function Restart-Server {
    Write-Info "Restarting server..."
    
    try {
        # Stop first
        Stop-Server
        
        # Wait a moment
        Start-Sleep 3
        
        # Start based on environment
        if ($Environment -eq "production") {
            Start-ProductionServer
        } else {
            Start-DevelopmentServer
        }
        
        return $true
    } catch {
        Write-Error "Failed to restart server: $($_.Exception.Message)"
        return $false
    }
}

function Show-Status {
    Write-Info "Checking server status..."
    
    try {
        # Check if port is in use
        $processes = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
        if ($processes) {
            Write-Success "Aflah website server is running on port $Port"
            Write-Info "Application URL: http://localhost:$Port"
            
            # Try to check if the server is responding
            try {
                $response = Invoke-WebRequest -Uri "http://localhost:$Port" -Method GET -TimeoutSec 5 -UseBasicParsing
                if ($response.StatusCode -eq 200) {
                    Write-Success "Server is responding properly"
                } else {
                    Write-Warning "Server returned status: $($response.StatusCode)"
                }
            } catch {
                Write-Warning "Server is running but not responding to HTTP requests"
            }
        } else {
            Write-Warning "No server running on port $Port"
            Write-Info "Use 'start' action to start the server"
        }
        
        return $true
    } catch {
        Write-Error "Failed to check status: $($_.Exception.Message)"
        return $false
    }
}

function Show-Logs {
    Write-Info "Showing server logs..."
    
    try {
        if (Test-Path $LogDir) {
            $logFiles = Get-ChildItem -Path $LogDir -Filter "*.log" | Sort-Object LastWriteTime -Descending
            if ($logFiles) {
                Write-Info "Recent log files:"
                foreach ($logFile in $logFiles | Select-Object -First 5) {
                    Write-Host "  $($logFile.Name) - $($logFile.LastWriteTime)" -ForegroundColor Yellow
                }
                
                if ($ShowVerbose) {
                    Write-Info "Showing latest log content:"
                    $latestLog = $logFiles[0]
                    Get-Content -Path $latestLog.FullName -Tail 50
                }
            } else {
                Write-Info "No log files found"
            }
        } else {
            Write-Info "Log directory not found: $LogDir"
        }
        
        return $true
    } catch {
        Write-Error "Failed to show logs: $($_.Exception.Message)"
        return $false
    }
}

function Test-Health {
    Write-Info "Performing health checks..."
    
    $healthy = $true
    
    # Check if server is running
    $processes = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if (-not $processes) {
        Write-Error "Server is not running on port $Port"
        return $false
    }
    
    # Check server health
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$Port" -Method GET -TimeoutSec 10 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Success "Server is healthy and responding"
        } else {
            Write-Warning "Server returned status: $($response.StatusCode)"
            $healthy = $false
        }
    } catch {
        Write-Error "Server is not responding: $($_.Exception.Message)"
        $healthy = $false
    }
    
    if ($healthy) {
        Write-Success "All health checks passed!"
    } else {
        Write-Warning "Some health checks failed"
    }
    
    return $healthy
}

function Clean-Project {
    Write-Info "Cleaning project..."
    
    try {
        # Clear Next.js cache
        if (Test-Path ".next") {
            Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
            Write-Success "Cleared Next.js cache"
        }
        
        # Clear node_modules and reinstall if Force is specified
        if ($Force) {
            if (Test-Path "node_modules") {
                Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
                Write-Success "Removed node_modules"
            }
            
            if (Test-Path "package-lock.json") {
                Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
                Write-Success "Removed package-lock.json"
            }
            
            Install-Dependencies
        }
        
        Write-Success "Project cleaned successfully"
        return $true
    } catch {
        Write-Error "Failed to clean project: $($_.Exception.Message)"
        return $false
    }
}

# Main execution
Write-ColorOutput "🌿 Aflah Islamic Life Coaching Website Manager" "Green"
Write-ColorOutput "=============================================" "Green"
Write-ColorOutput "Action: $Action | Environment: $Environment | Port: $Port" "White"

# Check prerequisites
if (-not (Test-Prerequisites)) {
    exit 1
}

# Execute the requested action
switch ($Action) {
    "install" {
        if (Install-Dependencies) {
            Write-Success "Installation completed successfully!"
        } else {
            Write-Error "Installation failed!"
            exit 1
        }
    }
    
    "dev" {
        if (Start-DevelopmentServer) {
            Write-Success "Development server started successfully!"
            Write-Info "Visit: http://localhost:$Port"
        } else {
            Write-Error "Failed to start development server!"
            exit 1
        }
    }
    
    "start" {
        if ($Environment -eq "production") {
            if (Start-ProductionServer) {
                Write-Success "Production server started successfully!"
                Write-Info "Visit: http://localhost:$Port"
            } else {
                Write-Error "Failed to start production server!"
                exit 1
            }
        } else {
            if (Start-DevelopmentServer) {
                Write-Success "Development server started successfully!"
                Write-Info "Visit: http://localhost:$Port"
            } else {
                Write-Error "Failed to start development server!"
                exit 1
            }
        }
    }
    
    "stop" {
        if (Stop-Server) {
            Write-Success "Server stopped successfully!"
        } else {
            Write-Error "Failed to stop server!"
            exit 1
        }
    }
    
    "restart" {
        if (Restart-Server) {
            Write-Success "Server restarted successfully!"
            Write-Info "Visit: http://localhost:$Port"
        } else {
            Write-Error "Failed to restart server!"
            exit 1
        }
    }
    
    "build" {
        if (Build-Production) {
            Write-Success "Build completed successfully!"
        } else {
            Write-Error "Build failed!"
            exit 1
        }
    }
    
    "status" {
        Show-Status
    }
    
    "logs" {
        Show-Logs
    }
    
    "health" {
        Test-Health
    }
    
    "clean" {
        if (Clean-Project) {
            Write-Success "Project cleaned successfully!"
        } else {
            Write-Error "Failed to clean project!"
            exit 1
        }
    }
    
    default {
        Write-Error "Unknown action: $Action"
        Write-Info "Available actions: start, stop, restart, status, logs, health, install, build, dev, clean"
        exit 1
    }
}

Write-ColorOutput "`nOperation completed successfully!" "Green"
