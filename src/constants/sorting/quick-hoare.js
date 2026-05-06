import { createAlgorithmCard } from '../factory';

export const quickhoare = createAlgorithmCard({
  id: 'quick-hoare',
  metadata: {
    type: 'sorting',
    visualizerType: 'array',
    category: 'Sorting Algorithms',
    defaultInputs: { target: '5, 3, 8, 4, 2, 7, 1, 6', pattern: '' },
  },
  homeCard: {
    name: 'Quick Sort (Hoare)',
    difficulty: 'Hard',
    description: 'An efficient version of Quick Sort using the Hoare partition scheme, which typically involves fewer swaps than Lomuto.',
    complexity: {
      timeBest: '׸(n log n)',
      timeAvg: '׸(n log n)',
      timeWorst: '׸(n²)',
      space: '׸(log n)',
    },
  },
  algorithmPage: {
    uiConfig: {
      statusLabel: 'Pivot: {pivotVal}',
      startButton: 'Start Sorting',
      playbackSpeed: 300
    },
    extendedDescription: 'Quick Sort with Hoare partition scheme uses two indices that start at the ends of the partition being analyzed, then move toward each other until they find an inversion: a pair of elements, one greater than or equal to the pivot, one less than or equal, that are in the wrong order relative to each other.',
    legendItems: [
      { label: 'Unsorted', color: 'bg-slate-800/40 border-slate-700/50' },
      { label: 'Pivot', color: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' },
      { label: 'Scanning', color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' },
      { label: 'Swap', color: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' },
      { label: 'Sorted', color: 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' },
    ],
  },
  visualSteps: {
    READY: {
      title: 'Ready',
      message: "Hoare Partitioning Initiated.\n\n• Two pointers (i, j) will scan from both ends.\n• Elements are swapped when they are on the 'wrong' side of the pivot.",
      highlights: { pseudo: [1], javascript: [1], python: [1] }
    },
    START_PARTITION: {
      title: 'Start Partition',
      message: "Initializing partition [{l}, {r}] with pivot {pivot}.",
      highlights: { pseudo: [2], javascript: [3], python: [3] }
    },
    MOVING_I: {
      title: 'Moving i',
      message: "Scanning from left: {val} < {pivot}. Incrementing i.",
      highlights: { pseudo: [3], javascript: [4], python: [4] }
    },
    I_STOPPED: {
      title: 'i Stopped',
      message: "i stopped at {val} (>= {pivot}).",
      highlights: { pseudo: [3], javascript: [4], python: [4] }
    },
    MOVING_J: {
      title: 'Moving j',
      message: "Scanning from right: {val} > {pivot}. Decrementing j.",
      highlights: { pseudo: [4], javascript: [5], python: [5] }
    },
    J_STOPPED: {
      title: 'j Stopped',
      message: "j stopped at {val} (<= {pivot}).",
      highlights: { pseudo: [4], javascript: [5], python: [5] }
    },
    SWAPPING: {
      title: 'Swapping',
      message: "Inversion found at i={i}, j={j}. Swapping {valI} and {valJ}.",
      highlights: { pseudo: [5], javascript: [7], python: [7] }
    },
    CROSSED: {
      title: 'Pointers Crossed',
      message: "i={i} >= j={j}. Partition complete at index {j}.",
      highlights: { pseudo: [6], javascript: [6], python: [6] }
    },
    SORTED: {
      title: 'Sorted ✓',
      message: "Sorting Complete. Hoare partition successfully resolved all ranges.",
      highlights: { pseudo: 1, javascript: 1, python: 1 }
    }
  },
  codeSnippets: {
    pseudo: `function quickSortHoare(arr, low, high):
  if low < high:
    p = partition(arr, low, high)
    quickSortHoare(arr, low, p)
    quickSortHoare(arr, p + 1, high)

function partition(arr, low, high):
  pivot = arr[floor((low + high) / 2)]
  i = low - 1, j = high + 1
  while true:
    do i++ while arr[i] < pivot
    do j-- while arr[j] > pivot
    if i >= j: return j
    swap(arr[i], arr[j])`,
    javascript: `function quickSortHoare(arr, low, high) {
  if (low < high) {
    let p = partition(arr, low, high);
    quickSortHoare(arr, low, p);
    quickSortHoare(arr, p + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[Math.floor((low + high) / 2)];
  let i = low - 1, j = high + 1;
  while (true) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);
    if (i >= j) return j;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}`,
    python: `def quick_sort_hoare(arr, low, high):
    if low < high:
        p = partition(arr, low, high)
        quick_sort_hoare(arr, low, p)
        quick_sort_hoare(arr, p + 1, high)

def partition(arr, low, high):
    pivot = arr[(low + high) // 2]
    i, j = low - 1, high + 1
    while True:
        while True:
            i += 1
            if arr[i] >= pivot: break
        while True:
            j -= 1
            if arr[j] <= pivot: break
        if i >= j: return j
        arr[i], arr[j] = arr[j], arr[i]`
  },
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [5, 8, 1, 9, 3, 7, 2, 6];
    return {
      phase: 0,
      stack: [[0, array.length - 1]],
      array: [...array],
      activeIndices: [],
      sortedIndices: [],
      swapIndices: [],
      pivotIndex: -1,
      log: { title: 'Ready', type: 'info', messageKey: 'READY' }
    };
  },
  nextStep: (state) => {
    const { phase } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };
    
    // Phase 0: Init Partition
    if (phase === 0) {
      const { array, stack } = newState;
      if (stack.length === 0) {
        return { 
          ...newState, 
          isFinished: true, 
          sortedIndices: [...Array(array.length).keys()], 
          log: { title: 'Sorted ✓', type: 'success', messageKey: 'SORTED' } 
        };
      }
      
      const newStack = [...stack];
      const [low, high] = newStack.pop();
      
      if (low >= high) {
        if (low === high) newState.sortedIndices = [...new Set([...newState.sortedIndices, low])];
        return { ...newState, stack: newStack, phase: 0 };
      }
      
      const pivotIdx = Math.floor((low + high) / 2);
      const pivot = array[pivotIdx];
      
      return {
        ...newState,
        phase: 1,
        stack: newStack,
        l: low,
        r: high,
        pivot,
        pivotIndex: pivotIdx,
        i: low - 1,
        j: high + 1,
        log: {
          title: 'Start Partition',
          type: 'info',
          messageKey: 'START_PARTITION',
          params: { l: low, r: high, pivot }
        }
      };
    }
    
    // Phase 1: Move i
    if (phase === 1) {
      const { array, i, pivot } = newState;
      const nextI = i + 1;
      if (array[nextI] < pivot) {
        return {
          ...newState,
          i: nextI,
          activeIndices: [nextI],
          log: { title: 'Moving i', type: 'info', messageKey: 'MOVING_I', params: { val: array[nextI], pivot } }
        };
      } else {
        return {
          ...newState,
          i: nextI,
          phase: 2,
          activeIndices: [nextI],
          log: { title: 'i Stopped', type: 'match', messageKey: 'I_STOPPED', params: { val: array[nextI], pivot } }
        };
      }
    }
    
    // Phase 2: Move j
    if (phase === 2) {
      const { array, j, pivot } = newState;
      const nextJ = j - 1;
      if (array[nextJ] > pivot) {
        return {
          ...newState,
          j: nextJ,
          activeIndices: [nextJ],
          log: { title: 'Moving j', type: 'info', messageKey: 'MOVING_J', params: { val: array[nextJ], pivot } }
        };
      } else {
        return {
          ...newState,
          j: nextJ,
          phase: 3,
          activeIndices: [nextJ],
          log: { title: 'j Stopped', type: 'match', messageKey: 'J_STOPPED', params: { val: array[nextJ], pivot } }
        };
      }
    }
    
    // Phase 3: Check Swap or Cross
    if (phase === 3) {
      const { array, l, r, i, j, stack, pivotIndex } = newState;
      if (i >= j) {
        const newStack = [...stack, [j + 1, r], [l, j]];
        return {
          ...newState,
          phase: 0,
          stack: newStack,
          activeIndices: [i, j],
          pivotIndex: -1,
          log: { title: 'Pointers Crossed', type: 'shift', messageKey: 'CROSSED', params: { i, j } }
        };
      }
      
      const newArray = [...array];
      let newPivotIdx = pivotIndex;
      if (i === pivotIndex) newPivotIdx = j;
      else if (j === pivotIndex) newPivotIdx = i;
      
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      return {
        ...newState,
        array: newArray,
        phase: 1,
        swapIndices: [i, j],
        pivotIndex: newPivotIdx,
        log: { title: 'Swapping', type: 'shift', messageKey: 'SWAPPING', params: { i, j, valI: array[i], valJ: array[j] } }
      };
    }
    
    return newState;
  }
});
