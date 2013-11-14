#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import re
import sys
import math
import tablib
import time
import json
import datetime
import traceback

from excel_response import ExcelResponse

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from schedules.models import *
from conf.confGlobal import *

from query import *


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
            data.append([schedule.line, schedule.start_time.strftime('%Y-%m-%d %H:%M:%S')])
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
            data.append([
                schedule.line,
                schedule.start_time.strftime('%Y-%m-%d %H:%M:%S'),
                schedule.end_time.strftime('%Y-%m-%d %H:%M:%S')
            ])
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
        daily_start_time = str(row_data.get('daily_start_time', '08:00:00'))

        if not line or not start_time or not end_time:
            print 'line:%s, start_time:%s, end_time:%s' % (line, start_time, end_time)
            return -1

        # print row_data

        try:
            # print "line:"
            # print line
            line = LinesModel.objects.get(name=line.encode('utf-8'))
        except LinesModel.DoesNotExist:
            print "%s doesn't exists" % row_data.get('line', '')
            return -1
            pass

        start_time = datetime.datetime.strptime(str(start_time), '%Y-%m-%d').date()
        end_time = datetime.datetime.strptime(str(end_time), '%Y-%m-%d').date()
        daily_start_time = datetime.datetime.strptime(str(daily_start_time), '%H:%M:%S').time()

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

        start_time = datetime.datetime.strptime(str(start_time), '%Y-%m-%d %H:%M:%S') - datetime.timedelta(0, 6*3600, 0)

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

        start_time = datetime.datetime.strptime(str(start_time), '%Y-%m-%d %H:%M:%S') - datetime.timedelta(0, 6*3600, 0)
        end_time = datetime.datetime.strptime(str(end_time), '%Y-%m-%d %H:%M:%S') - datetime.timedelta(0, 6*3600, 0)

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


def create_multi_day_patrol_data(schedule):
    data = []

    if not schedule:
        return data

    try:
        line_name = schedule.line.name
        all_line_positions = LinesModel.objects.filter(name=line_name)

        if not all_line_positions:
            return data

        days = (schedule.end_time-schedule.start_time).days

        for i in range(0, days+1):
            time_range_date = schedule.start_time + datetime.timedelta(i)
            for item in all_line_positions:
                ts = (int(item.order)-1)*int(item.next_time_arrival)-int(item.time_error)
                te = (int(item.order)-1)*int(item.next_time_arrival)+int(item.time_error)
                time_range_start_time = datetime.datetime.combine(time_range_date, schedule.daily_start_time) + \
                                        datetime.timedelta(0, ts*60, 0)
                time_range_end_time = datetime.datetime.combine(time_range_date, schedule.daily_start_time) + \
                                        datetime.timedelta(0, te*60, 0)

                if PatrolActionHistoryModel.objects.filter(
                        arrive_time__range=(time_range_start_time, time_range_end_time)
                ).count():  # 准点到达，误差为time_error
                    arrive_time = PatrolActionHistoryModel.objects.filter(
                        arrive_time__range=(time_range_start_time, time_range_end_time)
                    ).order_by('arrive_time')[0].arrive_time
                    arrive_time = arrive_time.strftime("%Y-%m-%d %H:%M:%S")
                    data.append({
                        'position': item.position,
                        'status': '已到',    #
                        'arrive_time': arrive_time,
                        'person': item.person.name,
                        'event': ''
                    })
                    pass
                else:   # 未到达或为准点到达，误差在time_error之外
                    data.append({
                        'position': item.position,
                        'status': '未到',    #
                        'arrive_time': '',
                        'person': '',
                        'event': time_range_start_time.strftime("%Y-%m-%d")
                    })
                    pass
                pass
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return data
    pass


@login_required(login_url="/login/")
def get_query_multi_day_schedule(request):
    data = []

    print request.GET

    line = request.GET['line']
    start_time = str(request.GET.get('start_time', ''))
    end_time = str(request.GET.get('end_time', ''))
    daily_start_time = str(request.GET.get('daily_start_time', ''))

    if not line or not daily_start_time or not start_time or not end_time:
        return HttpResponse(json.dumps(data))

    line = LinesModel.objects.get(name=line)
    start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d').date()
    end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d').date()
    daily_start_time = datetime.datetime.strptime(daily_start_time, '%H:%M:%S').time()

    schedule = MultiDayScheduleModel.objects.get(
        line=line,
        start_time=start_time,
        end_time=end_time,
        daily_start_time=daily_start_time
    )

    if not schedule:
        return HttpResponse(json.dumps(data))

    data = create_multi_day_patrol_data(schedule)

    return HttpResponse(json.dumps(data))
    pass


def create_ordered_patrol_data(schedule):
    data = []
    if not schedule:
        return data

    try:
        line_name = schedule.line.name
        all_line_positions = LinesModel.objects.filter(name=line_name)

        if not all_line_positions:
            return data

        for item in all_line_positions:
            ts = (int(item.order)-1)*int(item.next_time_arrival)-int(item.time_error)
            te = (int(item.order)-1)*int(item.next_time_arrival)+int(item.time_error)
            time_range_start_time = schedule.start_time + datetime.timedelta(0, ts*60, 0)
            time_range_end_time = schedule.start_time + datetime.timedelta(0, te*60, 0)

            if PatrolActionHistoryModel.objects.filter(
                arrive_time__range=(time_range_start_time, time_range_end_time)
            ).count():  # 准点到达，误差为time_error
                arrive_time = PatrolActionHistoryModel.objects.filter(
                    arrive_time__range=(time_range_start_time, time_range_end_time)
                ).order_by('arrive_time')[0].arrive_time
                arrive_time = arrive_time.strftime("%Y-%m-%d %H:%M:%S")
                data.append({
                    'position': item.position,
                    'status': '已到',    #
                    'arrive_time': arrive_time,
                    'person': item.person.name,
                    'event': ''
                })
                pass
            else:   # 未到达或为准点到达，误差在time_error之外
                data.append({
                    'position': item.position,
                    'status': '未到',    #
                    'arrive_time': '',
                    'person': '',
                    'event': time_range_start_time.strftime("%Y-%m-%d")
                })
                pass
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return data
    pass


@login_required(login_url="/login/")
def get_query_ordered_schedule(request):
    data = []

    data = []

    print request.GET

    line = request.GET['line']
    start_time = str(request.GET.get('start_time', ''))

    if not line or not start_time:
        return HttpResponse(json.dumps(data))

    line = LinesModel.objects.get(name=line)
    start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')

    print "line:%s, start_time:%s" % (line, start_time.strftime('%Y-%m-%d %H:%M:%S'))

    try:
        schedule = OrderedScheduleModel.objects.get(
            line=line
            # start_time=start_time
        )
        data = create_ordered_patrol_data(schedule)
    except OrderedScheduleModel.DoesNotExist:
        return HttpResponse(json.dumps(data))
        pass
    else:
        pass

    return HttpResponse(json.dumps(data))
    pass


def create_unordered_patrol_data(schedule):
    data = []
    if not schedule:
        return data

    try:
        line_name = schedule.line.name
        all_line_positions = LinesModel.objects.filter(name=line_name)

        if not all_line_positions:
            return data

        for item in all_line_positions:
            time_range_start_time = schedule.start_time
            time_range_end_time = schedule.end_time

            if PatrolActionHistoryModel.objects.filter(
                arrive_time__range=(time_range_start_time, time_range_end_time)
            ).count():  # 准点到达，误差为time_error
                arrive_time = PatrolActionHistoryModel.objects.filter(
                    arrive_time__range=(time_range_start_time, time_range_end_time)
                ).order_by('arrive_time')[0].arrive_time
                arrive_time = arrive_time.strftime("%Y-%m-%d %H:%M:%S")
                data.append({
                    'position': item.position,
                    'status': '已到',    #
                    'arrive_time': arrive_time,
                    'person': item.person.name,
                    'event': ''
                })
                pass
            else:   # 未到达或为准点到达，误差在time_error之外
                data.append({
                    'position': item.position,
                    'status': '未到',    #
                    'arrive_time': '',
                    'person': '',
                    'event': time_range_start_time.strftime("%Y-%m-%d")
                })
                pass
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return data
    pass


@login_required(login_url="/login/")
def get_query_unordered_schedule(request):
    data = []

    data = []

    print request.GET

    line = request.GET['line']
    start_time = str(request.GET.get('start_time', ''))
    end_time = str(request.GET.get('end_time', ''))

    if not line or not start_time:
        return HttpResponse(json.dumps(data))

    line = LinesModel.objects.get(name=line)
    start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')
    end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d %H:%M:%S')

    try:
        schedule = UnorderedScheduleModel.objects.get(
            line=line,
            start_time=start_time,
            end_time=end_time
        )
        data = create_unordered_patrol_data(schedule)
    except UnorderedScheduleModel.DoesNotExist:
        return HttpResponse(json.dumps(data))
        pass
    else:
        pass

    return HttpResponse(json.dumps(data))
    pass


@login_required(login_url="/login/")
def get_map_multi_day_schedule(request):
    print 'func get_map_multi_day_schedule'
    data = {
        'line': [],
        'patrol_history': {}
    }

    # Test data here
    for i in range(0,10):
        data['line'].append({
            'name': 'line1',
            'order': i+1,
            'position': 'position'+str(i+1),
            'position_card': '第'+str(i+1)+'张地点卡',
            'x': (i+1)*50,
            'y': math.sin(i+1)*50+200
        })

    for i in range(0, 7):
        data['patrol_history']['position'+str(i+1)] = ({
            'position': 'position'+str(i+1),
            'time': '2013-11-07 08:'+("%02d" % (i*8, ))+':00',
            'person': 'person'+str(i+1)
        })

    # @TODO: add real data here

    # print json.dumps(data, indent=4)

    return HttpResponse(json.dumps(data))
    pass


@login_required(login_url="/login/")
def query(request):
    """
        self.schedule_type = kwargs.get('schedule_type', None)
        self.schedule_line = kwargs.get('schedule_line', None)
        self.start_time = kwargs.get('start_time', None)
        self.end_time = kwargs.get('end_time', None)
        self.time_error = kwargs.get('time_error', None)
        self.position = kwargs.get('position', None)
        self.person = kwargs.get('person', None)
        self.status = kwargs.get('status', None)
    """
    print "views query"
    template_data = []

    try:
        query = Query(**request.GET)
        template_data = query.query()
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
        pass

    return HttpResponse(json.dumps(template_data))
    pass