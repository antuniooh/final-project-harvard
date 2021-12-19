#!/bin/bash

cd server && npm install && npm run db && npm start &

cd web-app && npm install && npm start &