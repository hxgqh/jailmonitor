#!/usr/bin/env python
# -*- coding:utf-8 -*-

from django.db import models, connection
from django.contrib.auth.models import User
from django.db.models import signals
import django.dispatch
from django.db import (connections, router, transaction, DatabaseError, DEFAULT_DB_ALIAS)
from django.db.models.fields import AutoField, FieldDoesNotExist
import py_compile
import re
from django.utils.translation import ugettext_lazy as _
from django.core.cache import cache

# Create your models here.


class PersonsModel(models.Model):
    person_no = models.CharField(verbose_name="号", max_length=255, unique=True)
    name = models.CharField(verbose_name="人员", max_length=30)
    contact = models.CharField(verbose_name="联系方式", max_length=255)
    address = models.CharField(verbose_name="通讯地址", max_length=255)

