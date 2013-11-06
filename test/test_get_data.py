#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

import time
import socket
from backend.get_data import *


class tGetData(object):
    @staticmethod
    def test_send_temperature_humidity_data():
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect(('localhost', 8888))
        data = '01040400dc01977a40'

        while True:
            print "send " + data
            sock.send(data)
            # print sock.recv(1024)
            time.sleep(1)
            pass
        sock.close()

        pass

    @staticmethod
    def test_send_patrol_data():
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect(('localhost', 8889))
        data = 'aa3300fb000000a00f00000f17d60c0000790d00008fa61a00008d1500eda32800008d150000000000000000000000000000000000c64a086d03'

        while True:
            print "send " + data
            sock.send(data)
            # print sock.recv(1024)
            time.sleep(1)
            pass
        sock.close()
        pass


if __name__ == '__main__':
    print 'start'
    tGetData.test_send_temperature_humidity_data()
    # tGetData.test_send_patrol_data()
    print 'end'
