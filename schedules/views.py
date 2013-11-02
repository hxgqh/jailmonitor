#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import re
import sys
import tablib
import traceback

from excel_response import ExcelResponse

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from schedules.models import *
from conf.confGlobal import *


@login_required(login_url="/login/")
def get_multi_day_schedule_excel(request):
    excel_name = '多天计划信息'

    data = [['线路', '开始日期', '结束日期']]

    try:
        for schedule in MultiDayScheduleModel.objects.all():
            data.append([schedule.line, str(schedule.start_time), str(schedule.end_time)])
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return ExcelResponse(data, excel_name)
    pass


@login_required(login_url="/login/")
def get_ordered_schedule_excel(request):
    excel_name = '有顺序计划信息'

    data = [['线路', '开始日期']]

    try:
        for schedule in OrderedScheduleModel.objects.all():
            data.append([schedule.line, str(schedule.start_time)])
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return ExcelResponse(data, excel_name)
    pass


@login_required(login_url="/login/")
def get_unordered_schedule_excel(request):
    excel_name = '无顺序计划信息'

    data = [['线路', '开始日期', '结束日期']]

    try:
        for schedule in UnorderedScheduleModel.objects.all():
            data.append([schedule.line, str(schedule.start_time), str(schedule.end_time)])
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return ExcelResponse(data, excel_name)
    pass