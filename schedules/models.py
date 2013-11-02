#!/usr/bin/env python
# -*- coding:utf-8 -*-

from django.db import models

# Create your models here.


class MultiDayScheduleModel(models.Model):
    line = models.CharField(verbose_name="线路", max_length=255, unique=True)
    start_time = models.DateTimeField(verbose_name="开始日期")
    end_time = models.DateTimeField(verbose_name="结束日期")


class OrderedScheduleModel(models.Model):
    line = models.CharField(verbose_name="线路", max_length=255, unique=True)
    start_time = models.DateTimeField(verbose_name="开始日期")


class UnorderedScheduleModel(models.Model):
    line = models.CharField(verbose_name="线路", max_length=255, unique=True)
    start_time = models.DateTimeField(verbose_name="开始日期")
    end_time = models.DateTimeField(verbose_name="结束日期")