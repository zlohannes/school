@echo off
echo ========================================
echo   鹿城学院论坛 - 本地服务器
echo ========================================
echo.
echo 启动本地服务器...
echo 论坛地址: http://localhost:8080
echo.
echo 按 Ctrl+C 停止服务器
echo.

cd /d "%~dp0public"
python -m http.server 8080
