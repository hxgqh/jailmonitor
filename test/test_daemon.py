#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

import os
import re
import sys
import socket

currentPath = os.path.dirname(os.path.abspath(__file__))+'/'
prjPath = re.sub(r'test\/$', '', currentPath)
sys.path.append(prjPath)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "jailMonitor.settings")

from backend.get_data import *
from backend.utils import *
from jailMonitor import *
from jailMonitor.settings import *


class tDaemon(object):
    @staticmethod
    def test_parse_temperature():
        data = "01040400dc01977a40"
        print parse_temperature(data)
        pass

    @staticmethod
    def test_parse_humidity():
        data = "01040400dc01977a40"
        print parse_humidity(data)
        pass

    @staticmethod
    def test_send_temp_hum_query():
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.bind(('localhost', 8008))
        sock.listen(5)
        while True:
            connection, address = sock.accept()
            try:
                connection.settimeout(5)
                buf = connection.recv(1024)
                print "buf:"+hexlify(buf)
                connection.send('01040000000271CB')
            except socket.timeout:
                print 'time out'
            connection.close()
        pass


if __name__ == '__main__':
    print 'start'
    # tDaemon.test_parse_temperature()
    # tDaemon.test_parse_humidity()
    tDaemon.test_send_temp_hum_query()
    print 'end'