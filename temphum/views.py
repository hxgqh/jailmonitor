#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import re
import sys
import json
import datetime
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


def get_one_position_temperature_humidity(request_GET):
    """
    time = models.DateTimeField(verbose_name="时间")  # , USE_TZ=False)
    device = models.ForeignKey(TemperatureHumidityDeviceModel)
    temperature = models.FloatField(verbose_name="温度")
    humidity = models.FloatField(verbose_name="湿度")
    """
    print "func get_one_position_temperature_humidity"
    data = []
    try:
        position = request_GET.get('position', None)

        print position

        if not position:
            return ''

        try:
            device = TemperatureHumidityDeviceModel.objects.get(position=position)
            for item in TemperatureHumidityModel.objects.filter(device=device).order_by('time'):
                data.append({
                    'time': item.time.strftime('%Y-%m-%d %H:%M:%S'),
                    'device': position,
                    'temperature': item.temperature,
                    'humidity': item.humidity
                })
                pass
        except PositionsModel.DoesNotExist:
            return ''
            pass
        else:
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    # TODO: should be removed. Test data here
    t = datetime.datetime.now()
    for i in range(100):
        data.append({
            'time': int(1000.0*float((t+datetime.timedelta(0, 24*3600, 0)).strftime('%s.%f'))),
            'device': '温湿度计地点1',
            'temperature': 10+i/10,
            'humidity': 20+i/10,
        })

    return data
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


def delete_one_temp_hum_device(row_data):
    try:
        id = row_data.get('id', '')

        try:
            old_device = TemperatureHumidityDeviceModel.objects.get(id=id)
            old_device.delete()
        except TemperatureHumidityDeviceModel.DoesNotExist:
            pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def delete_temp_hum_devices(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    if isinstance(data, dict):
        try:
            delete_one_temp_hum_device(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                delete_one_temp_hum_device(row_data)
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
                'y': pc.y,
                'map_width': pc.map_width,
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
def add_temp_hum_position_card(request):
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
        p_c = TemperatureHumidityPositionCardModel(
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
def update_temp_hum_position_card(request):
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
        p_c = TemperatureHumidityPositionCardModel.objects.get(name=name)
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


@login_required(login_url="/login")
@csrf_exempt
def get_recent_temphum(request):
    #@TODO: get recent temperature and humidity
    template_data = {}

    data = request.GET
    if not data:
        return HttpResponse({})

    temp_hum_name = data.get('name', '')

    if not temp_hum_name:
        return HttpResponse({})

    try:
        pc = TemperatureHumidityPositionCardModel.objects.get(name=temp_hum_name)
        try:
            device = TemperatureHumidityDeviceModel.objects.get(position_card=pc)
            position = device.position

            temp_hum = None
            try:
                temp_hum = TemperatureHumidityModel.objects.filter(device=device).order_by('-time')[0]
                temperature = temp_hum.temperature
                humidity = temp_hum.humidity
                template_data['position'] = position
                template_data['temperature'] = temperature
                template_data['humidity'] = humidity
                pass
            except Exception as e:
                pass
            pass
        except TemperatureHumidityDeviceModel.DoesNotExist:
            pass
        else:
            pass
        pass
    except TemperatureHumidityPositionCardModel.DoesNotExist:
        pass
    else:
        pass

    print "query temphum: "
    print json.dumps(template_data, indent=4)
    return HttpResponse(json.dumps(template_data))
    pass