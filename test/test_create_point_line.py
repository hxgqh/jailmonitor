#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

import json
import traceback


def create_points_lines_file():
    """
    This create grid points and lines
    """
    n = 6

    points = dict()
    lines = dict()
    for i in range(n):
        for j in range(n):
            points[i*n+j] = {'x': 150*i, 'y': 150*j}
            pass
        pass

    count = 0
    for i in range(n-1):
        for j in range(n-1):
            lines[count] = (i*n+j, i*n+j+1)
            lines[count+1] = (i*n+j, (i+1)*n+j)
            count += 2
            pass
        pass

    for i in range(n-1):
        lines[count] = (n*(n-1)+i, n*(n-1)+i+1)
        lines[count+1] = (n*(i+1)-1, n*(i+2)-1)
        count += 2
        pass

    # print json.dumps(points, indent=4)
    # print json.dumps(lines, indent=4)

    try:
        fp = open('../data/points_lines.txt', 'w+')
        fp.write('[point]\n')
        for p in points:
            fp.write(str(p)+'\t\t'+str(points[p]['x'])+'\t\t'+str(points[p]['y'])+'\n')
            pass

        fp.write('[line]\n')
        for l in lines:
            fp.write(str(l)+'\t\t'+str(lines[l][0])+'\t\t'+str(lines[l][1])+'\n')
            pass
        fp.close()
        pass
    except Exception as e:
        print e
        print traceback.format_exc()
    pass


if __name__ == '__main__':
    print 'start'
    create_points_lines_file()
    print 'end'
    pass