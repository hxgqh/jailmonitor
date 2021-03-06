#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import re
import sys
import json
import tablib
import traceback

from excel_response import ExcelResponse

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from positions.models import *
from conf.confGlobal import *


def update_one_position(row_data):
    try:
        print "row_data:"+str(row_data)

        ip = row_data.get('ip', '')
        mac = row_data.get('mac', '')
        position = row_data.get('position', '')
        install_position = row_data.get('install_position', '')

        if not ip:
            return -1

        old_position = None
        try:
            old_position = PositionsModel.objects.get(ip=ip)
        except PositionsModel.DoesNotExist:
            person = PositionsModel(
                ip=ip,
                mac=mac,
                position=position,
                install_position=install_position
            )
            person.save()
            pass
        else:
            old_position.ip = ip
            old_position.mac = mac
            old_position.position = position
            old_position.install_position = position
            old_position.save()
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def update_position(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    print "func update_position"
    if isinstance(data, dict):
        try:
            update_one_position(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                update_one_position(row_data)
                pass
            except Exception as e:
                print e
                print traceback.format_exc()
            pass
        pass
    else:
        pass
    pass


def delete_one_position(row_data):
    try:
        print "row_data:"+str(row_data)

        ip = row_data.get('ip', '')
        mac = row_data.get('mac', '')

        if not ip:
            return -1

        old_position = None
        try:
            old_position = PositionsModel.objects.get(ip=ip, mac=mac)
            old_position.delete()
        except PositionsModel.DoesNotExist:
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def delete_position(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    print "func update_position"
    if isinstance(data, dict):
        try:
            delete_one_position(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                delete_one_position(row_data)
                pass
            except Exception as e:
                print e
                print traceback.format_exc()
            pass
        pass
    else:
        pass
    pass


@login_required(login_url="/login")
@csrf_exempt
def get_positions_excel(request):
    excel_name = '地点信息'

    data = [['IP地址', 'MAC地址', '地址名称', '安装位置']]

    try:
        for position in PositionsModel.objects.all():
            data.append([position.ip, position.mac, position.position, position.install_position])
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return ExcelResponse(data, excel_name)
    pass


@login_required(login_url="/login")
@csrf_exempt
def add_position_card(request):
    print "func add_position_card"
    print request.GET

    data = request.GET
    name = data.get('name', '')
    x = data.get('x', -1)
    y = data.get('y', -1)
    map_width = data.get('map_width', -1)
    map_height = data.get('map_height', -1)

    if not name:
        return HttpResponse('')

    try:
        p_c = PositionCardModel(
            name=name,
            x=x,
            y=y,
            map_width=map_width,
            map_height=map_height
        )
        p_c.save()
        pass
    except Exception as e:
        print e
        print traceback

    return HttpResponse('')
    pass


@login_required(login_url="/login")
@csrf_exempt
def update_position_card(request):
    print "func update_position_card"
    print request.GET

    data = request.GET
    name = data.get('name', '')
    x = data.get('x', -1)
    y = data.get('y', -1)
    map_width = data.get('map_width', -1)
    map_height = data.get('map_height', -1)

    if not name:
        return HttpResponse('')

    try:
        p_c = PositionCardModel.objects.get(name=name)
        p_c.x = x
        p_c.y = y
        p_c.map_height = map_height
        p_c.map_width = map_width
        p_c.save()
    except PositionCardModel.DoesNotExist:
        pass
    else:
        pass

    return HttpResponse('')
    pass


@login_required(login_url="/login")
@csrf_exempt
def get_position_card(request):
    print request.GET

    data = []

    try:
        for pc in PositionCardModel.objects.all():
            data.append({
                'name': pc.name,
                'x': pc.x,
                'y': pc.y,
                'map_width:': pc.map_width,
                'map_height': pc.map_height
            })
            pass
        pass
    except Exception as e:
        print e
        print traceback

    return HttpResponse(json.dumps(data))
    pass


@login_required(login_url="/login")
@csrf_exempt
def get_position_mapping(request):
    print "func get_position_mapping"
    # data = ['地点1', '第1张地点卡']
    data = []

    try:
        for position in PositionsModel.objects.all():
            print "position.position:"
            print position.position

            if not position.position_card:
                continue

            print "position.position_card:"
            print position.position_card.name
            if position.position_card:
                data.append({
                    'position': position.position,
                    'position_card': position.position_card.name
                })
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return HttpResponse(json.dumps(data))
    pass


@login_required(login_url="/login")
@csrf_exempt
def add_position_mapping(request):
    print "func add_position_mapping"
    # data = {'position':'地点1', 'position_card':'第1张地点卡'}
    data = request.GET
    print data
    position = data.get('position', '')
    position_card = data.get('position_card', '')

    if not position or not position_card:
        return HttpResponse('')

    try:
        p = PositionsModel.objects.get(position=position)
        pc = PositionCardModel.objects.get(name=position_card)
        p.position_card = pc
        p.save()
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return HttpResponse(json.dumps(data))
    pass