#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'


import os
import re
import sys


currentPath = os.path.dirname(os.path.abspath(__file__))+'/'
prjPath = re.sub(r'conf\/$', '', currentPath)


date_time_format = '%Y-%m-%d %H:%M:%S'
date_format = '%Y-%m-%d'
time_format = '%H:%M:%S'