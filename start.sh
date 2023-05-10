#!/bin/bash
docker run -it -d -e MYSQL_ROOT_PASSWORD=none -p 3306:3306 -v /home/astron/projects/devchat/init.sql:/docker-entrypoint-initdb.d/init.sql mysql:latest
