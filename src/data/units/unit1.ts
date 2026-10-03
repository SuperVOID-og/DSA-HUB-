import type { Unit } from '../types';

export const unit1: Unit = {
  id: 'unit-1',
  number: 1,
  title: 'Introduction to Data Structures',
  description: 'Basic Terminology, Classification, ADTs, and Storage Representations.',
  sourcePdf: '/pdfs/unit1.pdf',
  topics: [
    {
      id: 'u1-t1',
      title: 'Basic Terminology & Importance',
      sections: [
        { id: 's1', type: 'h2', content: 'What is Data Structure?' },
        { id: 's2', type: 'text', content: 'The term data means a value or set of values. It specifies either the value of a variable or a constant (e.g., marks of students, name of an employee, address of a customer, value of pi, etc.).' },
        { id: 's3', type: 'definition', term: 'Data Structure', definition: 'A storage that is used to store and organize data. It is a way of arranging data on a computer so that it can be accessed and updated efficiently.' },
        { id: 's4', type: 'text', content: 'A data structure is not only used for organizing the data. It is also used for processing, retrieving, and storing data. There are different basic and advanced types of data structures that are used in almost every program or software system that has been developed.' },
        { id: 's5', type: 'h3', content: 'Importance of Data Structure' },
        { id: 's6', type: 'list', items: [
          'It helps in improving data storing and organizing.',
          'It aids in faster retrieval and manipulation of data.',
          'It facilitates the designing of algorithms for solving complex problems.',
          'It helps in data updating and maintaining tasks much more straightforward.',
          'It is the best solution for understanding the relationship between data and the other elements.'
        ]}
      ]
    },
    {
      id: 'u1-t2',
      title: 'Classification of Data Structures',
      sections: [
        { id: 's1', type: 'text', content: 'Data structures are generally categorized into two classes: primitive and non-primitive data structures.' },
        { id: 's2', type: 'h3', content: 'Primitive Data Structures' },
        { id: 's3', type: 'text', content: 'Primitive data structures are the fundamental data types which are supported by a programming language.' },
        { id: 's4', type: 'list', items: [
          'Integer: Used to represent whole numbers (positive or negative).',
          'Float: Used to represent numbers with decimals or floating-point numbers.',
          'Character: Represents individual characters, usually stored as a single byte.',
          'Boolean: Represents a value of either true or false.',
          'String: Represents a sequence of characters.'
        ]},
        { id: 's5', type: 'h3', content: 'Non-Primitive Data Structures' },
        { id: 's6', type: 'text', content: 'Non-primitive data structures are those data structures which are created using primitive data structures. They can hold collections of data.' },
        { id: 's7', type: 'text', content: 'Examples include linked lists, stacks, trees, and graphs. Non-primitive data structures can further be classified into two categories: linear and non-linear data structures.' },
        { id: 's8', type: 'h3', content: 'Primitive vs Non-Primitive' },
        { id: 's9', type: 'table', headers: ['Primitive Data Structures', 'Non-Primitive Data Structures'], rows: [
          ['Most basic data types in programming languages.', 'Complex and used for one or more primitive data types.'],
          ['Used to represent simple values such as integers, booleans, and characters.', 'Used to represent more complex data objects such as arrays, queues, trees, and stacks.'],
          ['Have a fixed size and range of values.', 'Can be resized or modified during runtime.'],
          ['Predefined in the programming language.', 'Usually defined or created by the programmer based on needs.'],
          ['Generally immutable (value cannot be changed).', 'Mutable (contents can be modified).'],
          ['Usually stored in the stack memory.', 'Typically stored in heap memory.']
        ]}
      ]
    },
    {
      id: 'u1-t3',
      title: 'Linear vs Non-Linear Structures',
      sections: [
        { id: 's1', type: 'h2', content: 'Linear Data Structure' },
        { id: 's2', type: 'text', content: 'A data structure that maintains a linear relationship among its elements is called a linear data structure. Here, the data is arranged in a linear fashion. But in the memory, the arrangement may not be sequential. Each element is attached to its previous and next adjacent elements. Examples: Arrays, linked lists, stacks, queues.' },
        { id: 's3', type: 'h3', content: 'Examples of Linear Structures' },
        { id: 's4', type: 'list', items: [
          'Array: Collection of similar type of data items stored at contiguous memory locations. It is a static data structure with a fixed size.',
          'Linked list: Elements are not stored at a contiguous location; elements are linked using pointers.',
          'Stack: Insertion and deletion operations are performed at one end only (LIFO).',
          'Queue: Insertion at one end (REAR) and deletion at another end (FRONT). (FIFO).'
        ]},
        { id: 's5', type: 'h2', content: 'Non-Linear Data Structure' },
        { id: 's6', type: 'text', content: 'Nonlinear data structures are those where data items are not arranged in a sequence. There is a hierarchical relationship between individual data items. Insertion and deletion of data is not possible in a linear fashion.' },
        { id: 's7', type: 'list', items: [
          'Tree: A finite set of data items (nodes) arranged in branches and sub-branches.',
          'Graph: A collection of nodes (Information) and connecting edges (Logical relation) that represent relationships between them.'
        ]},
        { id: 's8', type: 'table', headers: ['Linear Data Structures', 'Non-Linear Data Structures'], rows: [
          ['Data elements are arranged in a sequential, linear order.', 'Data elements are arranged hierarchically or in a network.'],
          ['Example: Arrays, Linked Lists, Stacks, Queues', 'Example: Trees, Graphs'],
          ['Data is accessed sequentially. Random access is possible in arrays.', 'Data is accessed based on relationships or levels.'],
          ['Traversal is linear; start at one end and follow through to the other end.', 'Traversal can be complex, such as depth-first or breadth-first.'],
          ['Suitable for simple data storage and retrieval.', 'Suitable for representing complex relationships and hierarchical structures.']
        ]}
      ]
    },
    {
      id: 'u1-t4',
      title: 'Abstract Data Type (ADT) & Operations',
      sections: [
        { id: 's1', type: 'h2', content: 'Abstract Data Type' },
        { id: 's2', type: 'definition', term: 'Abstract Data Type (ADT)', definition: 'A concept or model of a data type. It specifies the type of data stored and the operations that can be performed, but it does not specify how data will be organized in memory and what algorithms will be used for implementing the operations.' },
        { id: 's3', type: 'text', content: 'It is called "abstract" because it gives an implementation-independent view.' },
        { id: 's4', type: 'h3', content: 'Features of ADT' },
        { id: 's5', type: 'list', items: [
          'Abstraction: The user does not need to know the implementation.',
          'Encapsulation: ADTs hide internal details and provide a public interface.',
          'Information Hiding: Protects integrity by allowing access only via authorized operations.',
          'Modularity: ADTs can be combined to form larger data structures.'
        ]},
        { id: 's6', type: 'h2', content: 'Operations on Data Structures' },
        { id: 's7', type: 'list', items: [
          'Traversing: Access each data item exactly once so that it can be processed.',
          'Searching: Find out the location of the data item if it exists.',
          'Inserting: Add a new data item.',
          'Deleting: Delete an existing data item.',
          'Sorting: Arrange the data items in some order (ascending/descending).',
          'Merging: Combine data items of two sorted files into a single sorted file.'
        ]}
      ]
    },
    {
      id: 'u1-t5',
      title: 'Storage Representation',
      sections: [
        { id: 's1', type: 'h2', content: 'Storage representation of Primitive Data Structures' },
        { id: 's2', type: 'text', content: 'Primitive data structures are typically stored in memory as binary representations of their values, with each data type having a specific format and size determined by the programming language and hardware architecture.' },
        { id: 's3', type: 'list', items: [
          'Integer: Stored using a fixed number of bits (e.g., 32 bits). Negative integers use two\'s complement representation.',
          'Floating-Point: Stored using a binary representation based on the IEEE 754 standard (sign bit, exponent, mantissa).',
          'Character: Stored using the corresponding ASCII value in a 1-byte (8-bit) memory block.',
          'Boolean: Typically stored using a single bit (0 for false, 1 for true).'
        ]},
        { id: 's4', type: 'callout', variant: 'tip', title: '2\'s Complement', content: 'Computer uses a special mechanism to store negative numbers which is the 2\'s complement format. To get it, find the 1\'s complement (invert bits) and add 1.' },
        { id: 's5', type: 'h2', content: 'Storage representation of Non-Primitive Data Structures' },
        { id: 's6', type: 'list', items: [
          'Arrays: Store elements of the same data type in contiguous memory locations. Indexing is done using base address + offset.',
          'Linked Lists: Consist of nodes stored in non-contiguous memory locations. Each node has a data field and a pointer field to the next node.',
          'Trees and Graphs: Stored in non-contiguous dynamic memory. Implemented using nodes with multiple pointers (left, right, neighbours).',
          'Stacks and Queues: Their storage representation depends on the underlying implementation (using arrays or linked lists).'
        ]},
        { id: 's7', type: 'callout', variant: 'info', title: 'Dynamic Allocation', content: 'Non-primitive data structures are usually allocated in heap memory dynamically, allowing them to expand or shrink as needed at runtime.' }
      ]
    }
  ]
};
