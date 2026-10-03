import type { Unit } from '../types';

export const unit3: Unit = {
  id: 'unit-3',
  number: 3,
  title: 'Non Linear Data Structure',
  description: 'Trees, Binary Search Trees, Graphs, and Traversal Algorithms.',
  sourcePdf: '/pdfs/master.pdf',
  topics: [
    {
      id: 'u3-t1',
      title: 'Trees & Concepts',
      sections: [
        { id: 's1', type: 'h2', content: 'What is a Tree?' },
        { id: 's2', type: 'text', content: 'A tree is a non-linear data structure that simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node, represented as a set of linked nodes.' },
        { id: 's3', type: 'h3', content: 'Terminology' },
        { id: 's4', type: 'list', items: [
          'Root: The topmost node of the tree.',
          'Edge: The link between two nodes.',
          'Leaf: A node with no children.',
          'Height: The length of the longest path to a leaf.',
          'Depth: The length of the path to its root.'
        ]},
        { id: 's5', type: 'h2', content: 'Binary Tree' },
        { id: 's6', type: 'text', content: 'A binary tree is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child.' },
        { id: 's7', type: 'h3', content: 'Tree Traversal (Inorder, Postorder, Preorder)' },
        { id: 's8', type: 'list', items: [
          'Inorder (Left, Root, Right): Traverses the left subtree, visits the root, and then traverses the right subtree.',
          'Preorder (Root, Left, Right): Visits the root, traverses the left subtree, and then traverses the right subtree.',
          'Postorder (Left, Right, Root): Traverses the left subtree, traverses the right subtree, and then visits the root.'
        ]}
      ]
    },
    {
      id: 'u3-t2',
      title: 'Binary Search Trees (BST)',
      sections: [
        { id: 's1', type: 'h2', content: 'Binary Search Tree' },
        { id: 's2', type: 'text', content: 'A Binary Search Tree (BST) is a tree in which all the nodes follow the below-mentioned properties: The left sub-tree of a node has a key less than or equal to its parent node\'s key. The right sub-tree of a node has a key greater than to its parent node\'s key.' },
        { id: 's3', type: 'callout', variant: 'tip', title: 'Advantage of BST', content: 'It provides moderate access/search efficiency (O(log n) on average), and allows fast insertion and removal of data.' },
        { id: 's4', type: 'h2', content: 'Threaded Binary Tree' },
        { id: 's5', type: 'text', content: 'A threaded binary tree makes it possible to traverse the values in the binary tree via a linear traversal that is more rapid than a recursive in-order traversal. It is done by making use of the NULL pointers.' }
      ]
    },
    {
      id: 'u3-t3',
      title: 'Graphs & Representation',
      sections: [
        { id: 's1', type: 'h2', content: 'What is a Graph?' },
        { id: 's2', type: 'text', content: 'A Graph is a non-linear data structure consisting of nodes and edges. The nodes are sometimes also referred to as vertices and the edges are lines or arcs that connect any two nodes in the graph.' },
        { id: 's3', type: 'h3', content: 'Matrix Representation' },
        { id: 's4', type: 'list', items: [
          'Adjacency Matrix: A 2D array of size V x V where V is the number of vertices in a graph. Let the 2D array be adj[][], a slot adj[i][j] = 1 indicates that there is an edge from vertex i to vertex j.',
          'Adjacency List: An array of lists is used. The size of the array is equal to the number of vertices.'
        ]},
        { id: 's5', type: 'h2', content: 'Graph Traversal' },
        { id: 's6', type: 'list', items: [
          'Breadth First Search (BFS): It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. It uses a Queue.',
          'Depth First Search (DFS): It starts at the root node and explores as far as possible along each branch before backtracking. It uses a Stack.'
        ]}
      ]
    },
    {
      id: 'u3-t4',
      title: 'Spanning Trees & Shortest Path',
      sections: [
        { id: 's1', type: 'h2', content: 'Spanning Tree' },
        { id: 's2', type: 'text', content: 'A spanning tree is a subset of Graph G, which has all the vertices covered with minimum possible number of edges. Hence, a spanning tree does not have cycles and it cannot be disconnected.' },
        { id: 's3', type: 'h3', content: 'Minimal Spanning Tree' },
        { id: 's4', type: 'text', content: 'A Minimum Spanning Tree (MST) or minimum weight spanning tree is a spanning tree whose sum of edge weights is as small as possible.' },
        { id: 's5', type: 'h3', content: 'Shortest Path Algorithms' },
        { id: 's6', type: 'list', items: [
          'Dijkstra\'s Algorithm: Used to find the shortest path from a starting node to a target node in a weighted graph.',
          'Prim\'s Algorithm: A greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.'
        ]}
      ]
    }
  ]
};
