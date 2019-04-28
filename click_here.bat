echo off
set PATH=%PATH%;%cd%\..\nodejs
cls
echo ========================================================================================
echo =================================== CMD WITH NODE :) ===================================
echo ========================================================================================
echo commande:
echo   - "npm start" for start the server and add the port of arduino,
echo     exemple: 
echo        npm start COM16
echo.
echo   - "npm run listPort" for search the list of available port serie
echo.
echo.
echo please ignore the next line (it is default Microsoft output)
cmd