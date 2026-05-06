import { createAlgorithmCard } from '../factory';

export const heapsort = createAlgorithmCard({
  id: 'heapsort',
  
  // --- Metadata ---
  metadata: {
    type: 'sorting',
    visualizerType: 'array',
    category: 'Sorting Algorithms',
    defaultInputs: { target: '3, 9, 2, 8, 1, 7, 4, 6', pattern: '' },
  },

  homeCard: {
    name: 'Heap Sort',
    difficulty: 'Hard',
    description: 'Organizes elements into a binary heap to efficiently extract and sort the largest elements.',
    complexity: {
      timeBest: 'Ω(n log(n))',
      timeAvg: 'Θ(n log(n))',
      timeWorst: 'O(n log(n))',
      space: 'O(1)'
    },
  },

  algorithmPage: {
    uiConfig: {
      statusLabel: 'Heap Size: {heapSize}',
      startButton: 'Start Sorting',
      playbackSpeed: 200
    },
    extendedDescription: 'Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.',
    legendItems: [
      { label: 'Unsorted', color: 'bg-slate-800/40 border-slate-700/50' },
      { label: 'Heapified', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Checking', color: 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' },
      { label: 'Swap', color: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' },
      { label: 'Sorted', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
    ],
  },

  // --- Visual Steps & Code ---
  visualSteps: {
    READY: {
      title: 'Ready',
      message: "Commencing Heap Sort: A comparison-based sort utilizing an implicit\n  binary heap.\n\n• Phase 1: Build-Max-Heap from the input array in O(n) time.\n\n• Phase 2: Successively extract the maximum element to reconstruct\n  the array in sorted order.",
      highlights: { pseudo: [1, 2, 3], javascript: [1, 2, 3], python: [1, 2, 3], csharp: [1, 2, 3] }
    },
    MAX_HEAP_BUILT: {
      title: 'Heap Ready',
      message: "Max-Heap Construction Complete.\n\n• Invariant: Every parent node is ≥ its children.\n\n• Ready to transition to the extraction phase.",
      highlights: { pseudo: [1, 2, 3], javascript: [3, 4], python: [3, 4], csharp: [3, 4] }
    },
    HEAPIFYING: {
      title: 'Heapifying',
      message: "Invoking Max-Heapify on internal node at index {i}.\n\n• Goal: Restore the max-heap property for this subtree.\n\n• Sifting the element down to its valid hierarchical position.",
      highlights: { pseudo: [10, 11, 12, 13, 14], javascript: 3, python: 3, csharp: 3 }
    },
    NODE_POSITIONED: {
      title: 'Node Positioned',
      message: "Subtree Invariant Satisfied.\n\n• Node now satisfies the max-heap property relative to its children.",
      highlights: { pseudo: [10, 11], javascript: 13, python: 11, csharp: 13 }
    },
    SIFT_DOWN: {
      title: 'Sifting Down',
      message: "Sift-Down Operation: Parent {valParent} < Child {valChild}.\n\n• Violates heap invariant. Performing swap to promote the larger child.",
      highlights: { pseudo: [17, 18, 19, 20, 21], javascript: 21, python: 18, csharp: 20 }
    },
    EXTRACT_MAX: {
      title: 'Extracting Max',
      message: "Extraction Phase: Moving current maximum {valRoot} to resolved index {i}.\n\n• Effectively removing the root from the heap.\n\n• Decrementing active heap boundary to preserve the sorted partition.",
      highlights: { pseudo: [5, 6, 7], javascript: 6, python: 7, csharp: 7 }
    },
    SORT_COMPLETE: {
      title: 'Sorted ✓',
      message: "Sort Completed Successfully.\n\n• All elements extracted and heapified.\n\n• Result: Fully sorted array with O(n log n) time complexity and O(1) auxiliary space.",
      highlights: { pseudo: [1, 2, 3], javascript: 10, python: 9, csharp: 1 }
    }
  },

  codeSnippets: {
    pseudo: `HeapSort(A):
  BuildMaxHeap(A)
  for i from n-1 down to 1:
    swap(A[0], A[i])
    heapSize = heapSize - 1
    MaxHeapify(A, 0)

MaxHeapify(A, i):
  l = left(i), r = right(i)
  if l < heapSize and A[l] > A[i]:
    largest = l
  else: largest = i
  if r < heapSize and A[r] > A[largest]:
    largest = r
  if largest != i:
    swap(A[i], A[largest])
    MaxHeapify(A, largest)`,
    javascript: `function heapSort(arr) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i);

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1, r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
        
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    l, r = 2 * i + 1, 2 * i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    csharp: `public void HeapSort(int[] arr) {
    int n = arr.Length;
    for (int i = n / 2 - 1; i >= 0; i--)
        Heapify(arr, n, i);
        
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        Heapify(arr, i, 0);
    }
}

private void Heapify(int[] arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        Heapify(arr, n, largest);
    }
}`
  },

  // --- Logic ---
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [3, 9, 2, 8, 1, 7, 4, 6];
    const n = array.length;
    return {
      phase: 1, // 1: Build Heap, 2: Extract
      i: Math.floor(n / 2) - 1,
      heapSize: n,
      array,
      activeIndices: [],
      sortedIndices: [],
      swapIndices: [],
      comparisons: 0,
      log: { title: 'Heap Sort', type: 'info', messageKey: 'READY' }
    };
  },

  nextStep: (state) => {
    const { array, i, heapSize, phase, sortedIndices } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 1) { // Building Max Heap
      if (i < 0) {
        return { 
          ...newState, phase: 2, i: array.length - 1,
          log: { title: 'Heap Ready', type: 'success', messageKey: 'MAX_HEAP_BUILT' } 
        };
      }
      // MaxHeapify(i)
      return heapifyStep(newState, heapSize, i, 1);
    }

    if (phase === 2) { // Extracting
      if (heapSize <= 1) {
        return { 
          ...newState, isFinished: true, sortedIndices: [...new Array(array.length).keys()],
          log: { title: 'Sorted ✓', type: 'success', messageKey: 'SORT_COMPLETE' } 
        };
      }
      // Extraction Step
      if (newState.subPhase === 'HEAFIFYING') {
        return heapifyStep(newState, heapSize, 0, 2);
      }

      const newArray = [...array];
      [newArray[0], newArray[heapSize - 1]] = [newArray[heapSize - 1], newArray[0]];
      return {
        ...newState, array: newArray, heapSize: heapSize - 1, subPhase: 'HEAFIFYING',
        swapIndices: [0, heapSize - 1], activeIndices: [0, heapSize - 1],
        sortedIndices: [...sortedIndices, heapSize - 1],
        log: { title: 'Extracting Max', type: 'shift', messageKey: 'EXTRACT_MAX', params: { valRoot: array[0], i: heapSize - 1 } }
      };
    }
    return newState;
  }
});

function heapifyStep(state, n, i, nextPhase) {
  const { array } = state;
  let largest = i;
  let l = 2 * i + 1, r = 2 * i + 2;

  if (l < n && array[l] > array[largest]) largest = l;
  if (r < n && array[r] > array[largest]) largest = r;

  if (largest !== i) {
    const newArray = [...array];
    [newArray[i], newArray[largest]] = [newArray[largest], newArray[i]];
    // In a real heapify, we'd recurse. Here we just return the next state and stay in heapify mode for the next node
    // But for simplicity in this step-by-step, we'll just do one swap per nextStep call.
    return {
      ...state, array: newArray, activeIndices: [i, largest], swapIndices: [i, largest],
      log: { title: 'Sifting Down', type: 'mismatch', messageKey: 'SIFT_DOWN', params: { valParent: array[i], valChild: array[largest] } }
    };
  }

  // Done heapifying this node
  if (nextPhase === 1) {
    return { ...state, i: i - 1, log: { title: 'Heapifying', type: 'info', messageKey: 'HEAPIFYING', params: { i: i - 1 } } };
  } else {
    return { ...state, subPhase: null, log: { title: 'Node Positioned', type: 'match', messageKey: 'NODE_POSITIONED' } };
  }
}
