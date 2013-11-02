#!/usr/bin/env python
# -*- coding:utf-8 -*-

import json
import traceback

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from persons.models import *
from lines.models import *
from positions.models import *
from schedules.models import *


__author__ = 'xiaoghu@cisco.com'


def getPersonData():
    """
    """
    data = []

    try:
        for person in PersonsModel.objects.all():
            data.append({
                'person_no': person.person_no,
                'name': person.name,
                'contact': person.contact,
                'address': person.address
            })
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
        pass

    return data
    pass


def getPositionData():
    """
    """
    data = []

    try:
        for position in PositionsModel.objects.all():
            data.append({
                'ip': position.ip,
                'position': position.position,
                'install_position': position.install_position
            })
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
        pass

    # print "position data:"
    # print json.dumps(data, indent=4)
    return data
    pass


def getLineData():
    """
    """
    data = []

    try:
        for line in LinesModel.objects.all():
            data.append({
                'name': line.name,
                'position': line.position,
                'next_time_arrival': line.next_time_arrival,
                'order': line.order
            })
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
        pass

    return data
    pass


def getMultiDayScheduleDataData():
    data = []

    try:
        for schedule in MultiDayScheduleModel.objects.all():
            data.append({
                'line_name': schedule.line,
                'start_time': schedule.start_time,
                'end_time': schedule.end_time
            })
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
        for schedule in OrderedScheduleModel.objects.all():
            data.append({
                'line_name': schedule.line,
                'start_time': schedule.start_time
            })
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
        for schedule in UnorderedScheduleModel.objects.all():
            data.append({
                'line_name': schedule.line,
                'start_time': schedule.start_time,
                'end_time': schedule.end_time
            })
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
        pass

    return data
    pass