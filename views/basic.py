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

from dbAdapter import *


__author__ = 'xiaoghu@cisco.com'


@login_required(login_url="/login/")
def home(request):
    template_data = {}

    return render_to_response('index.html', template_data)
    pass


@login_required(login_url="/login")
def data(request, type):
    """
    @param type: Enum['lineData','multiDayScheduleData','orderedScheduleData','unorderedScheduleData']
    """
    print "getData request:"
    print request

    print "type:"
    print type

    template_data = {}

    if 'lineData' in type:
        template_data['data'] = getLineData()

    if 'multiDayScheduleData' in type:
        template_data['data'] = getMultiDayScheduleDataData()

    if 'orderedScheduleData' in type:
        template_data['data'] = getOrderedScheduleData()

    if 'unorderedScheduleData' in type:
        template_data['data'] = getUnorderedScheduleData()

    print "template_data:"
    print json.dumps(template_data)
    # return json.dumps(template_data)
    return HttpResponse(json.dumps(template_data['data']))
    pass