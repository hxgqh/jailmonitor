#!/usr/bin/env python
# -*- coding:utf-8 -*-

import math
import json
import datetime
import traceback

from excel_response import ExcelResponse

from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from schedules.calc_patrol_line import *
from schedules.models import *
from conf.confGlobal import *

from backend.utils import *

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
                schedule.daily_start_time.strftime(time_format)
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
            data.append([schedule.line, schedule.start_time.strftime(time_format)])
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
                schedule.start_time.strftime(time_format),
                schedule.end_time.strftime(time_format)
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

        start_time = datetime.datetime.strptime(str(start_time), date_format).date()
        end_time = datetime.datetime.strptime(str(end_time), date_format).date()
        daily_start_time = datetime.datetime.strptime(str(daily_start_time), time_format).time()

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

        start_time = datetime.datetime.strptime(str(start_time), time_format).time()

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

        start_time = datetime.datetime.strptime(str(start_time), time_format).time()
        end_time = datetime.datetime.strptime(str(end_time), time_format).time()

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
                    arrive_time = arrive_time.strftime(date_time_format)
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
                        'event': time_range_start_time.strftime(date_format)
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
    start_time = datetime.datetime.strptime(start_time, date_format).date()
    end_time = datetime.datetime.strptime(end_time, date_format).date()
    daily_start_time = datetime.datetime.strptime(daily_start_time, time_format).time()

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
                arrive_time = arrive_time.strftime(date_time_format)
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
                    'event': time_range_start_time.strftime(date_format)
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
    start_time = datetime.datetime.strptime(start_time, time_format).time()

    print "line:%s, start_time:%s" % (line, start_time.strftime(time_format))

    try:
        schedule = OrderedScheduleModel.objects.get(
            line=line,
            start_time=start_time
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
                arrive_time = arrive_time.strftime(date_time_format)
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
                    'event': time_range_start_time.strftime(date_format)
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

    print request.GET

    line = request.GET['line']
    start_time = str(request.GET.get('start_time', ''))
    end_time = str(request.GET.get('end_time', ''))

    if not line or not start_time:
        return HttpResponse(json.dumps(data))

    line = LinesModel.objects.get(name=line)
    start_time = datetime.datetime.strptime(start_time, time_format).time()
    end_time = datetime.datetime.strptime(end_time, time_format).time()

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


def get_patrol_history(filter_dict):
    """
    @param filter_dict: request.GET like this:
        {
            # schedule: ,
            person: ,
            start_date: ,
            end_date: ,
            start_time: ,
            end_time:
        }
    @return: a dict like this:
        {
            'paths': [(x1, y1), (x2, y2), (x3, y3), (x4, y4), ...],
            'points': {
                'x,y':{
                    'position_card': position_card,
                    'position': position,
                    'arrive_time': arrive_time,
                    'x': x,
                    'y': y,
                    'person': person.name
                }
            }
        }
    """
    print 'func get_patrol_history'

    data = {
        'paths': [],
        'points': {}
    }

    # schedule_type = filter_dict.get('schedule', None)
    person = filter_dict.get('person', None)
    start_date = filter_dict.get('start_date', None)
    end_date = filter_dict.get('end_date', None)
    start_time = filter_dict.get('start_time', None)
    end_time = filter_dict.get('end_time', None)

    if not (person and start_date and end_date and start_time and end_time):
        print "error!"
        print "person:%s; start_date:%s; end_date:%s; start_time:%s; end_time:%s" \
              % (person, start_date, end_date, start_time, end_time)
        return data

    try:
        person = PersonsModel.objects.get(name=person)
        start_date = datetime.datetime.strptime(start_date, date_format).date()
        end_date = datetime.datetime.strptime(end_date, date_format).date()
        start_time = datetime.datetime.strptime(start_time, time_format).time()
        end_time = datetime.datetime.strptime(end_time, time_format).time()
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
        return data

    day_num = (end_date-start_date).days + 1
    for i in range(day_num):
        tmp_date = start_date + datetime.timedelta(i, 0, 0)
        tmp_start_time = combine_date_and_time(tmp_date, start_time)
        tmp_end_time = combine_date_and_time(tmp_date, end_time)

        cursor = PatrolActionHistoryModel.objects.filter(
            arrive_time__gte=tmp_start_time,
            arrive_time__lt=tmp_end_time,
            person=person
        ).order_by('arrive_time')

        points = []
        for item in cursor:
            arrive_time = item.arrive_time.strftime(date_time_format)
            position = item.position.position
            position_card = item.position.position_card.name
            x = item.position.position_card.x
            y = item.position.position_card.y
            p = {
                'position_card': position_card,
                'position': position,
                'arrive_time': arrive_time,
                'x': x,
                'y': y,
                'person': person.name
            }
            points[str(x)+','+str(y)] = p
            data['points'].append(p)
            pass

        for i in range(len(points)-1):
            start_point = (points[i]['x'], points[i]['y'])
            end_point = (points[i+1]['x'], points[i+1]['y'])
            plc = PatrolLineCalc(start_point=start_point, end_point=end_point)
            path = plc.get_path()
            data['paths'].append(path)
            pass
        pass

    return data
    pass


@login_required(login_url="/login/")
def get_schedule_map_history(request):
    print 'func get_schedule_map_history'
    data = {
        'paths': [],
        'points': {}
    }

    try:
        data = get_patrol_history(request.GET)
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    # Add test date here
    t = datetime.datetime.now()
    for i in range(4):
        x = (i+1)*100
        y = 200
        data['points'][str(x)+','+str(y)] = {
            'position_card': '第'+str(i+1)+'张地点卡',
            'position': '位置'+str(i+1),
            'arrive_time': (t+datetime.timedelta(i, 0, 0)).strftime(date_time_format),
            'x': x,
            'y': y,
            'person': '人员1'
        }
        pass

    for i in range(3):
        data['paths'].append(
            [((i+1)*100, 200), ((i+2)*100, 200)],
        )
        pass

    print json.dumps(data, indent=4)
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

    print json.dumps(template_data, indent=4)

    return HttpResponse(json.dumps(template_data))
    pass