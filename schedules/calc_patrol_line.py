#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

import re
import json
import math
from jailMonitor.settings import *
import traceback
import networkx as nx


def calc_len_2(p1, p2):
    return (p2[0]-p1[0])*(p2[0]-p1[0])+(p2[1]-p1[1])*(p2[1]-p1[1])
    pass


class PatrolLineCalc(object):
    def __init__(self, start_point=(0, 0), end_point=(0, 0)):
        """
        @param start_point: 开始点坐标, (x, y)
        @param end_point: 中止点坐标, (x, y)
        """
        self.start_point = start_point
        self.end_point = end_point
        self.point_dict = {}
        self.line_dict = {}

        self.parse_point_line_file()
        self.G = self.create_networkx_graph()
        pass

    def create_networkx_graph(self):
        G = nx.Graph()

        for l, v in self.line_dict.items():
            line_len = int(math.sqrt(calc_len_2(self.point_dict[v[0]], self.point_dict[v[1]])))
            G.add_edge(v[0], v[1], weight=line_len)
            pass

        return G
        pass

    def calc_2_lines_point_shortest_path(self, start_line, end_line):
        p11, p12 = self.line_dict[start_line]
        p21, p22 = self.line_dict[end_line]

        d1 = nx.shortest_path_length(self.G, source=p11, target=p21)
        d2 = nx.shortest_path_length(self.G, source=p11, target=p22)
        d3 = nx.shortest_path_length(self.G, source=p12, target=p21)
        d4 = nx.shortest_path_length(self.G, source=p12, target=p22)

        min_d = min([d1, d2, d3, d4])
        if d1 == min_d:
            return p11, p21
            pass

        if d2 == min_d:
            return p11, p22
            pass

        if d3 == min_d:
            return p12, p21
            pass

        if d4 == min_d:
            return p12, p22
            pass
        pass

    def choose_shortest_path(self):
        start_line = self.choose_nearest_line(self.start_point)
        end_line = self.choose_nearest_line(self.end_point)

        s_p, e_p = self.calc_2_lines_point_shortest_path(start_line, end_line)
        path = nx.shortest_path(self.G, source=s_p, target=e_p)

        # print str(path)

        return str(path)
        pass

    def parse_point_line_file(self):
        """
        File content is like this:
            [point]
            No  x   y

            [line]
            No  p1  p2
        """
        pl_re = re.compile(r'(\d+)\s*(\d+)\s*(\d+)')

        lines = None

        try:
            fp = open(os.path.join(base_dir, '../data/')+'points_lines.txt', 'r')
            lines = fp.readlines()
            fp.close()
            pass
        except Exception as e:
            print e
            print traceback.format_exc()

        if not lines:
            return -1

        line_flag = False
        point_flag = False
        for line in lines:
            if 'point' in line:
                point_flag = True
                line_flag = False
                continue
                pass

            if 'line' in line:
                line_flag = True
                point_flag = False
                continue
                pass

            data = pl_re.findall(line)

            if not data:
                return -1

            if line_flag:
                self.line_dict[int(data[0][0])] = (int(data[0][1]), int(data[0][2]))
                pass

            if point_flag:
                self.point_dict[int(data[0][0])] = (int(data[0][1]), int(data[0][2]))
                pass
            pass
        pass

    def calc_abc(self, s_p, e_p):
        """
        @param s_p: start point
        @param e_p: end_point
        @return: a,b,c
        """
        a = e_p[1] - s_p[1]
        b = e_p[0] - s_p[0]
        c = s_p[0]*e_p[1] - e_p[0]*s_p[1]
        return a,b,c
        pass

    def calc_distance(self, a, b, c, p):
        """
        aX+bY+c
        @param p: 点坐标
        """
        x, y = p
        return math.fabs(a*x+b*y+c)/math.sqrt(a*a+b*b)
        pass

    def choose_nearest_line(self, point):
        """
        aX+bY+c=0
        D = |aX0+bY0+c|/sqrt(a^2+b^2)
        @param point: 点坐标, (x, y)
        """

        D = float('Inf')
        nearest_line = -1
        for l in self.line_dict:
            s_p = self.point_dict[self.line_dict[l][0]]
            x1, y1 = s_p
            e_p = self.point_dict[self.line_dict[l][1]]
            x2, y2 = e_p
            a, b, c = self.calc_abc(s_p, e_p)
            x, y = point

            if not (calc_len_2(s_p, e_p) > calc_len_2(s_p, point) and calc_len_2(s_p, e_p) > calc_len_2(e_p, point)):
                continue

            tmp_D = self.calc_distance(a, b, c, point)   # 垂线距离
            if tmp_D < D:
                D = tmp_D
                nearest_line = l
            pass

        return nearest_line
        pass


if __name__ == '__main__':
    print 'start'
    calc = PatrolLineCalc()
    calc.parse_point_line_file()

    print json.dumps(calc.point_dict, indent=4)
    print json.dumps(calc.line_dict, indent=4)

    print 'end'
