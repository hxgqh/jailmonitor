#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

from get_data import *


if __name__ == "__main__":
    print 'start'
    get_temperature_humidity(host='0.0.0.0', port=8889)
    print 'end'