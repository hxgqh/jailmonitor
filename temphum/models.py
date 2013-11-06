#!/usr/bin/env python
# -*- coding:utf-8 -*-

from django.db import models

from positions.models import *


class TemperatureHumidityDeviceModel(models.Model):
    ip = models.GenericIPAddressField(verbose_name="IP地址")
    position = models.CharField(verbose_name="地址名称", max_length=255)
    device_no = models.IntegerField(verbose_name="温湿度计编号")


class TemperatureHumidityModel(models.Model):
    time = models.DateTimeField(verbose_name="时间")
    device = models.ForeignKey(TemperatureHumidityDeviceModel)
    temperature = models.FloatField(verbose_name="温度")
    humidity = models.FloatField(verbose_name="湿度")