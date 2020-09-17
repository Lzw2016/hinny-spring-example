#!/bin/bash

nohup java -jar ../app.jar --spring.config.location=./application.yml >/dev/null 2>&1 &