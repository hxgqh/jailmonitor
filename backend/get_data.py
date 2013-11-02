#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

import time
import socket
import traceback
from binascii import hexlify, unhexlify


"""
cmd = '01040000000271CB'

start
got connected from ('192.168.1.52', 57525)
01040400dc01977a40
end
"""

"""
cmd = '01040000000131CA'
start
got connected from ('192.168.1.52', 32075)
01040200de3968
end
"""


def getTemperature1():
    recv_addr = ('0.0.0.0', 8888)
    cmd = '01040000000131CA'
    s_recv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s_recv.bind(recv_addr)
    s_recv.listen(1000)

    try:
        ss, addr = s_recv.accept()
        print 'got connected from', addr
        ss.send(unhexlify(cmd))
        time.sleep(1)
        try:
            data = ss.recv(512)
            print hexlify(data)

            # @TODO: store data
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
        pass
    except Exception as e:
        print e
        print traceback.format_exc()

    s_recv.close()
    pass


"""
aa3300fb000000a00f00000f17d60c0000790d00008fa61a00008d1500eda32800008d150000000000000000000000000000000000c64a086d03
got connected from ('192.168.1.51', 34387)
aa3300fc000000a00f00000f18d60c00007a0d00008fa61a00008d1500eda32800008d150000000000000000000000000000000000c34a08ec03
got connected from ('192.168.1.51', 34771)
aa3300fd000000a00f00000f17d60c00007b0d00008fa61a00008d1500eda32800008d150000000000000000000000000000000000c34b081a04
got connected from ('192.168.1.51', 35155)
aa3300fe000000a00f00000f18d60c00007c0d00008fa61a00008d1500eda32800008d150000000000000000000000000000000000c95408a204
"""
def getPatrolData():
    s = socket.socket()
    s.bind(('0.0.0.0', 8888))
    s.listen(1000)

    try:
        while 1:
            try:
                cs, address = s.accept()
                print 'got connected from', address
                # cs.send('hello I am server,welcome')
                data = cs.recv(512)
                print hexlify(data)

                # Store data
                cs.close()
                pass
            except Exception as e:
                print e
                print traceback.format_exc()
                pass
            pass
    except Exception as e:
        print e
        print traceback.format_exc()

    s.close()
    pass


def getTemperature():

    addr = ('0.0.0.0', 8888)
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # s = socket.socket()
    s.bind(addr)
    s.listen(3)

    # ss, addr = s.accept()
    # print 'got connected from', addr
    cmd = '01040000000271CB'
    print cmd

    while True:
        try:
            s.send(unhexlify(cmd))
            time.sleep(1)
            data = s.recv(512)
            print data
            data = s.recv(4096)
            pass
        except Exception as e:
            print e
            print traceback.format_exc()
            pass
        pass
    s.close()


    """
    # s.connect(addr)
    time.sleep(1)
    s.send('0x01040000000271cb')
    time.sleep(1)
    data = s.recv(512)
    print data
    s.close()
    """
    pass


if __name__ == "__main__":
    print 'start'
    # getTemperature1()
    # getTemperature()
    getPatrolData()
    print 'end'

"""
需要沟通的问题：
    1. 返回结果如何计算温度和湿度值？
    2. mac地址为什么为4*8=32位？
"""