#!/usr/bin/env python
# -*- coding:utf-8 -*-
from django.db import models

# Create your models here.


class LinesModel(models.Model):
    name = models.CharField(verbose_name="线路名称", max_length=255)
    position = models.CharField(verbose_name="地点名称", max_length=255)
    next_time_arrival = models.IntegerField(verbose_name="下次到达时间(min)")
    order = models.IntegerField(verbose_name="顺序")