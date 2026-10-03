import type { Unit } from '../types';

export const unit4: Unit = {
  id: 'unit-4',
  number: 4,
  title: 'Hashing and File Structures',
  description: 'Symbol tables, Hashing functions, Collisions, and File Organization.',
  sourcePdf: '/pdfs/master.pdf',
  topics: [
    {
      id: 'u4-t1',
      title: 'Hashing & Symbol Tables',
      sections: [
        { id: 's1', type: 'h2', content: 'What is Hashing?' },
        { id: 's2', type: 'text', content: 'Hashing is a technique or process of mapping keys, values into the hash table by using a hash function. It is done for faster access to elements. The efficiency of mapping depends on the efficiency of the hash function used.' },
        { id: 's3', type: 'h3', content: 'The Symbol Table' },
        { id: 's4', type: 'text', content: 'A symbol table is a major data structure used in a compiler. It associates a name with information. For efficient implementation, Hash tables are often used.' },
        { id: 's5', type: 'h2', content: 'Hashing Functions' },
        { id: 's6', type: 'list', items: [
          'Division Method: The most simple method, hash(k) = k % M, where M is the size of the table.',
          'Mid Square Method: The key is squared and the middle part is taken as the hash value.',
          'Folding Method: The key is divided into parts and the parts are added together.'
        ]}
      ]
    },
    {
      id: 'u4-t2',
      title: 'Collision Resolution Techniques',
      sections: [
        { id: 's1', type: 'h2', content: 'What is a Collision?' },
        { id: 's2', type: 'text', content: 'Since a hash function maps a large set of keys to a smaller table, two keys may map to the same index. This is called a collision.' },
        { id: 's3', type: 'h3', content: 'Resolution Techniques' },
        { id: 's4', type: 'list', items: [
          'Separate Chaining: Each cell of the hash table points to a linked list of records that have the same hash function value.',
          'Linear Probing (Open Addressing): If a collision occurs, we linearly probe for the next empty slot in the table.',
          'Quadratic Probing: If a collision occurs, we probe for the next empty slot using a quadratic function (i.e. 1^2, 2^2, 3^2...).',
          'Double Hashing: A secondary hash function is applied in the event of a collision to determine the probing sequence.'
        ]}
      ]
    },
    {
      id: 'u4-t3',
      title: 'File Structures & Records',
      sections: [
        { id: 's1', type: 'h2', content: 'File Structures' },
        { id: 's2', type: 'text', content: 'A file is a collection of records. A record is a collection of related fields that can be treated as a unit by some application program.' },
        { id: 's3', type: 'h3', content: 'Fixed and Variable Length Records' },
        { id: 's4', type: 'list', items: [
          'Fixed Length Record: Every record in the file has the exact same size. Easy to compute the offset of the nth record.',
          'Variable Length Record: Records in the file have varying sizes. Useful when fields (like strings) have unpredictable lengths.'
        ]}
      ]
    },
    {
      id: 'u4-t4',
      title: 'File Organizations',
      sections: [
        { id: 's1', type: 'h2', content: 'File Organization Methods' },
        { id: 's2', type: 'text', content: 'File organization refers to the way records are stored in a file. There are several common methods.' },
        { id: 's3', type: 'list', items: [
          'Sequential File Organization: Records are stored one after the other in the order they were inserted. Good for batch processing.',
          'Indexed Sequential Access Method (ISAM): Records are stored sequentially, but an index is created to allow for fast random access.',
          'Direct/Random Access (Relative File Organization): Uses a hashing function to map the record key to the physical address in the file, allowing direct access in O(1) time.'
        ]}
      ]
    }
  ]
};
