import type { Unit } from '../types';

export const unit2: Unit = {
  id: 'unit-2',
  number: 2,
  title: 'Linear Data Structure',
  description: 'Arrays, Stacks, Queues, and Linked Lists.',
  sourcePdf: '/pdfs/unit2.pdf',
  topics: [
    {
      id: 'u2-t1',
      title: 'Array & Sparse Matrix',
      sections: [
        { id: 's1', type: 'h2', content: 'What is an Array?' },
        { id: 's2', type: 'text', content: 'An array is a data structure that contains a group of elements. Typically these elements are all of the same data type, such as an integer or string. Arrays are commonly used in computer programs to organize data so that a related set of values can be easily sorted or searched.' },
        { id: 's3', type: 'h3', content: 'Types of Array' },
        { id: 's4', type: 'list', items: [
          'One Dimensional: An array which store its elements into a single row.',
          'Two Dimensional: An array of arrays, also known as a matrix.',
          'Multi Dimensional: Higher dimensional arrays.'
        ]},
        { id: 's5', type: 'h2', content: 'Array Representation' },
        { id: 's6', type: 'text', content: 'The elements of a Two dimensional array can be arranged in two ways: Row major Representation and Column major Representation.' },
        { id: 's7', type: 'definition', term: 'Row Major', definition: 'Elements are stored in row-wise manner.' },
        { id: 's8', type: 'definition', term: 'Column Major', definition: 'Elements are stored in column-wise manner.' },
        { id: 's9', type: 'h2', content: 'Sparse Matrix' },
        { id: 's10', type: 'text', content: 'Sparse matrix is a matrix which contains very few non-zero elements. A matrix that is not sparse is called dense matrix.' },
        { id: 's11', type: 'list', items: [
          'Representation of sparse matrix will be a triplet (row, column, value).',
          'Only non-zero elements are stored to save memory space.',
          'It is efficient for storing matrices where most elements are zero.'
        ]}
      ]
    },
    {
      id: 'u2-t2',
      title: 'Stack & Polish Expressions',
      sections: [
        { id: 's1', type: 'h2', content: 'Stack Definition and Concept' },
        { id: 's2', type: 'text', content: 'A linear list which allow insertion and deletion of an element at one end only is called Stack. It follows Last In First Out (LIFO) Order.' },
        { id: 's3', type: 'h3', content: 'Operations on Stack' },
        { id: 's4', type: 'list', items: [
          'Push (Insert): Insert an element at TOP of the stack.',
          'Pop (Delete): Remove the most recently added elements from the TOP of the stack.',
          'Peep (Search): To find ith element from TOP of the stack.',
          'Change (Update): Changes the value of the ith element from the TOP.'
        ]},
        { id: 's5', type: 'h2', content: 'Polish Expressions' },
        { id: 's6', type: 'text', content: 'An arithmetic expression can be written in three different but equivalent notations:' },
        { id: 's7', type: 'list', items: [
          'Infix Notation: Operator is used in-between operands (e.g. a + b).',
          'Prefix (Polish) Notation: Operator is prefixed to operands (e.g. +ab).',
          'Postfix (Reverse-Polish) Notation: Operator is post fixed to operands (e.g. ab+).'
        ]},
        { id: 's8', type: 'callout', variant: 'info', title: 'Expression Conversion', content: 'Stacks are extensively used to evaluate postfix expressions and to convert infix expressions to postfix/prefix.' }
      ]
    },
    {
      id: 'u2-t3',
      title: 'Recursion & Tower of Hanoi',
      sections: [
        { id: 's1', type: 'h2', content: 'What is Recursion?' },
        { id: 's2', type: 'text', content: 'The process in which a function calls itself directly or indirectly is called recursion and the corresponding function is called a recursive function.' },
        { id: 's3', type: 'list', items: [
          'Base Case Definition: Identify the simplest instance of the problem that can be solved directly without further recursive calls.',
          'Recursive Case Definition: Express the larger problem in terms of one or more smaller, similar subproblems.',
          'Work Towards the Base Case: Each recursive call must bring the problem closer to the base case.'
        ]},
        { id: 's4', type: 'h2', content: 'Tower of Hanoi' },
        { id: 's5', type: 'text', content: 'The Tower of Hanoi is a mathematical game or Puzzle. It consists of three rods and a number of disks of different sizes.' },
        { id: 's6', type: 'list', items: [
          'Only one disk can be moved at a time.',
          'Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.',
          'No larger disk may be placed on top of a smaller disk.'
        ]},
        { id: 's7', type: 'code', language: 'c', code: 'void toH(int n, char src, char dest, char intermediate) {\n  if (n == 1) {\n    printf("Move disk 1 from %c to %c", src, dest);\n    return;\n  }\n  toH(n-1, src, intermediate, dest);\n  printf("Move disk %d from %c to %c", n, src, dest);\n  toH(n-1, intermediate, dest, src);\n}' }
      ]
    },
    {
      id: 'u2-t4',
      title: 'Queue & Types',
      sections: [
        { id: 's1', type: 'h2', content: 'Queue Definition and Concept' },
        { id: 's2', type: 'text', content: 'A linear list which permits deletion to be performed at one end of the list and insertion at the other end is called queue. It follows First In First Out (FIFO) manner.' },
        { id: 's3', type: 'list', items: [
          'Front: The end of queue from that deletion is to be performed.',
          'Rear: The end of queue at which new element is to be inserted.',
          'Enqueue: Insertion operation.',
          'Dequeue: Deletion operation.'
        ]},
        { id: 's4', type: 'h2', content: 'Types of Queue' },
        { id: 's5', type: 'list', items: [
          'Simple Queue: Basic FIFO queue.',
          'Circular Queue: The last node is connected back to the first node to make a circle, preventing excessive memory waste.',
          'Priority Queue: Each element is assigned a priority. Elements with higher priority are processed before those with lower priority.',
          'Double Ended Queue (Deque): Insertion and deletion are performed from the either end of the Queue.'
        ]},
        { id: 's6', type: 'table', headers: ['Stack Data Structure', 'Queue Data Structure'], rows: [
          ['Linear data structure where elements are inserted/removed at the same end.', 'Linear data structure where elements are removed and inserted from different ends.'],
          ['LIFO (Last In First Out)', 'FIFO (First In First Out)'],
          ['One pointer: TOP', 'Two pointers: FRONT and REAR']
        ]}
      ]
    }
  ]
};
