import { createAlgorithmPage } from "@/utils/createAlgorithmPage";

export const bucket = createAlgorithmPage({
  id: "bucket",
  metadata: {
    type: "sorting",
    VisualiserType: "array",
    category: "Sorting Algorithms",
    defaultInputs: { target: "42, 8, 76, 31, 95, 19, 58, 14", pattern: "" },
  },
  homeCard: {
    name: "Bucket Sort",
    difficulty: "Medium",
    description:
      "A distribution-based sort that partitions an array into several buckets, each of which is then sorted individually.",
    complexity: {
      timeBest: "׸(n+k)",
      timeAvg: "׸(n+k)",
      timeWorst: "׸(n²)",
      space: "׸(n)",
    },
  },
  algorithmPage: {
    uiConfig: {
      statusLabel: "Phase: {phaseName}",
      startButton: "Start Sorting",
      playbackSpeed: 400,
    },
    extendedDescription:
      "Bucket Sort works by distributing the elements of an array into several buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm.",
    legendItems: [
      { label: "Unsorted", color: "bg-slate-800 border-slate-700" },
      { label: "Bucketing", color: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
      { label: "Sorting", color: "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" },
      { label: "Sorted", color: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" },
    ],
    visualSteps: {
      READY: {
        title: "Ready",
        message:
          "Commencing Bucket Sort: A distribution-based sorting strategy.\n\n• Strategy: Partitioning the input domain into several discrete 'buckets'.\n• Objective: Distributing elements based on their relative magnitude to achieve near-linear performance.",
        highlights: { pseudo: [1], javascript: [1, 2], python: [1, 2] },
      },
      DISTRIBUTING: {
        title: "Distributing",
        message:
          "Assigning {val} to Bucket {bucketIdx}.\n\n• Mapping Function: (val - min) / (max - min) * numBuckets.\n• Note: Values within similar ranges are clustered together for localized sorting.",
        highlights: { pseudo: [2, 3], javascript: [4, 5, 6], python: [4, 5, 6] },
      },
      SORTING_BUCKETS: {
        title: "Sorting Buckets",
        message:
          "Refining Local Partitions.\n\n• Strategy: Sorting each bucket individually (typically using Insertion Sort).\n• Note: High performance is achieved when elements are uniformly distributed.",
        highlights: { pseudo: [4], javascript: [8, 9], python: [8, 9] },
      },
      CONCATENATING: {
        title: "Concatenating",
        message:
          "Reconstructed Global Array.\n\n• Action: Merging sorted buckets in sequential order.\n• Result: A fully sorted array composed of ordered partitions.",
        highlights: { pseudo: [5], javascript: [11], python: [11] },
      },
      SORTED: {
        title: "Sorted ✓",
        message:
          "Bucket Sort Finalized!\n\n• Result: All partitions merged and verified.\n• Complexity: O(n+k) achieved for uniform distributions.",
        highlights: { pseudo: [5], javascript: [11], python: [11] },
      },
    },
  },
  codeSnippets: {
    pseudo: `function bucketSort(arr):
  min = findMin(arr), max = findMax(arr)
  bucketCount = floor((max - min) / bucketSize) + 1
  buckets = list of empty buckets
  for x in arr:
    buckets[floor((x - min) / bucketSize)].append(x)

  arr = []
  for b in buckets:
    sort(b)
    arr.extend(b)
  return arr`,
    javascript: `function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;
  let min = Math.min(...arr), max = Math.max(...arr);
  let bucketCount = Math.floor((max - min) / bucketSize) + 1;
  let buckets = new Array(bucketCount).fill().map(() => []);
  for (let i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - min) / bucketSize)].push(arr[i]);
  }
  arr.length = 0;
  for (let i = 0; i < buckets.length; i++) {
    buckets[i].sort((a, b) => a - b);
    for (let j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j]);
    }
  }
  return arr;
}`,
    python: `def bucket_sort(arr):
    if len(arr) == 0: return arr
    min_val, max_val = min(arr), max(arr)
    bucket_count = 5
    buckets = [[] for _ in range(bucket_count)]
    for x in arr:
        idx = int((x - min_val) / (max_val - min_val + 1) * bucket_count)
        buckets[idx].append(x)
    arr.clear()
    for b in buckets:
        b.sort()
        arr.extend(b)
    return arr`,
  },
  getInitialState: (p, t) => {
    const array = Array.isArray(t) ? t : [42, 8, 76, 31, 95, 19, 58, 14];
    return {
      phase: 0,
      i: 0,
      array: [...array],
      buckets: [[], [], [], [], []],
      minVal: Math.min(...array),
      maxVal: Math.max(...array),
      activeIndices: [],
      sortedIndices: [],
      swapIndices: [],
      comparisons: 0,
      log: { title: "Ready", type: "info", messageKey: "READY" },
    };
  },
  nextStep: (state) => {
    const { array, i, phase, buckets, minVal, maxVal } = state;
    const newState = { ...state, activeIndices: [], swapIndices: [] };

    if (phase === 0) {
      // Distributing
      if (i >= array.length) {
        return {
          ...newState,
          phase: 1,
          i: 0,
          log: { title: "Sorting Buckets", type: "info", messageKey: "SORTING_BUCKETS" },
        };
      }
      const val = array[i];
      const bucketIdx = Math.min(Math.floor(((val - minVal) / (maxVal - minVal + 1)) * 5), 4);
      const newBuckets = [...buckets];
      newBuckets[bucketIdx] = [...newBuckets[bucketIdx], val];

      return {
        ...newState,
        i: i + 1,
        buckets: newBuckets,
        activeIndices: [i],
        log: { title: "Distributing", type: "info", messageKey: "DISTRIBUTING", params: { val, bucketIdx, i } },
      };
    }

    if (phase === 1) {
      // Sorting
      if (i >= buckets.length) {
        return {
          ...newState,
          phase: 2,
          i: 0,
          array: [],
          log: { title: "Concatenating", type: "info", messageKey: "CONCATENATING" },
        };
      }
      const newBuckets = [...buckets];
      newBuckets[i] = [...newBuckets[i]].sort((a, b) => a - b);
      return {
        ...newState,
        i: i + 1,
        buckets: newBuckets,
        log: { title: "Sorting Buckets", type: "info", messageKey: "SORTING_BUCKETS" },
      };
    }

    if (phase === 2) {
      // Concatenating
      if (i >= buckets.length) {
        return {
          ...newState,
          isFinished: true,
          sortedIndices: [...new Array(array.length).keys()],
          log: { title: "Sorted ✓", type: "success", messageKey: "SORTED" },
        };
      }
      const newArray = [...array, ...buckets[i]];
      return {
        ...newState,
        i: i + 1,
        array: newArray,
        log: { title: "Concatenating", type: "info", messageKey: "CONCATENATING" },
      };
    }

    return newState;
  },
});
