#!/usr/bin/env python
# -*- coding:utf-8 -*-

from django.db import models

from positions.models import *


class TemperatureHumidityPositionCardModel(models.Model):
    name = models.CharField(verbose_name="地点名称", max_length=100, unique=True)
    x = models.IntegerField(verbose_name="X轴坐标")
    y = models.IntegerField(verbose_name="y轴坐标")
    map_width = models.IntegerField(verbose_name="地图宽度")
    map_height = models.IntegerField(verbose_name="地图高度")


class TemperatureHumidityDeviceModel(models.Model):
    ip = models.GenericIPAddressField(verbose_name="IP地址")
    position = models.CharField(verbose_name="地址名称", max_length=255)
    device_no = models.IntegerField(verbose_name="温湿度计编号")
    position_card = models.ForeignKey(TemperatureHumidityPositionCardModel, blank=True, null=True)  # position_card_id


class TemperatureHumidityModel(models.Model):
    time = models.DateTimeField(verbose_name="时间")  # , USE_TZ=False)
    device = models.ForeignKey(TemperatureHumidityDeviceModel)
    temperature = models.FloatField(verbose_name="温度")
    humidity = models.FloatField(verbose_name="湿度")