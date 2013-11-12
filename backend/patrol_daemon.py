#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

from get_data import *


if __name__ == "__main__":
    print 'start'
    try:
        get_patrol_data(host='0.0.0.0', port=8889)
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    print 'end'