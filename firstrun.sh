#!/bin/bash

echo "Start running..."

docker run -d \
  --restart unless-stopped \
  --name some-mysql \
  -v $PWD/mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=test_db \
  -p 3306:3306 mysql:5.7.27

echo "Finish"
