@echo off
setlocal enabledelayedexpansion

rem "get current directory"
set currentDir=%cd%

rem "loop through all subdirectories"
for /d %%d in ("%currentDir%\*") do (
    echo "Initializing pnpm in" %%d
    cd %%d
    pnpm init
    cd %currentDir%
)

endlocal
