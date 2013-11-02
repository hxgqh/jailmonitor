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


def update_one_line(row_data):
    try:
        name = row_data.get('name', '')
        position = row_data.get('position', '')
        next_time_arrival = row_data.get('next_time_arrival', '')
        order = row_data.get('order')

        print row_data

        if not name:
            return -1

        print row_data

        old_line = None
        try:
            old_line = LinesModel.objects.get(name=name)
        except LinesModel.DoesNotExist:
            person = LinesModel(
                name=name,
                position=position,
                next_time_arrival=next_time_arrival,
                order=order
            )
            person.save()
            pass
        else:
            old_line.name = name
            old_line.position = position
            old_line.next_time_arrival = position
            old_line.order = order
            old_line.save()
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def update_line(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    print "func update_line"
    if isinstance(data, dict):
        try:
            update_one_line(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                update_one_line(row_data)
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

    data = [['线路名称', '地点名称', '下次到达时间(min)', '顺序']]

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