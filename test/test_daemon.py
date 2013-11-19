#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'


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
        send_temp_hum_query()
        pass


if __name__ == '__main__':
    print 'start'
    tDaemon.test_parse_temperature()
    tDaemon.test_parse_humidity()
    print 'end'