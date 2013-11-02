#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'


import os
import re
import sys


currentPath = os.path.dirname(os.path.abspath(__file__))+'/'
prjPath = re.sub(r'conf\/$', '', currentPath)