#!/bin/bash

cd server && npm install && npm run knex:migrate && npm start &

cd web-app && npm install && npm start &