export type Question = {
  id: string;
  unitId: string;
  number: number;
  question: string;
  answer: string;
  marks?: string;
  completed?: boolean;
  bookmarked?: boolean;
};

export const questionBank: Question[] = [
  {
    "id": "q1",
    "unitId": "unit-1",
    "number": 1,
    "question": "Define Data Structure. Explain its importance, classification, and applications.",
    "answer": "Definition: A data structure is a specialized programmatic format for organizing, storing, processing, and retrieving data efficiently. It\nestablishes logical, mathematical, or physical relationships among individual data items.\nImportance: (1) Efficiency: Minimizes algorithmic time complexity and memory overhead; (2) Reusability: Promotes modular software\nlibraries; (3) Abstraction: Decouples user-facing interfaces from physical memory architectures.\nReal-World Applications: Operating system process scheduling (Queues), expression evaluation & memory call stacks (Stacks), database\nindexing (B-Trees & Hash Tables), map navigation & routing (Graphs), document object models (Trees).",
    "marks": "3, 4 & 7 Marks • CO1"
  },
  {
    "id": "q2",
    "unitId": "unit-1",
    "number": 2,
    "question": "Differentiate between Primitive and Non-Primitive Data Structures.",
    "answer": "Attribute           Primitive Data Structures                                               Non-Primitive Data Structures\n\n Definition          Basic, machine-level data types predefined in programming               Complex structures derived by grouping primitive or non-primitive\n                     languages.                                                              elements.\n\n Memory              Fixed compile-time size allocated directly on the Stack                 Dynamic, variable memory typically allocated in the Heap via\n Allocation          memory.                                                                 pointers.\n\n Operations          Direct machine-level operations (+, -, *, /, bitwise, relational).      Algorithmic operations: traversal, searching, sorting, insertion,\n                                                                                             deletion.\n\n Examples            int, float, char, boolean, pointer.                                     Arrays, Linked Lists, Stacks, Queues, Trees, Graphs.",
    "marks": "3, 4 & 7 Marks • CO1"
  },
  {
    "id": "q3",
    "unitId": "unit-1",
    "number": 3,
    "question": "Differentiate between Linear and Non-Linear Data Structures.",
    "answer": "• Linear Data Structures: Data elements are organized in a sequential, 1-to-1 chain. Every element has a unique predecessor and successor\n(except endpoints). Traversal processes elements in a single sequential pass. Examples: Arrays, Stacks, Queues, Linked Lists.\n• Non-Linear Data Structures: Elements are organized in hierarchical (1-to-many) or interconnected network (many-to-many) relationships.\nTraversal is non-sequential and multi-directional. Examples: Trees (hierarchical parent-child), Graphs (arbitrary network cycles).",
    "marks": "3 & 4 Marks • CO1"
  },
  {
    "id": "q4",
    "unitId": "unit-1",
    "number": 4,
    "question": "Differentiate between Data Types and Data Structures.",
    "answer": "• Data Type: An abstract language declaration that defines the domain of values a variable can hold and the allowable machine operations\n(e.g., int holds 4-byte signed integers). It carries no algorithmic time complexity.\n• Data Structure: A concrete software implementation that stores, organizes, and links multiple data items together through specified\naccess rules and algorithms (e.g., BST, Queue) with measurable time and space complexity.",
    "marks": "3 Marks • CO1"
  },
  {
    "id": "q5",
    "unitId": "unit-1",
    "number": 5,
    "question": "What is an Abstract Data Type (ADT)? Explain its Features and Examples.",
    "answer": "Definition: An ADT is a mathematical and logical specification of a data object along with the operations that can be performed on it,\ncompletely independent of any programming language or physical memory implementation.\nKey Features: (1) Data Abstraction: Hides internal structures; (2) Encapsulation: Bundles operations into a unified interface; (3)\nImplementation Independence: A Queue ADT behaves identically whether implemented via arrays or linked lists.",
    "marks": "3 & 4 Marks • CO1"
  },
  {
    "id": "q6",
    "unitId": "unit-1",
    "number": 6,
    "question": "Explain the Storage Representation of Primitive and Non-Primitive Data Structures.",
    "answer": "1. Primitive Storage: Integers are stored in fixed-width words (32-bit). Positive integers use pure binary with MSB = 0. Negative integers use\n2's complement (1's complement + 1; e.g., +10 = 0000...1010               →\n                                                                     1's comp = 1111...0101                     →\n                                                                                                    +1 = 1111...0110 for -10). Floats use\nIEEE 754 standard (1 sign bit, 8 exponent bits, 23 mantissa bits). Chars use 1-byte ASCII codes ('A'=65 = 01000001). Booleans use 1 bit\n(0/1), byte-aligned.\n2. Non-Primitive Storage: Arrays are stored in contiguous memory blocks computed via                     Base + Index × Size\n                                                                                                          . Dynamic structures (Linked\nLists, Trees, Graphs) are allocated in Heap memory as discrete nodes containing data fields and pointer addresses (4 or 8 bytes each).",
    "marks": "4 & 7 Marks • CO1"
  },
  {
    "id": "q7",
    "unitId": "unit-1",
    "number": 7,
    "question": "Describe Basic Common Operations Performed on Data Structures.",
    "answer": "(1) Traversing: Accessing every record exactly once; (2) Searching: Finding the address of a target key; (3) Inserting: Adding new records;\n(4) Deleting: Removing an existing record; (5) Sorting: Arranging items in ascending/descending order; (6) Merging: Combining two sorted\nfiles into a single ordered structure.\n\n\n\n\n\f UNIT 2: LINEAR DATA STRUCTURES — PART 1: ARRAYS & STACKS                                                           CO-2 • WEIGHTAGE: 30%",
    "marks": "3 Marks • CO1"
  },
  {
    "id": "q8",
    "unitId": "unit-2",
    "number": 8,
    "question": "Explain Row-Major and Column-Major 2D Array Address Calculation Formulas.",
    "answer": "In memory, 2D arrays are flattened into sequential linear addresses using two conventions:\n• Row-Major Order (RMO): Elements are placed row by row. Formula for array      A[L_r:U_r, L_c:U_c] where M = U_r - L_r + 1, N = U_c - L_c +\n1, base address B, and element size W:\n   Address(A[I][J]) = B + W \\times [N \\times (I - L_r) + (J - L_c)]\n• Column-Major Order (CMO): Elements are placed column by column. Formula:\n\n  Address(A[I][J]) = B + W \\times [(I - L_r) + M \\times (J - L_c)]",
    "marks": "4 & 7 Marks • CO2"
  },
  {
    "id": "q9",
    "unitId": "unit-2",
    "number": 9,
    "question": "Solved University Numerical Problems on 2D Array Address Calculation.",
    "answer": "• Problem 1: int a[3][4], Base = 1050,        W = 2 bytes. Find address of a[2][2] (L_r=0, L_c=0, M=3, N=4):\n- Row-Major: 1050 + 2 \\times [4 \\times (2-0) + (2-0)] = 1050 + 2 \\times 10 = \\mathbf{1070}.\n- Column-Major: 1050 + 2 \\times [(2-0) + 3 \\times (2-0)] = 1050 + 2 \\times 8 = \\mathbf{1066}.\n• Problem 2: 2D Array A[1:4, 5:8], Base = 2000, W = 2 bytes. Find address of A[3,7] (M = 4, N = 4, L_r = 1, L_c = 5):\n- Row-Major: 2000 + 2 \\times [4 \\times (3-1) + (7-5)] = 2000 + 2 \\times [8 + 2] = \\mathbf{2020}.\n- Column-Major: 2000 + 2 \\times [(3-1) + 4 \\times (7-5)] = 2000 + 2 \\times [2 + 8] = \\mathbf{2020}.\n• Problem 3: Array Z_1[2:9, 9:18], Base = 100, W = 4 bytes. Find address of Z_1[4,12] (M = 8, N = 10, L_r = 2, L_c = 9):\n- Row-Major: 100 + 4 \\times [10 \\times (4-2) + (12-9)] = 100 + 4 \\times [20 + 3] = 100 + 92 = \\mathbf{192}.\n- Column-Major: 100 + 4 \\times [(4-2) + 8 \\times (12-9)] = 100 + 4 \\times [2 + 24] = 100 + 104 = \\mathbf{204}.",
    "marks": "4 & 7 Marks • CO2"
  },
  {
    "id": "q10",
    "unitId": "unit-2",
    "number": 10,
    "question": "What is a Sparse Matrix? Explain 3-Tuple Representation and Memory Savings.",
    "answer": "Definition: A sparse matrix is a matrix where the vast majority of elements are zero. Storing it as a standard 2D array wastes memory and\nprocessing time. It is compactly stored using a 3-Tuple (Triplet) table of dimension   (k+1) \\times 3 where k is the number of non-zero\nelements.\n• Header Row (Row 0): [Total Rows, Total Columns, Total Non-Zero (k)].\n• Rows 1 to k: [Row Index, Column Index, Value].\nMemory Calculation: Standard =    m \\times n \\times s bytes. Triplet = (k+1) \\times 3 \\times s bytes. For a 6×7 matrix with 8 non-zero elements:\nStandard requires 84 bytes; Triplet requires (8+1) \\times 3 \\times 2 = 54 bytes (saves 30 bytes).\nTriplet for Diagonal Matrix \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix}: Header: [3, 3, 3]; Row 1: [0, 0, 1]; Row 2:\n[1, 1, 2]; Row 3: [2, 2, 3].",
    "marks": "3, 4 & 7 Marks • CO2"
  },
  {
    "id": "q11",
    "unitId": "unit-2",
    "number": 11,
    "question": "Define Stack. Give Complete Algorithms for PUSH, POP, PEEP, and CHANGE Operations.",
    "answer": "A stack is a linear data structure operating on the Last-In, First-Out (LIFO) principle. All operations occur at TOP.\n\n\n          Procedure PUSH(S, TOP, N, X): 1. [Overflow?] IF TOP >= N THEN Write('Stack Overflow'); Return 2. TOP = TOP\n  + 1 3. S[TOP] = X; Return Procedure POP(S, TOP): 1. [Underflow?] IF TOP == 0 THEN Write('Stack Underflow');\n  Return(0) 2. TOP = TOP - 1 3. Return(S[TOP + 1]) Procedure PEEP(S, TOP, I): 1. [Underflow?] IF (TOP - I + 1) <= 0\n  THEN Write('Stack Underflow on Peep'); Return(0) 2. Return(S[TOP - I + 1]) Procedure CHANGE(S, TOP, I, X): 1.\n  [Underflow?] IF (TOP - I + 1) <= 0 THEN Write('Stack Underflow on Change'); Return 2. S[TOP - I + 1] = X; Return\n\n                                                           N without collision: Stack 1 starts at index 0 and grows upwards (TOP1++),\nMultiple Stacks: Two stacks can share a single array of size\nwhile Stack 2 starts at   N-1 and grows downwards (TOP2--). Overflow occurs only when TOP1 + 1 == TOP2, maximizing memory utilization.\n\n\n\n\n\f UNIT 2: LINEAR DATA STRUCTURES — PART 2: EXPRESSIONS & RECURSION                                                         CO-2 • WEIGHTAGE: 30%",
    "marks": "4 & 7 Marks • CO2"
  },
  {
    "id": "q12",
    "unitId": "unit-2",
    "number": 12,
    "question": "Explain Operator Precedence & Associativity and Infix-to-Postfix Algorithm (REVPOL).",
    "answer": "Precedence Rules: Exponentiation ($^$ or $\\$$, right-associative, highest: f=6, g=5) > Multiplication/Division (*, /, left-associative: f=3, g=4)\n> Addition/Subtraction (+, -, left-associative, lowest: f=1, g=2). Parentheses: '(' has input precedence 9, stack precedence 0.\nAlgorithm REVPOL(INFIX): (1) Pad input with ')', push '(' to stack with Top=1. (2) Read tokens using NEXTCHAR. (3) Operands pass directly\nto output. (4) For operators, pop higher/equal precedence operators from stack to output, then push current operator. (5) ')' pops and\nappends operators until '(' is matched and discarded. Output expression is Reverse Polish Notation (RPN).",
    "marks": "4 & 7 Marks • CO2"
  },
  {
    "id": "q13",
    "unitId": "unit-2",
    "number": 13,
    "question": "Solved Infix to Postfix Conversion Traces.",
    "answer": "• Trace 1: A * (B + C) - D → Postfix = A B C + * D -\n• Trace 2: (A - B) / C * D^{\\wedge}(E / F)^{\\wedge}(G + H) → Postfix = A B - C / D E F / G H + ^ ^ *\n• Trace 3: ((A - (B + C)) \\times D) / (E + F) → Postfix = A B C + - D * E F + /\n• Trace 4: ((A - B) + D / ((E + F) * G)) → Postfix = A B - D E F + G * / +\n• Trace 5: A + B * (C - D / E \\$ F) * G → Postfix = A B C D E F $ / - * G * +",
    "marks": "4 & 7 Marks • CO2"
  },
  {
    "id": "q14",
    "unitId": "unit-2",
    "number": 14,
    "question": "Evaluation of Postfix and Prefix Expressions with Stack Traces.",
    "answer": "Algorithm: Scan postfix left-to-right. Push operands onto stack. For operator     \\theta, pop OP2, pop OP1, compute VAL = OP1\\ \\theta\\ OP2, and\npush   VAL. Final answer is popped from stack.\nTabular Trace for: 10 2 + 8 4 / * 6 3 - /\n\n Token              Operation / Stack Action                                                                      Stack Content\n\n 10, 2              Push 10, Push 2                                                                               [10, 2]\n\n +                  Pop 2, 10   → Compute 10 + 2 = 12 → Push 12                                                   [12]\n\n 8, 4               Push 8, Push 4                                                                                [12, 8, 4]\n\n /                  Pop 4, 8→ Compute 8 / 4 = 2 → Push 2                                                          [12, 2]\n\n *                  Pop 2, 12 → Compute 12 × 2 = 24 → Push 24                                                     [24]\n\n 6, 3               Push 6, Push 3                                                                                [24, 6, 3]\n\n -                  Pop 3, 6   → Compute 6 - 3 = 3 → Push 3                                                       [24, 3]\n\n /                  Pop 3, 24   → Compute 24 / 3 = 8 → Push 8                                                     [8]   → Result = 8\n• Postfix 2: 5 4 6 + * 4 9 3 / + *          → (4+6=10) \\to (5 \\times 10=50) \\to (9/3=3) \\to (4+3=7) \\to (50 \\times 7) = \\mathbf{350}.\n• Prefix: + * A B - C + C * B A with         A=4, B=8, C=12 → Scan right-to-left: B \\times A = 32 \\to C + 32 = 44 \\to C - 44 = -32 \\to A \\times B = 32\n\\to 32 + (-32) = \\mathbf{0}.",
    "marks": "3, 4 & 7 Marks • CO2"
  },
  {
    "id": "q15",
    "unitId": "unit-2",
    "number": 15,
    "question": "Explain Tower of Hanoi Problem and its Recursive Solution.",
    "answer": "Rules: Move  n disks from Source (A) to Destination (C) using Aux (B) such that: (1) Only one disk is moved at a time; (2) A larger disk never\nsits on a smaller disk. Minimal moves =  2^n - 1. For n=3: 2^3 - 1 = \\mathbf{7\\text{ moves}}.\n7 Steps for 3 Disks: (1) A → C, (2) A → B, (3) C → B, (4) A → C, (5) B → A, (6) B → C, (7) A → C.\n\n\n          void TOH(int n, char src, char dest, char aux) { if (n == 1) { printf(\"Move disk 1 from %c to %c\\n\", src,\n  dest); return; } TOH(n - 1, src, aux, dest); printf(\"Move disk %d from %c to %c\\n\", n, src, dest); TOH(n - 1, aux,\n  dest, src); }",
    "marks": "3, 4 & 7 Marks • CO2"
  },
  {
    "id": "q16",
    "unitId": "unit-2",
    "number": 16,
    "question": "Write a C Program to Reverse a String Using Stack.",
    "answer": "#include <stdio.h> #include <string.h> #define MAX 100 char stack[MAX]; int top = -1; void push(char c) {\n  if (top < MAX-1) stack[++top] = c; } char pop() { return (top >= 0) ? stack[top--] : '\\0'; } int main() { char\n  str[MAX]; int i; printf(\"Enter string: \"); gets(str); for(i = 0; str[i] != '\\0'; i++) push(str[i]); for(i = 0; top\n  != -1; i++) str[i] = pop(); str[i] = '\\0'; printf(\"Reversed string: %s\\n\", str); return 0; }\n\n\n\n\n\f UNIT 2: LINEAR DATA STRUCTURES — PART 3: QUEUES & LINKED LISTS                                                   CO-2 • WEIGHTAGE: 30%",
    "marks": "7 Marks • CO5"
  },
  {
    "id": "q17",
    "unitId": "unit-2",
    "number": 17,
    "question": "Explain Simple Queue Limitations and Circular Queue Algorithms.",
    "answer": "• Simple Queue Limitation: Suffers from False Overflow. As items are dequeued, FRONT shifts right. When REAR == N, no new element can\nbe inserted even if initial slots are empty, wasting memory space.\n• Circular Queue: Reconnects the last slot back to the first using modulo arithmetic (R = (R \\bmod N) + 1), eliminating false overflow.\n         Procedure CQINSERT(F, R, Q, N, Y): 1. IF (R == N) THEN R = 1 ELSE R = R + 1 2. IF (F == R) THEN\n Write('Overflow'); Return 3. Q[R] = Y 4. IF (F == 0) THEN F = 1 5. Return Procedure CQDELETE(F, R, Q, N): 1. IF (F\n == 0) THEN Write('Underflow'); Return(0) 2. Y = Q[F] 3. IF (F == R) THEN F = 0; R = 0 ELSE IF (F == N) THEN F = 1\n ELSE F = F + 1 4. Return(Y)",
    "marks": "4 & 7 Marks • CO2"
  },
  {
    "id": "q18",
    "unitId": "unit-2",
    "number": 18,
    "question": "Explain Deque (Double Ended Queue) and Priority Queue.",
    "answer": "• Deque: A linear list where insertions and deletions can occur at either end (LEFT/RIGHT). Types: (1) Input-Restricted: Insertion at one end\nonly, deletions at both ends; (2) Output-Restricted: Deletion at one end only, insertions at both ends.\n• Priority Queue: Elements are assigned a priority. High-priority elements are serviced before low-priority ones. Same-priority elements\nfollow FIFO. Used extensively in operating system CPU process scheduling.",
    "marks": "3, 4 & 7 Marks • CO2"
  },
  {
    "id": "q19",
    "unitId": "unit-2",
    "number": 19,
    "question": "Master Comparison: Stack vs. Simple Queue vs. Priority Queue vs. Deque.",
    "answer": "Structure              Discipline            Pointers Used                       Insertion End                   Deletion End\n\n Stack                  LIFO                  1 pointer (TOP)                     TOP only                        TOP only\n\n Simple Queue           FIFO                  2 pointers (FRONT, REAR)            REAR only                       FRONT only\n\n Circular Queue         FIFO (Circular)       2 pointers (F, R wrapped)           REAR (wrapped)                  FRONT (wrapped)\n\n Priority Queue         Priority + FIFO       Pointer to sorted head              Sorted order position           Highest priority item\n\n Deque                  Flexible              2 pointers (LEFT, RIGHT)            Both ends (or 1 end)            Both ends (or 1 end)",
    "marks": "3 & 4 Marks • CO2"
  },
  {
    "id": "q20",
    "unitId": "unit-2",
    "number": 20,
    "question": "Singly Linked List: Operations, Algorithms, and Node Availability Stack.",
    "answer": "Availability Stack (AVAIL): A pool of free nodes managed for dynamic linked allocation. Free nodes are popped from AVAIL on insert and\npushed back onto AVAIL on delete.\n\n\n         INSERT_FIRST(X, FIRST): 1. IF AVAIL == NULL THEN Write('Overflow'); Return(FIRST) 2. NEW = AVAIL; AVAIL =\n LINK(AVAIL); INFO(NEW) = X; LINK(NEW) = FIRST; Return(NEW) INSERT_LAST(X, FIRST): 1. Allocate NEW with INFO=X,\n LINK=NULL. IF FIRST == NULL THEN Return(NEW) 2. SAVE = FIRST; WHILE LINK(SAVE) != NULL DO SAVE = LINK(SAVE) 3.\n LINK(SAVE) = NEW; Return(FIRST) DELETE_NODE(X, FIRST): 1. IF FIRST == NULL THEN Write('Underflow'); Return 2. Find\n node X and its predecessor PRED. 3. IF X == FIRST THEN FIRST = LINK(FIRST) ELSE LINK(PRED) = LINK(X) 4. LINK(X) =\n AVAIL; AVAIL = X; Return",
    "marks": "4 & 7 Marks • CO2"
  },
  {
    "id": "q21",
    "unitId": "unit-2",
    "number": 21,
    "question": "Explain Doubly Linked List and Circular Linked List Operations.",
    "answer": "• Doubly Linked List: Each node has LPTR (predecessor), INFO (data), and RPTR (successor). Enables bidirectional traversal. Left insertion\nat M: LPTR(NEW)=LPTR(M); RPTR(NEW)=M; LPTR(M)=NEW; RPTR(LPTR(NEW))=NEW;. Deletion of node OLD:\nRPTR(LPTR(OLD))=RPTR(OLD); LPTR(RPTR(OLD))=LPTR(OLD); Free(OLD);\n• Circular Linked List: Last node's pointer links back to FIRST instead of NULL. Advantage: Traversal can begin from any node and reach\nevery other node in the ring.",
    "marks": "4 & 7 Marks • CO2"
  },
  {
    "id": "q22",
    "unitId": "unit-2",
    "number": 22,
    "question": "Linked Representation of Stack and Queue.",
    "answer": "• Linked Stack: TOP points to list head. Push: NEW->next = TOP; TOP = NEW; ($O(1)$). Pop: TEMP = TOP; TOP = TOP->next;\nfree(TEMP); ($O(1)$). No overflow except physical memory exhaustion.\n• Linked Queue: Maintained via FRONT and REAR pointers. Enqueue: Append at REAR, advance REAR ($O(1)$). Dequeue: Remove from\nFRONT, advance FRONT ($O(1)$).\n\n\n\n\n\f UNIT 3: NON-LINEAR DATA STRUCTURES — PART 1: BINARY TREES & TRAVERSALS                                                CO-3 • WEIGHTAGE: 20%",
    "marks": "4 & 7 Marks • CO2"
  },
  {
    "id": "q23",
    "unitId": "unit-3",
    "number": 23,
    "question": "Define Tree Terminology and Types of Binary Trees.",
    "answer": "Terminology: (1) Root: Topmost node with in-degree 0; (2) Leaf (Terminal): Node with out-degree 0; (3) Degree: Number of children of a\nnode; (4) Height/Depth: Maximum edges from root to a leaf; (5) Forest: Set of disjoint trees; (6) Fundamental Theorem: Any tree with       N\nnodes contains exactly    N - 1 edges.\nBinary Tree Types:\n• Full / Strictly Binary: Every node has either 0 or 2 children.\n• Complete Binary: All levels full except possibly the last, where nodes are packed strictly left-to-right.\n• Perfect Binary: All internal nodes have 2 children, all leaves are at the same level. Nodes =      2^{h+1}-1.\n• Skewed Binary: Every node has only 1 child (Left-skewed or Right-skewed degenerate list).",
    "marks": "3 & 4 Marks • CO3"
  },
  {
    "id": "q24",
    "unitId": "unit-3",
    "number": 24,
    "question": "Binary Tree Traversals: Recursive and Iterative Algorithms.",
    "answer": "• Preorder (V-L-R): Visit Root→ Traverse Left → Traverse Right.\n• Inorder (L-V-R): Traverse Left → Visit Root → Traverse Right (produces sorted order in BST).\n• Postorder (L-R-V): Traverse Left → Traverse Right → Visit Root.\n\n\n          Recursive Algorithms: RINORDER(T): IF T != NULL THEN { RINORDER(LPTR(T)); Write(DATA(T));\n  RINORDER(RPTR(T)); } RPREORDER(T): IF T != NULL THEN { Write(DATA(T)); RPREORDER(LPTR(T)); RPREORDER(RPTR(T)); }\n  RPOSTORDER(T):IF T != NULL THEN { RPOSTORDER(LPTR(T)); RPOSTORDER(RPTR(T)); Write(DATA(T)); } Non-Recursive\n  (Iterative) Preorder using Stack: 1. PUSH(Root). 2. WHILE Stack not empty DO: T = POP(); Write(DATA(T)); IF\n  RPTR(T) != NULL THEN PUSH(RPTR(T)); IF LPTR(T) != NULL THEN PUSH(LPTR(T));",
    "marks": "3, 4 & 7 Marks • CO3"
  },
  {
    "id": "q25",
    "unitId": "unit-3",
    "number": 25,
    "question": "Constructing Binary Trees from Traversal Sequences.",
    "answer": "• Case 1: Preorder: A, B, C, E, I, F, J, D, G, H, K, L | Inorder: E, I, C, F, J, B, G, D, K, H, L, A\n1. First preorder element is Root = A.\n2. In Inorder, all elements E, I, C, F, J, B, G, D, K, H, L are left of A                → Right subtree is empty.\n3. Next in preorder is B (Root of left subtree). In Inorder, E, I, C, F, J are left of B; G, D, K, H, L are right of B.\n4. Recursing constructs the tree matching the course diagram: B has left child C and right child D; C has left child E (with right child I) and\nright child F (with right child J); D has left child G and right child H (with left child K, right child L).\n• Case 2: Inorder: D, G, B, A, H, E, I, C, F | Postorder: G, D, B, H, I, E, F, C, A\nRoot is last postorder element = A. Inorder splits into Left: D, G, B and Right: H, E, I, C, F. Recursion determines Left subtree has\nroot B (left child D with right child G); Right subtree has root C (left child E with children H, I; right child F).",
    "marks": "4 & 7 Marks • CO3"
  },
  {
    "id": "q26",
    "unitId": "unit-3",
    "number": 26,
    "question": "Explain Threaded Binary Tree, Types, and Header Nodes.",
    "answer": "n\nMotivation: In an -node binary tree, exactly     n+1 link fields store NULL values. Threaded binary trees replace these NULL links with threads\nto allow stackless, non-recursive traversals.\n• Right-Threaded: NULL right link points to the node's inorder successor.\n• Left-Threaded: NULL left link points to the node's inorder predecessor.\n• Two-Way Threaded: Both left and right NULL links are replaced with predecessor and successor threads.\n• Header Node: A dummy node that maintains uniformity. Left link points to the root; right link points to itself. The leftmost leaf's left thread\nand rightmost leaf's right thread point back to this Header Node.",
    "marks": "3, 4 & 7 Marks • CO3"
  },
  {
    "id": "q27",
    "unitId": "unit-3",
    "number": 27,
    "question": "Binary Expression Trees and Conversion of General Tree to Binary Tree.",
    "answer": "• Binary Expression Tree: Leaves are operands; internal nodes are operators. Evaluating via Inorder yields infix; Preorder yields prefix;\nPostorder yields postfix. Expression A + B * (C + D) has '+' at root, left child A, right child '*' (left B, right '+' with children C, D).\n• General Tree to Binary Tree Rules: (1) Root of General Tree becomes Root of Binary Tree; (2) Left child of a node in General Tree becomes\nits Left Child; (3) Immediate right sibling in General Tree becomes its Right Child.\n\n\n\n\n\f UNIT 3: NON-LINEAR DATA STRUCTURES — PART 2: BST, AVL & B-TREES                                                           CO-3 • WEIGHTAGE: 20%",
    "marks": "4 & 7 Marks • CO3"
  },
  {
    "id": "q28",
    "unitId": "unit-3",
    "number": 28,
    "question": "Binary Search Tree (BST): Concept, Search, and Insertion Algorithms.",
    "answer": "BST Property: For every node     X: \\text{Keys in Left Subtree} < \\text{Key}(X) < \\text{Keys in Right Subtree}. Inorder traversal yields sorted order.\n          SearchElement(Tree, Val): IF Tree == NULL OR Info(Tree) == Val THEN Return Tree ELSE IF Val < Info(Tree)\n  THEN Return SearchElement(LPTR(Tree), Val) ELSE Return SearchElement(RPTR(Tree), Val) InsertBST(Root, NEW): 1. IF\n  Root == NULL THEN Root = NEW; Return 2. Traverse: IF Info(NEW) < Info(currNode) move Left ELSE move Right. 3.\n  Attach NEW as left or right child at the first encountered NULL leaf position.",
    "marks": "3, 4 & 7 Marks • CO3"
  },
  {
    "id": "q29",
    "unitId": "unit-3",
    "number": 29,
    "question": "BST Deletion: Explain the Three Cases and Algorithm.",
    "answer": "• Case 1 (Leaf Node): Simply set the parent's pointer to NULL and free the node.\n• Case 2 (Single Child): Bypass the node by linking the parent pointer directly to the single child.\n• Case 3 (Two Children): Find the node's inorder successor (smallest node in the right subtree) or inorder predecessor. Copy its value to the\ntarget node, then recursively delete the inorder successor (which is guaranteed to have at most one child).\nExample: Deleting 70 from BST [50, 30, 70, 20, 40, 60, 80]: 70 has two children (60, 80). Inorder successor is 80. Replace 70 with 80, then\nprune leaf 80.",
    "marks": "4 & 7 Marks • CO3"
  },
  {
    "id": "q30",
    "unitId": "unit-3",
    "number": 30,
    "question": "Explain AVL Trees, Balance Factor, and the Four AVL Rotations.",
    "answer": "Definition: An AVL tree (Adelson-Velsky & Landis) is a self-balancing BST where the Balance Factor (BF) of every node satisfies                 BF =\n\\text{Height}(Left) - \\text{Height}(Right) \\in \\{-1, 0, 1\\}. Guaranteed worst-case complexity: O(\\log n).\nThe 4 Balancing Rotations:\n\n Rotation         Cause / Insertion Position                                   Balancing Action Taken\n\n LL Rotation                                              BF = +2).\n                  Inserted into Left child's Left subtree (                    Single Clockwise rotation at unbalanced node A.\n\n RR Rotation      Inserted into Right child's Right subtree (BF = -2).         Single Counter-Clockwise rotation at unbalanced node A.\n\n LR Rotation      Inserted into Left child's Right subtree (BF = +2).          Double rotation: RR rotation on left child, then LL on node A.\n\n RL Rotation      Inserted into Right child's Left subtree (BF = -2).          Double rotation: LL rotation on right child, then RR on node A.\n\nExample: Inserting numbers 10, 20, 30 creates a right-skewed tree (      BF(10) = -2). Applying an RR rotation pulls 20 to root with 10 (left) and\n30 (right), restoring balance.",
    "marks": "3, 4 & 7 Marks • CO3"
  },
  {
    "id": "q31",
    "unitId": "unit-3",
    "number": 31,
    "question": "Explain B-Trees of Order m and 2-3 Trees.",
    "answer": "• B-Tree of Order m: A self-balancing multi-way search tree designed for disk/block storage. Properties: (1) Each node holds at most               m-1\n            m\nkeys and children; (2) Root has at least 2 children; (3) Non-root internal nodes have at least        \\lceil m/2 \\rceil children; (4) All leaf nodes\nreside at the exact same depth; (5) Keys inside each node are sorted ascending.\n• 2-3 Tree: A specialized B-tree of order 3. Each node contains either 1 key (2 children: 2-node) or 2 keys (3 children: 3-node). When an\ninsertion pushes 3 keys into a node, it splits: the middle key is promoted to the parent, and the left and right keys become two sibling 2-\nnodes.\n\n\n\n\n\f UNIT 3: NON-LINEAR DATA STRUCTURES — PART 3: GRAPHS, MST & SHORTEST                                                             CO-3 • WEIGHTAGE:\n PATH                                                                                                                            20%",
    "marks": "3, 4 & 7 Marks • CO3"
  },
  {
    "id": "q32",
    "unitId": "unit-3",
    "number": 32,
    "question": "Graph Definitions, Adjacency Matrix vs. Adjacency List.",
    "answer": "Definitions: Complete Graph has all possible edges (        N(N-1)/2 edges in undirected graph); Multigraph allows parallel edges; Directed Acyclic\nGraph (DAG) has directed edges without cycles.\n\n Criteria                            Adjacency Matrix                                          Adjacency List\n\n Structure                           2D boolean/weight matrix of size   V \\times V.            Array of V linked lists storing adjacent vertices.\n Space Complexity                    O(V^2) (optimal for dense graphs).                        O(V + E) (optimal for sparse graphs).\n Edge Lookup / Neighbors             O(1) edge check; O(V) to find all neighbors.              O(\\text{degree}(u)) for lookup and neighbor traversal.",
    "marks": "3, 4 & 7 Marks • CO3"
  },
  {
    "id": "q33",
    "unitId": "unit-3",
    "number": 33,
    "question": "Graph Traversals: Breadth-First Search (BFS) vs. Depth-First Search (DFS).",
    "answer": "• BFS: Uses a Queue. Explores all neighbors of the current vertex before moving deeper. Guarantees shortest path in unweighted graphs.\nTime:   O(V + E), Space: O(V).\n• DFS: Uses a Stack / Recursion. Traverses deeply along each branch to leaf vertices before backtracking. Ideal for topological sort and\ncycle detection. Time:     O(V + E), Space: O(V).",
    "marks": "4 & 7 Marks • CO3"
  },
  {
    "id": "q34",
    "unitId": "unit-3",
    "number": 34,
    "question": "Minimum Spanning Tree (MST): Kruskal's vs. Prim's Algorithms (Solved Numerical).",
    "answer": "Definition: An acyclic subgraph of a connected, weighted graph connecting all             V vertices with exactly V-1 edges and minimal total edge\ncost.\n• Kruskal's Algorithm: Sort all edges ascending by weight. Greedily add the lowest-weight edge provided it does not form a cycle (checked\nvia Disjoint Set Union) until   V-1 edges are added.\n• Prim's Algorithm: Start at arbitrary vertex. Grow MST by greedily selecting the minimum weight edge connecting a tree vertex to an\nunvisited fringe vertex.\nTrace on Course 9-Vertex Graph (Vertices 0 to 8):\nEdges selected: (7,6: w=1), (8,2: w=2), (6,5: w=2), (0,1: w=4), (2,5: w=4), (2,3: w=7), (0,7: w=8), (3,4: w=9).\nTotal MST Weight =       1 + 2 + 2 + 4 + 4 + 7 + 8 + 9 = \\mathbf{37}.",
    "marks": "4 & 7 Marks • CO3"
  },
  {
    "id": "q35",
    "unitId": "unit-3",
    "number": 35,
    "question": "Dijkstra's Algorithm for Single-Source Shortest Path (Solved Trace A to F).",
    "answer": "Principle: Greedy algorithm to find shortest path from source to all vertices in graphs with non-negative edge weights.\nSolved Trace (Graph from Notes: Find Shortest Path from A to F):\n\n Iteration       Selected Vertex           Relaxation Steps / Distance Calculations                                       Distances [A, B, C, D, E, F]\n\n Init            -                         Initialize source dist[A]=0, all other vertices=∞                              [0, ∞, ∞, ∞, ∞, ∞]\n\n 1               A (0)                     Relax B (cost 1), C (cost 5)                                                   [0, 1, 5, ∞, ∞, ∞]\n\n 2               B (1)                     Relax C: 1+1=2; D: 1+2=3; E: 1+4=5                                             [0, 1, 2, 3, 5, ∞]\n\n 3               C (2)                     No shorter edges found                                                         [0, 1, 2, 3, 5, ∞]\n\n 4               D (3)                     Relax F: 3+6=9                                                                 [0, 1, 2, 3, 5, 9]\n\n 5               E (5)                     Relax F: 5+2=7 (shorter than 9!)   → dist[F] updated to 7                      [0, 1, 2, 3, 5, 7]\n\nShortest Path:   A \\to B \\to E \\to F with Minimum Cost = 7.\n\n\n\n\n\f UNIT 4: HASHING & FILE STRUCTURES                                                                                CO-1 • WEIGHTAGE: 15%",
    "marks": "7 Marks • CO3"
  },
  {
    "id": "q36",
    "unitId": "unit-4",
    "number": 36,
    "question": "What is Hashing? Explain Hash Functions and Qualities of Good Hash Function.",
    "answer": "Concept: Hashing maps a large search key space into a smaller range of integer table indices via a mathematical function     h(k), enabling\naverage   O(1) retrieval without sequential searches.\nQualities of a Good Hash Function: (1) Uniform distribution across table slots; (2) Minimizes collisions; (3) Extremely fast computation.\nStandard Hash Functions:\n                  h(k) = k \\bmod M, where M is a prime number close to table size.\n1. Division Method:\n                        h(k) = \\lfloor M \\times (k \\cdot A \\bmod 1) \\rfloor (Knuth recommends A \\approx 0.618033).\n2. Multiplication Method:\n3. Mid-Square Method: Square key k^2 and extract the middle digits.\n4. Folding Method: Partition key into chunks of equal length, add them together, and discard the final carry.",
    "marks": "3, 4 & 7 Marks • CO1"
  },
  {
    "id": "q37",
    "unitId": "unit-4",
    "number": 37,
    "question": "Explain Collision Resolution Techniques: Open Addressing vs. Chaining.",
    "answer": "Collision: Occurs when two distinct keys produce the same table index (   h(k_1) = h(k_2)).\n• Open Addressing: All records are stored directly within the hash table array.\n                h(k, i) = (h'(k) + i) \\bmod M. Searches next slot sequentially. Suffers from primary clustering.\n- Linear Probing:\n- Quadratic Probing:h(k, i) = (h'(k) + i^2) \\bmod M. Eliminates primary clustering but can cause secondary clustering.\n- Double Hashing: h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\bmod M. Step size depends on a second hash function h_2(k).\n• Separate Chaining: Each table slot points to the head of a linked list containing all keys mapped to that index. Handles overflow gracefully\nwithout resizing constraints.",
    "marks": "4 & 7 Marks • CO1"
  },
  {
    "id": "q38",
    "unitId": "unit-4",
    "number": 38,
    "question": "Solved Hashing Numerical Problems (Linear Probing, Quadratic Probing, Chaining).",
    "answer": "• Problem 1: Linear Probing on Table Size , M=10 h(k) = k \\bmod 10\n                                                           . Keys: 72, 27, 36, 24, 63, 81, 92, 101.\n  →        →        →    →      →       →\n72 2, 27 7, 36 6, 24 4, 63 3, 81 1. Next, 92 hashes to 2 (collision)        →\n                                                                      probes 3, 4 occupied           →\n                                                                                           stored at 5. Next, 101 hashes to 1\n(collision)→                                 →\n              probes 2, 3, 4, 5, 6, 7 occupied stored at 8.\nFinal Table: [0:-, 1:81, 2:72, 3:63, 4:24, 5:92, 6:36, 7:27, 8:101, 9:-].\n• Problem 2: Chaining with   M=9 h(k) = k \\bmod 9. Keys: 7, 24, 18, 52, 36, 54, 11, 23.\n                              ,\nSlot 0→  18  →54    →\n                    36   → NULL; Slot 2  → 11 → NULL; Slot 5 → 23 → NULL; Slot 6 → 24 → 52 → NULL; Slot 7 → 7 → NULL.\n• Rehashing: When the table exceeds its load factor threshold (or table is full), a new table of double size (preferably a prime number) is\ncreated, and all elements are re-hashed.",
    "marks": "4 & 7 Marks • CO1"
  },
  {
    "id": "q39",
    "unitId": "unit-4",
    "number": 39,
    "question": "File Structures & Organizations: Sequential, Indexed Sequential, and Direct/Hashed.",
    "answer": "• Sequential Files: Records stored physically sorted on an ordering key. Random access requires binary search over blocks. Inserting or\ndeleting records requires expensive shifting of physical records.\n• Indexed Sequential Files: Primary data file is ordered, accompanied by a small, sorted Index File containing [Key, Block Pointer].\nRandom access searches index via binary search, then fetches target block in 1 access.\n• Direct / Hashed Files: Records are partitioned into disk buckets using a hash function. Bucket directory resolves bucket numbers to block\naddresses in ~2 block accesses.\nBlock Access Comparison Problem (from Notes): Sequential file with      r = 1024 records of 128 bytes on 2048-byte disk blocks: Data blocks =\n(1024 \\times 128) / 2048 = 64 blocks → Binary search requires \\log_2 64 = \\mathbf{6\\text{ block accesses}}. With an Index file (key=4B,\npointer=4B → 8B/entry): Index blocks = (1024 \\times 8) / 2048 = 4 blocks → Index search requires \\log_2 4 = 2 accesses + 1 data block fetch =\n\\mathbf{3\\text{ total accesses}} (50% faster).\n\n\n\n\n\f UNIT 5: SORTING & SEARCHING                                                                                     CO-4, CO-5 • WEIGHTAGE: 15%",
    "marks": "3, 4 & 7 Marks • CO1"
  },
  {
    "id": "q40",
    "unitId": "unit-5",
    "number": 40,
    "question": "Internal vs. External Sorting; Bubble, Selection, and Insertion Sort.",
    "answer": "• Internal vs. External: Internal sorting occurs entirely within RAM for small datasets (Bubble, Quick, Heap). External sorting handles\ndatasets too massive for RAM by sorting disk blocks and merging runs (Merge Sort).\n• Bubble Sort: Swaps adjacent out-of-order pairs. Optimization: A boolean swapped flag terminates execution early if no swaps occur\nduring a pass (Best:   O(n), Worst: O(n^2), Space: O(1), Stable).\n• Selection Sort: Repeatedly finds minimum unsorted element and swaps with current index (          O(n^2) all cases, Space: O(1), Unstable).\n• Insertion Sort: Inserts key into sorted prefix by shifting larger elements right (Best:   O(n), Worst: O(n^2), Space: O(1), Stable).",
    "marks": "3, 4 & 7 Marks • CO4, CO5"
  },
  {
    "id": "q41",
    "unitId": "unit-5",
    "number": 41,
    "question": "Quick Sort: Algorithm and Justification of Pivot Selection Impact.",
    "answer": "Does Pivot Selection affect Time Complexity? Justification:\nYes, critically. (1) Balanced Partitions: When the pivot divides the array into two roughly equal halves (   n/2), recursion depth is \\log_2 n,\nresulting in Best & Average Case time of    \\mathbf{O(n \\log n)}.\n(2) Unbalanced Partitions: If the pivot is consistently chosen as the smallest or largest element (e.g., picking the first element on an already\nsorted or reverse-sorted array), one partition contains 0 elements and the other     n-1 elements. Recursion depth degrades to n, deteriorating\nQuick Sort into   \\mathbf{O(n^2)} (Selection Sort-like behavior).\nMitigation: Median-of-three or randomized pivot selection ensures     O(n \\log n) with high probability.",
    "marks": "3, 4 & 7 Marks • CO4, CO5"
  },
  {
    "id": "q42",
    "unitId": "unit-5",
    "number": 42,
    "question": "Merge Sort (Complexity Derivation) and Heap Sort (Max-Heap & Heapify).",
    "answer": "• Merge Sort: Divide-and-conquer. Recurrence:    T(n) = 2T(n/2) + \\Theta(n). By Master Theorem (a=2, b=2, d=1 \\implies a = b^d), T(n) =\n\\mathbf{\\Theta(n \\log n)} in Best, Average, and Worst cases. Requires O(n) auxiliary buffer.\n• Heap Sort: Utilizes a complete binary tree where parent ≥ children (Max-Heap). (1) Build_Max_Heap in O(n); (2) Swap root (maximum)\nwith last leaf, reduce heap size, and call Heapify(0) down. Repeat until sorted. Guaranteed O(n \\log n) time in-place with O(1) auxiliary\nmemory.",
    "marks": "4 & 7 Marks • CO4, CO5"
  },
  {
    "id": "q43",
    "unitId": "unit-5",
    "number": 43,
    "question": "Master Summary Comparison Table of All Sorting Algorithms.",
    "answer": "Algorithm                   Best Case           Average Case              Worst Case              Space Complexity                  Stability\n\n Bubble Sort                 O(n)                O(n^2)                    O(n^2)                  O(1) (In-place)                   Stable\n\n Selection Sort              O(n^2)              O(n^2)                    O(n^2)                  O(1) (In-place)                   Unstable\n\n Insertion Sort              O(n)                O(n^2)                    O(n^2)                  O(1) (In-place)                   Stable\n\n Quick Sort                  O(n \\log n)         O(n \\log n)               O(n^2)                  O(\\log n) stack                   Unstable\n\n Merge Sort                  O(n \\log n)         O(n \\log n)               O(n \\log n)             O(n) auxiliary                    Stable\n\n Heap Sort                   O(n \\log n)         O(n \\log n)               O(n \\log n)             O(1) (In-place)                   Unstable",
    "marks": "4 & 7 Marks • CO4, CO5"
  },
  {
    "id": "q44",
    "unitId": "unit-5",
    "number": 44,
    "question": "Linear Search vs. Binary Search (Comparison & Solved Search Trace).",
    "answer": "• Linear Search: Sequentially compares elements. Works on unsorted arrays. Time: Best      O(1), Worst O(n). Space: O(1).\n• Binary Search: Divide-and-conquer on sorted arrays. Computes       MID = \\lfloor(BEG + END)/2\\rfloor. Halves search interval each\ncomparison. Time: Best     O(1), Worst O(\\log n). Space: O(1).\nSolved Trace (Search 50 in [10, 14, 20, 39, 41, 45, 49, 50, 60]):\n- Pass 1: BEG = 0, END = 8 \\implies MID = 4 (A[4] = 41). Since 41 < 50 \\implies BEG = MID + 1 = 5.\n- Pass 2: BEG = 5, END = 8 \\implies MID = 6 (A[6] = 49). Since 49 < 50 \\implies BEG = MID + 1 = 7.\n- Pass 3: BEG = 7, END = 8 \\implies MID = 7 (A[7] = 50). Element matched at index 7 (location 8).",
    "marks": "3, 4 & 7 Marks • CO4, CO5"
  }
];
