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

from lines.models import *
from conf.confGlobal import *


def update_one_line_position(row_data):
    """
    line = models.ForeignKey(LinesModel)
    position = models.ForeignKey(PositionsModel)
    next_time_arrival = models.IntegerField(verbose_name="下次到达时间(min)")
    order = models.IntegerField(verbose_name="顺序")
    """
    print 'func update_one_line_position'
    try:
        print row_data

        line = row_data.get('line', '')
        position = row_data.get('position', '')
        next_time_arrival = int(row_data.get('next_time_arrival', -1))
        # time_error = int(row_data.get('time_error', 2))
        order = int(row_data.get('order', -1))

        if not line:
            return -1

        print row_data

        old_line_position = None
        try:
            line = LinesModel.objects.get(name=line)
            pass
        except LinesModel.DoesNotExist:
            line = LinesModel(name=line)
            line.save()
            pass

        try:
            position = PositionsModel.objects.get(position=position)
            pass
        except PositionsModel.DoesNotExist:
            print "position not exist!"
            return -1
            pass

        print position

        try:
            old_line_position = LinePositionsModel.objects.get(line=line, position=position)
        except LinePositionsModel.DoesNotExist:
            person = LinePositionsModel(
                line=line,
                position=position,
                next_time_arrival=next_time_arrival,
                order=order
            )
            person.save()
            pass
        else:
            old_line_position.line = line
            old_line_position.position = position
            old_line_position.next_time_arrival = next_time_arrival
            old_line_position.order = order
            old_line_position.save()
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def update_line_position(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    print "func update_line_position"
    if isinstance(data, dict):
        try:
            update_one_line_position(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                update_one_line_position(row_data)
                pass
            except Exception as e:
                print e
                print traceback.format_exc()
            pass
        pass
    else:
        pass
    pass


@login_required(login_url="/login/")
def get_lines_excel(request):
    excel_name = '线路信息'

    data = [['线路名称', '地点名称', '下次到达时间(min)', '允许时间误差(min)', '顺序']]

    try:
        for line in LinesModel.objects.all():
            data.append([line.name, line.position, line.next_time_arrival, line.order])
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return ExcelResponse(data, excel_name)
    pass