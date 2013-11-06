#!/usr/bin/env python
# -*- coding:utf-8 -*-
import json
import datetime
import re
import traceback

from sys import stdout
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from dbAdapter import *
from persons.views import *
from positions.views import *
from lines.views import *
from schedules.views import *
from temphum.views import *


__author__ = 'xiaoghu@cisco.com'


@login_required(login_url="/login/")
def home(request):
    template_data = {}

    return render_to_response('index.html', template_data)
    pass


@login_required(login_url="/login")
@csrf_exempt
def data(request, type):
    """
    @param type: Enum['lineData','multiDayScheduleData','orderedScheduleData','unorderedScheduleData']
    """
    request_method = request.META['REQUEST_METHOD']

    if request_method == 'GET':
        template_data = {'data': ''}

        if 'personData' in type:
            template_data['data'] = getPersonData()

        if 'positionData' in type:
            template_data['data'] = getPositionData()

        if 'lineData' in type:
            template_data['data'] = getLineData()

        if 'multiDayScheduleData' in type:
            template_data['data'] = getMultiDayScheduleDataData()

        if 'orderedScheduleData' in type:
            template_data['data'] = getOrderedScheduleData()

        if 'unorderedScheduleData' in type:
            template_data['data'] = getUnorderedScheduleData()

        if 'temperatureHumidityDevice' in type:
            template_data['data'] = getTemperatureHumidityDevice()

        return HttpResponse(json.dumps(template_data['data']))

    if request_method == 'POST':
        data = {}
        try:
            data = json.loads(request.POST['row'])
            if not data:
                return HttpResponse('')
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass

        if 'personData' in type:
            update_person(data)

        if 'positionData' in type:
            update_position(data)

        if 'lineData' in type:
            update_line(data)

        if 'multiDayScheduleData' in type:
            update_multiDaySchedule(data)

        if 'orderedScheduleData' in type:
            update_orderedSchedule(data)

        if 'unorderedScheduleData' in type:
            update_unorderedSchedule(data)

        if 'temperatureHumidityDevice' in type:
            update_temp_hum_devices(data)

        return HttpResponse('')
    pass