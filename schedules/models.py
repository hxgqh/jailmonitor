#!/usr/bin/env python
# -*- coding:utf-8 -*-

from django.db import models

from lines.models import *


class MultiDayScheduleModel(models.Model):
    line = models.ForeignKey(LinesModel)
    start_time = models.DateTimeField(verbose_name="开始日期")
    end_time = models.DateTimeField(verbose_name="结束日期")
    daily_start_time = models.DateTimeField(verbose_name="巡检开始时间")


class OrderedScheduleModel(models.Model):
    line = models.ForeignKey(LinesModel)
    start_time = models.DateTimeField(verbose_name="开始时间")


class UnorderedScheduleModel(models.Model):
    line = models.ForeignKey(LinesModel)
    start_time = models.DateTimeField(verbose_name="开始时间")
    end_time = models.DateTimeField(verbose_name="结束时间")