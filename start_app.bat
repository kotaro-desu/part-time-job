@echo off

cd /d C:\Users\solpac\workspace\nago-workshop\src
start cmd /k uvicorn main:app --reload

cd  /d C:\Users\solpac\workspace\nago-workshop\
start cmd /k npm start

exit