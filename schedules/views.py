#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import re
import sys
import tablib
import time
import datetime
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

    data = [['线路', '开始日期', '结束日期', '巡检开始时间']]

    try:
        for schedule in MultiDayScheduleModel.objects.all():
            data.append([
                schedule.line,
                str(schedule.start_time),
                str(schedule.end_time),
                schedule.daily_start_time.strftime('%H:%M:%S')
            ])
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


def update_one_multiDaySchedule(row_data):
    try:
        no = row_data.get('no', '-1')
        line = row_data.get('line', '')
        start_time = str(row_data.get('start_time', ''))
        end_time = str(row_data.get('end_time', ''))
        daily_start_time = str(row_data.get('daily_start_time'), '08:00:00')

        if not line or not start_time or not end_time:
            return -1

        print row_data

        try:
            print "line:"
            print line
            line = LinesModel.objects.get(name=line.encode('utf-8'))
        except LinesModel.DoesNotExist:
            print "%s doesn't exists" % row_data.get('line', '')
            return -1
            pass

        start_time = datetime.datetime.strptime(str(start_time), '%Y-%m-%d')
        end_time = datetime.datetime.strptime(str(end_time), '%Y-%m-%d')
        daily_start_time = datetime.datetime.strptime(str(daily_start_time), '%H:%M:%S')

        print row_data

        old_schedule = None
        try:
            old_schedule = MultiDayScheduleModel.objects.get(id=no)
        except MultiDayScheduleModel.DoesNotExist:
            person = MultiDayScheduleModel(
                id=no,
                line=line,
                start_time=start_time,
                end_time=end_time,
                daily_start_time=daily_start_time
            )
            person.save()
            pass
        else:
            old_schedule.id = no
            old_schedule.line = line
            old_schedule.start_time = start_time
            old_schedule.end_time = end_time
            old_schedule.daily_start_time = daily_start_time
            old_schedule.save()
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def update_multiDaySchedule(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    print "func update_multiDaySchedule"
    if isinstance(data, dict):
        try:
            update_one_multiDaySchedule(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                update_one_multiDaySchedule(row_data)
                pass
            except Exception as e:
                print e
                print traceback.format_exc()
            pass
        pass
    else:
        pass
    pass


def update_one_orderedSchedule(row_data):
    try:
        no = row_data.get('no', '-1')
        line = row_data.get('line', '')
        start_time = str(row_data.get('start_time', ''))

        if not line or not start_time:
            return -1

        print row_data

        try:
            print "line:"
            print line
            line = LinesModel.objects.get(name=line.encode('utf-8'))
        except LinesModel.DoesNotExist:
            print "%s doesn't exists" % row_data.get('line', '')
            return -1
            pass

        start_time = datetime.datetime.strptime(str(start_time), '%H:%M:%S')

        print row_data

        old_schedule = None
        try:
            old_schedule = OrderedScheduleModel.objects.get(id=no)
        except OrderedScheduleModel.DoesNotExist:
            person = OrderedScheduleModel(
                id=no,
                line=line,
                start_time=start_time
            )
            person.save()
            pass
        else:
            old_schedule.id = no
            old_schedule.line = line
            old_schedule.start_time = start_time
            old_schedule.save()
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def update_orderedSchedule(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    if isinstance(data, dict):
        try:
            update_one_orderedSchedule(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                update_one_orderedSchedule(row_data)
                pass
            except Exception as e:
                print e
                print traceback.format_exc()
            pass
        pass
    else:
        pass
    pass


def update_one_unorderedSchedule(row_data):
    try:
        no = row_data.get('no', '-1')
        line = row_data.get('line', '')
        start_time = str(row_data.get('start_time', ''))
        end_time = str(row_data.get('end_time', ''))

        if not line or not start_time or not end_time:
            return -1

        print row_data

        try:
            print "line:"
            print line
            line = LinesModel.objects.get(name=line.encode('utf-8'))
        except LinesModel.DoesNotExist:
            print "%s doesn't exists" % row_data.get('line', '')
            return -1
            pass

        start_time = datetime.datetime.strptime(str(start_time), '%H:%M:%S')
        end_time = datetime.datetime.strptime(str(end_time), '%H:%M:%S')

        print row_data

        old_schedule = None
        try:
            old_schedule = UnorderedScheduleModel.objects.get(id=no)
        except UnorderedScheduleModel.DoesNotExist:
            person = UnorderedScheduleModel(
                id=no,
                line=line,
                start_time=start_time,
                end_time=end_time
            )
            person.save()
            pass
        else:
            old_schedule.id = no
            old_schedule.line = line
            old_schedule.start_time = start_time
            old_schedule.end_time = end_time
            old_schedule.save()
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def update_unorderedSchedule(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    print "func update_multiDaySchedule"
    if isinstance(data, dict):
        try:
            update_one_unorderedSchedule(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                update_one_unorderedSchedule(row_data)
                pass
            except Exception as e:
                print e
                print traceback.format_exc()
            pass
        pass
    else:
        pass
    pass