#!/usr/bin/env python
# -*- coding:utf-8 -*-

from django.db import models


class PositionCardModel(models.Model):
    name = models.CharField(verbose_name="地点名称", max_length=255, unique=True)
    x = models.IntegerField(verbose_name="X轴坐标")
    y = models.IntegerField(verbose_name="y轴坐标")
    map_width = models.IntegerField(verbose_name="地图宽度")
    map_height = models.IntegerField(verbose_name="地图高度")


class PositionsModel(models.Model):
    ip = models.GenericIPAddressField(verbose_name="IP地址")
    mac = models.CharField(verbose_name="Mac地址", max_length=255, blank=True, null=True)
    position = models.CharField(verbose_name="地址名称", max_length=255, unique=True)
    install_position = models.CharField(verbose_name="安装位置", max_length=255)
    position_card = models.ForeignKey(PositionCardModel, blank=True, null=True)  # position_card_id


