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
        sock.bind(('0.0.0.0', 8888))
        sock.listen(5)
        while True:
            con, address = sock.accept()
            try:
                # connection.settimeout(5)
                # buf = connection.recv(1024)
                # print "buf:"+hexlify(buf)
                # print str(con)
                print str(address)

                con.send('01040000000271CB')

                time.sleep(1)

                buf = con.recv(1024)
                print "buf:"+hexlify(buf)

                print parse_temperature(hexlify(buf))
                print parse_humidity(hexlify(buf))
            except socket.timeout:
                print 'time out'
            con.close()
        pass

    @staticmethod
    def test_send_temp_hum_query_1():
        addr = ('0.0.0.0', 8888)
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # s = socket.socket()
        s.bind(addr)
        s.listen(3)

        ss, addr = s.accept()
        print 'got connected from', addr
        cmd = '01040000000271CB'

        # while True:
        try:
            ss.send(unhexlify(cmd))
            time.sleep(1)
            data = ss.recv(512)
            print data
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
        s.close()


if __name__ == '__main__':
    print 'start'
    # tDaemon.test_parse_temperature()
    # tDaemon.test_parse_humidity()
    # tDaemon.test_send_temp_hum_query()
    # tDaemon.test_send_temp_hum_query_1()
    getTemperature1()
    print 'end'