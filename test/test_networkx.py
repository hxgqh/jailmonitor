__author__ = 'xiaoghu'
import sys
import time
import multiprocessing

sys.path.append('/Library/Python/2.7/site-packages/')

import networkx as nx
from random import randint
import matplotlib.pyplot as plt
"""
This script is for testing NetworkX functions
"""


class tNetworkX():
    @staticmethod
    def test_basic():
        G = nx.Graph()

        G.add_nodes_from([1,2,3,4,5])
        G.add_edges_from([(1,2),(1,3),(1,4),(1,5)])

        pass

    @staticmethod
    def test_graphviz():
        G=nx.complete_graph(5)   # start with K5 in networkx
        A=nx.to_agraph(G)        # convert to a graphviz graph
        X1=nx.from_agraph(A)     # convert back to networkx (but as Graph)
        X2=nx.Graph(A)          # fancy way to do conversion
        G1=nx.Graph(X1)          # now make it a Graph

        A.write('k5.dot')     # write to dot file
        X3=nx.read_dot('k5.dot') # read from dotfile
        pass

    @staticmethod
    def createGridTopo(edgeLen=10):
        """
        A topology like this:
            *---*---*---*...
            |   |   |   |
            |   |   |   |
            *---*---*---*...
            |   |   |   |
            |   |   |   |
            *---*---*---*...
            .
            .
            .
        @return: networkx Graph()
        """
#        startNode = '0000.0001.0001'
        G = nx.Graph()

        nodes = [['' for col in range(edgeLen)] for row in range(edgeLen)]

        for i in range(edgeLen):
            for j in range(edgeLen):
                nodes[i][j] = 'point.'+str(i)+'.'+str(j)
                pass
            pass

        for i in range(edgeLen):
            for j in range(edgeLen):
                if i < edgeLen-1 and j < edgeLen-1:
                    G.add_edge(nodes[i][j], nodes[i+1][j], weight=100)
                    G.add_edge(nodes[i][j], nodes[i][j+1], weight=100)
                    pass
                elif i == edgeLen-1 and j < edgeLen-1:
                    G.add_edge(nodes[i][j], nodes[i][j+1], weight=100)
                    pass
                elif i < edgeLen-1 and j == edgeLen-1:
                    G.add_edge(nodes[i][j], nodes[i+1][j], weight=100)
                    pass
                else:
                    pass
                pass
            pass

        return G
        pass

    @staticmethod
    def createCircularTree(leafNum,depth):
        G=nx.balanced_tree(leafNum,depth)
        return G
        pass

    @staticmethod
    def test_createGridTopo():
        n = 10
        G = tNetworkX.createGridTopo(edgeLen=n)
        A=nx.to_agraph(G)        # convert to a graphviz graph
        A.write('grid'+str(n)+'.dot')     # write to dot file
        pass

    @staticmethod
    def test_createCircularTree():
        leafNum = 2
        depth = 6
        G = tNetworkX.createCircularTree(leafNum,depth)
        A=nx.to_agraph(G)        # convert to a graphviz graph
        A.write('circularTree_'+str(leafNum)+'_'+str(depth)+'.dot')     # write to dot file
        pos=nx.graphviz_layout(G,prog='twopi',args='')
        plt.figure(figsize=(8,8))
        nx.draw(G,pos,node_size=20,alpha=0.5,node_color="blue", with_labels=False)
        plt.axis('equal')
        plt.savefig('circular_tree_%d-%d.png'%(leafNum,depth))
        plt.show()
        pass

    @staticmethod
    def test_SPF():
        edgeLen = 50
        G = tNetworkX.createGridTopo(edgeLen=edgeLen)
#        print "G: "+str(G.edges(data=True))

        s = time.clock()
        s1 = time.time()
        path = nx.single_source_dijkstra_path(G,'0000.0000.0000')
        e = time.clock()
        e1 = time.time()
        print "time.clock() consume time: "+str(e-s)
        print "time.time() consume time: "+str(e1-s1)
        pass

    @staticmethod
    def spfWorker(G,nodeList):
        for node in nodeList:
            nx.single_source_dijkstra_path(G,node)
            pass
        pass

    @staticmethod
    def test_allNodes_SPF():
        edgeLen = 50
        G = tNetworkX.createGridTopo(edgeLen=edgeLen)

        s = time.clock()
        s1 = time.time()
        p = []
        allNodes = G.nodes()
        m = 1
        for i in range(m*len(allNodes)/edgeLen):
            nodeList = allNodes[edgeLen*i/m:edgeLen*(i+1)/m]
            process = multiprocessing.Process(target=tNetworkX.spfWorker,args=(G,nodeList,))
            process.start()
            p.append(process)
            pass

        for process in p:
            process.join()
#            print "process %s finished"%(str(process.pid))
            pass

#        path = nx.single_source_dijkstra_path(G,'0000.0000.0000')
        e = time.clock()
        e1 = time.time()
        print "time.clock() consume time: "+str(e-s)
        print "time.time() consume time: "+str(e1-s1)
        pass


if __name__=='__main__':
    print "start test"
#    tNetworkX.test_basic()
#    tNetworkX.test_graphviz()
    tNetworkX.test_createGridTopo()
#     tNetworkX.test_createCircularTree()
#     tNetworkX.test_SPF()
#    tNetworkX.test_allNodes_SPF()
    print "finish test"