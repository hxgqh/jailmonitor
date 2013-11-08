#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import re
import sys
import tablib
import traceback

from excel_response import ExcelResponse

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from persons.models import *
from conf.confGlobal import *


def update_one_person(row_data):
    try:
        person_no = row_data.get('person_no', '')
        name = row_data.get('name', '')
        contact = row_data.get('contact', '')
        address = row_data.get('address', '')

        old_person = None
        try:
            old_person = PersonsModel.objects.get(person_no=person_no)
        except PersonsModel.DoesNotExist:
            if person_no:
                person = PersonsModel(
                    person_no=person_no,
                    name=name,
                    contact=contact,
                    address=address
                )
                person.save()
            pass
        else:
            old_person.name = name
            old_person.contact = contact
            old_person.address = address
            old_person.save()
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def update_person(data):
    """
    @param data: data could be single row(a dict) or multiple rows(a list of dict).
    """
    if isinstance(data, dict):
        try:
            update_one_person(data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
    elif isinstance(data, list):
        for row_data in data:
            try:
                update_one_person(row_data)
                pass
            except Exception as e:
                print e
                print traceback.format_exc()
            pass
        pass
    else:
        pass
    pass


def delete_person(row_data):
    try:
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def get_persons_excel(request):
    excel_name = '人员信息'

    data = [['号', '人员', '联系方式', '通讯地址']]

    try:
        for person in PersonsModel.objects.all():
            data.append([person.person_no, person.name, person.contact, person.address])
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return ExcelResponse(data, excel_name)
    pass