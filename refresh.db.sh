#!/bin/bash
mysql -u root -p<< eof
drop database jailmonitor;
CREATE DATABASE jailmonitor DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
eof
python ./manage.py sqlall persons
python ./manage.py sqlall positions
python ./manage.py sqlall schedules
python ./manage.py sqlall lines
python ./manage.py syncdb
