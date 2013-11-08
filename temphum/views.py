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
from temphum.models import *


def update_one_position_temperature_humidity(row_data):
    try:
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


def update_position_humidity(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    print "func update_position"
    if isinstance(data, dict):
        try:
            update_one_position_temperature_humidity(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                update_one_position_temperature_humidity(row_data)
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
def get_temp_hum_devices_excel(request):
    excel_name = '温湿度计信息'

    data = [['IP地址', '温湿度计编号', '地址名称']]

    try:
        for temp_hum_device in TemperatureHumidityDeviceModel.objects.all():
            data.append([temp_hum_device.ip, temp_hum_device.device_no, temp_hum_device.position])
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return ExcelResponse(data, excel_name)
    pass


def update_one_temp_hum_device(row_data):
    try:
        id = row_data.get('id', '')
        ip = row_data.get('ip', '')
        position = row_data.get('position', '')
        device_no = row_data.get('device_no', '')

        old_person = None
        try:
            old_device = TemperatureHumidityDeviceModel.objects.get(id=id)
        except TemperatureHumidityDeviceModel.DoesNotExist:
            device = TemperatureHumidityDeviceModel(
                ip=ip,
                position=position,
                device_no=device_no
            )
            device.save()
            pass
        else:
            old_device.ip = ip
            old_device.position = position
            old_device.device_no = device_no
            old_person.save()
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def update_temp_hum_devices(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    if isinstance(data, dict):
        try:
            update_one_temp_hum_device(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                update_one_temp_hum_device(row_data)
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
def get_temp_hum_position_card(request):
    print "func add_position_card"
    print request.GET

    data = []

    try:
        for pc in TemperatureHumidityPositionCardModel.objects.all():
            data.append({
                'name': pc.name,
                'x': pc.x,
                'y': pc.y
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
def add_temp_hum_position_card(request):
    print request.GET

    data = request.GET
    name = data.get('name', '')
    x = data.get('x', '')
    y = data.get('y', '')

    if not name:
        return HttpResponse('')

    try:
        p_c = TemperatureHumidityPositionCardModel(
            name=name,
            x=x,
            y=y
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
def get_temp_hum_position_mapping(request):
    print "func get_position_mapping"
    # data = ['地点1', '温湿度计1']
    data = []

    try:
        for device in TemperatureHumidityDeviceModel.objects.all():
            if not device.position:
                continue

            if device.position_card:
                data.append({
                    'position': device.position,
                    'position_card': device.position_card.name
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
def add_temp_hum_position_mapping(request):
    # data = {'position':'地点1', 'position_card':'温湿度计1'}
    data = request.GET
    print data
    position = data.get('position', '')
    position_card = data.get('position_card', '')

    if not position or not position_card:
        return HttpResponse('')

    try:
        p = TemperatureHumidityDeviceModel.objects.get(position=position)
        pc = TemperatureHumidityPositionCardModel.objects.get(name=position_card)
        p.position_card = pc
        p.save()
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return HttpResponse(json.dumps(data))
    pass