#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

import json
import datetime
import traceback

from persons.models import *
from positions.models import *
from lines.models import *
from schedules.models import *


class Query(object):
    def __init__(self, **kwargs):
        print "kwargs:"
        print json.dumps(kwargs)

        try:
            self.schedule_type = kwargs.get('schedule_type', None)
            self.schedule_line = kwargs.get('schedule_line', None)
            self.start_time = kwargs.get('start_time', None)
            self.end_time = kwargs.get('end_time', None)
            self.time_error = kwargs.get('time_error', None)
            self.position = kwargs.get('position', None)
            self.person = kwargs.get('person', None)
            self.status = kwargs.get('status', None)

            self.schedule_type = self.schedule_type[0].encode('utf-8')
            self.schedule_line = self.schedule_line[0].encode('utf-8')
            self.time_error = self.time_error[0].encode('utf-8')
            self.position = self.position[0].encode('utf-8')
            self.person = self.person[0].encode('utf-8')
            self.status = self.status[0].encode('utf-8')
            self.start_time = datetime.datetime.strptime(self.start_time[0].encode('utf-8'), '%Y-%m-%d %H:%M:%S')
            self.end_time = datetime.datetime.strptime(self.end_time[0].encode('utf-8'), '%Y-%m-%d %H:%M:%S')
            self.time_error = datetime.timedelta(0, int(self.time_error[0])*60, 0)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
        pass

    def get_all_schedules(self, schedule_type):
        schedules = []

        schedule_mode_dict = {
            'multi_day': MultiDayScheduleModel,
            'ordered': OrderedScheduleModel,
            'unordered': UnorderedScheduleModel
        }

        model = schedule_mode_dict.get(schedule_type, None)

        if not model:
            return schedules

        if self.schedule_line == '所有':
            for schedule in model.objects.all():
                schedules.append(schedule)
                pass
            pass
        else:
            line = self.schedule_line.split(',')[0]
            try:
                line = LinesModel.objects.get(name=line)
                pass
            except LinesModel.DoesNotExist:
                return []
                pass

            if schedule_type == 'multi_day':
                start_time = self.schedule_line.split(',')[1]
                start_time = datetime.datetime.strptime(start_time, '%Y-%m-%d').date()
                end_time = self.schedule_line.split(',')[2]
                end_time = datetime.datetime.strptime(end_time, '%Y-%m-%d').date()
                daily_start_time = self.schedule_line.split(',')[3]
                daily_start_time = datetime.datetime.strptime(daily_start_time, '%H:%M:%S').time()

                try:
                    schedule = model.objects.get(
                        line=line,
                        start_time=start_time,
                        end_time=end_time,
                        daily_start_time=daily_start_time
                    )
                    schedules.append(schedule)
                    pass
                except model.DoesNotExist:
                    pass

            if schedule_type == 'ordered':
                start_time = self.schedule_line.split(',')[1]
                start_time = datetime.datetime.strptime(start_time, '%H:%M:%S').time()
                try:
                    schedule = model.objects.get(
                        line=line,
                        start_time=start_time
                    )
                    schedules.append(schedule)
                    pass
                except model.DoesNotExist:
                    pass

            if schedule_type == 'unordered':
                start_time = self.schedule_line.split(',')[1]
                start_time = datetime.datetime.strptime(start_time, '%H:%M:%S').time()
                end_time = self.schedule_line.split(',')[2]
                end_time = datetime.datetime.strptime(end_time, '%H:%M:%S').time()
                try:
                    schedule = model.objects.get(
                        line=line,
                        start_time=start_time,
                        end_time=end_time
                    )
                    schedules.append(schedule)
                    pass
                except model.DoesNotExist:
                    pass

        return schedules
        pass

    def is_exists(self, right_arrive_time):
        ts = right_arrive_time - self.time_error
        te = right_arrive_time + self.time_error
        if self.cursor.filter(**self.filter_dict).filter(arrive_time__gte=ts, arrive_time__lt=te).count() > 0:
            return True
        else:
            return False
        pass

    def query_multi_day_schedule(self):
        print 'func query_multi_day_schedule'
        data = []

        # filter schedules
        schedules = self.get_all_schedules()

        # Check all schedule data
        for schedule in schedules:
            # Check schedule's every day
            day_num = (schedule.end_time - schedule.start_time).days
            for i in range(day_num):
                # Check all positions in one day
                date = schedule.start_time + datetime.timedelta(i, 0, 0)
                right_arrive_time = datetime.datetime.strptime(
                    date.strftime('%Y-%m-%d') + ' ' + schedule.daily_start_time.stftime('%H:%M:%S'),
                    '%Y-%m-%d %H:%M:%S'
                )

                count = 0
                time_mount = 0
                for line_position in LinePositionsModel.objects.filter(line=schedule.line).order_by('order'):
                    position = line_position.position
                    order = int(line_position.order)
                    next_time_arrival = int(line_position.next_time_arrival)
                    time_mount = 0 if not count == 0 else (time_mount + next_time_arrival)

                    right_arrive_time = right_arrive_time if count == 0 \
                        else right_arrive_time+datetime.timedelta(0, time_mount*60, 0)

                    if self.is_exists(right_arrive_time):
                        data.append()
                        pass
                    pass
                pass


            pass

        return data
        pass

    def query_ordered_schedule(self):
        print 'func query_ordered_schedule'
        data = []

        line, start_time = self.schedule_line.split(',')

        lines = []
        if self.schedule_line == '所有':
            pass
        else:
            lines.append(self.schedule_line)

        return data
        pass

    def query_unordered_schedule(self):
        print 'func query_unordered_schedule'
        data = []

        line, start_time, end_time = self.schedule_line.split(',')

        lines = []
        if self.schedule_line == '所有':
            pass
        else:
            lines.append(self.schedule_line)

        return data
        pass

    def query(self):
        """
        @return: a list like this:[
            {
                'position':'',
                'status':'',
                'arrive_time':'',
                'person':'',
                'event':''
            }
        ]
        """
        print 'func query'
        data = []

        if not (self.schedule_type
                    and self.schedule_line
                    and self.start_time
                    and self.end_time
                    and self.time_error
                    and self.position
                    and self.person
                    and self.status):
            return data
            pass

        self.cursor = None

        self.filter_dict = {
            'arrive_time__gte': self.start_time,
            'arrive_time__lt': self.end_time
        }

        # self.cursor = PatrolActionHistoryModel.objects.filter(arrive_time__gte=self.start_time)\
        #                                         .filter(arrive_time__lt=self.end_time)

        if not self.person == '所有':
            try:
                person = PersonsModel.objects.get(name=self.person)
                self.filter_dict['person'] = person
                # self.cursor = self.cursor.filter(person=person)
                pass
            except PersonsModel.DoesNotExist:
                return data
                pass
            pass

        if not self.position == '所有':
            try:
                position = PositionsModel.objects.get(position=self.position)
                self.filter_dict['position'] = position
                # self.cursor = self.cursor.filter(position=position)
                pass
            except PositionsModel.DoesNotExist:
                return data
                pass
            pass

        if self.schedule_type == '多天计划查询':
            data = self.query_multi_day_schedule()
            pass

        if self.schedule_type == '有顺序计划查询':
            data = self.query_ordered_schedule()
            pass

        if self.schedule_type == '无顺序计划查询':
            data = self.query_unordered_schedule()
            pass

        return data
        pass