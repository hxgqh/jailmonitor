#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import re
import sys
import time
import socket
import SocketServer
import traceback
import datetime
from binascii import hexlify, unhexlify
from SocketServer import (TCPServer as TCP,
                          StreamRequestHandler as SRH,
                          ThreadingMixIn as TMI)

currentPath = os.path.dirname(os.path.abspath(__file__))+'/'
prjPath = re.sub(r'backend\/$', '', currentPath)
sys.path.append(prjPath)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "jailMonitor.settings")

from jailMonitor.settings import *
from persons.models import *
from positions.models import *
from lines.models import *
from schedules.models import *
from temphum.models import *
from backend.utils import *


import subprocess
import threading
import platform


class Pinger(object):
    status = {'alive': [], 'dead': []}  # Populated while we are running
    hosts = []  # List of all hosts/ips in our input queue

    # How many ping process at the time.
    thread_count = 4

    # Lock object to keep track the threads in loops, where it can potentially be race conditions.
    lock = threading.Lock()

    def ping(self, ip):
        # Use the system ping command with count of 1 and wait time of 1.
        fnull = open(os.devnull, 'w')
        if 'Window' in platform.system():
            ret = subprocess.call(['ping', '-n', '2', '-w', '5', ip], stdout=fnull, stderr=fnull)
        else:
            ret = subprocess.call(['ping', '-c', '2', '-W', '5', ip], stdout=fnull, stderr=fnull)


        return ret == 0     # Return True if our ping command succeeds

    def pop_queue(self):
        ip = None

        self.lock.acquire()     # Grab or wait+grab the lock.

        if self.hosts:
            ip = self.hosts.pop()

        self.lock.release()     # Release the lock, so another thread could grab it.

        return ip

    def dequeue(self):
        while True:
            ip = self.pop_queue()

            if not ip:
                return None

            result = 'alive' if self.ping(ip) else 'dead'
            self.status[result].append(ip)

    def start(self):
        threads = []

        for i in range(self.thread_count):
            # Create self.thread_count number of threads that together will
            # cooperate removing every ip in the list. Each thread will do the
            # job as fast as it can.
            t = threading.Thread(target=self.dequeue)
            t.start()
            threads.append(t)

        # Wait until all the threads are done. .join() is blocking.
        [ t.join() for t in threads ]

        return self.status


def get_patrol_device_list():
    devices = []
    try:
        for device in PositionsModel.objects.all():
            if device.ip:
                devices.append(device.ip)
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def check_patrol_devices():
    """
    @return: result is like this
        {
            'dead': [
                'nonexisting',
                '*not able to ping!*',
                '127.0.1.2'
            ],
            'alive': [
                '10.124.1.33',
                '10.124.1.32',
                '10.124.1.31',
                '10.124.1.34',
                'github.com',
                '8.8.8.8',
                'google.com'
            ]
        }
    """
    devices = get_patrol_device_list()
    ping = Pinger()
    ping.thread_count = len(devices)
    ping.hosts = devices
    result = ping.start()

    return result
    pass


def get_temp_hum_device_list():
    devices = []
    try:
        for device in TemperatureHumidityDeviceModel.objects.all():
            if device.ip:
                devices.append(device.ip)
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


def check_temp_hum_devices():
    """
    @return: result is like this
        {
            'dead': [
                'nonexisting',
                '*not able to ping!*',
                '127.0.1.2'
            ],
            'alive': [
                '10.124.1.33',
                '10.124.1.32',
                '10.124.1.31',
                '10.124.1.34',
                'github.com',
                '8.8.8.8',
                'google.com'
            ]
        }
    """
    devices = get_temp_hum_device_list()
    ping = Pinger()
    ping.thread_count = len(devices)
    ping.hosts = devices
    result = ping.start()

    return result
    pass


if __name__ == '__main__':
    ping = Pinger()
    ping.thread_count = 8
    ping.hosts = [
        '10.124.1.31', '10.124.1.32', '10.124.1.33', '10.124.1.34',
        'google.com', 'github.com', 'nonexisting', '127.0.1.2', '*not able to ping!*', '8.8.8.8'
    ]

    print ping.start()