@ECHO OFF 

start /b npx json-server --watch  ./db.json

start /b nodemon ./server/server.js

start /b yarn serve

EXIT

PAUSE>NUL