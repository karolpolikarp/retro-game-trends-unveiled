
#!/usr/bin/env python3
"""
GameAnalytics Backend Startup Script
Run this to start the Python FastAPI server
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    print("Installing Python dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully")
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        sys.exit(1)

def start_server():
    """Start the FastAPI server"""
    print("Starting GameAnalytics API server...")
    print("🚀 Server will be available at: http://localhost:8000")
    print("📊 API documentation at: http://localhost:8000/docs")
    print("🔄 CORS enabled for React frontend")
    print("\nPress Ctrl+C to stop the server\n")
    
    try:
        subprocess.run([sys.executable, "-m", "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"])
    except KeyboardInterrupt:
        print("\n✋ Server stopped by user")
    except subprocess.CalledProcessError:
        print("❌ Failed to start server")
        sys.exit(1)

if __name__ == "__main__":
    print("🎮 GameAnalytics Backend Server")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists("main.py"):
        print("❌ Please run this script from the backend directory")
        sys.exit(1)
    
    # Install dependencies and start server
    install_requirements()
    start_server()
