#!/usr/bin/env python
# -*- coding:utf-8 -*-

import traceback

__author__ = 'xiaoghu@cisco.com'


def getLineData():
    """
    """
    data = []

    try:
        # Test here. @TODO: Should be removed
        for i in range(1,100):
            data.append({'line_name': '线路'+str(i),
                         'position_name': '位置'+str(i),
                         'nextTime_arrival': 8,
                         'order': str(i)
            })
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
        pass

    return data
    pass


def getMultiDayScheduleDataData():
    """
    """
    data = []

    try:
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
        pass

    return data
    pass


def getOrderedScheduleData():
    data = []

    try:
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
        pass

    return data
    pass


def getUnorderedScheduleData():
    data = []

    try:
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
        pass

    return data
    pass