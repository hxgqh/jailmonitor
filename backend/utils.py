#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

import crc16
from binascii import *


def my_crc16(x):
    b = 0xA001
    a = 0xFFFF
    for byte in x:
        byte = int(hexlify(byte), 16)
        # print byte
        a ^= byte
        for i in range(8):
            last = a % 2
            a >>= 1
            if last == 1:
                a ^= b
    aa = '0'*(6-len(hex(a)))+hex(a)[2:]
    ll, hh = int(aa[:2], 16), int(aa[2:], 16)
    return [hh, ll]


if __name__ == '__main__':
    a = '010400000002'
    # a = '010300000002'

    print my_crc16(unhexlify(a))


