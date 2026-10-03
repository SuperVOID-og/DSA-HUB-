import type { Unit } from '../types';

export const unit5: Unit = {
  id: 'unit-5',
  number: 5,
  title: 'Sorting & Searching',
  description: 'Sorting algorithms (Bubble, Selection, Insertion, Quick, Merge, Heap) and Searching (Sequential, Binary).',
  sourcePdf: '/pdfs/master.pdf',
  topics: [
    {
      id: 'u5-t1',
      title: 'Introduction to Sorting',
      sections: [
        { id: 's1', type: 'h2', content: 'What is sorting?' },
        { id: 's2', type: 'text', content: 'Sorting is the process of arranging data elements in a specific order, such as ascending or descending. This order can be numerical or alphabetical.' },
        { id: 's3', type: 'h3', content: 'Importance of Sorting' },
        { id: 's4', type: 'list', items: [
          'Efficient Searching: Sorted data makes searching for specific elements faster and easier.',
          'Data Analysis: Sorting allows data to better analysis and interpretation.',
          'Database Operations: Sorting is crucial for many database operations.'
        ]},
        { id: 's5', type: 'h2', content: 'Internal vs External Sorting' },
        { id: 's6', type: 'definition', term: 'Internal Sorting', definition: 'Sorting algorithms that operate entirely within the computer\'s main memory (RAM). Suitable for datasets that can be loaded into RAM at once.' },
        { id: 's7', type: 'definition', term: 'External Sorting', definition: 'Sorting algorithms designed for datasets that exceed the capacity of main memory. Data is typically read into memory in chunks, processed, and written back to external storage.' }
      ]
    },
    {
      id: 'u5-t2',
      title: 'Simple Sorting Algorithms',
      sections: [
        { id: 's1', type: 'h2', content: 'Bubble Sort' },
        { id: 's2', type: 'text', content: 'Bubble sort works by repeatedly stepping through the list, comparing each pair of adjacent items and swapping them if they are in the wrong order. Each pass "bubbles" the largest unsorted element to its final position. Time: O(n²). Space: O(1). Stable.' },
        { id: 's3', type: 'code', language: 'cpp', code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;  // early exit if already sorted
    }
}` },
        { id: 's4', type: 'h2', content: 'Selection Sort' },
        { id: 's5', type: 'text', content: 'Selection sort divides the array into sorted and unsorted regions. In each pass, it finds the minimum element from the unsorted region and places it at the beginning. Time: O(n²). Space: O(1). Not stable.' },
        { id: 's6', type: 'code', language: 'cpp', code: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        if (min_idx != i)
            swap(arr[i], arr[min_idx]);
    }
}` },
        { id: 's7', type: 'h2', content: 'Insertion Sort' },
        { id: 's8', type: 'text', content: 'Insertion sort builds the sorted array one element at a time. It picks each element and inserts it into its correct position among the previously sorted elements, shifting larger elements right. Time: O(n²) worst, O(n) best. Space: O(1). Stable. Excellent for small or nearly sorted arrays.' },
        { id: 's9', type: 'code', language: 'cpp', code: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}` },
      ]
    },
    {
      id: 'u5-t3',
      title: 'Advanced Sorting Algorithms',
      sections: [
        { id: 's1', type: 'h2', content: 'Quick Sort' },
        { id: 's2', type: 'text', content: 'Quicksort follows the divide and conquer approach. It picks a pivot element, partitions the array around the pivot (elements less than pivot go left, greater go right), and recursively sorts each partition. Time: O(n log n) average, O(n²) worst. Space: O(log n) stack. Not stable.' },
        { id: 's3', type: 'code', language: 'cpp', code: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}` },
        { id: 's4', type: 'h2', content: 'Merge Sort' },
        { id: 's5', type: 'text', content: 'Merge sort divides the array into halves recursively until each sub-array has one element, then merges them back in sorted order. It guarantees O(n log n) time in all cases but requires O(n) extra space. Stable.' },
        { id: 's6', type: 'code', language: 'cpp', code: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}` },
        { id: 's7', type: 'h2', content: 'Heap Sort' },
        { id: 's8', type: 'text', content: 'Heap sort builds a max-heap from the array, then repeatedly extracts the maximum element and places it at the end of the sorted region. Uses heapify to maintain the heap property. Time: O(n log n). Space: O(1). Not stable.' },
        { id: 's9', type: 'code', language: 'cpp', code: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);       // build max-heap
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);     // move max to end
        heapify(arr, i, 0);      // re-heapify
    }
}` },
        { id: 's10', type: 'h3', content: 'Sorting Algorithm Comparison' },
        { id: 's11', type: 'table', headers: ['Algorithm', 'Best', 'Average', 'Worst', 'Space', 'Stable'], rows: [
          ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
          ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', 'No'],
          ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
          ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'No'],
          ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes'],
          ['Heap Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(1)', 'No'],
        ]},
      ]
    },
    {
      id: 'u5-t4',
      title: 'Searching Algorithms',
      sections: [
        { id: 's1', type: 'h2', content: 'Linear / Sequential Search' },
        { id: 's2', type: 'text', content: 'Linear search checks every element in sequence until the target is found or the end is reached. Works on unsorted arrays. Time: O(n). Simple but slow for large datasets.' },
        { id: 's3', type: 'code', language: 'cpp', code: `int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key)
            return i;    // found at index i
    }
    return -1;           // not found
}` },
        { id: 's4', type: 'h2', content: 'Binary Search' },
        { id: 's5', type: 'text', content: 'Binary search works on sorted arrays by repeatedly halving the search space. It compares the target with the middle element; if not equal, it eliminates the half where the target cannot lie. Time: O(log n). Much faster than linear search for large sorted datasets.' },
        { id: 's6', type: 'code', language: 'cpp', code: `int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == key)
            return mid;
        else if (arr[mid] < key)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;  // not found
}` },
        { id: 's7', type: 'h3', content: 'Linear vs Binary Search' },
        { id: 's8', type: 'table', headers: ['Linear Search', 'Binary Search'], rows: [
          ['Input data need not be sorted.', 'Input data must be in sorted order.'],
          ['Also called sequential search.', 'Also called half-interval search.'],
          ['Time complexity O(n).', 'Time complexity O(log n).'],
          ['Performs equality comparisons.', 'Performs ordering comparisons.'],
          ['Works on any collection.', 'Works only on sorted arrays/lists.']
        ]}
      ]
    }
  ]
};
