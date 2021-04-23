@echo off
color a
echo Initializing...
goto starting

:getcmd
set /p command=~:
goto scancommands

:scancommands
if "%command%" == "help" (goto sendhelp)
if "%command%" == "start" (goto starting)
if "%command%" == "stop" (goto stopping)
if "%command%" == "restart" (goto restarting)
goto getcmd

:sendhelp
echo.
echo ========== HELPFUL COMMANDS ==========
echo.
echo help - shows all commands
echo start - starts discord.js bot
echo stop - stops discord.js bot
echo restart - restarts discord.js bot
echo.
echo ======================================
echo.
goto getcmd

:starting
echo Starting Discord.js Server...
start milan.bat
echo Discord.js Server Started
goto getcmd

:stopping
echo Stopping Discord.js Server...
taskkill /f /im node.exe
echo Discord.js Server Stopped
goto getcmd

:restarting
echo Restarting Discord.js Server...
taskkill /f /im node.exe
echo Discord.js Server Stopped
goto starting
