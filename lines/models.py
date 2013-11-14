#!/usr/bin/env python
# -*- coding:utf-8 -*-
from django.db import models

from positions.models import *
from persons.models import *


class LinesModel(models.Model):
    name = models.CharField(verbose_name="线路名称", max_length=255, unique=True)


class LinePositionsModel(models.Model):
    line = models.ForeignKey(LinesModel)
    position = models.CharField(verbose_name="地点名称", max_length=255)
    next_time_arrival = models.IntegerField(verbose_name="下次到达时间(min)")
    # time_error = models.IntegerField(verbose_name="允许时间误差(min)")
    order = models.IntegerField(verbose_name="顺序")


class PatrolActionHistoryModel(models.Model):
    # line = models.ForeignKey(LinesModel)
    position = models.ForeignKey(PositionsModel)
    # status = models.IntegerField('巡检状态', default=0)
    arrive_time = models.DateTimeField('实到时间', blank=True, null=True)   # USE_TZ=False,
    person = models.ForeignKey(PersonsModel, blank=True, null=True)
    # event = models.CharField(verbose_name="事件", max_length=255, blank=True, null=True)
