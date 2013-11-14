#!/usr/bin/env python
# -*- coding:utf-8 -*-

__author__ = 'xiaoghu@cisco.com'

from schedules.calc_patrol_line import *


class tCalcPatrolLine(object):
    @staticmethod
    def test_choose_nearest_line():
        s_p = (700, 130)
        e_p = (350, 620)
        p = PatrolLineCalc(start_point=s_p, end_point=e_p)
        l = p.choose_nearest_line((700, 130))
        print l
        print p.point_dict[p.line_dict[l][0]]
        print p.point_dict[p.line_dict[l][1]]
        pass

    @staticmethod
    def test_choose_shortest_path():
        s_p = (700, 130)
        e_p = (350, 620)
        p = PatrolLineCalc(start_point=s_p, end_point=e_p)
        path = p.choose_shortest_path()

        print path
        pass


if __name__ == '__main__':
    print 'start'
    # tCalcPatrolLine.test_choose_nearest_line()
    tCalcPatrolLine.test_choose_shortest_path()
    print 'end'