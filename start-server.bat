@echo off
echo ========================================
echo   鹿城学院论坛 - 本地服务器
echo ========================================
echo.

where python >nul 2>nul
if errorlevel 1 (
    echo 错误: 未找到 Python
    echo.
    echo 请安装 Python 后再试
    echo 下载地址: https://www.python.org/downloads/
    pause
    exit /b 1
)

cd /d "%~dp0"
echo 启动本地服务器...
echo 论坛地址: http://localhost:8080
echo.
echo 按 Ctrl+C 停止服务器
echo.
python -m http.server 8080