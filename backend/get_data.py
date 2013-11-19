#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

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


def build_query_temp_hum_cmd(device_no):
    """
    cmd = '01040000000271CB'

    start
    got connected from ('192.168.1.52', 57525)
    01040400dc01977a40
    end

    cmd = '01040000000131CA'
    start
    got connected from ('192.168.1.52', 32075)
    01040200de3968
    end
    """
    cmd = device_no+'0400000002'
    crc = my_crc16(cmd)
    return cmd+crc
    pass


def get_temp_hum_dict():
    devices = {}
    # 获得所有温湿度计
    try:
        for item in TemperatureHumidityDeviceModel.objects.all():
            cmd = build_query_temp_hum_cmd(str(item.device_no))
            devices[item.ip+','+str(item.device_no)] = {
                'ip': item.ip,
                'device_no': item.device_no,
                'cmd': cmd
            }
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return devices
    pass

#
# def send_temp_hum_query():
#     """
#     给温湿度计发送数据查询请求
#     """
#     devices = get_temp_hum_dict()
#
#     # 对所有温湿度计发送命令
#
#     pass


def parse_temperature(data):
    """
    @param data: data is a hex string like "01040400dc01977a40", then return
    @return: temperature in float
    """
    temperature = -300
    start_index = 6

    try:
        read_value_hex = data[start_index]+data[start_index+1]+data[start_index+2]+data[start_index+3]
        read_value_int = int(read_value_hex, 16)

        print read_value_hex
        print read_value_int
        temperature = float(read_value_int)*120/1024-40
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return temperature
    pass


def parse_humidity(data):
    """
    @param data: data is a hex string like "01040400dc01977a40", then return
    @return: humidity in float
    """
    humidity = -1

    start_index = 10

    try:
        read_value_hex = data[start_index]+data[start_index+1]+data[start_index+2]+data[start_index+3]
        read_value_int = int(read_value_hex, 16)

        humidity = float(read_value_int)*100.0/1024
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    return humidity
    pass


def insert_temperature_and_humidity(client_ip, data):
    device_no = int(data[0:2], 16)
    temperature = parse_temperature(data)
    humidity = parse_humidity(data)

    print "time:%s, client_ip:%s, device_no:%d, temperature:%s, humidity:%s" % (time.time(), client_ip, device_no, str(temperature), str(humidity), )

    try:
        # TODO: insert temperature and humidity here
        try:
            device = TemperatureHumidityDeviceModel.objects.get(ip=client_ip, device_no=device_no)
            insert_time = datetime.datetime.now()
            item = TemperatureHumidityModel(
                time=insert_time,
                device=device,
                temperature=temperature,
                humidity=humidity
            )
            item.save()
            pass
        except TemperatureHumidityDeviceModel.DoesNotExist:
            return -1
            pass
        else:
            pass
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


class TemperatureHumidityServer(TMI, TCP):
    """
    This server can serve multiple client at a same time.
    """
    pass


class TemperatureHumidityTCPHandler(SRH):
    def handle(self):
        try:
            # self.request is the TCP socket connected to the client
            self.data = self.request.recv(1024).strip()
            client_ip = self.client_address[0]

            # print self.data
            insert_temperature_and_humidity(client_ip, self.data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()


# class TemperatureTCPHandler(SocketServer.BaseRequestHandler):
#     """
#     The TemperatureTCPHandler class for our server.
#     It will break the connection to only receive one copy of data sent from a client.
#     It is instantiated once per connection to the server, and must
#     override the handle() method to implement communication to the
#     client.
#     """
#     def handle(self):
#         # self.request is the TCP socket connected to the client
#         self.data = self.request.recv(1024).strip()
#         print "{} wrote:".format(self.client_address[0])
#         print self.data
#
#         insert_temperature_and_humidity(self.data)
#
#         # just send back the same data, but upper-cased
#         # self.request.sendall(self.data.upper())
#
#     # def handle(self):
#     #     while True:
#     #         # self.request is the TCP socket connected to the client
#     #         self.data = self.request.recv(1024).strip()
#     #         print "{} wrote:".format(self.client_address[0])
#     #         print self.data
#     #
#     #         insert_temperature_and_humidity(self.data)
#     #
#     #         # just send back the same data, but upper-cased
#     #         # self.request.sendall(self.data.upper())


def get_temperature_humidity(host='0.0.0.0', port=8888):
    """
    cmd = '01040000000271CB'

    start
    got connected from ('192.168.1.52', 57525)
    01040400dc01977a40
    end

    cmd = '01040000000131CA'
    start
    got connected from ('192.168.1.52', 32075)
    01040200de3968
    end
    """
    ADDR = (host, port)
    tcpServ = TemperatureHumidityServer(ADDR, TemperatureHumidityTCPHandler)
    tcpServ.serve_forever()

    # server = SocketServer.TCPServer((HOST, PORT), TemperatureTCPHandler)
    # server.serve_forever()
    pass


def parse_patrol_data(data):
    """
    @param data: a hex string like this aa3300fb000000a00f00000f17d60c0000790d0000 8fa61a00008d1500 eda32800008d1500 00000000000000000000000000000000c64a086d03
    @return:
    """
    # print "func parse_patrol_data:" + data

    patrol = 0

    tag_mac = ''
    reader_mac = ''

    if not data:
        return None, None

    for i in range(0, 8):
        tag_mac += data[(56-i*2):(58-i*2)]
        reader_mac += data[(72-i*2):(74-i*2)]

    print 'tag_mac:%s, reader_mac:%s' % (tag_mac, reader_mac)

    return tag_mac, reader_mac
    pass


def insert_patrol_data(client_ip, data):
    """
    @param data: raw internet data
    """
    # person_mac, position_mac = parse_patrol_data(hexlify(data))
    #
    # print "time:%s, client_ip:%s, person_mac:%s, position_mac:%s" % (
    #     str(time.time()),
    #     client_ip,
    #     person_mac,
    #     position_mac,
    # )

    position = None
    person = None
    try:
        try:
            person = PersonsModel.objects.get(person_no=person_mac)
            pass
        except PersonsModel.DoesNotExist:
            if person_mac:
                item = PersonsModel(
                    person_no=person_mac,
                    name='',
                    contact='',
                    address=''
                )
                item.save()
            pass
        else:
            pass

        try:
            position = PositionsModel.objects.get(ip=client_ip, mac=position_mac)
            pass
        except PositionsModel.DoesNotExist:
            if position_mac:
                item = PositionsModel(
                    ip=client_ip,
                    mac=position_mac,
                    position='',
                    install_position=''
                )
                item.save()
            pass
        else:
            pass

        arrive_time = datetime.datetime.now()

        if person and position:
            item = PatrolActionHistoryModel(
                position=position,
                # status=models.SmallIntegerField('巡检状态', choices=STATUS, default=0),
                arrive_time=arrive_time,
                person=person,
                # event=''
            )
            item.save()
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


class PatrolServer(TMI, TCP):
    """
    This server can serve multiple client at a same time.
    """
    pass


class PatrolTCPHandler(SRH):
    def handle(self):
        # while True:
        try:
            # self.request is the TCP socket connected to the client
            self.data = self.request.recv(1024).strip()
            client_ip = self.client_address[0]

            # self.data = hexlify(self.data)

            # print "data:"+self.data
            insert_patrol_data(client_ip, self.data)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()


# class PatrolTCPHandler(SocketServer.BaseRequestHandler):
#     """
#     The RequestHandler class for our server.
#
#     It is instantiated once per connection to the server, and must
#     override the handle() method to implement communication to the
#     client.
#     """
#
#     def handle(self):
#         while True:
#             # self.request is the TCP socket connected to the client
#             self.data = self.request.recv(1024).strip()
#             print "{} wrote:".format(self.client_address[0])
#             print self.data
#
#             insert_temperature_and_humidity(self.data)
#
#             # just send back the same data, but upper-cased
#             # self.request.sendall(self.data.upper())


def get_patrol_data(host='0.0.0.0', port=8889):
    """
    aa3300fb000000a00f00000f17d60c0000790d00008fa61a00008d1500eda32800008d150000000000000000000000000000000000c64a086d03
    got connected from ('192.168.1.51', 34387)
    aa3300fc000000a00f00000f18d60c00007a0d00008fa61a00008d1500eda32800008d150000000000000000000000000000000000c34a08ec03
    got connected from ('192.168.1.51', 34771)
    aa3300fd000000a00f00000f17d60c00007b0d00008fa61a00008d1500eda32800008d150000000000000000000000000000000000c34b081a04
    got connected from ('192.168.1.51', 35155)
    aa3300fe000000a00f00000f18d60c00007c0d00008fa61a00008d1500eda32800008d150000000000000000000000000000000000c95408a204
    """
    ADDR = (host, port)
    tcpServ = PatrolServer(ADDR, PatrolTCPHandler)
    tcpServ.serve_forever()
    pass
#
#
# def getTemperature1():
#
#     addr = ('0.0.0.0', 8888)
#     s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#     # s = socket.socket()
#     s.bind(addr)
#     s.listen(3)
#
#     # ss, addr = s.accept()
#     # print 'got connected from', addr
#     cmd = '01040000000271CB'
#     print cmd
#
#     while True:
#         try:
#             s.send(unhexlify(cmd))
#             time.sleep(1)
#             data = s.recv(512)
#             print data
#             data = s.recv(4096)
#             pass
#         except Exception as e:
#             print e
#             print traceback.format_exc()
#             pass
#         pass
#     s.close()
#
#
#     """
#     # s.connect(addr)
#     time.sleep(1)
#     s.send('0x01040000000271cb')
#     time.sleep(1)
#     data = s.recv(512)
#     print data
#     s.close()
#     """
#     pass


if __name__ == "__main__":
    print 'start'
    get_temperature_humidity()
    # getPatrolData()
    print 'end'

"""
需要沟通的问题：
    1. 返回结果如何计算温度和湿度值？
    2. mac地址为什么为4*8=32位？
"""