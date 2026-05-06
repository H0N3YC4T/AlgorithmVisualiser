import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{ct as n,dt as r,ft as i,ht as a,lt as o,mt as s,ot as c,pt as l,s as u,st as d,ut as f}from"./vendor-CMZAa0XW.js";import{n as p,t as m}from"./vendor-animations-CtC6b9XI.js";import{A as h,C as g,D as _,E as v,F as y,I as b,L as x,M as S,N as C,O as w,P as T,R as E,S as D,T as O,_ as ee,a as k,b as te,c as ne,d as re,f as ie,g as ae,h as oe,i as se,j as ce,k as le,l as ue,m as de,n as fe,o as A,p as pe,r as me,s as he,t as ge,u as _e,v as ve,w as ye,x as be,y as xe,z as Se}from"./vendor-icons-DE1_5kKf.js";import{i as j,n as Ce,r as we,t as Te}from"./vendor-syntax-CsQQDkCi.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var M=e(a(),1),Ee=e(s(),1),N=e=>{let{metadata:t={},homeCard:n={},algorithmPage:r={}}=e;return{id:e.id,name:e.name||t.name||n.name,type:e.type||t.type||n.type,category:e.category||t.category||n.category,difficulty:e.difficulty||t.difficulty||n.difficulty,description:e.description||t.description||n.description,extendedDescription:e.extendedDescription||t.extendedDescription||r.extendedDescription,getInitialState:e.getInitialState,nextStep:e.nextStep,getPreprocessing:e.getPreprocessing,visualiserType:e.visualiserType||t.visualiserType||e.VisualiserType||t.VisualiserType||r.VisualiserType||r.visualiserType,defaultInputs:e.defaultInputs||t.defaultInputs||r.defaultInputs||{target:``,pattern:``},complexity:e.complexity||t.complexity||n.complexity,legendItems:e.legendItems||t.legendItems||r.legendItems||[],visualSteps:e.visualSteps||t.visualSteps||r.visualSteps||{},uiConfig:e.uiConfig||t.uiConfig||r.uiConfig||{},codeSnippets:e.codeSnippets||t.codeSnippets||r.codeSnippets||{},lineHighlights:e.lineHighlights||t.lineHighlights||r.lineHighlights||{},phaseNames:e.phaseNames||t.phaseNames||r.phaseNames||[]}},De=N({id:`bubble`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`6, 2, 8, 1, 9, 3, 7, 4`,pattern:``}},homeCard:{name:`Bubble Sort`,difficulty:`Easy`,description:`A simple comparison sort that repeatedly swaps adjacent elements if they are in the incorrect order.`,complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n^2)`,timeWorst:`O(n^2)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Pass: {i}`,startButton:`Start`,playbackSpeed:200},extendedDescription:`Bubble Sort is the simplest sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Swap`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}]},visualSteps:{READY:{title:`Ready`,message:`Commencing Bubble Sort: A fundamental exchange-based sort.

• Mechanism: Repeatedly swapping adjacent elements to 'bubble' the largest values to the end.

• Invariant: After pass 'i', the i-th largest element is guaranteed to be in its terminal position.`,highlights:{pseudo:[1,2,3],javascript:[2,3,4],python:[2,3,4],csharp:[2,3,4]}},IN_ORDER:{title:`Comparing`,message:`Local Invariant Satisfied: {valJ} ≤ {valJPlusOne}.

• No swap required for this pair.

• Advancing scan pointers to the next adjacent candidate.`,highlights:{pseudo:[4,5],javascript:5,python:5,csharp:5}},OUT_OF_ORDER:{title:`Inversion Detected`,message:`Inversion Detected: {valJ} > {valJPlusOne}.

• The local sorted invariant is violated.

• Preparing to perform an adjacent swap to resolve the inversion.`,highlights:{pseudo:[4,5],javascript:5,python:5,csharp:5}},SWAPPED:{title:`Swapping`,message:`Adjacent Swap Executed.

• Larger element moved towards the tail of the array.

• Smaller element propagated towards the head.`,highlights:{pseudo:5,javascript:7,python:6,csharp:[7,8,9]}},PASS_DONE:{title:`Pass Complete`,message:`Pass {nextPass} Initiated.

• Previous pass successfully finalized index {idx} ({val}).

• Scoping the current scan to the remaining {remaining} unsorted elements.`,highlights:{pseudo:2,javascript:3,python:3,csharp:3}},SORTED:{title:`Sorted ✓`,message:`Convergence Reached.

• Result: Array satisfies the global sorted invariant (arr[j] ≤ arr[j+1]).

• No further inversions detected.`,highlights:{pseudo:[1,2,3,4,5],javascript:11,python:9,csharp:[1,2,3,4,5]}}},codeSnippets:{pseudo:`BubbleSort(list):
  for i from 0 to n-1:
    for j from 0 to n-i-1:
      if list[j] > list[j+1]:
        swap(list[j], list[j+1])`,javascript:`function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,python:`def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,csharp:`public void BubbleSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[6,2,8,1,9,3,7,4];return{phase:1,i:0,j:0,swapped:!1,array:n,activeIndices:[0,1],sortedIndices:[],swapIndices:[],comparisons:0,log:{title:`PASS 1`,type:`info`,messageKey:`READY`,params:{totalPasses:n.length-1,val0:n[0],val1:n[1]}}}},nextStep:e=>{let{array:t,i:n,j:r,phase:i,sortedIndices:a}=e,o=t.length,s={...e,activeIndices:[],swapIndices:[]};if(i===1){if(r>=o-1-n){let e=[...a,o-1-n],r=n+1;return r>=o-1?{...s,isFinished:!0,sortedIndices:[...Array(t.length).keys()],activeIndices:[],log:{title:`SORTED ✓`,type:`success`,messageKey:`SORTED`,params:{nMinusOne:o-1}}}:{...s,phase:1,i:r,j:0,swapped:!1,sortedIndices:e,activeIndices:[0,1],comparisons:s.comparisons,log:{title:`PASS ${r+1}`,type:`info`,messageKey:`PASS_DONE`,params:{val:t[o-1-n],idx:o-1-n,nextPass:r+1,totalPasses:o-1,remaining:o-1-r,val0:t[0],val1:t[1]}}}}if(s.comparisons+=1,s.activeIndices=[r,r+1],t[r]>t[r+1])return{...s,phase:2,log:{title:`OUT OF ORDER`,type:`mismatch`,messageKey:`OUT_OF_ORDER`,params:{j:r,valJ:t[r],jPlusOne:r+1,valJPlusOne:t[r+1]}}};let e=r+1;return{...s,j:e,activeIndices:e<o-1-n?[e,e+1]:[],log:{title:`IN ORDER`,type:`match`,messageKey:`IN_ORDER`,params:{j:r,valJ:t[r],jPlusOne:r+1,valJPlusOne:t[r+1]}}}}if(i===2){let e=[...t];[e[r],e[r+1]]=[e[r+1],e[r]];let i=r+1;return{...s,array:e,phase:1,j:i,swapped:!0,swapIndices:[r,r+1],activeIndices:i<o-1-n?[i,i+1]:[],log:{title:`SWAPPED`,type:`shift`,messageKey:`SWAPPED`,params:{j:r,jPlusOne:r+1,valNewJPlusOne:e[r+1],valNewJ:e[r]}}}}return s}}),Oe=N({id:`selection`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`5, 3, 8, 1, 9, 2, 7, 4`,pattern:``}},homeCard:{name:`Selection Sort`,difficulty:`Easy`,description:`Repeatedly finds the minimum element from the unsorted part and moves it to the beginning.`,complexity:{timeBest:`Ω(n^2)`,timeAvg:`Θ(n^2)`,timeWorst:`O(n^2)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Iteration: {i}`,startButton:`Start`,playbackSpeed:200},extendedDescription:`Selection Sort is a simple comparison-based sorting algorithm. The algorithm divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. It repeatedly finds the smallest (or largest) element in the unsorted part and swaps it with the first element of the unsorted part.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Minimum`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Current`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}]},visualSteps:{READY:{title:`Ready`,message:`Commencing Selection Sort: A comparison-based in-place sort.

• Mechanism: Iteratively identifying the minimum element from the unsorted partition.

• Note: Performance is O(n²) regardless of initial order due to consistent linear scans.`,highlights:{pseudo:[1,2],javascript:[2,3],python:[2,3],csharp:[2,3]}},COMPARING:{title:`Comparing`,message:`Comparison: Evaluating {val} against current candidate {minVal}.`,highlights:{pseudo:[4,5],javascript:5,python:5,csharp:6}},NEW_MINIMUM:{title:`New Minimum`,message:`Candidate Update: {val} < current minimum ({oldVal}).

• Redefining the local minimum candidate to index {j}.

• Continuing scan for potential smaller elements.`,highlights:{pseudo:[5,6],javascript:6,python:6,csharp:7}},MINIMUM_FOUND:{title:`Minimum Found`,message:`Linear Scan Resolved.

• Identified global minimum in current unsorted segment: {val}.

• Ready to perform index stabilization at index {i}.`,highlights:{pseudo:7,javascript:4,python:4,csharp:5}},SWAP_EXECUTED:{title:`Swapping`,message:`In-place Swap Complete.

• Value {val} is now stabilized at index {i}.

• This index is now part of the final sorted partition.`,highlights:{pseudo:7,javascript:10,python:8,csharp:[10,11,12]}},SORTED:{title:`Sorted ✓`,message:`Selection Chain Complete.

• Global array invariant satisfied: Fully Ordered.`,highlights:{pseudo:[1,2,7],javascript:13,python:9,csharp:[1,2]}}},codeSnippets:{pseudo:`SelectionSort(A):
  for i from 0 to n-2:
    minIdx = i
    for j from i+1 to n-1:
      if A[j] < A[minIdx]:
        minIdx = j
    swap(A[i], A[minIdx])`,javascript:`function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // Swap arr[i] and arr[minIdx]
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,python:`def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,csharp:`public void SelectionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`},getInitialState:(e,t)=>({phase:1,i:0,j:1,minIdx:0,array:Array.isArray(t)?t:[5,3,8,1,9,2,7,4],activeIndices:[0,1],sortedIndices:[],swapIndices:[],comparisons:0,log:{title:`Selection Sort`,type:`info`,messageKey:`READY`}}),nextStep:e=>{let{array:t,i:n,j:r,minIdx:i,phase:a,sortedIndices:o}=e,s=t.length,c={...e,activeIndices:[],swapIndices:[]};if(a===1)return r>=s?{...c,phase:2,activeIndices:[n,i],log:{title:`Minimum Found`,type:`match`,messageKey:`MINIMUM_FOUND`,params:{val:t[i],i:n}}}:(c.comparisons+=1,c.activeIndices=[r,i],t[r]<t[i]?{...c,minIdx:r,j:r+1,activeIndices:[r],log:{title:`New Minimum`,type:`mismatch`,messageKey:`NEW_MINIMUM`,params:{val:t[r],oldVal:t[i],j:r}}}:{...c,j:r+1,log:{title:`Comparing`,type:`info`,messageKey:`COMPARING`,params:{val:t[r],minVal:t[i]}}});if(a===2){let e=[...t];[e[n],e[i]]=[e[i],e[n]];let r=n+1,a=[...o,n];return r>=s-1?{...c,array:e,isFinished:!0,sortedIndices:[...Array(s).keys()],activeIndices:[],log:{title:`Sorted ✓`,type:`success`,messageKey:`SORTED`}}:{...c,array:e,phase:1,i:r,j:r+1,minIdx:r,sortedIndices:a,swapIndices:[n,i],activeIndices:[r,r+1],log:{title:`Swapped`,type:`shift`,messageKey:`SWAP_EXECUTED`,params:{val:e[n],i:n}}}}return c}}),ke=N({id:`insertion`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`7, 2, 9, 4, 1, 8, 3, 6`,pattern:``}},homeCard:{name:`Insertion Sort`,difficulty:`Easy`,description:`Builds the sorted array by taking an unsorted element and inserting it into its relative position.`,complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n^2)`,timeWorst:`O(n^2)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Pass: {i}`,startButton:`Start`,playbackSpeed:200},extendedDescription:`Insertion Sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it provides several advantages: it is simple to implement, efficient for small data sets, and stable.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Current`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Comparing`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}]},visualSteps:{READY:{title:`Ready`,message:`Commencing Insertion Sort: An incremental, comparison-based sorting algorithm.

• Strategy: Progressively build a sorted partition by inserting each unsorted element into its correct relative position.

• Advantage: Highly efficient for small or nearly-sorted datasets (Ω(n) best-case).`,highlights:{pseudo:[1,2],javascript:[2,3],python:[1,2],csharp:[2,3]}},NEXT_INSERT:{title:`Next Candidate`,message:`Selecting Candidate: Value {val} from index {idx}.

• Objective: Compare this element with the preceding sorted sequence to determine its final rank in the current partition.

• State: The elements to the left of index {idx} are already sorted relative to each other.`,highlights:{pseudo:[3,4],javascript:[4,5],python:[3,4],csharp:[4,5]}},SWAPPING:{title:`Shifting`,message:`Shifting Element: {val1} > candidate.

• Action: Moving {val1} one position to the right to clear a path for the candidate's insertion.

• Progress: Scanning backward through the sorted segment until the correct insertion point is found.`,highlights:{pseudo:[5,6,7],javascript:[6,7,8],python:[5,6,7],csharp:[6,7,8]}},SORT_COMPLETE:{title:`Sorted ✓`,message:`Sorting Finalized: All elements successfully integrated.

• Result: The entire array now satisfies the non-decreasing order invariant.

• Final State: Global array is fully ordered.`,highlights:{pseudo:[1,2,8],javascript:12,python:9,csharp:[1,2,3]}}},codeSnippets:{pseudo:`InsertionSort(A):
  for i from 1 to n-1:
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key:
      A[j + 1] = A[j]
      j = j - 1
    A[j + 1] = key`,javascript:`function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,python:`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,csharp:`public void InsertionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[7,2,9,4,1,8,3,6];return{phase:1,i:1,j:0,key:n[1],array:n,activeIndices:[1],sortedIndices:[0],swapIndices:[],comparisons:0,log:{title:`Insertion Sort`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{array:t,i:n,j:r,key:i,phase:a}=e,o=t.length,s={...e,activeIndices:[],swapIndices:[]};if(a===1)return n>=o?{...s,isFinished:!0,sortedIndices:[...Array(o).keys()],log:{title:`Sorted ✓`,type:`success`,messageKey:`SORT_COMPLETE`}}:{...s,phase:2,key:t[n],j:n-1,activeIndices:[n],log:{title:`Next Candidate`,type:`info`,messageKey:`NEXT_INSERT`,params:{val:t[n],idx:n}}};if(a===2){if(r>=0&&t[r]>i){let e=[...t];return e[r+1]=e[r],{...s,array:e,j:r-1,activeIndices:[r,r+1],swapIndices:[r,r+1],log:{title:`Shifting`,type:`shift`,messageKey:`SWAPPING`,params:{val1:t[r]}}}}let e=[...t];e[r+1]=i;let a=n+1;return{...s,array:e,phase:1,i:a,sortedIndices:[...Array(a).keys()],activeIndices:[r+1],log:{title:`Inserted`,type:`match`,message:`Inserted ${i} at position ${r+1}`}}}return s}}),Ae=N({id:`cocktail`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`7, 1, 6, 2, 5, 3, 8, 4`,pattern:``}},homeCard:{name:`Cocktail Shaker Sort`,difficulty:`Medium`,description:`A variation of bubble sort that sorts in both directions each pass through the list.`,complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n^2)`,timeWorst:`O(n^2)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Pass: {passes}`,startButton:`Start`,playbackSpeed:200},extendedDescription:`Cocktail Shaker Sort, also known as bidirectional bubble sort, improves upon bubble sort by traversing the list in both directions alternately.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Swap`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}]},visualSteps:{READY:{title:`Ready`,message:`Bidirectional Sort Initiated.

• Traverse forward to bubble the largest element.
• Traverse backward to bubble the smallest element.`,highlights:{pseudo:[1,2],javascript:[2,3],python:[2,3]}},FORWARD_PASS:{title:`Forward Pass`,message:`Bubbling largest element forward to index {end}.

• Current scan k: {k}.
• Target boundary: {end}.`,highlights:{pseudo:[2,3,4],javascript:[4,5,6],python:[4,5,6]}},BACKWARD_PASS:{title:`Backward Pass`,message:`Bubbling smallest element backward to index {start}.

• Current scan k: {k}.
• Target boundary: {start}.`,highlights:{pseudo:[5,6,7],javascript:[8,9,10],python:[8,9,10]}},SWAPPED:{title:`Swapped`,message:`Elements at {k} and {kPlusOne} swapped.

• Local inversion resolved.
• State marked as 'swapped' for convergence check.`,highlights:{pseudo:4,javascript:7,python:7}},SORTED:{title:`Sorted ✓`,message:`Sorting Complete.

• No inversions found during bidirectional passes.
• Array satisfies global sorted invariant.`,highlights:{pseudo:1,javascript:1,python:1}}},codeSnippets:{pseudo:`function cocktailSort(arr):
  start = 0, end = arr.length - 1, swapped = true
  while swapped:
    swapped = false
    for i from start to end - 1:
      if arr[i] > arr[i + 1]:
        swap(arr[i], arr[i + 1])
        swapped = true
    if not swapped: break
    swapped = false
    end = end - 1
    for i from end - 1 down to start:
      if arr[i] > arr[i + 1]:
        swap(arr[i], arr[i + 1])
        swapped = true
    start = start + 1`,javascript:`function cocktailSort(arr) {
  let start = 0, end = arr.length - 1, swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    start++;
  }
}`,python:`def cocktail_shaker_sort(arr):
    start = 0
    end = len(arr) - 1
    swapped = True
    while swapped:
        swapped = False
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped: break
        swapped = False
        end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start += 1`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[7,1,6,2,5,3,8,4];return{phase:1,start:0,end:n.length-1,k:0,swapped:!1,direction:1,passes:1,array:n,activeIndices:[0,1],sortedIndices:[],swapIndices:[],comparisons:0,log:{title:`PASS 1`,type:`info`,messageKey:`READY`,params:{val0:n[0],val1:n[1]}}}},nextStep:e=>{let{array:t,start:n,end:r,k:i,swapped:a,direction:o,phase:s,sortedIndices:c,passes:l}=e,u=t.length,d={...e,activeIndices:[],swapIndices:[]};if(s===1){if(o===1?i>=r:i<n){if(!a)return{...d,isFinished:!0,sortedIndices:[...Array(u).keys()],log:{title:`SORTED ✓`,type:`success`,messageKey:`SORTED`}};if(o===1){let e=r-1,t=e-1;return{...d,direction:-1,end:e,k:t,swapped:!1,passes:l+1,sortedIndices:[...c,r],activeIndices:t>=n?[t,t+1]:[],log:{title:`BACKWARD PASS`,type:`info`,messageKey:`BACKWARD_PASS`,params:{end:r,k:t,start:n}}}}else{let e=n+1,t=e;return{...d,direction:1,start:e,k:t,swapped:!1,passes:l+1,sortedIndices:[...c,n],activeIndices:t<r?[t,t+1]:[],log:{title:`FORWARD PASS`,type:`info`,messageKey:`FORWARD_PASS`,params:{start:n,k:t,end:r}}}}}if(d.comparisons+=1,d.activeIndices=[i,i+1],t[i]>t[i+1])return{...d,phase:2,log:{title:`OUT OF ORDER`,type:`mismatch`,messageKey:`OUT_OF_ORDER`,params:{k:i,valK:t[i],kPlusOne:i+1,valKPlusOne:t[i+1]}}};let e=i+o;return{...d,k:e,activeIndices:(o===1?e<r:e>=n)?[e,e+1]:[],log:{title:o===1?`FORWARD PASS`:`BACKWARD PASS`,type:`match`,messageKey:`IN_ORDER`,params:{k:i,valK:t[i],kPlusOne:i+1,valKPlusOne:t[i+1]}}}}if(s===2){let e=[...t];[e[i],e[i+1]]=[e[i+1],e[i]];let a=i+o,s=o===1?a<r:a>=n;return{...d,array:e,phase:1,swapped:!0,swapIndices:[i,i+1],k:a,activeIndices:s?[a,a+1]:[],log:{title:`SWAPPED`,type:`shift`,messageKey:`SWAPPED`,params:{k:i,kPlusOne:i+1,valK:e[i],valKPlusOne:e[i+1]}}}}return d}}),je=N({id:`merge`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`5, 2, 8, 3, 9, 1, 7, 4`,pattern:``}},homeCard:{name:`Merge Sort`,difficulty:`Hard`,description:`A stable divide-and-conquer sort that recursively divides the array and merges sorted halves.`,complexity:{timeBest:`Ω(n log(n))`,timeAvg:`Θ(n log(n))`,timeWorst:`O(n log(n))`,space:`O(n)`}},algorithmPage:{uiConfig:{statusLabel:`Segment: [{l}..{r}]`,startButton:`Start`,playbackSpeed:200},extendedDescription:`Merge Sort is a stable, comparison-based, divide and conquer sorting algorithm.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Dividing`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Comparing`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Writing`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}]},visualSteps:{READY:{title:`Ready`,message:`Commencing Merge Sort: A stable Divide & Conquer algorithm.

• Phase 1: Recursively decompose the array into unit-length sub-problems.

• Phase 2: Systematically merge sorted segments to reconstruct the solution.`,highlights:{pseudo:[1,2,3,4,5,6],javascript:[1,2,3,4,5,6,7],python:[1,2,3,4,5,6],csharp:[1,2,3,4,5,6,7]}},DIVIDING:{title:`Dividing`,message:`Decomposing Range [{l}..{r}].

• Split Point: Index {mid}.

• Creating sub-problems: [{l}..{mid}] and [{midPlusOne}..{r}].`,highlights:{pseudo:[3,4,5],javascript:[3,4,5,6],python:[3,4,5],csharp:[3,4,5,6]}},MERGING_SEGMENTS:{title:`Merging`,message:`Merging segments [{l}..{mid}] and [{midPlusOne}..{r}].

• Using a two-pointer approach to compare the leading elements.

• Aiming to maintain the stable sort property.`,highlights:{pseudo:[8,9,10,11],javascript:[10,11,12,13,14,15],python:[8,9,10,11,12,13,14,15,16,17],csharp:[9,10,11,12,13,14,15,16,17,18,19,20]}},TAKING_LEFT:{title:`Taking Left`,message:`Comparison Result: Left[{val}] is the next candidate.

• Moving {val} into the temporary sorted buffer.

• Advancing the left-segment pointer.`,highlights:{pseudo:11,javascript:12,python:[11,12,13,14],csharp:13}},TAKING_RIGHT:{title:`Taking Right`,message:`Comparison Result: Right[{val}] is the next candidate.

• Moving {val} into the temporary sorted buffer.

• Advancing the right-segment pointer.`,highlights:{pseudo:11,javascript:13,python:[15,16,17],csharp:14}},COPYING_BACK:{title:`Finalizing Merge`,message:`Segment Merge Resolved: Buffer contains sorted values for [{l}..{r}].

• Finalizing: Overwriting the original segment with sorted results.

• This step completes the 'conquer' part of the recursion.`,highlights:{pseudo:11,javascript:15,python:[18,19,20],csharp:[16,17,18,19]}},WRITING_VALUE:{title:`Memory Update`,message:`Memory Update: Writing value {val} to primary array index {idx}.`,highlights:{pseudo:11,javascript:15,python:[18,19,20],csharp:[16,17,18,19]}},SORTED:{title:`Sorted ✓`,message:`Global Merge Chain Complete.

• All recursive call stacks have popped.

• Array has been fully reconstructed into its sorted state.`,highlights:{pseudo:[1,2,3,4,5,6],javascript:7,python:7,csharp:1}}},codeSnippets:{pseudo:`MergeSort(A, p, r):
  if p < r:
    q = floor((p + r) / 2)
    MergeSort(A, p, q)
    MergeSort(A, q + 1, r)
    Merge(A, p, q, r)

Merge(A, p, q, r):
  L = A[p..q], R = A[q+1..r]
  Merge sorted L and R back into A[p..r]`,javascript:`function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,python:`def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,csharp:`public int[] MergeSort(int[] arr) {
    if (arr.Length <= 1) return arr;
    int mid = arr.Length / 2;
    int[] left = MergeSort(arr.Take(mid).ToArray());
    int[] right = MergeSort(arr.Skip(mid).ToArray());
    return Merge(left, right);
}

private int[] Merge(int[] left, int[] right) {
    List<int> result = new List<int>();
    int i = 0, j = 0;
    while (i < left.Length && j < right.Length) {
        if (left[i] < right[j]) result.Add(left[i++]);
        else result.Add(right[j++]);
    }
    result.AddRange(left.Skip(i));
    result.AddRange(right.Skip(j));
    return result.ToArray();
}`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[5,2,8,3,9,1,7,4],r=n.length,i=[],a=(e,t)=>{if(e>=t)return;let n=Math.floor((e+t)/2);i.push({type:`DIVIDE`,l:e,r:t,mid:n}),a(e,n),a(n+1,t),i.push({type:`MERGE`,l:e,mid:n,r:t})};return a(0,r-1),{array:n,originalArray:[...n],steps:i,stepPtr:0,phase:`READY`,l:0,r:r-1,mid:Math.floor((r-1)/2),activeIndices:[],sortedIndices:[],comparisons:0,log:{title:`Merge Sort`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{array:t,steps:n,stepPtr:r,phase:i}=e;if(r>=n.length&&i===`DONE`)return{...e,isFinished:!0};let a=n[r],o={...e,activeIndices:[],swapIndices:[]};if(i===`READY`||i===`DONE`){if(r>=n.length)return{...o,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`Sorted ✓`,type:`success`,messageKey:`SORTED`}};if(a.type===`DIVIDE`)return{...o,phase:`DIVIDING`,l:a.l,r:a.r,mid:a.mid,activeIndices:[a.l,a.r,a.mid],log:{title:`Dividing`,type:`info`,messageKey:`DIVIDING`,params:{l:a.l,r:a.r,mid:a.mid,midPlusOne:a.mid+1}}};if(a.type===`MERGE`){let e=t.slice(a.l,a.mid+1),n=t.slice(a.mid+1,a.r+1);return{...o,phase:`MERGING`,l:a.l,r:a.r,mid:a.mid,leftArr:e,rightArr:n,i:0,j:0,k:a.l,tempArr:[],activeIndices:[a.l,a.r],log:{title:`Merging`,type:`info`,messageKey:`MERGING_SEGMENTS`,params:{l:a.l,mid:a.mid,midPlusOne:a.mid+1,r:a.r}}}}}if(i===`DIVIDING`)return{...o,phase:`DONE`,stepPtr:r+1};if(i===`MERGING`){let{leftArr:n,rightArr:i,i:a,j:s,tempArr:c,l,mid:u,r:d}=e;if(a<n.length&&s<i.length)if(o.comparisons+=1,n[a]<=i[s]){let e=n[a];return{...o,i:a+1,tempArr:[...c,e],activeIndices:[l+a,u+1+s],log:{title:`Taking Left`,type:`match`,messageKey:`TAKING_LEFT`,params:{val:e}}}}else{let e=i[s];return{...o,j:s+1,tempArr:[...c,e],activeIndices:[l+a,u+1+s],log:{title:`Taking Right`,type:`mismatch`,messageKey:`TAKING_RIGHT`,params:{val:e}}}}if(a<n.length){let e=n[a];return{...o,i:a+1,tempArr:[...c,e],activeIndices:[l+a],log:{title:`Taking Left`,type:`info`,messageKey:`TAKING_LEFT`,params:{val:e}}}}if(s<i.length){let e=i[s];return{...o,j:s+1,tempArr:[...c,e],activeIndices:[u+1+s],log:{title:`Taking Right`,type:`info`,messageKey:`TAKING_RIGHT`,params:{val:e}}}}let f=[...t];for(let e=0;e<c.length;e++)f[l+e]=c[e];return{...o,array:f,phase:`DONE`,stepPtr:r+1,activeIndices:[...Array(c.length).keys()].map(e=>l+e),log:{title:`Copying Back`,type:`shift`,messageKey:`COPYING_BACK`,params:{l,r:d}}}}return o}}),Me=N({id:`quicklomuto`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`6, 2, 8, 4, 9, 3, 7, 5`,pattern:``}},homeCard:{name:`Quick Sort (Lomuto)`,difficulty:`Medium`,description:`An efficient divide-and-conquer sort that uses the Lomuto partition scheme with a fixed pivot.`,complexity:{timeBest:`Ω(n log(n))`,timeAvg:`Θ(n log(n))`,timeWorst:`O(n^2)`,space:`O(log(n))`}},algorithmPage:{uiConfig:{statusLabel:`Segment: [{l}..{r}]`,startButton:`Start`,playbackSpeed:200},extendedDescription:`Quick Sort (Lomuto) is a highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays. The Lomuto partition scheme chooses a pivot that is typically the last element in the array. The algorithm maintains two pointers as it scans the array, one to track the boundary of the smaller elements and another to scan the array.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Pivot`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Scanning`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Smaller`,color:`bg-sky-500/60`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}]},visualSteps:{READY:{title:`Ready`,message:`Initializing Quick Sort using the Lomuto Partition Scheme.

• Strategy: Select a pivot and partition the array around it.

• Optimization: Using fixed pivot (last element) for clarity in demonstrating basic partitioning.`,highlights:{pseudo:[1,2,3,4,5],javascript:[1,2,3,4,5],python:[1,2,3,4,5],csharp:[1,2,3,4,5]}},START_PARTITION:{title:`Partitioning`,message:`Partitioning subarray [{l}..{r}] with pivot {pivot}.

• The boundary 'i' will track the tail of elements ≤ pivot.

• Scan pointer 'j' will iterate through the segment.`,highlights:{pseudo:[7,8,9,10],javascript:[10,11,12,13],python:[9,10,11,12],csharp:[9,10,11,12]}},SWAP_SMALLER:{title:`Swapping`,message:`Element {val} < pivot ({pivot}).

• Incrementing partition boundary 'i' to index {nextI}.

• Performing in-place swap to move {val} into lower partition.`,highlights:{pseudo:[11,12,13],javascript:[14,15,16],python:[13,14,15],csharp:[13,14,15,16]}},KEEP_LARGER:{title:`Comparing`,message:`Element {val} ≥ pivot ({pivot}).

• This element belongs in the upper partition.

• Advancing scan pointer 'j' without moving the boundary.`,highlights:{pseudo:[11],javascript:[14],python:[13],csharp:[13]}},PLACE_PIVOT:{title:`Placing Pivot`,message:`Partitioning segment scan complete.

• Finalizing: Moving pivot {pivot} from index {r} to its resolved position at {pivotPos}.

• This ensures all elements to the left are ≤ pivot.`,highlights:{pseudo:14,javascript:19,python:16,csharp:[18,19,20]}},PIVOT_PLACED:{title:`Pivot Placed`,message:`Pivot successfully resolved at index {pivotPos}.

• Invariant: The element at {pivotPos} is in its final sorted position.

• Recursively applying the same logic to sub-segments.`,highlights:{pseudo:14,javascript:19,python:16,csharp:[18,19,20]}},SORTED:{title:`Sorted ✓`,message:`All recursive partitions have been resolved.

• Pivot invariants satisfied across the global array.

• Sort execution completed successfully.`,highlights:{pseudo:[1,2,3,4,5],javascript:7,python:7,csharp:1}}},codeSnippets:{pseudo:`QuickSort(A, low, high):
  if low < high:
    p = Partition(A, low, high)
    QuickSort(A, low, p - 1)
    QuickSort(A, p + 1, high)

Partition(A, low, high):
  pivot = A[high]
  i = low
  for j from low to high - 1:
    if A[j] < pivot:
      swap A[i] with A[j]
      i = i + 1
  swap A[i] with A[high]
  return i`,javascript:`function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  let pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}`,python:`def quick_sort(arr, left=0, right=None):
    if right is None: right = len(arr) - 1
    if left < right:
        pivot_index = partition(arr, left, right)
        quick_sort(arr, left, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, right)
    return arr

def partition(arr, left, right):
    pivot = arr[right]
    i = left - 1
    for j in range(left, right):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[right] = arr[right], arr[i + 1]
    return i + 1`,csharp:`public void QuickSort(int[] arr, int left, int right) {
    if (left < right) {
        int pivotIndex = Partition(arr, left, right);
        QuickSort(arr, left, pivotIndex - 1);
        QuickSort(arr, pivotIndex + 1, right);
    }
}

private int Partition(int[] arr, int left, int right) {
    int pivot = arr[right];
    int i = left - 1;
    for (int j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp2 = arr[i + 1];
    arr[i + 1] = arr[right];
    arr[right] = temp2;
    return i + 1;
}`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[6,2,8,4,9,3,7,5];return{array:n,calls:[{low:0,high:n.length-1}],currentCall:null,phase:`READY`,partitionState:null,activeIndices:[],pivotIndex:null,sortedIndices:[],swapIndices:[],comparisons:0,log:{title:`Quick Sort (Lomuto)`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{array:t,calls:n,phase:r,partitionState:i,currentCall:a,sortedIndices:o}=e,s={...e,activeIndices:[],swapIndices:[]};if(r===`READY`||r===`SORTED_SEGMENT`){if(n.length===0)return{...s,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`Sorted ✓`,type:`success`,messageKey:`SORTED`}};let e=n.pop();if(e.low>=e.high)return e.low===e.high&&(s.sortedIndices=[...o,e.low]),{...s,phase:`SORTED_SEGMENT`};let r=t[e.high];return{...s,phase:`PARTITIONING`,currentCall:e,partitionState:{i:e.low,j:e.low,pivot:r},activeIndices:[e.high],pivotIndex:e.high,log:{title:`Partitioning`,type:`info`,messageKey:`START_PARTITION`,params:{l:e.low,r:e.high,pivot:r}}}}if(r===`PARTITIONING`){let{high:e}=a,{i:n,j:r,pivot:o}=i;if(r<e)if(s.comparisons+=1,t[r]<o){let a=[...t];return[a[n],a[r]]=[a[r],a[n]],{...s,array:a,partitionState:{...i,i:n+1,j:r+1},activeIndices:[n,r],swapIndices:[n,r],pivotIndex:e,log:{title:`Swapping`,type:`match`,messageKey:`SWAP_SMALLER`,params:{val:t[r],pivot:o,nextI:n+1}}}}else return{...s,partitionState:{...i,j:r+1},activeIndices:[r],pivotIndex:e,log:{title:`Comparing`,type:`info`,messageKey:`KEEP_LARGER`,params:{val:t[r],pivot:o}}};let c=[...t];return[c[n],c[e]]=[c[e],c[n]],{...s,array:c,phase:`PIVOT_PLACED_PHASE`,pivotPos:n,activeIndices:[n,e],swapIndices:[n,e],log:{title:`Placing Pivot`,type:`shift`,messageKey:`PLACE_PIVOT`,params:{pivot:o,r:e,pivotPos:n}}}}if(r===`PIVOT_PLACED_PHASE`){let{low:t,high:r}=a,{pivotPos:i}=e,c=[...n];return c.push({low:i+1,high:r}),c.push({low:t,high:i-1}),{...s,phase:`SORTED_SEGMENT`,calls:c,sortedIndices:[...o,i],pivotIndex:null,log:{title:`Pivot Placed`,type:`success`,messageKey:`PIVOT_PLACED`,params:{pivotPos:i}}}}return s}}),Ne=N({id:`quick-hoare`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`5, 3, 8, 4, 2, 7, 1, 6`,pattern:``}},homeCard:{name:`Quick Sort (Hoare)`,difficulty:`Hard`,description:`An efficient version of Quick Sort using the Hoare partition scheme, which typically involves fewer swaps than Lomuto.`,complexity:{timeBest:`׸(n log n)`,timeAvg:`׸(n log n)`,timeWorst:`׸(n²)`,space:`׸(log n)`}},algorithmPage:{uiConfig:{statusLabel:`Pivot: {pivotVal}`,startButton:`Start`,playbackSpeed:300},extendedDescription:`Quick Sort with Hoare partition scheme uses two indices that start at the ends of the partition being analyzed, then move toward each other until they find an inversion: a pair of elements, one greater than or equal to the pivot, one less than or equal, that are in the wrong order relative to each other.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Pivot`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Scanning`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Swap`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}]},visualSteps:{READY:{title:`Ready`,message:`Hoare Partitioning Initiated.

• Two pointers (i, j) will scan from both ends.
• Elements are swapped when they are on the 'wrong' side of the pivot.`,highlights:{pseudo:[1],javascript:[1],python:[1]}},START_PARTITION:{title:`Start Partition`,message:`Initializing partition [{l}, {r}] with pivot {pivot}.`,highlights:{pseudo:[2],javascript:[3],python:[3]}},MOVING_I:{title:`Moving i`,message:`Scanning from left: {val} < {pivot}. Incrementing i.`,highlights:{pseudo:[3],javascript:[4],python:[4]}},I_STOPPED:{title:`i Stopped`,message:`i stopped at {val} (>= {pivot}).`,highlights:{pseudo:[3],javascript:[4],python:[4]}},MOVING_J:{title:`Moving j`,message:`Scanning from right: {val} > {pivot}. Decrementing j.`,highlights:{pseudo:[4],javascript:[5],python:[5]}},J_STOPPED:{title:`j Stopped`,message:`j stopped at {val} (<= {pivot}).`,highlights:{pseudo:[4],javascript:[5],python:[5]}},SWAPPING:{title:`Swapping`,message:`Inversion found at i={i}, j={j}. Swapping {valI} and {valJ}.`,highlights:{pseudo:[5],javascript:[7],python:[7]}},CROSSED:{title:`Pointers Crossed`,message:`i={i} >= j={j}. Partition complete at index {j}.`,highlights:{pseudo:[6],javascript:[6],python:[6]}},SORTED:{title:`Sorted ✓`,message:`Sorting Complete. Hoare partition successfully resolved all ranges.`,highlights:{pseudo:1,javascript:1,python:1}}},codeSnippets:{pseudo:`function quickSortHoare(arr, low, high):
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
    swap(arr[i], arr[j])`,javascript:`function quickSortHoare(arr, low, high) {
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
}`,python:`def quick_sort_hoare(arr, low, high):
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
        arr[i], arr[j] = arr[j], arr[i]`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[5,8,1,9,3,7,2,6];return{phase:0,stack:[[0,n.length-1]],array:[...n],activeIndices:[],sortedIndices:[],swapIndices:[],pivotIndex:-1,log:{title:`Ready`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{phase:t}=e,n={...e,activeIndices:[],swapIndices:[]};if(t===0){let{array:e,stack:t}=n;if(t.length===0)return{...n,isFinished:!0,sortedIndices:[...Array(e.length).keys()],log:{title:`Sorted ✓`,type:`success`,messageKey:`SORTED`}};let r=[...t],[i,a]=r.pop();if(i>=a)return i===a&&(n.sortedIndices=[...new Set([...n.sortedIndices,i])]),{...n,stack:r,phase:0};let o=Math.floor((i+a)/2),s=e[o];return{...n,phase:1,stack:r,l:i,r:a,pivot:s,pivotIndex:o,i:i-1,j:a+1,log:{title:`Start Partition`,type:`info`,messageKey:`START_PARTITION`,params:{l:i,r:a,pivot:s}}}}if(t===1){let{array:e,i:t,pivot:r}=n,i=t+1;return e[i]<r?{...n,i,activeIndices:[i],log:{title:`Moving i`,type:`info`,messageKey:`MOVING_I`,params:{val:e[i],pivot:r}}}:{...n,i,phase:2,activeIndices:[i],log:{title:`i Stopped`,type:`match`,messageKey:`I_STOPPED`,params:{val:e[i],pivot:r}}}}if(t===2){let{array:e,j:t,pivot:r}=n,i=t-1;return e[i]>r?{...n,j:i,activeIndices:[i],log:{title:`Moving j`,type:`info`,messageKey:`MOVING_J`,params:{val:e[i],pivot:r}}}:{...n,j:i,phase:3,activeIndices:[i],log:{title:`j Stopped`,type:`match`,messageKey:`J_STOPPED`,params:{val:e[i],pivot:r}}}}if(t===3){let{array:e,l:t,r,i,j:a,stack:o,pivotIndex:s}=n;if(i>=a){let e=[...o,[a+1,r],[t,a]];return{...n,phase:0,stack:e,activeIndices:[i,a],pivotIndex:-1,log:{title:`Pointers Crossed`,type:`shift`,messageKey:`CROSSED`,params:{i,j:a}}}}let c=[...e],l=s;return i===s?l=a:a===s&&(l=i),[c[i],c[a]]=[c[a],c[i]],{...n,array:c,phase:1,swapIndices:[i,a],pivotIndex:l,log:{title:`Swapping`,type:`shift`,messageKey:`SWAPPING`,params:{i,j:a,valI:e[i],valJ:e[a]}}}}return n}}),Pe=N({id:`counting`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`4, 2, 6, 1, 3, 2, 5, 1`,pattern:``}},homeCard:{name:`Counting Sort`,difficulty:`Medium`,description:`Counts the number of times an element occurs, then calculates its position in the output array.`,complexity:{timeBest:`Ω(n + k)`,timeAvg:`Θ(n + k)`,timeWorst:`O(n + k)`,space:`O(k)`}},algorithmPage:{uiConfig:{statusLabel:`Range: 0-{maxVal}`,startButton:`Start`,playbackSpeed:200},extendedDescription:`Counting Sort is a non-comparative sorting algorithm that works by counting the number of objects having distinct key values.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Counting`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Calculating`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}]},visualSteps:{READY:{title:`Ready`,message:`Commencing Counting Sort: A non-comparative integer sorting algorithm.

• Mechanism: Mapping input values to indices in an auxiliary frequency array.
• Requirement: Input domain must be constrained within a known, finite range [0, k].`,highlights:{pseudo:[1],javascript:[1],python:[1]}},INITIALIZING:{title:`Initializing`,message:`Allocating auxiliary resources.

• Action: Constructing a 'Count Array' of size {maxVal} + 1.
• Purpose: To track the occurrence frequency of each unique element.`,highlights:{pseudo:[2,3],javascript:[2,3],python:[2,3]}},RECORDING_COUNT:{title:`Recording Count`,message:`Tallying Occurrence: {val}.

• Action: Incrementing countArray[{val}] to {newCountVal}.
• Strategy: Building a histogram of all input frequencies.`,highlights:{pseudo:[4],javascript:[6],python:[7]}},COUNTING_COMPLETE:{title:`Counting Complete`,message:`Frequency Mapping Finalized.

• State: The count array now contains the raw frequency of every input element.
• Next Step: Converting frequencies to cumulative positions.`,highlights:{pseudo:[4],javascript:[6],python:[7]}},ACCUMULATING:{title:`Accumulating`,message:`Calculating Cumulative Positions.

• countArray[{i}] updated to {newCountI}.
• Logic: Summing previous counts to determine the starting offset for value {i}.`,highlights:{pseudo:[5],javascript:[7],python:[9]}},CUMULATIVE_DONE:{title:`Prefix Sums Finalized`,message:`Cumulative Map Ready.

• Result: countArray now serves as a look-up table for the starting index of each element.
• Strategy: Preparing for stable output generation.`,highlights:{pseudo:[5],javascript:[7],python:[9]}},PLACING_ELEMENT:{title:`Stable Placement`,message:`Placing {val} into final position {pos}.

• Action: Mapping the input element to its calculated offset and decrementing the tracker.
• Stability: Processing from right-to-left to preserve original relative order.`,highlights:{pseudo:[6,7,8],javascript:[8,9,10],python:[10,11,12]}},SORT_COMPLETE:{title:`Sorted ✓`,message:`Counting Sort Complete!

• Result: Linear-time O(n+k) sort achieved without a single element comparison.
• Array is fully stabilized.`,highlights:{pseudo:[9],javascript:[12],python:[13]}}},codeSnippets:{pseudo:`function countingSort(arr):
  max = findMax(arr)
  count = array of zeros with size max + 1
  for x in arr: count[x]++
  for i from 1 to max: count[i] += count[i-1]
  for i from n-1 down to 0:
    output[count[arr[i]] - 1] = arr[i]
    count[arr[i]]--
  return output`,javascript:`function countingSort(arr) {
  let n = arr.length;
  let max = Math.max(...arr);
  let count = new Array(max + 1).fill(0);
  let output = new Array(n);
  for (let i = 0; i < n; i++) count[arr[i]]++;
  for (let i = 1; i <= max; i++) count[i] += count[i - 1];
  for (let i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  return output;
}`,python:`def counting_sort(arr):
    n = len(arr)
    max_val = max(arr)
    count = [0] * (max_val + 1)
    output = [0] * n
    for x in arr:
        count[x] += 1
    for i in range(1, max_val + 1):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]] -= 1
    return output`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[4,2,6,1,3,2,5,1];return{phase:0,i:0,array:n,countArray:[],maxVal:n.length>0?Math.max(...n):1,output:Array(n.length).fill(null),activeIndices:[],sortedIndices:[],swapIndices:[],log:{title:`READY`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{array:t,i:n,phase:r,countArray:i,maxVal:a,output:o}=e,s={...e,activeIndices:[],swapIndices:[]};if(r===0)return{...s,phase:1,countArray:Array(a+1).fill(0),log:{title:`INITIALIZING`,type:`info`,messageKey:`INITIALIZING`,params:{maxVal:a}}};if(r===1){if(n>=t.length)return{...s,phase:2,i:1,log:{title:`COUNTING COMPLETE`,type:`match`,messageKey:`COUNTING_COMPLETE`}};let e=t[n],r=[...i];return r[e]++,{...s,countArray:r,i:n+1,activeIndices:[n],log:{title:`RECORDING COUNT`,type:`info`,messageKey:`RECORDING_COUNT`,params:{i:n,val:e,newCountVal:r[e]}}}}if(r===2){if(n>a)return{...s,phase:3,i:t.length-1,log:{title:`CUMULATIVE DONE`,type:`match`,messageKey:`CUMULATIVE_DONE`}};let e=[...i];return e[n]+=e[n-1],{...s,countArray:e,i:n+1,log:{title:`ACCUMULATING`,type:`info`,messageKey:`ACCUMULATING`,params:{i:n,iMinusOne:n-1,newCountI:e[n]}}}}if(r===3){if(n<0)return{...s,isFinished:!0,array:o,sortedIndices:[...Array(t.length).keys()],log:{title:`SORTED ✓`,type:`success`,messageKey:`SORT_COMPLETE`}};let e=t[n],r=i[e]-1,a=[...i];a[e]--;let c=[...o];return c[r]=e,{...s,output:c,countArray:a,i:n-1,activeIndices:[n],swapIndices:[r],log:{title:`PLACING ELEMENT`,type:`shift`,messageKey:`PLACING_ELEMENT`,params:{val:e,i:n,pos:r}}}}return s}}),Fe=N({id:`bucket`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`42, 8, 76, 31, 95, 19, 58, 14`,pattern:``}},homeCard:{name:`Bucket Sort`,difficulty:`Medium`,description:`A distribution-based sort that partitions an array into several buckets, each of which is then sorted individually.`,complexity:{timeBest:`׸(n+k)`,timeAvg:`׸(n+k)`,timeWorst:`׸(n²)`,space:`׸(n)`}},algorithmPage:{uiConfig:{statusLabel:`Phase: {phaseName}`,startButton:`Start`,playbackSpeed:400},extendedDescription:`Bucket Sort works by distributing the elements of an array into several buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Bucketing`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Sorting`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}],visualSteps:{READY:{title:`Ready`,message:`Commencing Bucket Sort: A distribution-based sorting strategy.

• Strategy: Partitioning the input domain into several discrete 'buckets'.
• Objective: Distributing elements based on their relative magnitude to achieve near-linear performance.`,highlights:{pseudo:[1],javascript:[1,2],python:[1,2]}},DISTRIBUTING:{title:`Distributing`,message:`Assigning {val} to Bucket {bucketIdx}.

• Mapping Function: (val - min) / (max - min) * numBuckets.
• Note: Values within similar ranges are clustered together for localized sorting.`,highlights:{pseudo:[2,3],javascript:[4,5,6],python:[4,5,6]}},SORTING_BUCKETS:{title:`Sorting Buckets`,message:`Refining Local Partitions.

• Strategy: Sorting each bucket individually (typically using Insertion Sort).
• Note: High performance is achieved when elements are uniformly distributed.`,highlights:{pseudo:[4],javascript:[8,9],python:[8,9]}},CONCATENATING:{title:`Concatenating`,message:`Reconstructed Global Array.

• Action: Merging sorted buckets in sequential order.
• Result: A fully sorted array composed of ordered partitions.`,highlights:{pseudo:[5],javascript:[11],python:[11]}},SORTED:{title:`Sorted ✓`,message:`Bucket Sort Finalized!

• Result: All partitions merged and verified.
• Complexity: O(n+k) achieved for uniform distributions.`,highlights:{pseudo:[5],javascript:[11],python:[11]}}}},codeSnippets:{pseudo:`function bucketSort(arr):
  min = findMin(arr), max = findMax(arr)
  bucketCount = floor((max - min) / bucketSize) + 1
  buckets = list of empty buckets
  for x in arr:
    buckets[floor((x - min) / bucketSize)].append(x)

  arr = []
  for b in buckets:
    sort(b)
    arr.extend(b)
  return arr`,javascript:`function bucketSort(arr, bucketSize = 5) {
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
}`,python:`def bucket_sort(arr):
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
    return arr`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[42,8,76,31,95,19,58,14];return{phase:0,i:0,array:[...n],buckets:[[],[],[],[],[]],minVal:Math.min(...n),maxVal:Math.max(...n),activeIndices:[],sortedIndices:[],swapIndices:[],comparisons:0,log:{title:`Ready`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{array:t,i:n,phase:r,buckets:i,minVal:a,maxVal:o}=e,s={...e,activeIndices:[],swapIndices:[]};if(r===0){if(n>=t.length)return{...s,phase:1,i:0,log:{title:`Sorting Buckets`,type:`info`,messageKey:`SORTING_BUCKETS`}};let e=t[n],r=Math.min(Math.floor((e-a)/(o-a+1)*5),4),c=[...i];return c[r]=[...c[r],e],{...s,i:n+1,buckets:c,activeIndices:[n],log:{title:`Distributing`,type:`info`,messageKey:`DISTRIBUTING`,params:{val:e,bucketIdx:r,i:n}}}}if(r===1){if(n>=i.length)return{...s,phase:2,i:0,array:[],log:{title:`Concatenating`,type:`info`,messageKey:`CONCATENATING`}};let e=[...i];return e[n]=[...e[n]].sort((e,t)=>e-t),{...s,i:n+1,buckets:e,log:{title:`Sorting Buckets`,type:`info`,messageKey:`SORTING_BUCKETS`}}}if(r===2){if(n>=i.length)return{...s,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`Sorted ✓`,type:`success`,messageKey:`SORTED`}};let e=[...t,...i[n]];return{...s,i:n+1,array:e,log:{title:`Concatenating`,type:`info`,messageKey:`CONCATENATING`}}}return s}}),Ie=N({id:`radix`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`53, 17, 82, 34, 91, 26, 45, 68`,pattern:``}},homeCard:{name:`Radix Sort`,difficulty:`Hard`,description:`A non-comparative sorting algorithm that avoids comparison by creating and distributing elements into buckets according to their radix.`,complexity:{timeBest:`Ω(nk)`,timeAvg:`Θ(nk)`,timeWorst:`O(nk)`,space:`O(n+k)`}},algorithmPage:{uiConfig:{statusLabel:`Digit: {exp}`,startButton:`Start`,playbackSpeed:200},extendedDescription:`Radix Sort processes digits from least significant to most significant (LSD), using a stable sub-sort (like Counting Sort) for each position.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Digit Group`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Bucketing`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}]},visualSteps:{READY:{title:`Ready`,message:`LSD Radix Sort Initiated.

• Principle: Distributing keys into buckets based on individual digits.
• Strategy: Processing positions from Least Significant Digit (LSD) to Most Significant Digit (MSD).
• Requirement: Utilizing a stable sub-sorting algorithm for each pass.`,highlights:{pseudo:[1],javascript:[1],python:[1]}},PROCESSING_DIGIT:{title:`Processing Digit`,message:`Targeting the {exp}s digit position.

• Analysis: Isolating the digit at 10^{exp} place for every element.
• Objective: Distributing elements into 10 decimal buckets (0-9).`,highlights:{pseudo:[2,3],javascript:[2,3],python:[2,3]}},BUCKETING:{title:`Bucketing`,message:`Distribution: Value {val} → Bucket {digit}.

• Calculation: floor({val} / {exp}) % 10 = {digit}.
• Stability: Maintaining the relative order of elements with identical digits.`,highlights:{pseudo:[4],javascript:[4],python:[4]}},DISTRIBUTION_COMPLETE:{title:`Distribution Complete`,message:`Bucket Partitioning Finalized for {exp}s position.

• Action: Preparing to reconstruct the array from buckets in sequential order.`,highlights:{pseudo:[5],javascript:[5],python:[5]}},PASS_COMPLETE:{title:`Pass Complete`,message:`Array Reconstructed.

• State: The array is now stably sorted relative to the {exp}s digit position.
• Strategy: Advancing to the next significant digit (x10).`,highlights:{pseudo:[5],javascript:[5],python:[5]}},SORT_COMPLETE:{title:`Sorted ✓`,message:`Radix Sort Finalized!

• Result: All digit positions have been processed.
• Complexity: O(nk) achieved non-comparatively.`,highlights:{pseudo:[6],javascript:[6],python:[6]}}},codeSnippets:{pseudo:`function radixSort(arr):
  max = findMax(arr)
  exp = 1
  while max / exp > 0:
    countingSortByDigit(arr, exp)
    exp *= 10
function countingSortByDigit(arr, exp):
  n = arr.length
  output = array of size n
  count = array of size 10 (zeros)
  for x in arr:
    digit = (x / exp) % 10
    count[digit]++
  for i from 1 to 9: count[i] += count[i-1]
  for i from n-1 down to 0:
    digit = (arr[i] / exp) % 10
    output[count[digit] - 1] = arr[i]
    count[digit]--
  copy output to arr`,javascript:`function radixSort(arr) {
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortForRadix(arr, exp);
  }
  return arr;
}
function countingSortForRadix(arr, exp) {
  let n = arr.length;
  let output = new Array(n);
  let count = new Array(10).fill(0);
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  for (let i = n - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }
  for (let i = 0; i < n; i++) arr[i] = output[i];
}`,python:`def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_for_radix(arr, exp)
        exp *= 10
    return arr
def counting_sort_for_radix(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for x in arr:
        idx = (x // exp) % 10
        count[idx] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        idx = (arr[i] // exp) % 10
        output[count[idx] - 1] = arr[i]
        count[idx] -= 1
    for i in range(n):
        arr[i] = output[i]`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[53,17,82,34,91,26,45,68];return{phase:0,exp:1,array:n,maxVal:Math.max(...n),buckets:Array.from({length:10},()=>[]),i:0,activeIndices:[],sortedIndices:[],swapIndices:[],log:{title:`READY`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{array:t,exp:n,maxVal:r,phase:i,i:a,buckets:o}=e,s={...e,activeIndices:[],swapIndices:[]};if(i===0)return Math.floor(r/n)<=0?{...s,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`SORT COMPLETE`,type:`success`,messageKey:`SORT_COMPLETE`}}:{...s,phase:1,i:0,buckets:Array.from({length:10},()=>[]),log:{title:`PROCESSING ${n}s DIGIT`,type:`info`,messageKey:`PROCESSING_DIGIT`,params:{exp:n}}};if(i===1){if(a>=t.length)return{...s,phase:2,log:{title:`DISTRIBUTION COMPLETE`,type:`match`,messageKey:`DISTRIBUTION_COMPLETE`,params:{exp:n}}};let e=t[a],r=Math.floor(e/n%10),i=o.map((t,n)=>n===r?[...t,e]:t);return{...s,buckets:i,i:a+1,activeIndices:[a],log:{title:`BUCKETING`,type:`info`,messageKey:`BUCKETING`,params:{val:e,digit:r,exp:n}}}}if(i===2){let e=o.flat();return{...s,array:e,phase:0,exp:n*10,log:{title:`PASS COMPLETE`,type:`shift`,messageKey:`PASS_COMPLETE`,params:{exp:n}}}}return s}}),Le=N({id:`heapsort`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`3, 9, 2, 8, 1, 7, 4, 6`,pattern:``}},homeCard:{name:`Heap Sort`,difficulty:`Hard`,description:`Organizes elements into a binary heap to efficiently extract and sort the largest elements.`,complexity:{timeBest:`Ω(n log(n))`,timeAvg:`Θ(n log(n))`,timeWorst:`O(n log(n))`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Heap Size: {heapSize}`,startButton:`Start`,playbackSpeed:400},extendedDescription:`Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800/40 border-slate-700/50`},{label:`Heapified`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Checking`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Swap`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}]},visualSteps:{READY:{title:`Ready`,message:`Commencing Heap Sort: A comparison-based sort utilizing an implicit
  binary heap.

• Phase 1: Build-Max-Heap from the input array in O(n) time.

• Phase 2: Successively extract the maximum element to reconstruct
  the array in sorted order.`,highlights:{pseudo:[1,2,3],javascript:[1,2,3],python:[1,2,3],csharp:[1,2,3]}},MAX_HEAP_BUILT:{title:`Heap Ready`,message:`Max-Heap Construction Complete.

• Invariant: Every parent node is ≥ its children.

• Ready to transition to the extraction phase.`,highlights:{pseudo:[1,2,3],javascript:[3,4],python:[3,4],csharp:[3,4]}},HEAPIFYING:{title:`Heapifying`,message:`Invoking Max-Heapify on internal node at index {i}.

• Goal: Restore the max-heap property for this subtree.

• Sifting the element down to its valid hierarchical position.`,highlights:{pseudo:[10,11,12,13,14],javascript:3,python:3,csharp:3}},NODE_POSITIONED:{title:`Node Positioned`,message:`Subtree Invariant Satisfied.

• Node now satisfies the max-heap property relative to its children.`,highlights:{pseudo:[10,11],javascript:13,python:11,csharp:13}},SIFT_DOWN:{title:`Sifting Down`,message:`Sift-Down Operation: Parent {valParent} < Child {valChild}.

• Violates heap invariant. Performing swap to promote the larger child.`,highlights:{pseudo:[17,18,19,20,21],javascript:21,python:18,csharp:20}},EXTRACT_MAX:{title:`Extracting Max`,message:`Extraction Phase: Moving current maximum {valRoot} to resolved index {i}.

• Effectively removing the root from the heap.

• Decrementing active heap boundary to preserve the sorted partition.`,highlights:{pseudo:[5,6,7],javascript:6,python:7,csharp:7}},SORT_COMPLETE:{title:`Sorted ✓`,message:`Sort Completed Successfully.

• All elements extracted and heapified.

• Result: Fully sorted array with O(n log n) time complexity and O(1) auxiliary space.`,highlights:{pseudo:[1,2,3],javascript:10,python:9,csharp:1}}},codeSnippets:{pseudo:`HeapSort(A):
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
    MaxHeapify(A, largest)`,javascript:`function heapSort(arr) {
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
}`,python:`def heap_sort(arr):
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
        heapify(arr, n, largest)`,csharp:`public void HeapSort(int[] arr) {
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
}`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[3,9,2,8,1,7,4,6],r=n.length;return{phase:1,i:Math.floor(r/2)-1,siftIdx:null,heapSize:r,array:n,activeIndices:[],sortedIndices:[],swapIndices:[],comparisons:0,log:{title:`Heap Sort`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{array:t,i:n,heapSize:r,phase:i,sortedIndices:a,siftIdx:o}=e,s={...e,activeIndices:[],swapIndices:[]};if(i===1)return n<0?{...s,phase:2,i:t.length-1,siftIdx:null,log:{title:`Heap Ready`,type:`success`,messageKey:`MAX_HEAP_BUILT`}}:Re(s,r,o===null?n:o,1);if(i===2){if(r<=1)return{...s,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`Sorted ✓`,type:`success`,messageKey:`SORT_COMPLETE`}};if(s.subPhase===`HEAPIFYING`)return Re(s,r,o===null?0:o,2);let e=[...t];return[e[0],e[r-1]]=[e[r-1],e[0]],{...s,array:e,heapSize:r-1,subPhase:`HEAPIFYING`,siftIdx:0,swapIndices:[0,r-1],activeIndices:[0,r-1],sortedIndices:[...a,r-1],log:{title:`Extracting Max`,type:`shift`,messageKey:`EXTRACT_MAX`,params:{valRoot:t[0],i:r-1}}}}return s}});function Re(e,t,n,r){let{array:i}=e,a=n,o=2*n+1,s=2*n+2;if(o<t&&i[o]>i[a]&&(a=o),s<t&&i[s]>i[a]&&(a=s),a!==n){let t=[...i];return[t[n],t[a]]=[t[a],t[n]],{...e,array:t,siftIdx:a,activeIndices:[n,a],swapIndices:[n,a],log:{title:`Sifting Down`,type:`mismatch`,messageKey:`SIFT_DOWN`,params:{valParent:i[n],valChild:i[a]}}}}if(r===1){let t=e.i-1;return{...e,i:t,siftIdx:null,log:{title:`Heapifying`,type:`info`,messageKey:`HEAPIFYING`,params:{i:t}}}}else return{...e,subPhase:null,siftIdx:null,log:{title:`Node Positioned`,type:`match`,messageKey:`NODE_POSITIONED`}}}var ze=N({id:`shellsort`,metadata:{type:`sorting`,VisualiserType:`array`,category:`Sorting Algorithms`,defaultInputs:{target:`23, 29, 15, 19, 31, 7, 9, 5, 2`,pattern:``}},homeCard:{name:`Shell Sort`,difficulty:`Medium`,description:`Optimized insertion sort by using gaps to compare elements that are far apart.`,complexity:{timeBest:`Ω(n log n)`,timeAvg:`Θ(n(log n)^2)`,timeWorst:`O(n^2)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Gap: {gap}`,startButton:`Start`,playbackSpeed:200},extendedDescription:`Shell Sort is a generalization of insertion sort that allows the exchange of items that are far apart. The distance between elements decreases until it becomes 1 (standard insertion sort).`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Current`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Gap Compare`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Sorted`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}],visualSteps:{READY:{title:`Ready`,message:`Diminishing Increment Sort Initiated.

• Principle: Perform insertion sort on sub-lists of elements spaced by a 'gap'.
• Strategy: Gradually reduce the gap to 1 to finalize the sort.`,highlights:{pseudo:[1],javascript:[1],python:[1]}},GAP_SIZE:{title:`Gap Reduction`,message:`Reducing gap size to {gap}.

• Sub-lists are now defined by elements {gap} positions apart.
• Performing insertion sort on these coarse-grained sub-lists.`,highlights:{pseudo:[2],javascript:[2],python:[2]}},INSERTION_AT_GAP:{title:`Insertion Scan`,message:`Processing element {val} at index {i}.

• Comparing with elements {gap} positions behind.`,highlights:{pseudo:[3,4],javascript:[3,4],python:[3,4]}},GAP_SWAP:{title:`Gap Swap`,message:`Swapping {valLeft} and {valRight} across gap {gap}.

• Long-distance exchange reduces overall inversions quickly.`,highlights:{pseudo:5,javascript:5,python:5}},SORT_COMPLETE:{title:`Sorted ✓`,message:`Shell Sort Finalized.

• Final pass with gap=1 completed.
• Array is fully sorted.`,highlights:{pseudo:6,javascript:6,python:6}}}},codeSnippets:{pseudo:`function shellSort(arr):
  n = arr.length
  gap = floor(n / 2)
  while gap > 0:
    for i from gap to n-1:
      temp = arr[i], j = i
      while j >= gap and arr[j - gap] > temp:
        arr[j] = arr[j - gap]
        j -= gap
      arr[j] = temp
    gap = floor(gap / 2)
  return arr`,javascript:`function shellSort(arr) {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,python:`def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[23,29,15,19,31,7,9,5,2];return{phase:0,gap:Math.floor(n.length/2),i:Math.floor(n.length/2),j:Math.floor(n.length/2),array:n,activeIndices:[],sortedIndices:[],swapIndices:[],comparisons:0,log:{title:`READY`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{array:t,gap:n,i:r,j:i,phase:a}=e,o=t.length,s={...e,activeIndices:[],swapIndices:[]};if(a===0)return n<=0?{...s,isFinished:!0,sortedIndices:[...Array(o).keys()],log:{title:`SORTED ✓`,type:`success`,messageKey:`SORT_COMPLETE`}}:{...s,phase:1,i:n,log:{title:`GAP SIZE: ${n}`,type:`info`,messageKey:`GAP_SIZE`,params:{gap:n}}};if(a===1)return r>=o?{...s,phase:0,gap:Math.floor(n/2),log:{title:`PASS FINISHED`,type:`match`,messageKey:`PASS_FINISHED`,params:{gap:n}}}:{...s,phase:2,j:r,log:{title:`INSERTION AT GAP`,type:`info`,messageKey:`INSERTION_AT_GAP`,params:{val:t[r],i:r}}};if(a===2){if(i<n||t[i-n]<=t[i])return{...s,phase:1,i:r+1,activeIndices:[i],log:{title:`POSITION FOUND`,type:`match`,messageKey:`POSITION_FOUND`,params:{j:i}}};s.comparisons+=1,s.activeIndices=[i,i-n];let e=[...t];return[e[i],e[i-n]]=[e[i-n],e[i]],{...s,array:e,j:i-n,swapIndices:[i,i-n],log:{title:`GAP SWAP`,type:`shift`,messageKey:`GAP_SWAP`,params:{valLeft:t[i-n],valRight:t[i],gap:n}}}}return s}}),Be=t({bubble:()=>De,bucket:()=>Fe,cocktail:()=>Ae,counting:()=>Pe,heapsort:()=>Le,insertion:()=>ke,merge:()=>je,quickhoare:()=>Ne,quicklomuto:()=>Me,radix:()=>Ie,selection:()=>Oe,shellsort:()=>ze}),Ve=N({id:`linear`,metadata:{type:`searching`,VisualiserType:`array`,category:`Searching Algorithms`,defaultInputs:{target:`12, 5, 14, 8, 4, 11, 8, 15, 4, 6, 13, 10`,pattern:`13`}},homeCard:{name:`Linear Search`,difficulty:`Easy`,description:`A basic search algorithm that checks every element in the list sequentially until a match is found.`,complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(n)`,timeWorst:`O(n)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Index: {i}`,startButton:`Start`,playbackSpeed:400},extendedDescription:`Linear Search is the simplest search algorithm. It traverses the array from the first element to the last, comparing each element with the target value until a match is found or the end of the array is reached.`,legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Found`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`},{label:`Not Found`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`}],visualSteps:{READY:{title:`Ready`,message:`Commencing Linear Search: The most fundamental search strategy.

• Strategy: Sequential, exhaustive scan of the dataset.
• Objective: Locating the target value '{targetValue}' by checking every element from index 0.`,highlights:{pseudo:[1],javascript:[1],python:[1]}},STARTING_SEARCH:{title:`Starting Search`,message:`Initiating Scan.

• Action: Setting the initial probe pointer to index 0.
• Strategy: Advancing one element at a time until the target is found or the end is reached.`,highlights:{pseudo:[2],javascript:[2],python:[2]}},COMPARING:{title:`Comparing`,message:`Probe Evaluation: arr[{i}] = {val}.

• Comparison: {val} == {targetValue}?
• Action: If no match, incrementing the pointer and continuing the scan.`,highlights:{pseudo:[3],javascript:[3],python:[3]}},VALUE_FOUND:{title:`Match Found ✓`,message:`Target Synchronized!

• Result: Value '{targetValue}' located successfully at index {i}.
• Note: Linear complexity O(n) scan concluded.`,highlights:{pseudo:[4],javascript:[4],python:[4]}},NOT_FOUND:{title:`Not Found`,message:`Search Domain Exhausted.

• Result: Full traversal completed without locating '{targetValue}'.
• Conclusion: The value is not present in this dataset.`,highlights:{pseudo:[5],javascript:[5],python:[5]}}}},codeSnippets:{pseudo:`function linearSearch(list, target):
  for each element in list:
    if element == target:
      return its index
  return not found`,javascript:`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,python:`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`},getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[12,5,14,8,4,11,8,15,4,6,13,10],r=typeof e==`number`?e:Number.parseInt(e,10)||13;return{phase:0,i:0,targetValue:r,array:n,activeIndices:[],sortedIndices:[],comparisons:0,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{targetValue:r}}}},nextStep:e=>{let{array:t,i:n,targetValue:r,phase:i}=e,a=t.length,o={...e,activeIndices:[]};if(i===0)return{...o,phase:1,i:0,activeIndices:[0],log:{title:`STARTING SEARCH`,type:`info`,messageKey:`STARTING_SEARCH`,params:{targetValue:r}}};if(i===1){if(n>=a)return{...o,isFinished:!0,log:{title:`NOT FOUND`,type:`mismatch`,messageKey:`NOT_FOUND`,params:{targetValue:r}}};if(o.comparisons+=1,o.activeIndices=[n],t[n]===r)return{...o,isFinished:!0,sortedIndices:[n],log:{title:`VALUE FOUND!`,type:`success`,messageKey:`VALUE_FOUND`,params:{i:n,targetValue:r}}};{let e=n+1;return{...o,i:e,activeIndices:e<a?[e]:[],log:{title:`COMPARING`,type:`info`,messageKey:`COMPARING`,params:{i:n,val:t[n],targetValue:r}}}}}return o}}),He=N({id:`binarysearch`,metadata:{type:`searching`,VisualiserType:`array`,category:`Searching Algorithms`,defaultInputs:{target:`3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53`,pattern:`26`}},homeCard:{name:`Binary Search`,difficulty:`Easy`,description:`An efficient search algorithm for sorted lists that repeatedly halves the search interval.`,complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(log n)`,timeWorst:`O(log n)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Range: [{l}, {r}]`,startButton:`Start`,playbackSpeed:300},extendedDescription:`Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Range Bounds`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Midpoint`,color:`bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]`},{label:`Found`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}],visualSteps:{READY:{title:`Ready`,message:`Commencing Binary Search: A logarithmic-time search strategy.

• Prerequisite: The search space MUST be sorted.
• Strategy: Repeatedly bisecting the active range to isolate the target value '{targetValue}'.`,highlights:{pseudo:[1],javascript:[1],python:[1]}},INITIALIZING:{title:`Initializing`,message:`Establishing initial boundaries.

• Action: Setting Left=0 and Right={lenMinusOne}.
• Scope: The entire array is currently in the potential search domain.`,highlights:{pseudo:[2,3,4],javascript:[2,3],python:[2,3]}},CALCULATING_MID:{title:`Calculating Mid`,message:`Bisecting the Range [{l}, {r}].

• Computation: Mid = floor({l} + {r}) / 2 = {mid}.
• Probe: Evaluating the element at the center of the current domain.`,highlights:{pseudo:[5,6],javascript:[6,7],python:[6,7]}},MATCH_FOUND:{title:`Match Found ✓`,message:`Target Synchronized!

• Result: arr[{mid}] == {targetValue}.
• Action: Terminating search and returning the target index.`,highlights:{pseudo:[7,8],javascript:[8,9,10],python:[8,9,10]}},SEARCH_RIGHT:{title:`Search Right`,message:`Target is Greater ({val} < {targetValue}).

• Deduction: The target must reside in the upper half of the current range.
• Action: Shifting the Left boundary to {midPlusOne}.`,highlights:{pseudo:[9,10],javascript:[11,12],python:[11,12]}},SEARCH_LEFT:{title:`Search Left`,message:`Target is Smaller ({val} > {targetValue}).

• Deduction: The target must reside in the lower half of the current range.
• Action: Shifting the Right boundary to {midMinusOne}.`,highlights:{pseudo:[11,12],javascript:[13,14],python:[13,14]}},NOT_FOUND:{title:`Not Found`,message:`Search Domain Exhausted.

• Boundary Condition: Left pointer has crossed Right pointer.
• Result: Target value '{targetValue}' is not present in the dataset.`,highlights:{pseudo:[13],javascript:[17],python:[17]}}}},codeSnippets:{pseudo:`function binarySearch(arr, target):
  low = 0, high = arr.length - 1
  while low <= high:
    mid = (low + high) / 2
    if arr[mid] == target:
      return mid
    else if arr[mid] < target:
      low = mid + 1
    else:
      high = mid - 1
  return -1`,javascript:`function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,python:`def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`},getInitialState:(e,t)=>{let n=[...Array.isArray(t)?t:[3,7,11,14,19,22,26,30,35,41,47,53]].sort((e,t)=>e-t),r=typeof e==`number`?e:Number.parseInt(e,10)||26;return{phase:0,l:0,r:n.length-1,mid:-1,targetValue:r,array:n,activeIndices:[],sortedIndices:[],pivotIndex:-1,comparisons:0,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{targetValue:r}}}},nextStep:e=>{let{phase:t,array:n,l:r,r:i,targetValue:a,mid:o}=e,s={...e,activeIndices:[],pivotIndex:-1};if(t===0)return{...s,phase:1,l:0,r:n.length-1,log:{title:`INITIALIZING`,type:`info`,messageKey:`INITIALIZING`,params:{targetValue:a,lenMinusOne:n.length-1}}};if(t===1){if(r>i)return{...s,isFinished:!0,log:{title:`NOT FOUND`,type:`mismatch`,messageKey:`NOT_FOUND`,params:{targetValue:a}}};let e=Math.floor((r+i)/2);return{...s,phase:2,mid:e,pivotIndex:e,activeIndices:[r,i],log:{title:`CALCULATING MID`,type:`info`,messageKey:`CALCULATING_MID`,params:{l:r,r:i,mid:e,val:n[e]}}}}return t===2?(s.comparisons+=1,s.pivotIndex=o,n[o]===a?{...s,isFinished:!0,sortedIndices:[o],log:{title:`MATCH FOUND!`,type:`success`,messageKey:`MATCH_FOUND`,params:{mid:o}}}:n[o]<a?{...s,phase:1,l:o+1,log:{title:`SEARCH RIGHT`,type:`match`,messageKey:`SEARCH_RIGHT`,params:{val:n[o],targetValue:a,midPlusOne:o+1,r:i}}}:{...s,phase:1,r:o-1,log:{title:`SEARCH LEFT`,type:`mismatch`,messageKey:`SEARCH_LEFT`,params:{val:n[o],targetValue:a,midMinusOne:o-1,l:r}}}):s}}),Ue=N({id:`jumpsearch`,metadata:{type:`searching`,VisualiserType:`array`,category:`Searching Algorithms`,defaultInputs:{target:`3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53`,pattern:`30`}},homeCard:{name:`Jump Search`,difficulty:`Easy`,description:`An algorithm for sorted arrays that jumps ahead by fixed steps and then performs a linear search.`,complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(√n)`,timeWorst:`O(√n)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Index: {prev}`,startButton:`Start`,playbackSpeed:300},extendedDescription:`Jump Search works on sorted arrays. It checks elements at fixed intervals (jumps) of size √n. Once it finds a block where the target might be, it performs a linear search within that block to find the exact position.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Jump Bound`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Linear Search`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Found`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}],visualSteps:{READY:{title:`Ready`,message:`Commencing Jump Search: A block-based searching strategy.

• Prerequisite: The search space MUST be sorted.
• Strategy: Jumping ahead by fixed intervals (steps) to isolate a candidate block of size √n ≈ {step}.`,highlights:{pseudo:[1],javascript:[1],python:[1]}},JUMPING:{title:`Jumping`,message:`Evaluating Jump Point {currentJump} (Value: {val}).

• Observation: {val} < {targetValue}.
• Action: Skipping the current block and jumping to index {nextI}.`,highlights:{pseudo:[2,3],javascript:[4,5],python:[4,5]}},BLOCK_IDENTIFIED:{title:`Block Identified`,message:`Candidate Segment Isolated: [{prev}, {curr}].

• Deduction: The target '{targetValue}' must reside within this specific block.
• Strategy: Switching to a sequential linear scan to locate the exact position.`,highlights:{pseudo:[4],javascript:[7],python:[7]}},LINEAR_SCAN:{title:`Linear Scan`,message:`Probing Segment Sequentially.

• Action: Checking index {prev} in the identified block.
• Objective: Performing final character-by-character validation.`,highlights:{pseudo:[5],javascript:[8],python:[8]}},MATCH_FOUND:{title:`Match Found ✓`,message:`Target Synchronized!

• Result: Value '{targetValue}' located successfully at index {prev}.
• Note: O(√n) performance achieved through balanced jumping and scanning.`,highlights:{pseudo:[6],javascript:[9],python:[9]}},NOT_FOUND:{title:`Not Found`,message:`Search Domain Exhausted.

• Result: Linear scan of the candidate block completed without locating '{targetValue}'.
• Conclusion: The value is not present in this dataset.`,highlights:{pseudo:[7],javascript:[11],python:[11]}}}},codeSnippets:{pseudo:`function jumpSearch(arr, target):
  n = arr.length, step = sqrt(n)
  prev = 0
  while arr[min(step, n)-1] < target:
    prev = step
    step += sqrt(n)
    if prev >= n: return -1
  while arr[prev] < target:
    prev += 1
    if prev == min(step, n): return -1
  if arr[prev] == target: return prev
  return -1`,javascript:`function jumpSearch(arr, target) {
  let n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }
  if (arr[prev] === target) return prev;
  return -1;
}`,python:`import math
def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while arr[min(step, n)-1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n: return -1
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n): return -1
    if arr[prev] == target: return prev
    return -1`},getInitialState:(e,t)=>{let n=[...Array.isArray(t)?t:[3,7,11,14,19,22,26,30,35,41,47,53]].sort((e,t)=>e-t),r=typeof e==`number`?e:Number.parseInt(e,10)||30,i=Math.floor(Math.sqrt(n.length));return{phase:0,i:0,prev:0,step:i,targetValue:r,array:n,activeIndices:[],sortedIndices:[],pivotIndex:-1,comparisons:0,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{step:i}}}},nextStep:e=>{let{array:t,i:n,prev:r,step:i,targetValue:a,phase:o}=e,s=t.length,c={...e,activeIndices:[],pivotIndex:-1};if(o===0){let e=Math.min(n,s-1);return c.activeIndices=[e],c.comparisons+=1,t[e]<a&&n<s?{...c,prev:n,i:n+i,log:{title:`JUMPING`,type:`info`,messageKey:`JUMPING`,params:{currentJump:e,val:t[e],targetValue:a,step:i,nextI:n+i}}}:{...c,phase:1,i:Math.min(n,s-1),log:{title:`BLOCK IDENTIFIED`,type:`match`,messageKey:`BLOCK_IDENTIFIED`,params:{prev:r,curr:Math.min(n,s-1),targetValue:a}}}}return o===1?r>n?{...c,isFinished:!0,log:{title:`NOT FOUND`,type:`mismatch`,messageKey:`NOT_FOUND`,params:{targetValue:a}}}:(c.activeIndices=[r],c.comparisons+=1,t[r]===a?{...c,isFinished:!0,sortedIndices:[r],log:{title:`MATCH FOUND!`,type:`success`,messageKey:`MATCH_FOUND`,params:{prev:r}}}:{...c,prev:r+1,log:{title:`LINEAR SCAN`,type:`info`,messageKey:`LINEAR_SCAN`,params:{prev:r}}}):c}}),We=N({id:`exponentialsearch`,metadata:{type:`searching`,VisualiserType:`array`,category:`Searching Algorithms`,defaultInputs:{target:`3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53`,pattern:`47`}},homeCard:{name:`Exponential Search`,difficulty:`Medium`,description:`Finds a range where the target may exist by doubling the index, then performs binary search.`,complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(log n)`,timeWorst:`O(log n)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Index: {i}`,startButton:`Start`,playbackSpeed:300},extendedDescription:`Exponential Search starts by checking index 0. If not found, it repeatedly doubles the index (1, 2, 4, 8...) until it finds an element greater than the target or hits the end. Finally, it runs Binary Search on the range between the last two indices.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Exponential Bound`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Binary Search`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Found`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}],visualSteps:{READY:{title:`Ready`,message:`Commencing Exponential Search: A dynamic range-finding strategy.

• Prerequisite: The search space MUST be sorted.
• Strategy: Finding an upper bound for the search range by exponentially increasing the index (1, 2, 4, 8...).`,highlights:{pseudo:[1],javascript:[1],python:[1]}},FOUND_AT_0:{title:`Found at 0 ✓`,message:`Target Synchronized at Origin!

• Result: arr[0] == {targetValue}.
• Action: Immediate termination; target located at the first element.`,highlights:{pseudo:[2],javascript:[4],python:[4]}},STARTING_JUMPS:{title:`Starting Jumps`,message:`Origin Mismatch. Initiating Exponential Probing.

• Action: Setting the initial jump pointer to index 1.
• Objective: Doubling the index until an element greater than '{targetValue}' is encountered.`,highlights:{pseudo:[3],javascript:[5],python:[5]}},DOUBLING_INDEX:{title:`Doubling Index`,message:`Exponential Leap: Checking index {i} (Value: {val}).

• Observation: {val} ≤ {targetValue}.
• Action: Doubling search pointer from {i} to {nextI}.`,highlights:{pseudo:[4],javascript:[6,7],python:[6,7]}},BOUNDS_FOUND:{title:`Bounds Found`,message:`Search Window Isolated: [{left}, {right}].

• Deduction: The target MUST reside within this specific sub-range.
• Strategy: Switching to Binary Search for logarithmic refinement.`,highlights:{pseudo:[5],javascript:[9],python:[9]}},BS_CALC_MID:{title:`BS: Calc Mid`,message:`Binary Refinement: Range [{l}, {r}].

• Midpoint: {mid} (Value: {val}).
• Strategy: Bisecting the isolated exponential window.`,highlights:{pseudo:[6],javascript:[11],python:[11]}},BS_MATCH_FOUND:{title:`Match Found ✓`,message:`Target Synchronized!

• Result: Value located at index {mid} during binary refinement.
• Note: Highly efficient O(log i) performance achieved.`,highlights:{pseudo:[7],javascript:[12],python:[12]}},BS_SEARCH_RIGHT:{title:`BS: Search Right`,message:`Target is Greater ({val} < {targetValue}).

• Action: Shifting binary search window to the right half: [{midPlusOne}, {r}].`,highlights:{pseudo:[8],javascript:[14],python:[14]}},BS_SEARCH_LEFT:{title:`BS: Search Left`,message:`Target is Smaller ({val} > {targetValue}).

• Action: Shifting binary search window to the left half: [{l}, {midMinusOne}].`,highlights:{pseudo:[9],javascript:[16],python:[16]}},BS_NOT_FOUND:{title:`Not Found`,message:`Search Domain Exhausted.

• Result: Target value '{targetValue}' not found within the exponential window.
• Conclusion: Value is not present in the dataset.`,highlights:{pseudo:[10],javascript:[18],python:[18]}}}},codeSnippets:{pseudo:`function exponentialSearch(arr, target):
  if arr[0] == target: return 0
  i = 1
  while i < arr.length and arr[i] <= target:
    i = i * 2
  return binarySearch(arr, target, i/2, min(i, arr.length-1))`,javascript:`function exponentialSearch(arr, target) {
  if (arr[0] === target) return 0;
  let i = 1;
  while (i < arr.length && arr[i] <= target) {
    i = i * 2;
  }
  return binarySearch(arr, target, i/2, Math.min(i, arr.length - 1));
}`,python:`def exponential_search(arr, target):
    if arr[0] == target: return 0
    i = 1
    while i < len(arr) and arr[i] <= target:
        i = i * 2
    return binary_search(arr, target, i//2, min(i, len(arr)-1))`},getInitialState:(e,t)=>{let n=[...Array.isArray(t)?t:[3,7,11,14,19,22,26,30,35,41,47,53]].sort((e,t)=>e-t),r=typeof e==`number`?e:Number.parseInt(e,10)||47;return{phase:0,i:1,l:0,r:0,mid:-1,targetValue:r,array:n,activeIndices:[],sortedIndices:[],pivotIndex:-1,comparisons:0,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{targetValue:r}}}},nextStep:e=>{let{targetValue:t,phase:n,array:r,i,l:a,r:o,mid:s}=e,c=r.length,l={...e,activeIndices:[],pivotIndex:-1};if(n===0)return l.activeIndices=[0],l.comparisons+=1,r[0]===t?{...l,isFinished:!0,sortedIndices:[0],log:{title:`FOUND AT 0`,type:`success`,messageKey:`FOUND_AT_0`}}:{...l,phase:1,i:1,log:{title:`STARTING EXPONENTIAL JUMPS`,type:`info`,messageKey:`STARTING_JUMPS`,params:{targetValue:t}}};if(n===1){if(i<c&&r[i]<=t){l.activeIndices=[i],l.comparisons+=1;let e=i*2;return{...l,i:e,log:{title:`DOUBLING INDEX`,type:`info`,messageKey:`DOUBLING_INDEX`,params:{i,val:r[i],targetValue:t,nextI:e}}}}let e=Math.floor(i/2),n=Math.min(i,c-1);return{...l,phase:2,l:e,r:n,log:{title:`BOUNDS FOUND`,type:`match`,messageKey:`BOUNDS_FOUND`,params:{left:e,right:n}}}}if(n===2){if(a>o)return{...l,isFinished:!0,log:{title:`NOT FOUND`,type:`mismatch`,messageKey:`BS_NOT_FOUND`,params:{targetValue:t}}};let e=Math.floor((a+o)/2);return l.pivotIndex=e,l.activeIndices=[a,o],{...l,phase:3,mid:e,log:{title:`BS: CALC MID`,type:`info`,messageKey:`BS_CALC_MID`,params:{l:a,r:o,mid:e,val:r[e]}}}}return n===3?(l.comparisons+=1,l.pivotIndex=s,r[s]===t?{...l,isFinished:!0,sortedIndices:[s],log:{title:`MATCH FOUND!`,type:`success`,messageKey:`BS_MATCH_FOUND`,params:{mid:s}}}:r[s]<t?{...l,phase:2,l:s+1,log:{title:`BS: SEARCH RIGHT`,type:`match`,messageKey:`BS_SEARCH_RIGHT`,params:{val:r[s],targetValue:t,midPlusOne:s+1,r:o}}}:{...l,phase:2,r:s-1,log:{title:`BS: SEARCH LEFT`,type:`mismatch`,messageKey:`BS_SEARCH_LEFT`,params:{val:r[s],targetValue:t,l:a,midMinusOne:s-1}}}):l}}),Ge=N({id:`interpolationsearch`,metadata:{type:`searching`,VisualiserType:`array`,category:`Searching Algorithms`,defaultInputs:{target:`4, 9, 10, 11, 27, 43, 49, 55, 56 57, 63, 69`,pattern:`27`}},homeCard:{name:`Interpolation Search`,difficulty:`Medium`,description:`An improved binary search for uniformly distributed sorted arrays that estimates the targets location.`,complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(log log n)`,timeWorst:`O(n)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Estimate: {pos}`,startButton:`Start`,playbackSpeed:800},extendedDescription:`Interpolation Search is an algorithm for searching for a key in an array that has been ordered by numerical values assigned to the keys. It parallels how humans search through a telephone book for a name: it estimates the position based on the value, rather than always checking the midpoint.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Estimated Pos`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Range Bounds`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Found`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}],visualSteps:{READY:{title:`Ready`,message:`Commencing Interpolation Search: A value-based estimation strategy.

• Prerequisite: The search space MUST be sorted and ideally uniformly distributed.
• Strategy: Estimating the target's position based on its magnitude relative to the range boundaries.`,highlights:{pseudo:[1],javascript:[1],python:[1]}},OUT_OF_BOUNDS:{title:`Out of Bounds`,message:`Search Domain Violation.

• Observation: Target value '{targetValue}' is outside the range [{low}, {high}].
• Result: Terminating search; the value cannot exist in this sorted segment.`,highlights:{pseudo:[2],javascript:[4],python:[4]}},ESTIMATING_POSITION:{title:`Estimating Position`,message:`Interpolating Probe Index.

• Calculation: pos = low + [(target - arr[low]) * (high - low) / (arr[high] - arr[low])] = {pos}.
• Strategy: Probing the array at the estimated location rather than the center.`,highlights:{pseudo:[3],javascript:[5],python:[5]}},MATCH_FOUND:{title:`Match Found ✓`,message:`Target Synchronized!

• Result: Value '{targetValue}' located exactly at index {pos}.
• Note: Highly efficient O(log log n) performance achieved for uniform data.`,highlights:{pseudo:[4],javascript:[7],python:[7]}},ESTIMATE_TOO_LOW:{title:`Estimate Too Low`,message:`Probe Value '{val}' < Target '{targetValue}'.

• Deduction: The target must reside in the upper segment.
• Action: Shifting the 'low' boundary to {low} (pos + 1).`,highlights:{pseudo:[5],javascript:[9],python:[9]}},ESTIMATE_TOO_HIGH:{title:`Estimate Too High`,message:`Probe Value '{val}' > Target '{targetValue}'.

• Deduction: The target must reside in the lower segment.
• Action: Shifting the 'high' boundary to {high} (pos - 1).`,highlights:{pseudo:[6],javascript:[11],python:[11]}}}},codeSnippets:{pseudo:`function interpolationSearch(arr, target):
  low = 0, high = arr.length - 1
  while low <= high and target >= arr[low] and target <= arr[high]:
    pos = low + ((target - arr[low]) * (high - low) / (arr[high] - arr[low]))
    if arr[pos] == target: return pos
    if arr[pos] < target: low = pos + 1
    else: high = pos - 1
  return -1`,javascript:`function interpolationSearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    let pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`,python:`def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and target >= arr[low] and target <= arr[high]:
        pos = low + ((target - arr[low]) * (high - low) // (arr[high] - arr[low]))
        if arr[pos] == target: return pos
        if arr[pos] < target: low = pos + 1
        else: high = pos - 1
    return -1`},getInitialState:(e,t)=>{let n=[...Array.isArray(t)?t:[3,9,15,21,27,33,39,45,51,57,63,69]].sort((e,t)=>e-t),r=typeof e==`number`?e:Number.parseInt(e,10)||39;return{phase:0,low:0,high:n.length-1,pos:-1,targetValue:r,array:n,activeIndices:[],sortedIndices:[],pivotIndex:-1,comparisons:0,log:{title:`Ready`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{array:t,low:n,high:r,targetValue:i,phase:a}=e,o={...e,activeIndices:[],pivotIndex:-1};if(a===0){if(n>r||i<t[n]||i>t[r])return{...o,isFinished:!0,log:{title:`OUT OF BOUNDS`,type:`mismatch`,messageKey:`OUT_OF_BOUNDS`,params:{targetValue:i,low:n,high:r}}};let e;return e=t[r]===t[n]?n:n+Math.floor((i-t[n])*(r-n)/(t[r]-t[n])),{...o,phase:1,pos:e,pivotIndex:e,activeIndices:[n,r],log:{title:`ESTIMATING POSITION`,type:`info`,messageKey:`ESTIMATING_POSITION`,params:{pos:e}}}}if(a===1){let{pos:n}=e;return o.comparisons+=1,o.pivotIndex=n,t[n]===i?{...o,isFinished:!0,sortedIndices:[n],log:{title:`MATCH FOUND!`,type:`success`,messageKey:`MATCH_FOUND`,params:{pos:n}}}:t[n]<i?{...o,phase:0,low:n+1,log:{title:`ESTIMATE TOO LOW`,type:`match`,messageKey:`ESTIMATE_TOO_LOW`,params:{pos:n,val:t[n],targetValue:i}}}:{...o,phase:0,high:n-1,log:{title:`ESTIMATE TOO HIGH`,type:`mismatch`,messageKey:`ESTIMATE_TOO_HIGH`,params:{pos:n,val:t[n],targetValue:i}}}}return o}}),Ke=N({id:`quickselect`,metadata:{type:`searching`,VisualiserType:`array`,category:`Searching Algorithms`,defaultInputs:{target:`5, 2, 8, 3, 9, 1, 7, 4`,pattern:`3`}},homeCard:{name:`Quickselect`,difficulty:`Medium`,description:`A selection algorithm to find the k-th smallest element in an unordered list.`,complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n)`,timeWorst:`O(n²)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`K: {targetK}`,startButton:`Start`,playbackSpeed:300},extendedDescription:`Quickselect is a selection algorithm related to the QuickSort sorting algorithm. It has average-case linear time complexity. Like QuickSort, it is efficient in practice and has good cache performance.`,legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Pivot`,color:`bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]`},{label:`Scanning`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Found`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`}],visualSteps:{INITIALIZING:{title:`Initializing`,message:`Commencing Quickselect: A selection algorithm with average linear time complexity.

• Objective: Identifying the {targetK}-th smallest element (Target Index: {k}).
• Mechanism: Utilizing partitioning logic similar to Quicksort to isolate the k-th position.`,highlights:{pseudo:[1],javascript:[1],python:[1]}},START_PARTITION:{title:`Start Partition`,message:`Isolating Domain [{l}, {r}].

• Strategy: Choosing pivot '{pivot}' from the current segment.
• Objective: Rearranging elements so that those smaller than the pivot reside on its left.`,highlights:{pseudo:[2],javascript:[4],python:[4]}},SWAP_SMALLER:{title:`Swap Smaller`,message:`Partitioning: {val} < {pivot}.

• Action: Moving '{val}' to the 'smaller' partition at index {i}.
• Strategy: Building the left-side segment of elements smaller than the pivot.`,highlights:{pseudo:[3],javascript:[6],python:[6]}},CONTINUE_SCAN:{title:`Continue Scan`,message:`Partitioning: {val} ≥ {pivot}.

• Logic: Element '{val}' belongs to the 'larger' partition.
• Action: Continuing scan at the next index.`,highlights:{pseudo:[3],javascript:[7],python:[7]}},PIVOT_PLACED:{title:`Pivot Placed`,message:`Pivot Alignment Finalized.

• Result: Pivot '{pivot}' moved to its final sorted position at index {i}.
• Note: All elements to the left are smaller, and all to the right are larger.`,highlights:{pseudo:[4],javascript:[9],python:[9]}},FOUND:{title:`Match Found ✓`,message:`Target Synchronized!

• Result: The pivot landed exactly at index {k}.
• Conclusion: The {kPlusOne}-th smallest element is confirmed as {val}.`,highlights:{pseudo:[5],javascript:[11],python:[11]}},SEARCH_LEFT:{title:`Search Left`,message:`Strategic Branching: pivotIndex ({pivotIdx}) > k ({k}).

• Deduction: The target {targetK}-th element must reside in the LEFT partition.
• Action: Pruning the right partition and recursing into [{l}, {pivotIdxMinusOne}].`,highlights:{pseudo:[6],javascript:[13],python:[13]}},SEARCH_RIGHT:{title:`Search Right`,message:`Strategic Branching: pivotIndex ({pivotIdx}) < k ({k}).

• Deduction: The target {targetK}-th element must reside in the RIGHT partition.
• Action: Pruning the left partition and recursing into [{pivotIdxPlusOne}, {r}].`,highlights:{pseudo:[7],javascript:[15],python:[15]}},ERROR:{title:`Error`,message:`Domain Violation: Search space exhausted without locating the target index.`,highlights:{pseudo:[],javascript:[],python:[]}}}},codeSnippets:{pseudo:`function quickselect(list, left, right, k):
  if left == right: return list[left]
  pivotIndex = partition(list, left, right)
  if k == pivotIndex: return list[k]
  else if k < pivotIndex:
    return quickselect(list, left, pivotIndex - 1, k)
  else:
    return quickselect(list, pivotIndex + 1, right, k)`,javascript:`function quickselect(arr, left, right, k) {
  if (left === right) return arr[left];
  let pivotIndex = partition(arr, left, right);
  if (k === pivotIndex) return arr[k];
  else if (k < pivotIndex) return quickselect(arr, left, pivotIndex - 1, k);
  else return quickselect(arr, pivotIndex + 1, right, k);
}`,python:`def quickselect(arr, left, right, k):
    if left == right: return arr[left]
    pivot_index = partition(arr, left, right)
    if k == pivot_index: return arr[k]
    elif k < pivot_index:
        return quickselect(arr, left, pivot_index - 1, k)
    else:
        return quickselect(arr, pivot_index + 1, right, k)`},getInitialState:(e,t)=>{let n=Array.isArray(t)?[...t]:[5,2,8,3,9,1,7,4],r=e;Array.isArray(e)&&(r=e[0]);let i=typeof r==`number`?r:Number.parseInt(r,10),a=Number.isNaN(i)?3:i,o=Math.max(0,a-1);return{phase:0,k:o,targetK:a,l:0,r:n.length-1,array:n,activeIndices:[],sortedIndices:[],pivotIndex:-1,isFinished:!1,comparisons:0,log:{title:`INITIALIZING`,type:`info`,messageKey:`INITIALIZING`,params:{k:o,targetK:a}}}},nextStep:e=>{let{array:t,l:n,r,k:i,phase:a}=e,o={...e,activeIndices:[],pivotIndex:-1};if(n>r)return{...o,isFinished:!0,log:{title:`ERROR`,type:`mismatch`,messageKey:`ERROR`}};if(a===0){let e=t[r];return{...o,phase:1,pivot:e,pivotIndex:r,i:n,j:n,log:{title:`START PARTITION`,type:`info`,messageKey:`START_PARTITION`,params:{l:n,r,pivot:e,k:i}}}}if(a===1){let{i:n,j:i,pivot:a}=e;if(i<r)if(o.activeIndices=[i,r],t[i]<a){let e=[...t];return[e[n],e[i]]=[e[i],e[n]],{...o,array:e,i:n+1,j:i+1,log:{title:`SWAP SMALLER`,type:`match`,messageKey:`SWAP_SMALLER`,params:{val:t[i],pivot:a,i:n}}}}else return{...o,j:i+1,log:{title:`CONTINUE SCAN`,type:`info`,messageKey:`CONTINUE_SCAN`,params:{val:t[i],pivot:a}}};else{let e=[...t];return[e[n],e[r]]=[e[r],e[n]],{...o,array:e,phase:2,pivotIndex:n,log:{title:`PIVOT PLACED`,type:`shift`,messageKey:`PIVOT_PLACED`,params:{i:n}}}}}if(a===2){let a=e.pivotIndex;return a===i?{...o,isFinished:!0,sortedIndices:[a],log:{title:`FOUND ✓`,type:`success`,messageKey:`FOUND`,params:{k:i,kPlusOne:i+1,val:t[a]}}}:a>i?{...o,phase:0,l:n,r:a-1,log:{title:`SEARCH LEFT`,type:`shift`,messageKey:`SEARCH_LEFT`,params:{pivotIdx:a,k:i,l:n,pivotIdxMinusOne:a-1}}}:{...o,phase:0,l:a+1,r,log:{title:`SEARCH RIGHT`,type:`shift`,messageKey:`SEARCH_RIGHT`,params:{pivotIdx:a,k:i,pivotIdxPlusOne:a+1,r}}}}return o}}),qe=t({binarysearch:()=>He,exponentialsearch:()=>We,interpolationsearch:()=>Ge,jumpsearch:()=>Ue,linear:()=>Ve,quickselect:()=>Ke}),Je={rows:15,cols:45},P=(e={})=>{let t=e.gridConfig||e||{},n=t.rows||Je.rows,r=t.cols||Je.cols,i=e=>{let t=Math.floor((e-1)/2);return Math.floor(Math.random()*t)*2+1},a=t.startNode||(()=>{let e=Math.max(3,Math.floor(n/5)),t=Math.max(3,Math.floor(r/5));return{r:i(e),c:i(t)}})(),o=t.endNode;if(!o){let e=Math.max(1,n-Math.max(3,Math.floor(n/5))),t=Math.max(1,r-Math.max(3,Math.floor(r/5))),i=(e,t)=>{let n=[];for(let r=e;r<t;r++)r%2==1&&n.push(r);return n.length>0?n:[e%2==1?e:e+1]},a=i(e,n-1),s=i(t,r-1);o={r:a[Math.floor(Math.random()*a.length)],c:s[Math.floor(Math.random()*s.length)]}}return{rows:n,cols:r,startNode:a,endNode:o}},Ye=(e,t,n,r)=>{let i=[],a=Array.from({length:e},()=>Array(t).fill(!0)),o=(n,r)=>{a[n][r]=!1;let i=[[0,2],[0,-2],[2,0],[-2,0]].sort(()=>Math.random()-.5);for(let[s,c]of i){let i=n+s,l=r+c;i>0&&i<e-1&&l>0&&l<t-1&&a[i][l]&&(a[n+s/2][r+c/2]=!1,o(i,l))}};if(o(1,1),e%2==0)for(let n=1;n<t-1;n++)a[e-3][n]||(a[e-2][n]=!1);if(t%2==0)for(let n=1;n<e-1;n++)a[n][t-3]||(a[n][t-2]=!1);for(let n=1;n<e-1;n++)for(let e=1;e<t-1;e++)a[n][e]&&Math.random()<.15&&(a[n][e]=!1);let s=n=>{if(!n)return;a[n.r][n.c]=!1;let r=[[0,1],[0,-1],[1,0],[-1,0]];if(!r.some(([r,i])=>{let o=n.r+r,s=n.c+i;return o>=0&&o<e&&s>=0&&s<t&&!a[o][s]}))for(let[i,o]of r){let r=n.r+i,s=n.c+o;if(r>=0&&r<e&&s>=0&&s<t){a[r][s]=!1;break}}};s(n),s(r);for(let o=0;o<e;o++)for(let e=0;e<t;e++)if(a[o][e]){if(n&&o===n.r&&e===n.c||r&&o===r.r&&e===r.c)continue;i.push({r:o,c:e})}return i},Xe=N({id:`bfs`,metadata:{type:`pathfinding`,VisualiserType:`grid`,category:`Pathfinding Algorithms`,defaultInputs:{target:``,pattern:``}},homeCard:{name:`Breadth-First Search`,difficulty:`Easy`,description:`Explores neighbors layer by layer to find the shortest path in an unweighted grid.`,complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(V + E)`,timeWorst:`O(V + E)`,space:`O(V)`}},algorithmPage:{uiConfig:{statusLabel:`Visited: {iterations}`,startButton:`Start`,playbackSpeed:100},extendedDescription:`Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the source node and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. In an unweighted grid, BFS is guaranteed to find the shortest path.`,legendItems:[{label:`Start`,color:`bg-amber-400 ring-2 ring-amber-400/30`},{label:`End`,color:`bg-emerald-500 ring-2 ring-emerald-500/30 `},{label:`Path`,color:`bg-sky-500/55`},{label:`Wall`,color:`bg-slate-700/90`},{label:`Visited`,color:`bg-indigo-600/45`}],visualSteps:{READY:{title:`Ready`,message:`BFS initialized. Ready to explore from ({startNode.r}, {startNode.c}) to ({endNode.r}, {endNode.c}).`,highlights:{pseudo:[1,2],javascript:[1,2,3],python:[1,2,3]}},SEARCHING:{title:`Exploring Neighbors`,message:`Visiting node at ({r}, {c}). Expanding search layer.`,highlights:{pseudo:[3,4],javascript:[4,5,6],python:[4,5,6]}},TARGET_REACHED:{title:`Target Found ✓`,message:`Reached the target node! Preparing to reconstruct the path.`,highlights:{pseudo:[5],javascript:[7],python:[7]}},BACKTRACKING:{title:`Reconstructing Path`,message:`Tracing back from target to start using parent pointers.`,highlights:{pseudo:[5],javascript:[7],python:[7]}},DONE:{title:`Path Complete ✓`,message:`Shortest path reconstructed successfully.`,highlights:{pseudo:[5],javascript:[7],python:[7]}},NO_PATH:{title:`No Path Found`,message:`Queue exhausted. No reachable path exists to the target.`,highlights:{pseudo:[3],javascript:[4],python:[4]}}}},codeSnippets:{pseudo:`function BFS(start, target):
  queue = [start], visited = {start}
  while queue is not empty:
    node = queue.shift()
    if node == target: return reconstructPath()
    for neighbor in neighbors(node):
      if neighbor not in visited:
        visited.add(neighbor)
        parent[neighbor] = node
        queue.push(neighbor)`,javascript:`function bfs(start, target) {
  const queue = [start];
  const visited = new Set([start.id]);
  while (queue.length > 0) {
    const node = queue.shift();
    if (node.id === target.id) return reconstruct(node);
    for (const neighbor of getNeighbors(node)) {
      if (!visited.has(neighbor.id)) {
        visited.add(neighbor.id);
        neighbor.parent = node;
        queue.push(neighbor);
      }
    }
  }
}`,python:`def bfs(start, target):
    queue = deque([start])
    visited = {start}
    while queue:
        node = queue.popleft()
        if node == target: return reconstruct(node)
        for neighbor in get_neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                neighbor.parent = node
                queue.append(neighbor)`},getInitialState:(e,t,n,r)=>{let{rows:i,cols:a,startNode:o,endNode:s}=P(r||n),c;if(r?.walls)c=r.walls instanceof Set?r.walls:new Set(r.walls.map(e=>`${e.r},${e.c}`));else{let e=Ye(i,a,o,s);c=new Set(e.map(e=>`${e.r},${e.c}`))}return{rows:i,cols:a,startNode:o,endNode:s,walls:c,visited:new Set,previous:{},queue:[o],path:[],phase:0,activeNode:null,isFinished:!1,iterations:0,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{startNode:o,endNode:s}}}},nextStep:e=>{let{visited:t,previous:n,queue:r,phase:i,rows:a,cols:o,endNode:s,path:c,walls:l}=e;if(i===0){if(r.length===0)return{...e,isFinished:!0,log:{title:`NO PATH`,type:`mismatch`,messageKey:`NO_PATH`}};let i=r[0],c=r.slice(1),u=`${i.r},${i.c}`;if(t.has(u))return{...e,queue:c};let d=new Set(t);if(d.add(u),i.r===s.r&&i.c===s.c)return{...e,visited:d,phase:1,activeNode:i,log:{title:`TARGET REACHED`,type:`success`,messageKey:`TARGET_REACHED`}};let f=[{r:i.r-1,c:i.c},{r:i.r+1,c:i.c},{r:i.r,c:i.c-1},{r:i.r,c:i.c+1}],p=[...c],m={...n};for(let e of f){let n=`${e.r},${e.c}`;e.r>=0&&e.r<a&&e.c>=0&&e.c<o&&!t.has(n)&&!l.has(n)&&(m[n]||(m[n]=i,p.push(e)))}return{...e,visited:d,queue:p,previous:m,iterations:e.iterations+1,activeNode:i,log:{title:`SEARCHING`,type:`info`,messageKey:`SEARCHING`,params:{r:i.r,c:i.c}}}}if(i===1){let t=n[c.length===0?`${s.r},${s.c}`:`${c[0].r},${c[0].c}`];return t?{...e,path:[t,...c],activeNode:t,log:{title:`BACKTRACKING`,type:`shift`,messageKey:`BACKTRACKING`,params:{r:t.r,c:t.c}}}:{...e,isFinished:!0,log:{title:`DONE ✓`,type:`success`,messageKey:`DONE`}}}return e}}),Ze=N({id:`dijkstra`,metadata:{type:`pathfinding`,VisualiserType:`grid`,category:`Pathfinding Algorithms`,defaultInputs:{target:``,pattern:``}},homeCard:{name:`Dijkstra's Algorithm`,difficulty:`Hard`,description:`Finds the absolute shortest path in a weighted grid by always exploring the node with the lowest cost.`,complexity:{timeBest:`Ω(V log V)`,timeAvg:`Θ(E + V log V)`,timeWorst:`O(E + V log V)`,space:`O(V)`}},algorithmPage:{uiConfig:{statusLabel:`Visited: {iterations}`,startButton:`Start`,playbackSpeed:100},extendedDescription:`Dijkstra's algorithm finds the shortest path between nodes in a graph. In a grid, it explores the nodes closest to the start first. When costs (weights) are involved, Dijkstra is the standard for guaranteed shortest paths.`,legendItems:[{label:`Start`,color:`bg-amber-400 ring-2 ring-amber-400/30`},{label:`End`,color:`bg-emerald-500 ring-2 ring-emerald-500/30 `},{label:`Path`,color:`bg-sky-500/55`},{label:`Wall`,color:`bg-slate-700/90`},{label:`Visited`,color:`bg-indigo-600/45`}],visualSteps:{READY:{title:`Ready`,message:`Dijkstra initialized. Ready to find the shortest path from ({startNode.r}, {startNode.c}) to ({endNode.r}, {endNode.c}).`,highlights:{pseudo:[1,2],javascript:[1,2,3,4,5],python:[1,2,3,4]}},EXPLORING:{title:`Exploring`,message:`Visiting node at ({r}, {c}) with cumulative distance {dist}.`,highlights:{pseudo:[3,4],javascript:[6,7],python:[5,6]}},TARGET_FOUND:{title:`Target Found ✓`,message:`Shortest path to target found! Reconstructing path.`,highlights:{pseudo:[5],javascript:[8],python:[7]}},BACKTRACKING:{title:`Reconstructing Path`,message:`Tracing back from target to start using parent pointers.`,highlights:{pseudo:[5],javascript:[8],python:[7]}},PATH_COMPLETE:{title:`Path Complete ✓`,message:`Absolute shortest path reconstructed successfully.`,highlights:{pseudo:[5],javascript:[8],python:[7]}},NO_PATH:{title:`No Path Found`,message:`Queue exhausted. Target is unreachable.`,highlights:{pseudo:[3],javascript:[6],python:[5]}}}},codeSnippets:{pseudo:`function Dijkstra(start, target):
  dist[start] = 0, queue = [all nodes]
  while queue is not empty:
    u = node in queue with min dist[u]
    if u == target: return reconstruct()
    for neighbor v of u:
      alt = dist[u] + weight(u, v)
      if alt < dist[v]:
        dist[v] = alt, prev[v] = u`,javascript:`function dijkstra(start, target) {
  const dist = {}, prev = {};
  const queue = new PriorityQueue();
  dist[start.id] = 0;
  queue.push(start, 0);
  while (!queue.isEmpty()) {
    const u = queue.pop();
    if (u.id === target.id) return reconstruct(u);
    for (const v of getNeighbors(u)) {
      const alt = dist[u.id] + v.weight;
      if (alt < (dist[v.id] || Infinity)) {
        dist[v.id] = alt;
        prev[v.id] = u;
        queue.push(v, alt);
      }
    }
  }
}`,python:`def dijkstra(start, target):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if u == target: return reconstruct(u)
        for v, weight in graph[u].items():
            alt = d + weight
            if alt < dist[v]:
                dist[v] = alt
                prev[v] = u
                heapq.heappush(pq, (alt, v))`},getInitialState:(e,t,n,r)=>{let{rows:i,cols:a,startNode:o,endNode:s}=P(r||n),c;if(r?.walls)c=r.walls instanceof Set?r.walls:new Set(r.walls.map(e=>`${e.r},${e.c}`));else{let e=Ye(i,a,o,s);c=new Set(e.map(e=>`${e.r},${e.c}`))}let l=r?.costs||Array(i).fill().map(()=>Array(a).fill().map(()=>Math.floor(Math.random()*9)+1)),u={},d=`${o.r},${o.c}`;return u[d]=0,{rows:i,cols:a,startNode:o,endNode:s,walls:c,costs:l,distances:u,visited:new Set,previous:{},queue:[o],path:[],phase:0,activeNode:null,isFinished:!1,iterations:0,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{startNode:o,endNode:s}}}},nextStep:e=>{let{distances:t,visited:n,previous:r,queue:i,phase:a,rows:o,cols:s,endNode:c,path:l,walls:u,costs:d}=e;if(a===0){if(i.length===0)return{...e,isFinished:!0,log:{title:`NO PATH`,type:`mismatch`,messageKey:`NO_PATH`}};let a=i.reduce((e,n)=>(t[`${n.r},${n.c}`]??1/0)<(t[`${e.r},${e.c}`]??1/0)?n:e,i[0]),l=i.filter(e=>e!==a),f=`${a.r},${a.c}`;if(n.has(f))return{...e,queue:l};let p=new Set(n);if(p.add(f),a.r===c.r&&a.c===c.c)return{...e,visited:p,phase:1,activeNode:a,log:{title:`TARGET FOUND`,type:`success`,messageKey:`TARGET_FOUND`}};let m=[{r:a.r-1,c:a.c},{r:a.r+1,c:a.c},{r:a.r,c:a.c-1},{r:a.r,c:a.c+1}],h={...t},g={...r},_=[...l];for(let e of m){let r=`${e.r},${e.c}`;if(e.r>=0&&e.r<o&&e.c>=0&&e.c<s&&!n.has(r)&&!u.has(r)){let n=d[e.r][e.c]||1,o=(t[f]??0)+n;o<(t[r]??1/0)&&(h[r]=o,g[r]=a,i.some(t=>t.r===e.r&&t.c===e.c)||_.push(e))}}return{...e,distances:h,visited:p,previous:g,queue:_,iterations:e.iterations+1,activeNode:a,log:{title:`EXPLORING`,type:`info`,messageKey:`EXPLORING`,params:{r:a.r,c:a.c,dist:h[f]}}}}if(a===1){let t=r[l.length===0?`${c.r},${c.c}`:`${l[0].r},${l[0].c}`];return t?{...e,path:[t,...l],activeNode:t,log:{title:`BACKTRACKING`,type:`shift`,messageKey:`BACKTRACKING`,params:{r:t.r,c:t.c}}}:{...e,isFinished:!0,log:{title:`PATH COMPLETE ✓`,type:`success`,messageKey:`PATH_COMPLETE`}}}return e}}),Qe=N({id:`dfs`,metadata:{type:`pathfinding`,VisualiserType:`grid`,category:`Pathfinding Algorithms`,defaultInputs:{target:``,pattern:``}},homeCard:{name:`Depth-First Search`,difficulty:`Medium`,description:`Explores as far as possible along each branch before backtracking. Not guaranteed to find the shortest path.`,complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(V + E)`,timeWorst:`O(V + E)`,space:`O(V)`}},algorithmPage:{uiConfig:{statusLabel:`Visited: {iterations}`,startButton:`Start`,playbackSpeed:100},extendedDescription:`Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking. Unlike BFS, DFS does not guarantee the shortest path in an unweighted grid.`,legendItems:[{label:`Start`,color:`bg-amber-400 ring-2 ring-amber-400/30`},{label:`End`,color:`bg-emerald-500 ring-2 ring-emerald-500/30 `},{label:`Path`,color:`bg-sky-500/55`},{label:`Wall`,color:`bg-slate-700/90`},{label:`Visited`,color:`bg-indigo-600/45`}],visualSteps:{READY:{title:`Ready`,message:`DFS initialized. Ready to explore from ({startNode.r}, {startNode.c}) to ({endNode.r}, {endNode.c}).`,highlights:{pseudo:[1,2],javascript:[1,2,3],python:[1,2,3]}},SEARCHING:{title:`Exploring Branch`,message:`Visiting node at ({r}, {c}). Exploring deeper into the current branch.`,highlights:{pseudo:[3,4],javascript:[4,5,6],python:[4,5,6]}},TARGET_REACHED:{title:`Target Found ✓`,message:`Reached the target node! Tracing the discovered path.`,highlights:{pseudo:[5],javascript:[7],python:[7]}},BACKTRACKING:{title:`Reconstructing Path`,message:`Tracing back from target to start using parent pointers.`,highlights:{pseudo:[5],javascript:[7],python:[7]}},DONE:{title:`Path Complete ✓`,message:`Path discovered and reconstructed.`,highlights:{pseudo:[5],javascript:[7],python:[7]}},NO_PATH:{title:`No Path Found`,message:`Stack exhausted. No reachable path exists to the target.`,highlights:{pseudo:[3],javascript:[4],python:[4]}}}},codeSnippets:{pseudo:`function DFS(start, target):
  stack = [start], visited = {start}
  while stack is not empty:
    node = stack.pop()
    if node == target: return reconstructPath()
    for neighbor in neighbors(node):
      if neighbor not in visited:
        visited.add(neighbor)
        parent[neighbor] = node
        stack.push(neighbor)`,javascript:`function dfs(start, target) {
  const stack = [start];
  const visited = new Set();
  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node.id)) continue;
    visited.add(node.id);
    if (node.id === target.id) return reconstruct(node);
    for (const neighbor of getNeighbors(node)) {
      if (!visited.has(neighbor.id)) {
        neighbor.parent = node;
        stack.push(neighbor);
      }
    }
  }
}`,python:`def dfs(start, target):
    stack = [start]
    visited = set()
    while stack:
        node = stack.pop()
        if node in visited: continue
        visited.add(node)
        if node == target: return reconstruct(node)
        for neighbor in get_neighbors(node):
            if neighbor not in visited:
                neighbor.parent = node
                stack.append(neighbor)`},getInitialState:(e,t,n,r)=>{let{rows:i,cols:a,startNode:o,endNode:s}=P(r||n),c;if(r?.walls)c=r.walls instanceof Set?r.walls:new Set(r.walls.map(e=>`${e.r},${e.c}`));else{let e=Ye(i,a,o,s);c=new Set(e.map(e=>`${e.r},${e.c}`))}return{rows:i,cols:a,startNode:o,endNode:s,walls:c,visited:new Set,previous:{},stack:[o],activeBranch:[o],path:[],phase:0,activeNode:null,isFinished:!1,iterations:0,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{startNode:o,endNode:s}}}},nextStep:e=>{let{visited:t,previous:n,stack:r,phase:i,rows:a,cols:o,endNode:s,path:c,walls:l}=e;if(i===0){if(r.length===0)return{...e,isFinished:!0,log:{title:`NO PATH`,type:`mismatch`,messageKey:`NO_PATH`}};let i=r[r.length-1],c=r.slice(0,-1),u=`${i.r},${i.c}`;if(t.has(u))return{...e,stack:c};let d=new Set(t);d.add(u);let f=[],p=i;for(;p;)f.push(p),p=n[`${p.r},${p.c}`];if(i.r===s.r&&i.c===s.c)return{...e,visited:d,phase:1,activeNode:i,activeBranch:f,log:{title:`TARGET REACHED`,type:`success`,messageKey:`TARGET_REACHED`}};let m=[{r:i.r+1,c:i.c},{r:i.r,c:i.c+1},{r:i.r-1,c:i.c},{r:i.r,c:i.c-1}],h=[...c],g={...n};for(let e of m){let n=`${e.r},${e.c}`;e.r>=0&&e.r<a&&e.c>=0&&e.c<o&&!t.has(n)&&!l.has(n)&&(g[n]=i,h.push(e))}return{...e,visited:d,stack:h,previous:g,iterations:e.iterations+1,activeNode:i,activeBranch:f,log:{title:`SEARCHING`,type:`info`,messageKey:`SEARCHING`,params:{r:i.r,c:i.c}}}}if(i===1){let t=n[c.length===0?`${s.r},${s.c}`:`${c[0].r},${c[0].c}`];return t?{...e,path:[t,...c],activeNode:t,log:{title:`BACKTRACKING`,type:`shift`,messageKey:`BACKTRACKING`,params:{r:t.r,c:t.c}}}:{...e,isFinished:!0,log:{title:`DONE ✓`,type:`success`,messageKey:`DONE`}}}return e}}),$e=N({id:`astar`,metadata:{type:`pathfinding`,VisualiserType:`grid`,category:`Pathfinding Algorithms`,defaultInputs:{target:``,pattern:``}},homeCard:{name:`A* Search`,difficulty:`Hard`,description:`An informed search algorithm that uses heuristics to find the shortest path more efficiently than Dijkstra.`,complexity:{timeBest:`Ω(E)`,timeAvg:`Θ(E)`,timeWorst:`O(E)`,space:`O(V)`}},algorithmPage:{uiConfig:{statusLabel:`Visited: {iterations}`,startButton:`Start`,playbackSpeed:100},extendedDescription:`A* is one of the most successful search algorithms to find the shortest path between nodes or graphs. It uses a heuristic function to estimate the cost from the current node to the target, prioritizing nodes that appear to be on the shortest path.`,legendItems:[{label:`Start`,color:`bg-amber-400 ring-2 ring-amber-400/30`},{label:`End`,color:`bg-emerald-500 ring-2 ring-emerald-500/30 `},{label:`Path`,color:`bg-sky-500/55`},{label:`Wall`,color:`bg-slate-700/90`},{label:`Visited`,color:`bg-indigo-600/45`}],visualSteps:{READY:{title:`Ready`,message:`A* initialized. Using Manhattan distance heuristic to find the path to ({endNode.r}, {endNode.c}).`,highlights:{pseudo:[1,2,3,4],javascript:[1,2,3],python:[1,2]}},SEARCHING:{title:`Exploring`,message:`Visiting node ({r}, {c}). g={gScore}, h={hScore}, f={fScore}.`,highlights:{pseudo:[5,6],javascript:[4,5],python:[4,5]}},TARGET_REACHED:{title:`Target Found ✓`,message:`A* reached the target! Optimal path found.`,highlights:{pseudo:[7],javascript:[6],python:[6]}},BACKTRACKING:{title:`Reconstructing Path`,message:`Tracing back from target to start using parent pointers.`,highlights:{pseudo:[7],javascript:[6],python:[6]}},DONE:{title:`Path Complete ✓`,message:`A* pathfinding completed successfully.`,highlights:{pseudo:[7],javascript:[6],python:[6]}},NO_PATH:{title:`No Path Found`,message:`Open set exhausted. No path exists to the target.`,highlights:{pseudo:[5],javascript:[4],python:[4]}}}},codeSnippets:{pseudo:`function AStar(start, target):
  openSet = [start]
  gScore[start] = 0
  fScore[start] = heuristic(start, target)
  while openSet is not empty:
    current = node in openSet with min fScore
    if current == target: return reconstruct()
    for neighbor in neighbors(current):
      tentativeG = gScore[current] + weight(current, neighbor)
      if tentativeG < gScore[neighbor]:
        prev[neighbor] = current
        gScore[neighbor] = tentativeG
        fScore[neighbor] = tentativeG + heuristic(neighbor, target)
        if neighbor not in openSet: openSet.push(neighbor)`,javascript:`function astar(start, target) {
  const openSet = new PriorityQueue();
  openSet.push(start, heuristic(start, target));
  while (!openSet.isEmpty()) {
    const current = openSet.pop();
    if (current.id === target.id) return reconstruct(current);
    for (const neighbor of getNeighbors(current)) {
      const tentativeG = gScore[current.id] + neighbor.weight;
      if (tentativeG < (gScore[neighbor.id] || Infinity)) {
        prev[neighbor.id] = current;
        gScore[neighbor.id] = tentativeG;
        fScore[neighbor.id] = tentativeG + heuristic(neighbor, target);
        openSet.push(neighbor, fScore[neighbor.id]);
      }
    }
  }
}`,python:`def a_star(start, target):
    open_set = [(heuristic(start, target), start)]
    g_score = {start: 0}
    while open_set:
        f, current = heapq.heappop(open_set)
        if current == target: return reconstruct(current)
        for neighbor, weight in get_neighbors(current):
            tentative_g = g_score[current] + weight
            if tentative_g < g_score.get(neighbor, float('inf')):
                prev[neighbor] = current
                g_score[neighbor] = tentative_g
                h = heuristic(neighbor, target)
                heapq.heappush(open_set, (tentative_g + h, neighbor))`},getInitialState:(e,t,n,r)=>{let{rows:i,cols:a,startNode:o,endNode:s}=P(r||n),c;if(r?.walls)c=r.walls instanceof Set?r.walls:new Set(r.walls.map(e=>`${e.r},${e.c}`));else{let e=Ye(i,a,o,s);c=new Set(e.map(e=>`${e.r},${e.c}`))}let l={},u={},d=`${o.r},${o.c}`;l[d]=0,u[d]=Math.abs(o.r-s.r)+Math.abs(o.c-s.c);let f=r?.costs||Array(i).fill().map(()=>Array(a).fill().map(()=>Math.floor(Math.random()*9)+1));return{rows:i,cols:a,startNode:o,endNode:s,walls:c,costs:f,gScore:l,fScore:u,visited:new Set,previous:{},openSet:[o],path:[],phase:0,activeNode:null,isFinished:!1,iterations:0,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{startNode:o,endNode:s}}}},nextStep:e=>{let{gScore:t,fScore:n,visited:r,previous:i,openSet:a,phase:o,rows:s,cols:c,endNode:l,path:u,walls:d,costs:f}=e;if(o===0){if(a.length===0)return{...e,isFinished:!0,log:{title:`NO PATH`,type:`mismatch`,messageKey:`NO_PATH`}};let o=a.reduce((e,t)=>(n[`${t.r},${t.c}`]??1/0)<(n[`${e.r},${e.c}`]??1/0)?t:e,a[0]),u=a.filter(e=>e!==o),p=`${o.r},${o.c}`;if(r.has(p))return{...e,openSet:u};let m=new Set(r);if(m.add(p),o.r===l.r&&o.c===l.c)return{...e,visited:m,phase:1,activeNode:o,log:{title:`TARGET REACHED`,type:`success`,messageKey:`TARGET_REACHED`}};let h=[{r:o.r-1,c:o.c},{r:o.r+1,c:o.c},{r:o.r,c:o.c-1},{r:o.r,c:o.c+1}],g={...t},_={...n},v={...i},y=[...u];for(let e of h){let n=`${e.r},${e.c}`;if(e.r>=0&&e.r<s&&e.c>=0&&e.c<c&&!r.has(n)&&!d.has(n)){let r=f[e.r][e.c]||1,i=(t[p]??0)+r;i<(t[n]??1/0)&&(v[n]=o,g[n]=i,_[n]=i+(Math.abs(e.r-l.r)+Math.abs(e.c-l.c)),y.some(t=>t.r===e.r&&t.c===e.c)||y.push(e))}}let b=Math.abs(o.r-l.r)+Math.abs(o.c-l.c);return{...e,gScore:g,fScore:_,visited:m,previous:v,openSet:y,iterations:e.iterations+1,activeNode:o,log:{title:`SEARCHING`,type:`info`,messageKey:`SEARCHING`,params:{r:o.r,c:o.c,gScore:g[p],hScore:b,fScore:_[p]}}}}if(o===1){let t=i[u.length===0?`${l.r},${l.c}`:`${u[0].r},${u[0].c}`];return t?{...e,path:[t,...u],activeNode:t,log:{title:`BACKTRACKING`,type:`shift`,messageKey:`BACKTRACKING`,params:{r:t.r,c:t.c}}}:{...e,isFinished:!0,log:{title:`DONE ✓`,type:`success`,messageKey:`DONE`}}}return e}}),et=t({astar:()=>$e,bfs:()=>Xe,dfs:()=>Qe,dijkstra:()=>Ze}),tt=N({id:`sunday`,metadata:{type:`pattern-matching`,VisualiserType:`pattern-matching`,category:`Pattern Matching Algorithms`,defaultInputs:{target:`THE FASTEST FOX TESTS ALL`,pattern:`TESTS`}},homeCard:{name:`Sunday Search`,difficulty:`Medium`,description:`A fast substring search algorithm that uses a look-ahead character to determine shift values.`,complexity:{timeBest:`Ω(n/m)`,timeAvg:`Θ(n)`,timeWorst:`O(nm)`,timePre:`O(m + Σ)`,space:`O(k)`}},algorithmPage:{uiConfig:{statusLabel:`Index: {currentIndex}`,startButton:`Start`,playbackSpeed:500},extendedDescription:`The Sunday Search algorithm is a variation of the Boyer-Moore algorithm. It is often faster in practice because it uses a simpler shift rule: it looks at the character in the text immediately following the current window. This "look-ahead" character alone determines the shift distance.`,legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Match`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`},{label:`Mismatch`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`}],auxDataConfig:{header:`Shift Table`,dataKey:`AuxShiftTableVisualiser`,type:`map`,description:`Stores the jump distance for the character immediately following the current window.`}},visualSteps:{READY:{title:`Ready`,message:`Commencing Sunday Search: An optimized string matching algorithm.

• Strategy: Utilizing a 'Look-Ahead' heuristic to maximize window translation distance.

• Mechanism: Evaluating the character immediately following the search window to determine the next jump.`,highlights:{pseudo:[1,2,3],javascript:[1,2,3,4],python:[1,2,3],csharp:[1,2,3]}},START_PHASE:{title:`Starting Window`,message:`Aligning Search Window.

• Current Scope: '{targetRange}' starting at index {currentIndex}.

• Objective: Initiating character-by-character verification from left to right.`,highlights:{pseudo:[5,6],javascript:[7,8],python:7,csharp:8}},CHAR_MATCH:{title:`Character Match`,message:`Local Correspondence: '{targetChar}' == '{patternChar}'.

• Correspondence validated at window offset {compIdx}.

• Strategy: Advancing to verify the next character in the pattern.`,highlights:{pseudo:6,javascript:[8,9],python:7,csharp:8}},MISMATCH_DETECTED:{title:`Mismatch`,message:`Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.

• Character violation at global text index {textIdx}.

• Action: Aborting current scan and querying the look-ahead character for shift resolution.`,highlights:{pseudo:[10,11,12],javascript:12,python:10,csharp:10}},SUCCESS_MATCH_FOUND:{title:`Match Found ✓`,message:`Pattern Instance Finalized!

• Result: Successful validation for all {m} pattern characters.

• Match identified at starting index {currentIndex}.`,highlights:{pseudo:[7,8,9],javascript:10,python:8,csharp:8}},IDENTIFY_LOOKAHEAD:{title:`Lookahead Heuristic`,message:`Heuristic Probe: Analyzing the look-ahead character.

• Encountered: '{char}' at text index {lookAheadIdx}.

• Strategy: Determining the shift based on this character's relative position in the pattern.`,highlights:{pseudo:[11,12],javascript:[12,13],python:[12,13],csharp:[12,13]}},SEARCH_TERMINATED:{title:`Search Terminated`,message:`Boundary Condition Encountered.

• Look-ahead index {lookAheadIdx} is outside the text buffer.

• Result: Execution terminated.`,highlights:{pseudo:[11,12],javascript:12,python:12,csharp:13}},LOOKUP_SHIFT:{title:`Lookup Shift`,message:`Shift Calculation: {charStatus}.

• Heuristic: Aligning the pattern's rightmost occurrence of '{char}' with the look-ahead position.

• Jump Distance: {shiftValue} units.`,highlights:{pseudo:12,javascript:13,python:13,csharp:14}},EXECUTING_SHIFT:{title:`Executing Shift`,message:`Window Translation Resolved.

• Search origin moved {shiftValue} positions to index {nextPos}.

• Strategy: Re-initiating character verification at the new alignment.`,highlights:{pseudo:12,javascript:13,python:13,csharp:14}}},codeSnippets:{pseudo:`SundaySearch(text, pattern):
  n = length(text), m = length(pattern)
  AuxShiftTableVisualiser = PrecomputeShifts(pattern)
  s = 0
  while s <= n - m:
    if Match(text[s...s+m-1], pattern):
      return s
    if s + m >= n: break
    s = s + AuxShiftTableVisualiser[text[s + m]]`,javascript:`function sundaySearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const AuxShiftTableVisualiser = buildShiftTable(pattern);
  let s = 0;

  while (s <= n - m) {
    let j = 0;
    while (j < m && pattern[j] === text[s + j]) j++;
    if (j === m) return s; // Found

    if (s + m >= n) break;
    s += AuxShiftTableVisualiser[text[s + m]] || (m + 1);
  }
  return -1;
}

function buildShiftTable(pattern) {
  const table = {};
  for (let i = 0; i < pattern.length; i++) {
    table[pattern[i]] = pattern.length - i;
  }
  return table;
}`,python:`def sunday_search(text, pattern):
    n, m = len(text), len(pattern)
    shift_table = {c: m - i for i, c in enumerate(pattern)}
    s = 0
    while s <= n - m:
        if text[s : s + m] == pattern:
            return s
        if s + m >= n:
            break
        s += shift_table.get(text[s + m], m + 1)
    return -1`,csharp:`public int SundaySearch(string text, string pattern) {
    int n = text.Length, m = pattern.Length;
    var AuxShiftTableVisualiser = new Dictionary<char, int>();
    for (int i = 0; i < m; i++) AuxShiftTableVisualiser[pattern[i]] = m - i;

    int s = 0;
    while (s <= n - m) {
        if (text.Substring(s, m) == pattern) return s;
        if (s + m >= n) break;
        s += AuxShiftTableVisualiser.ContainsKey(text[s + m]) ? AuxShiftTableVisualiser[text[s + m]] : m + 1;
    }
    return -1;
}`},getPreprocessing:(e,t)=>{let n={},r=t.length;for(let e=0;e<r;e++)n[t[e]]=r-e;return{AuxShiftTableVisualiser:n}},getInitialState:(e,t)=>({currentIndex:0,compIdx:0,phase:1,mismatchFound:!1,isFinished:!1,accessedIndices:[],activeIndices:[],log:{title:`Sunday Search`,type:`info`,messageKey:`READY`}}),nextStep:(e,t,n,r)=>{let{currentIndex:i,compIdx:a,phase:o}=e,s=t.length,c=n.length,{AuxShiftTableVisualiser:l}=r;if(o===1)return i>s-c?{...e,isFinished:!0,activeIndices:[],log:{title:`Not Found`,type:`error`,message:`Pattern not found in text.`}}:{...e,phase:2,compIdx:0,activeIndices:[i],log:{title:`Starting Window`,type:`info`,messageKey:`START_PHASE`,params:{currentIndex:i,targetRange:t.substr(i,c)}}};if(o===2)return t[i+a]===n[a]?a===c-1?{...e,isFinished:!0,activeIndices:[...Array(c).keys()].map(e=>i+e),log:{title:`Match Found ✓`,type:`success`,messageKey:`SUCCESS_MATCH_FOUND`,params:{currentIndex:i,m:c}}}:{...e,compIdx:a+1,activeIndices:[i+a+1],log:{title:`Character Match`,type:`match`,messageKey:`CHAR_MATCH`,params:{targetChar:t[i+a],patternChar:n[a],compIdx:a}}}:{...e,phase:3,mismatchFound:!0,activeIndices:[i+a],log:{title:`Mismatch`,type:`mismatch`,messageKey:`MISMATCH_DETECTED`,params:{targetChar:t[i+a],patternChar:n[a],textIdx:i+a}}};if(o===3){let n=i+c;return n>=s?{...e,isFinished:!0,activeIndices:[],log:{title:`Search Terminated`,type:`error`,messageKey:`SEARCH_TERMINATED`,params:{lookAheadIdx:n}}}:{...e,phase:4,lookAheadIdx:n,activeIndices:[n],log:{title:`Lookahead Heuristic`,type:`info`,messageKey:`IDENTIFY_LOOKAHEAD`,params:{char:t[n],lookAheadIdx:n}}}}if(o===4){let n=l[t[i+c]]||c+1;return{...e,phase:1,currentIndex:i+n,mismatchFound:!1,shiftValue:n,log:{title:`Executing Shift`,type:`shift`,messageKey:`EXECUTING_SHIFT`,params:{shiftValue:n,nextPos:i+n}}}}return e}}),nt=N({id:`naive`,metadata:{type:`pattern-matching`,VisualiserType:`pattern-matching`,category:`Pattern Matching Algorithms`,defaultInputs:{target:`THE FASTEST FOX WINS ALL`,pattern:`FAST`}},homeCard:{name:`Naive Search`,difficulty:`Easy`,description:`A simple brute-force substring search that checks all possible positions.`,complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n + m)`,timeWorst:`O(nm)`,space:`O(1)`}},algorithmPage:{uiConfig:{statusLabel:`Index: {currentIndex}`,startButton:`Start`,playbackSpeed:300},extendedDescription:`Naive Search (or Brute Force) is the simplest string-searching algorithm. It checks for the pattern at every possible position in the text. While simple, it can be inefficient for large texts or patterns with many repetitions.`,legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Match`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`},{label:`Mismatch`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`}],visualSteps:{READY:{title:`Ready`,message:`Commencing Naive (Brute-Force) Search.

• Strategy: Exhaustive character-by-character validation at every possible window alignment.
• Note: A simple but robust baseline for substring search comparisons.`,highlights:{pseudo:[1,2,3],javascript:[1,2,3,4],python:[1,2,3]}},CHAR_MATCH:{title:`Character Match`,message:`Local Correspondence: '{targetChar}' == '{patternChar}'.

• Alignment validated for the current pattern offset.
• Strategy: Advancing to the next character in the pattern sequence.`,highlights:{pseudo:[4,5],javascript:[7,8],python:[5]}},MISMATCH:{title:`Mismatch`,message:`Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.

• Violation identified at global text index {idx}.
• Action: Aborting current scan and shifting the window by exactly 1 position.`,highlights:{pseudo:[6],javascript:[8],python:[6]}},MATCH_FOUND:{title:`Match Found ✓`,message:`Pattern Instance Finalized!

• Result: Full character-by-character correspondence verified.
• Match identified at starting index {idx}.`,highlights:{pseudo:[7],javascript:[9],python:[7]}},SHIFTING:{title:`Shifting`,message:`Sliding Window: Origin translated from {currentIndex} to {nextPos}.

• Strategy: Resetting comparison pointers for the next exhaustive scan pass.`,highlights:{pseudo:[3],javascript:[5],python:[3]}},END_OF_TEXT:{title:`End of Text`,message:`Search Domain Exhausted.

• Final window alignment processed.
• Result: Execution terminated.`,highlights:{pseudo:[8],javascript:[10],python:[8]}}}},codeSnippets:{pseudo:`function naiveSearch(text, pattern):
  n = text.length, m = pattern.length
  for i from 0 to n - m:
    for j from 0 to m - 1:
      if text[i + j] != pattern[j]:
        break
    if j == m: return i
  return -1`,javascript:`function naiveSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  for (let i = 0; i <= n - m; i++) {
    let j;
    for (j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) break;
    }
    if (j === m) return i;
  }
  return -1;
}`,python:`def naive_search(text, pattern):
    n, m = len(text), len(pattern)
    for i in range(n - m + 1):
        match = True
        for j in range(m):
            if text[i + j] != pattern[j]:
                match = False
                break
        if match: return i
    return -1`},getInitialState:(e,t)=>({currentIndex:0,compIdx:0,phase:1,mismatchFound:!1,activeIndices:[],log:{title:`Ready`,type:`info`,messageKey:`READY`}}),nextStep:(e,t,n)=>{let{currentIndex:r,phase:i,compIdx:a}=e,o=n.length,s=t.length,c={...e,activeIndices:[]};if(i===1){let e=r+a,i=t[e],s=n[a];return c.activeIndices=[e],i===s?a+1===o?{...c,isFinished:!0,activeIndices:[...Array(o).keys()].map(e=>r+e),log:{title:`Match Found ✓`,type:`success`,messageKey:`MATCH_FOUND`,params:{m:o,idx:r}}}:{...c,compIdx:a+1,log:{title:`Match`,type:`match`,messageKey:`CHAR_MATCH`,params:{targetChar:i,patternChar:s}}}:{...c,mismatchFound:!0,phase:2,log:{title:`Mismatch`,type:`mismatch`,messageKey:`MISMATCH`,params:{idx:e,targetChar:i,patternChar:s}}}}if(i===2){let e=r+1;return e+o>s?{...c,currentIndex:e,isFinished:!0,log:{title:`End of Text`,type:`info`,messageKey:`END_OF_TEXT`,params:{nextPos:e}}}:{...c,currentIndex:e,phase:1,compIdx:0,mismatchFound:!1,log:{title:`Shifting`,type:`shift`,messageKey:`SHIFTING`,params:{currentIndex:r,nextPos:e}}}}return c}}),rt=N({id:`boyermoore`,metadata:{type:`pattern-matching`,VisualiserType:`pattern-matching`,category:`Pattern Matching Algorithms`,defaultInputs:{target:`THE FASTEST FOX TESTS ALL`,pattern:`TESTS`}},homeCard:{name:`Boyer-Moore`,difficulty:`Hard`,description:`An efficient search that compares right-to-left and uses the Bad Character rule to skip text.`,complexity:{timeBest:`Ω(n/m)`,timeAvg:`Θ(n)`,timeWorst:`O(nm)`,space:`O(k)`}},algorithmPage:{uiConfig:{statusLabel:`Index: {currentIndex}`,startButton:`Start`,playbackSpeed:300},extendedDescription:`Boyer-Moore is one of the most efficient string-searching algorithms. It compares the pattern against the text from right to left. Upon a mismatch, it uses the "Bad Character Rule" to shift the pattern by the maximum possible distance, often skipping large sections of the text.`,legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Match`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`},{label:`Mismatch`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`}],auxDataConfig:{header:`Bad Character Table`,dataKey:`badCharTable`,type:`map`,description:`Determines the shift based on the last occurrence of the mismatched character in the pattern.`,logic:`Shift = max(1, j - last_occurrence)`,defaultText:`Shift = m`},visualSteps:{READY:{title:`Ready`,message:`Commencing Boyer-Moore Search: A high-performance string matching algorithm.

• Strategy: Right-to-Left character verification combined with the 'Bad Character Heuristic'.
• Optimization: Skipping redundant segments by aligning the mismatch character with its rightmost occurrence in the pattern.`,highlights:{pseudo:[1,2,3],javascript:[1,2,3],python:[1,2,3]}},CHAR_MATCH:{title:`Right-to-Left Match`,message:`Local Correspondence: '{targetChar}' == '{patternChar}'.

• Alignment validated at the current offset.
• Strategy: Moving LEFT to verify the preceding character in the pattern sequence.`,highlights:{pseudo:7,javascript:8,python:7}},MISMATCH:{title:`Mismatch`,message:`Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.

• Character violation identified at text index {idx}.
• Action: Executing the Bad Character heuristic to determine the maximum safe shift.`,highlights:{pseudo:8,javascript:9,python:9}},BAD_CHAR_RULE:{title:`Bad Character Rule`,message:`Bad Character Heuristic: '{badChar}' {foundStatus}.

• Logic: Aligning the pattern's rightmost occurrence of '{badChar}' with the mismatched text character.
• Shift Distance: {shiftValue} units.`,highlights:{pseudo:11,javascript:12,python:12}},SHIFT_EXECUTED:{title:`Shift Executed`,message:`Window Jump Resolved.

• Search origin translated {shiftValue} positions to index {nextPos}.
• Strategy: Resetting comparison pointers for the next right-to-left verification pass.`,highlights:{pseudo:11,javascript:12,python:12}},MATCH_FOUND:{title:`Match Found ✓`,message:`Pattern Instance Finalized!

• Result: Successful right-to-left verification for all {m} pattern characters.
• Match identified at starting index {idx}.`,highlights:{pseudo:9,javascript:10,python:10}}}},codeSnippets:{pseudo:`function boyerMoore(text, pattern):
  n = text.length, m = pattern.length
  badCharTable = buildBadCharTable(pattern)
  s = 0
  while s <= n - m:
    j = m - 1
    while j >= 0 and pattern[j] == text[s + j]:
      j = j - 1
    if j < 0:
      return s
    else:
      s = s + max(1, j - badCharTable[text[s + j]])`,javascript:`function boyerMoore(text, pattern) {
  const n = text.length, m = pattern.length;
  const badCharTable = buildBadCharTable(pattern);
  let s = 0;
  while (s <= n - m) {
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[s + j]) j--;
    if (j < 0) return s;
    else s += Math.max(1, j - (badCharTable[text[s + j]] || -1));
  }
  return -1;
}`,python:`def boyer_moore(text, pattern):
    n, m = len(text), len(pattern)
    bad_char = build_bad_char(pattern)
    s = 0
    while s <= n - m:
        j = m - 1
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1
        if j < 0:
            return s
        else:
            s += max(1, j - bad_char.get(text[s + j], -1))
    return -1`},getPreprocessing:(e,t)=>{let n=e.length,r={};for(let t=0;t<n-1;t++)r[e[t]]=n-1-t;return{badCharTable:r,getShift:e=>r[e]||n}},getInitialState:(e,t)=>({currentIndex:0,compIdx:t.length-1,phase:1,mismatchFound:!1,activeIndices:[],log:{title:`Ready`,type:`info`,messageKey:`READY`}}),nextStep:(e,t,n,r)=>{let{currentIndex:i,phase:a,compIdx:o}=e,{getShift:s,badCharTable:c}=r,l=n.length,u=t.length,d={...e,activeIndices:[]};if(a===1){let e=i+o,r=t[e],a=n[o];return d.activeIndices=[e],r===a?o===0?{...d,isFinished:!0,activeIndices:[...Array(l).keys()].map(e=>i+e),log:{title:`Match Found ✓`,type:`success`,messageKey:`MATCH_FOUND`,params:{idx:i}}}:{...d,compIdx:o-1,log:{title:`Match`,type:`match`,messageKey:`CHAR_MATCH`,params:{compIdx:o}}}:{...d,mismatchFound:!0,phase:2,log:{title:`Mismatch`,type:`mismatch`,messageKey:`MISMATCH`,params:{idx:e}}}}if(a===2){let e=i+l-1,n=t[e],r=s(n);return{...d,phase:3,activeIndices:[e],log:{title:`Bad Character Rule`,type:`shift`,messageKey:`BAD_CHAR_RULE`,params:{badChar:n,shiftValue:r,foundStatus:c[n]?`exists in the pattern`:`is not in pattern`}}}}if(a===3){let e=t[i+l-1],n=s(e),r=i+n;return r+l>u?{...d,isFinished:!0,currentIndex:r,log:{title:`End of Text`,type:`info`,message:`Boundary condition reached.`}}:{...d,currentIndex:r,compIdx:l-1,phase:1,mismatchFound:!1,log:{title:`Shift Executed`,type:`shift`,messageKey:`SHIFT_EXECUTED`,params:{shiftValue:n,nextPos:r}}}}return d}}),it=N({id:`kmp`,metadata:{type:`pattern-matching`,VisualiserType:`pattern-matching`,category:`Pattern Matching Algorithms`,defaultInputs:{target:`THE FASTEST FOX WINS ALL`,pattern:`FAST`}},homeCard:{name:`KMP Search`,difficulty:`Medium`,description:`Uses the Longest Prefix Suffix (LPS) table to avoid redundant comparisons after a mismatch.`,complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n + m)`,timeWorst:`O(n + m)`,space:`O(m)`}},algorithmPage:{uiConfig:{statusLabel:`Index: {currentIndex}`,startButton:`Start`,playbackSpeed:300},extendedDescription:`The Knuth-Morris-Pratt (KMP) algorithm improves substring search by preprocessing the pattern to determine how much of it is a prefix of itself. When a mismatch occurs, the algorithm uses this "LPS" table to shift the pattern without re-comparing characters that are already known to match.`,legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Match`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`},{label:`Mismatch`,color:`bg-rose-500 shadow-[0_0_15_rgba(244,63,94,0.4)]`}],auxDataConfig:{header:`Prefix Table (π)`,dataKey:`pi`,type:`failureFunction`,description:`Stores the length of the longest proper prefix that is also a suffix.`,logic:`If match: pi[i] = pi[i-1] + 1
Else: backtrack using pi`},visualSteps:{READY:{title:`Ready`,message:`Commencing Knuth-Morris-Pratt (KMP) Search.

• Strategy: Utilizing a 'Partial Match Table' (failure function) to avoid redundant character comparisons.
• Optimization: Skipping ahead by identifying the longest proper prefix that is also a suffix within the current match.`,highlights:{pseudo:[1,2,3],javascript:[1,2,3,4],python:[1,2,3]}},MATCH_FOUND:{title:`Match Found ✓`,message:`Pattern Instance Finalized!

• Result: Full character correspondence verified.
• Match identified at starting index {idx}.`,highlights:{pseudo:[11],javascript:[12],python:[11]}},CHAR_MATCH:{title:`Character Match`,message:`Local Correspondence: '{targetChar}' == '{patternChar}'.

• Alignment validated for current prefix segment.
• Strategy: Extending the active match length to {newLen} characters.`,highlights:{pseudo:[9],javascript:[11],python:[9]}},MISMATCH:{title:`Mismatch`,message:`Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.

• Character violation identified at global text index {idx}.
• Action: Querying the prefix table for the next optimal alignment.`,highlights:{pseudo:[7,8],javascript:[9,10],python:[7,8]}},NO_PREFIX:{title:`No Prefix Matched`,message:`Prefix Table Null: No usable symmetry identified.

• Current match length has no proper prefix that is also a suffix.
• Action: Shifting the search window by exactly 1 unit.`,highlights:{pseudo:[7,8],javascript:[9,10],python:[7,8]}},CONSULT_PI:{title:`Consulting π Table`,message:`Consulting Prefix Table (pi[{piIdx}] = {newCompIdx}).

• Result: Identifying a shift of {shiftValue} units that preserves {newCompIdx} existing character matches.
• Objective: Minimize redundant comparisons.`,highlights:{pseudo:[7,8],javascript:[9,10],python:[7,8]}},SMART_SHIFT:{title:`Smart Shift`,message:`Intelligent Shift Executed: Origin moved to {nextPos}.

• Strategy: Resuming character verification from the first uncertain character.
• Note: The first {newCompIdx} characters are mathematically guaranteed to match.`,highlights:{pseudo:[1],javascript:[1],python:[1]}}}},codeSnippets:{pseudo:`function kmpSearch(text, pattern):
  n = text.length, m = pattern.length
  pi = computePrefix(pattern)
  q = 0
  for i from 0 to n-1:
    while q > 0 and pattern[q] != text[i]:
      q = pi[q-1]
    if pattern[q] == text[i]:
      q = q + 1
    if q == m:
      return i - m + 1
  return -1`,javascript:`function kmpSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const pi = computePrefixFunction(pattern);
  let q = 0;
  for (let i = 0; i < n; i++) {
    while (q > 0 && pattern[q] !== text[i]) {
      q = pi[q - 1];
    }
    if (pattern[q] === text[i]) q++;
    if (q === m) return i - m + 1;
  }
  return -1;
}`,python:`def kmp_search(text, pattern):
    n, m = len(text), len(pattern)
    pi = compute_prefix_function(pattern)
    q = 0
    for i in range(n):
        while q > 0 and pattern[q] != text[i]:
            q = pi[q-1]
        if pattern[q] == text[i]:
            q += 1
        if q == m:
            return i - m + 1
    return -1`},getPreprocessing:(e,t)=>{let n=e.length,r=Array(n).fill(0),i=0;for(let t=1;t<n;t++){for(;i>0&&e[i]!==e[t];)i=r[i-1];e[i]===e[t]&&i++,r[t]=i}return{pi:r}},getInitialState:(e,t)=>({currentIndex:0,compIdx:0,phase:1,mismatchFound:!1,activeIndices:[],log:{title:`Ready`,type:`info`,messageKey:`READY`}}),nextStep:(e,t,n,r)=>{let{currentIndex:i,phase:a,compIdx:o}=e,{pi:s}=r,c=n.length,l=t.length,u={...e,activeIndices:[]};if(a===1){let e=i+o,r=t[e],a=n[o];return u.activeIndices=[e],r===a?o+1===c?{...u,isFinished:!0,activeIndices:[...Array(c).keys()].map(e=>i+e),log:{title:`Match Found ✓`,type:`success`,messageKey:`MATCH_FOUND`,params:{idx:i}}}:{...u,compIdx:o+1,log:{title:`Match`,type:`match`,messageKey:`CHAR_MATCH`,params:{targetChar:r,patternChar:a,compIdx:o+1}}}:{...u,mismatchFound:!0,phase:2,log:{title:`Mismatch`,type:`mismatch`,messageKey:`MISMATCH`,params:{idx:e,targetChar:r,patternChar:a}}}}if(a===2){if(o===0)return{...u,phase:3,log:{title:`No Prefix Matched`,type:`shift`,messageKey:`NO_PREFIX`}};let e=s[o-1];return{...u,phase:3,log:{title:`Consulting π Table`,type:`shift`,messageKey:`CONSULT_PI`,params:{compIdx:o,newCompIdx:e}}}}if(a===3){let e=o>0?s[o-1]:0,t=i+(o>0?o-e:1);return t+c>l?{...u,isFinished:!0,currentIndex:t,log:{title:`End of Text`,type:`info`,message:`Boundary condition reached.`}}:{...u,currentIndex:t,compIdx:e,phase:1,mismatchFound:!1,log:{title:`Smart Shift`,type:`shift`,messageKey:`SMART_SHIFT`,params:{nextPos:t,newCompIdx:e}}}}return u}}),at=(e,t,n,r)=>{let{base:i,prime:a}=r,o=n.length,s=0,c=new Set;for(let e=0;e<o;e++)s=(i*s+t.codePointAt(e))%a,c.add(e);return{...e,phase:1,targetHash:s,patternHash:r.pHash,accessedIndices:c,activeIndices:c,log:{title:`INITIAL HASHING`,type:`info`,messageKey:`INITIAL_HASHING`,params:{pHash:r.pHash,tHash:s}}}},ot=(e,t)=>{let{currentIndex:n,targetHash:r,patternHash:i}=e,a=t.length,o=new Set;for(let e=0;e<a;e++)o.add(n+e);return r===i?{...e,phase:2,compIdx:0,activeIndices:o,log:{title:`HASH MATCH!`,type:`match`,messageKey:`HASH_MATCH`,params:{targetHash:r,patternHash:i}}}:{...e,phase:3,activeIndices:o,log:{title:`HASH MISMATCH`,type:`mismatch`,messageKey:`HASH_MISMATCH`,params:{targetHash:r,patternHash:i}}}},st=(e,t,n)=>{let{currentIndex:r,compIdx:i}=e,a=n.length,o=r+i,s=new Set(e.accessedIndices);return s.add(o),t[o]===n[i]?i+1===a?{...e,isFinished:!0,accessedIndices:s,activeIndices:new Set([o]),log:{title:`SUCCESS: FULL MATCH`,type:`success`,messageKey:`SUCCESS_FULL_MATCH`,params:{currentIndex:r}}}:{...e,compIdx:i+1,accessedIndices:s,activeIndices:new Set([o]),log:{title:`CHARACTER MATCH`,type:`match`,messageKey:`CHAR_MATCH`}}:{...e,phase:3,accessedIndices:s,activeIndices:new Set([o]),log:{title:`SPURIOUS HIT`,type:`mismatch`,messageKey:`SPURIOUS_HIT`,params:{textIdx:o}}}},ct=(e,t,n,r)=>{let{currentIndex:i,targetHash:a}=e,{prime:o,base:s,h:c}=r,l=n.length,u=t.length,d=i+1;if(d+l>u)return{...e,currentIndex:d,isFinished:!0,log:{title:`SEARCH COMPLETED`,type:`info`,messageKey:`SEARCH_COMPLETED`}};let f=t.codePointAt(i),p=t.codePointAt(d+l-1),m=(s*(a-f*c%o)+p)%o;m<0&&(m+=o);let h=new Set(e.accessedIndices);return h.add(d+l-1),{...e,currentIndex:d,targetHash:m,phase:1,accessedIndices:h,activeIndices:new Set([d+l-1]),log:{title:`ROLLING HASH`,type:`shift`,messageKey:`ROLLING_HASH`,params:{charToRemove:t[i],charToAdd:t[d+l-1],tHash:m}}}},lt=N({id:`rabinkarp`,metadata:{type:`pattern-matching`,visualiserType:`pattern-matching`,category:`Pattern Matching Algorithms`,defaultInputs:{target:`THE FASTEST FOX TESTS ALL`,pattern:`TESTS`}},homeCard:{name:`Rabin-Karp Search`,difficulty:`Hard`,description:`Uses a rolling hash to find any one of a set of pattern strings in a text, typically in linear time.`,complexity:{timeBest:`׸(n+m)`,timeAvg:`׸(n+m)`,timeWorst:`׸(nm)`,space:`׸(1)`}},algorithmPage:{uiConfig:{statusLabel:`Current Hash: {targetHash}`,startButton:`Start`,playbackSpeed:500},extendedDescription:`Rabin-Karp uses a rolling hash to quickly filter through the text. Instead of checking every character, it calculates a hash for each window and only performs a character-by-character comparison if the hashes match.`,legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Match`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`},{label:`Mismatch`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`}],auxDataConfig:{header:`Rolling Hash`,type:`rollingHash`,description:`Numerical fingerprints for the pattern and current text window.`,logic:`Hash = (d * (H - charOut * h) + charIn) % q`,logicNote:`d = 256 (base), q = 101 (prime)`}},visualSteps:{READY:{title:`Ready`,message:`Commencing Rabin-Karp Search: A hashing-based string matching algorithm.

• Mechanism: Mapping string windows to numerical 'fingerprints' for accelerated comparison.
• Optimization: Performing character-by-character validation only upon fingerprint (hash) collisions.`,highlights:{pseudo:[1,2],javascript:[1,2,3],python:[1,2,3]}},INITIAL_HASHING:{title:`Initial Hashing`,message:`Fingerprint Generation Phase.

• Pattern Hash: {pHash}
• Initial Window Hash: {tHash}
• Strategy: Initializing the search state by hashing the pattern and the first text window.`,highlights:{pseudo:[3],javascript:[4,5,6,7,8],python:[4,5,6,7,8,9]}},HASH_MATCH:{title:`Hash Match!`,message:`Fingerprint Collision Detected.

• Target hash ({targetHash}) matches pattern hash ({patternHash}).
• Action: Initiating character-by-character verification to confirm the match or identify a spurious hit.`,highlights:{pseudo:[5,6],javascript:[11,12],python:[11,12]}},HASH_MISMATCH:{title:`Hash Mismatch`,message:`Fingerprint Divergence.

• Window hash ({targetHash}) ≠ pattern hash ({patternHash}).
• Logic: Invariant failure—the window cannot contain the pattern.
• Action: Shifting the window via rolling hash.`,highlights:{pseudo:[5,8],javascript:[11,14],python:[11,14]}},SPURIOUS_HIT:{title:`Spurious Hit`,message:`Spurious Hit Identified (Hash Collision).

• Hashes matched, but the character sequence at index {textIdx} differs.
• Note: A collision occurred in the hash function's finite range.`,highlights:{pseudo:[6],javascript:[12],python:[12]}},SUCCESS_FULL_MATCH:{title:`Success!`,message:`Pattern Instance Finalized!

• Result: Both fingerprints and character sequences are fully synchronized at index {currentIndex}.
• Match Confirmed.`,highlights:{pseudo:[7],javascript:[12],python:[12]}},CHAR_MATCH:{title:`Verification Scan`,message:`Verification Scan.

• Local character match confirmed within a valid hash window.
• Continuing sequential validation of the remaining pattern length.`,highlights:{pseudo:[6],javascript:[12],python:[12]}},ROLLING_HASH:{title:`Rolling Hash`,message:`Rolling Hash Update (O(1) Shift).

• Evicting: '{charToRemove}' | Admitting: '{charToAdd}'.
• Updated Hash: {tHash}
• Strategy: Recalculating the fingerprint in constant time by shifting the sliding window digits.`,highlights:{pseudo:[9],javascript:[15,16],python:[15,16]}},SEARCH_COMPLETED:{title:`Search Completed`,message:`Search Domain Exhausted.

• All potential window alignments have been fingerprints and/or validated.
• Result: Execution terminated.`,highlights:{pseudo:[10],javascript:[10,11],python:[10,11]}}},codeSnippets:{pseudo:`function rabinKarp(text, pattern):
  n = text.length, m = pattern.length
  h_pattern = hash(pattern)
  h_window = hash(text[0...m-1])
  for i from 0 to n - m:
    if h_pattern == h_window:
      if text[i...i+m-1] == pattern:
        return i
    if i < n - m:
      h_window = rollHash(h_window, text[i], text[i+m])
  return -1`,javascript:`function rabinKarp(text, pattern) {
  const d = 256, q = 101;
  const n = text.length, m = pattern.length;
  let p = 0, t = 0, h = 1;
  for (let i = 0; i < m - 1; i++) h = (h * d) % q;
  for (let i = 0; i < m; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }
  for (let i = 0; i <= n - m; i++) {
    if (p === t) {
      if (text.substring(i, i + m) === pattern) return i;
    }
    if (i < n - m) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (t < 0) t = (t + q);
    }
  }
  return -1;
}`,python:`def rabin_karp(text, pattern):
    d, q = 256, 101
    n, m = len(text), len(pattern)
    p, t, h = 0, 0, 1
    for i in range(m - 1):
        h = (h * d) % q
    for i in range(m):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q
    for i in range(n - m + 1):
        if p == t:
            if text[i : i + m] == pattern:
                return i
        if i < n - m:
            t = (d * (t - ord(text[i]) * h) + ord(text[i + m])) % q
            if t < 0: t += q
    return -1`},getInitialState:e=>{let t=0;if(e&&typeof e==`string`)for(let n=0;n<e.length;n++)t=(256*t+e.codePointAt(n))%101;return{phase:0,compIdx:-1,mismatchFound:!1,targetHash:0,patternHash:t,currentIndex:0,accessedIndices:new Set,activeIndices:new Set,log:{title:`Ready`,type:`info`,messageKey:`READY`}}},getPreprocessing:e=>{let t=e.length,n=0,r=1;for(let e=0;e<t-1;e++)r=r*256%101;for(let r=0;r<t;r++)n=(256*n+e.codePointAt(r))%101;return{prime:101,base:256,h:r,pHash:n}},nextStep:(e,t,n,r)=>{let{phase:i}=e,a={...e,activeIndices:new Set(e.accessedIndices)};return i===0?at(a,t,n,r):i===1?ot(a,n):i===2?st(a,t,n):i===3?ct(a,t,n,r):a}}),ut=N({id:`zalgorithm`,metadata:{type:`pattern-matching`,visualiserType:`z`,category:`Pattern Matching Algorithms`,defaultInputs:{target:`THE FASTEST FOX TESTS`,pattern:`TESTS`}},homeCard:{name:`Z-Algorithm`,difficulty:`Hard`,description:`Constructs the Z-array, where each element Z[i] is the length of the longest substring starting from i which is also a prefix.`,complexity:{timeBest:`׸(n+m)`,timeAvg:`׸(n+m)`,timeWorst:`׸(n+m)`,space:`׸(n+m)`}},algorithmPage:{uiConfig:{statusLabel:`Z-Box: [{l}, {r}]`,startButton:`Start`,playbackSpeed:400},extendedDescription:`The Z-algorithm builds a "Z-array" where Z[i] is the length of the longest substring starting from concat[i] which is also a prefix of concat. It uses previously computed Z-values (Z-box) to speed up calculations.`,legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]`},{label:`Match`,color:`bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]`},{label:`Mismatch`,color:`bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]`}],visualSteps:{READY:{title:`Ready`,message:`Commencing Z-Algorithm: A linear-time pattern matching strategy.

• Context: Operating on the concatenated string S = P + $ + T.
• Principle: Leveraging previously discovered 'Z-boxes' to avoid redundant character comparisons.
• Objective: Building the Z-array where Z[i] represents the longest prefix match starting at index i.`,highlights:{pseudo:[1],javascript:[1,2],python:[1,2]}},Z_ARRAY_COMPLETE:{title:`Z-Array Complete ✓`,message:`Z-Array Construction Finalized.

• Analysis: {foundCountStatus}.
• Logic: Any text index i where Z[i] equals the pattern length |P| indicates a total match.`,highlights:{pseudo:[11],javascript:[10],python:[11]}},OUTSIDE_Z_BOX:{title:`Outside Z-Box`,message:`Probe Point {i} exceeds established right boundary {r}.

• Context: No internal symmetry available from previous matches.
• Action: Initiating manual character comparison starting from index {i} against the prefix at index 0.`,highlights:{pseudo:[2],javascript:[4,5],python:[4,5]}},INSIDE_Z_BOX_OPTIMIZED:{title:`Z-Box Optimized`,message:`Index {i} is contained within the active Z-box [{l}..{r}].

• Optimization: Querying internal symmetry at index k = i - l = {k}.
• Result: Inheriting Z[{k}] = {zK} directly; the prefix property is guaranteed within the box limits.`,highlights:{pseudo:[3],javascript:[7,8],python:[7,8]}},EXTENDING_Z_BOX:{title:`Extending Z-Box`,message:`Boundary Condition Encountered: Prefix match at index {i} reaches the box limit {r}.

• Strategy: Using the established match as a lower bound.
• Action: Performing manual comparison for characters beyond the current boundary to find a new maximal Z-box.`,highlights:{pseudo:[4],javascript:[10],python:[10]}},MATCHING:{title:`Matching`,message:`Character Correspondence: concat[{zVal}] == concat[{iPlusZ}].

• Local validation successful.
• Status: Extending the current Z-value to {newZVal}.`,highlights:{pseudo:[5],javascript:[12],python:[12]}},MISMATCH:{title:`Mismatch`,message:`Inconsistency Detected: concat[{zVal}] ≠ concat[{iPlusZ}].

• Result: Z-value finalized at {zVal}.
• Action: Establishing new Z-box boundaries if the match extends beyond the current right limit.`,highlights:{pseudo:[5],javascript:[12],python:[12]}}}},codeSnippets:{pseudo:`function getZArray(S):
  n = S.length, Z = array of size n (zeros)
  l = 0, r = 0
  for i from 1 to n-1:
    if i <= r:
      Z[i] = min(r - i + 1, Z[i - l])
    while i + Z[i] < n and S[Z[i]] == S[i + Z[i]]:
      Z[i]++
    if i + Z[i] - 1 > r:
      l = i, r = i + Z[i] - 1
  return Z`,javascript:`function getZArray(str) {
  let n = str.length;
  let z = new Array(n).fill(0);
  let l = 0, r = 0;
  for (let i = 1; i < n; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
    while (i + z[i] < n && str[z[i]] === str[i + z[i]]) z[i]++;
    if (i + z[i] - 1 > r) { l = i; r = i + z[i] - 1; }
  }
  return z;
}`,python:`def get_z_array(s):
    n = len(s)
    z = [0] * n
    l, r = 0, 0
    for i in range(1, n):
        if i <= r:
            z[i] = min(r - i + 1, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] - 1 > r:
            l, r = i, i + z[i] - 1
    return z`},getInitialState:(e=``,t=``)=>{let n=e+`$`+t,r=n.length,i=Array(r).fill(0),a=0,o=0,s=e.length;for(let e=1;e<=s;e++){for(e<=o&&(i[e]=Math.min(o-e+1,i[e-a]));e+i[e]<r&&n[i[e]]===n[e+i[e]];)i[e]++;e+i[e]-1>o&&(a=e,o=e+i[e]-1)}return{phase:1,i:s+1,l:0,r:0,z:i,concat:n,activeIndices:[],comparisons:0,log:{title:`INITIALIZING`,type:`info`,messageKey:`READY`,params:{p:e,t,concat:n,pLen:s,startIndex:s+1}}}},getPreprocessing:(e,t)=>({}),nextStep:(e,t,n,r)=>{let{phase:i,concat:a}=e,o=a||n+`$`+t,s=o.length,c={...e,activeIndices:new Set,concat:o};return i===1?dt(c,n,s):i===2?ft(c,s):c}}),dt=(e,t,n)=>{let{i:r,l:i,r:a,z:o}=e;if(r>=n){let r=[];for(let e=t.length+1;e<n;e++)o[e]===t.length&&r.push(e-(t.length+1));return{...e,isFinished:!0,log:{title:`Z-ARRAY COMPLETE ✓`,type:`success`,messageKey:`Z_ARRAY_COMPLETE`,params:{foundCountStatus:r.length>0?`Found ${r.length} matches at: ${r.join(`, `)}`:`No matches found`}}}}if(r>a)return{...e,phase:2,l:r,r:r-1,activeIndices:[r,0],log:{title:`OUTSIDE Z-BOX`,type:`info`,messageKey:`OUTSIDE_Z_BOX`,params:{i:r,r:a}}};let s=r-i,c=a-r+1;if(o[s]<c){let t=[...o];return t[r]=o[s],{...e,z:t,i:r+1,activeIndices:[r],referenceIndex:s,log:{title:`INSIDE Z-BOX (OPTIMIZED)`,type:`match`,messageKey:`INSIDE_Z_BOX_OPTIMIZED`,params:{i:r,l:i,r:a,k:s,zK:o[s]}}}}return{...e,phase:2,l:r,activeIndices:[r,a-r+1],log:{title:`EXTENDING Z-BOX`,type:`info`,messageKey:`EXTENDING_Z_BOX`,params:{i:r,k:s,r:a}}}},ft=(e,t)=>{let{l:n,r,i,z:a,concat:o}=e,s=r-n+1,c=s,l=n+s;if(l<t&&o[c]===o[l])return{...e,r:l,activeIndices:[c,l],log:{title:`CHARACTER MATCH`,type:`match`,messageKey:`CHARACTER_MATCH`,params:{patternIdx:c,textIdx:l,char:o[c]}}};let u=[...a];return u[i]=r-n+1,{...e,z:u,phase:1,i:i+1,activeIndices:[l<t?l:t-1],log:{title:`MISMATCH / BOX END`,type:`mismatch`,messageKey:`MISMATCH_BOX_END`,params:{patternIdx:c,i,zValue:u[i],l:n,r}}}},pt=t({boyermoore:()=>rt,kmp:()=>it,naive:()=>nt,rabinkarp:()=>lt,sunday:()=>tt,zalgorithm:()=>ut}),mt={"Sorting Algorithms":Object.values(Be),"Searching Algorithms":Object.values(qe),"Pathfinding Algorithms":Object.values(et),"Pattern Matching Algorithms":Object.values(pt)},ht=[...mt[`Sorting Algorithms`],...mt[`Searching Algorithms`],...mt[`Pathfinding Algorithms`],...mt[`Pattern Matching Algorithms`]],F=e(u(),1),I=c();function gt(){return(0,I.jsxs)(`div`,{className:`fixed inset-0 -z-10 overflow-hidden bg-[#020617]`,children:[(0,I.jsx)(`div`,{className:`absolute inset-0 opacity-40`,style:{backgroundImage:`
            radial-gradient(circle at 0% 0%, #1e1b4b 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, #1e1b4b 0%, transparent 50%)
          `}}),(0,I.jsx)(`div`,{className:`absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay`,style:{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}),(0,I.jsx)(`div`,{className:`absolute inset-0 opacity-[0.02] pointer-events-none`,style:{backgroundImage:`radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,backgroundSize:`40px 40px`}})]})}var L={startButton:`Start`,statusLabel:`Status`,codePanel:{title:`Code`,languages:{javascript:`JS`,python:`PY`,csharp:`C#`,pseudo:`Pseudo`}},labels:{next:`Next`,restart:`Restart`,startSort:`Start Sorting`,startSearch:`Start Search`,startOperation:`Start Operation`,arrayElements:`Array Elements`,targetValue:`Target: {value}`,sortingViz:`Sorting Visualization`,searchingViz:`Searching Visualization`,dsViz:`Visualization`,arrayInput:`Array`,target:`Target`,pattern:`Pattern`,targetText:`Text`,arrayPlaceholder:`e.g. 3, 1, 4, 1, 5`}},R={colors:{background:`slate-950`,surface:`slate-900/60`,surfaceHover:`slate-900/80`,border:`slate-800/50`,borderStrong:`slate-700/50`,primary:`indigo-500`,primaryLight:`indigo-400`,primaryDark:`indigo-600`,textHigh:`slate-100`,textMuted:`slate-400`,textDisabled:`slate-600`,accent:`indigo-500`,accentGlass:`indigo-500/10`},typography:{fonts:{heading:`'Outfit', system-ui, sans-serif`,body:`'Inter', system-ui, sans-serif`,mono:`'JetBrains Mono', monospace`},sizes:{subtext:`text-[12px]`,baseSmall:`text-[13px]`,baseLarge:`text-[16px]`,header:`text-[18px]`,title:`text-[20px]`},tracking:{tight:`tracking-tight`,tighter:`tracking-tighter`,wider:`tracking-widest`},semantics:{home:{title:`text-[3rem] md:text-[3.75rem] lg:text-[4.5rem]`,subtitle:`text-[1rem] md:text-[1.5rem]`,section:`text-[1rem] md:text-[1.2rem]`},viz:{title:`text-[20px]`}}},effects:{transition:`transition-all duration-300 ease-in-out`,glass:`backdrop-blur-xl border border-slate-800/50 shadow-2xl shadow-black/50`}},{colors:z,typography:B,effects:_t}=R,vt=(...e)=>e.filter(Boolean).join(` `),V={pageWrapper:`min-h-screen bg-${z.background} text-${z.textHigh} flex flex-col items-center py-12 px-4`,mainPanel:`w-full max-w-[1400px] bg-${z.background}/40 backdrop-blur-xl border border-${z.border} rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col`,grid:`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-6`,cardDescription:vt(B.sizes.baseSmall,`font-medium leading-relaxed line-clamp-2`,`text-${z.textMuted}`),logicText:B.sizes.subtext,homeSubtitle:B.semantics.home.subtitle,glassPanel:`bg-${z.background}/40 border border-${z.border} backdrop-blur-xl rounded-2xl shadow-2xl`,subPanel:`flex-1 flex flex-col bg-slate-950/40 border border-${z.border} rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm min-h-[300px]`,subPanelHeader:`px-8 py-5 border-b border-${z.border} flex justify-between items-center bg-${z.background}/40`,smallHeading:`${B.sizes.header} font-black uppercase ${B.tracking.wider} text-${z.textMuted} flex items-center gap-2`,controlGroup:`flex items-center gap-3 bg-slate-950/50 p-3 rounded-2xl border border-${z.border}`,buttonBase:`inline-flex items-center justify-center rounded-2xl px-10 py-4.5 ${B.sizes.baseSmall} font-bold ${_t.transition} active:scale-95 disabled:opacity-50 disabled:pointer-events-none`,labelBase:`block ${B.sizes.baseSmall} font-black text-${z.textMuted} uppercase ${B.tracking.wider} mb-4 ml-3`,inputBase:`w-full bg-slate-950/60 border border-${z.border} rounded-xl px-6 py-4 ${B.sizes.baseSmall} text-${z.textHigh} placeholder:text-slate-700 focus:outline-none focus:border-${z.primary}/50 focus:ring-2 focus:ring-${z.primary}/10 ${_t.transition}`,cellBase:`w-10 h-14 flex-shrink-0 flex items-center justify-center border ${B.fontMono} font-black ${B.sizes.header} ${_t.transition} rounded-2xl shadow-lg`,cellValueBase:`w-10 h-16 flex-shrink-0 flex flex-col items-center justify-center border ${_t.transition} rounded-2xl`,metricPill:`flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-950/80 border border-${z.border} ${B.sizes.subtext} font-black shrink-0`,infoCard:vt(`p-6 flex flex-col gap-2 transition-all`,`rounded-2xl`,`bg-${z.surface} border border-slate-900/50 hover:border-slate-800`),cardFooter:vt(`p-4 flex justify-between items-center`,`border-t border-${z.border} bg-slate-950/50`,B.sizes.subtext,`text-${z.textMuted} font-medium ${B.tracking.wider} uppercase`),cardRound:`rounded-2xl`,vizContainer:`relative w-full h-[450px] bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl flex flex-col`},H={key:`font-mono text-[10px] uppercase tracking-wider`,title:`text-[22px] md:text-[28px] font-black uppercase tracking-tight`,button:`font-black text-[10px] uppercase tracking-widest`,consoleTitle:`font-black text-[10px] uppercase tracking-widest text-slate-500`,console:`font-mono text-xs`,controlTitle:`font-black text-[10px] uppercase tracking-widest text-slate-500`,codeTitle:`font-black text-[10px] uppercase tracking-widest text-indigo-400`,visualiserTitle:`font-black text-[10px] uppercase tracking-widest text-sky-400`,code:`text-[13px] font-mono`},yt={tabBtn:e=>`px-3 py-1.5 rounded-xl ${H.button} transition-all ${e?`bg-indigo-500 text-white shadow-lg shadow-indigo-500/20`:`text-slate-500 hover:text-slate-300 hover:bg-slate-800`}`,copyBtn:`p-2 hover:bg-slate-800 rounded-xl text-slate-500 hover:text-white transition-colors`,codeTitle:H.codeTitle,visualiserTitle:H.visualiserTitle,syntaxStyle:{margin:0,padding:`1.25rem`,background:`transparent`,fontSize:H.code.split(` `)[0].includes(`text-[`)?H.code.split(` `)[0].replace(`text-[`,``).replace(`]`,``):`14px`,lineHeight:`1.6`}};j.registerLanguage(`javascript`,we),j.registerLanguage(`python`,Ce),j.registerLanguage(`pseudo`,we);var bt=(0,M.memo)(({codeSnippets:e,lineHighlights:t,activeStep:n})=>{let[r,i]=(0,M.useState)(`javascript`),[a,o]=(0,M.useState)(!1),s=()=>{navigator.clipboard.writeText(e[r]),o(!0),setTimeout(()=>o(!1),2e3)},c=(0,M.useMemo)(()=>t?.[n]?.[r],[t,n,r]);return e?(0,I.jsxs)(`div`,{className:V.subPanel,children:[(0,I.jsxs)(`div`,{className:V.subPanelHeader,children:[(0,I.jsxs)(`h3`,{className:`${yt.codeTitle} flex items-center gap-2`,children:[(0,I.jsx)(se,{className:`w-4 h-4`}),` `,L.codePanel.title]}),(0,I.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,I.jsx)(`div`,{className:V.controlGroup,children:Object.keys(L.codePanel.languages).map(e=>(0,I.jsx)(`button`,{onClick:()=>i(e),className:yt.tabBtn(r===e),children:L.codePanel.languages[e]},e))}),(0,I.jsx)(`button`,{onClick:s,className:yt.copyBtn,children:a?(0,I.jsx)(T,{className:`w-4 h-4 text-emerald-500`}):(0,I.jsx)(_,{className:`w-4 h-4`})})]})]}),(0,I.jsx)(`div`,{className:`relative group flex-1`,children:(0,I.jsx)(j,{language:r,style:Te,customStyle:yt.syntaxStyle,showLineNumbers:!0,wrapLines:!0,lineProps:e=>{let t=Array.isArray(c)?c.includes(e):e===c;return{style:{display:`block`,backgroundColor:t?`rgba(186, 140, 242, 0.11)`:`transparent`,borderLeft:t?`3px solid #7f81e6ff`:`3px solid transparent`,paddingLeft:`0.75rem`,marginLeft:`-1.25rem`,marginRight:`-1.25rem`,transition:`all 0.3s ease`}}},children:e[r]})})]}):null});bt.propTypes={codeSnippets:F.default.objectOf(F.default.string).isRequired,lineHighlights:F.default.object,activeStep:F.default.string};var xt=(0,M.memo)(({isVisited:e,isPath:t,isActive:n,isMuted:r,isStart:i,isEnd:a,isWall:o,isQueued:s,cost:c,colors:l={},onMouseDown:u,onMouseEnter:d,r:f,c:p})=>{let m=`h-full w-full rounded-sm transition-all duration-300 flex items-center justify-center select-none cursor-pointer [container-type:inline-size]`,h=l.unvisited||``;o?h=l.wall||``:i?h=l.start||``:a?h=l.end||``:n?h=l.active||``:t?h=l.path||``:e?h=l.visited||``:s&&(h=l.checked||l.queue||``),r&&!i&&!a&&!t&&(h=`bg-red-500/5 border-red-500/10`),(o||i||a)&&(m+=` border-1 border-white/55`),(i||a||t)&&(h+=` z-10 shadow-lg scale-[1.05]`),n&&(h+=` z-20 scale-[1.15] shadow-2xl ring-2 ring-white/20`),o&&(h+=` shadow-md`),h.trim()===``&&(h=`bg-slate-800/25 border-slate-800/25`);let g=c!==void 0&&!i&&!a&&!o&&!t?.8-c/14:1;return(0,I.jsx)(`div`,{className:`${m} ${h} hover:scale-[1.1] hover:brightness-[1.2] active:scale-[0.95]`,onMouseDown:()=>u(f,p),onMouseEnter:()=>d(f,p),style:{opacity:g,borderRadius:i||a?`50%`:`4px`},children:c!==void 0&&!i&&!a&&!o&&(0,I.jsx)(`span`,{className:`text-[42cqw] text-white/50`,children:c})})});xt.displayName=`GridNode`,xt.propTypes={isVisited:F.default.bool,isPath:F.default.bool,isActive:F.default.bool,isMuted:F.default.bool,isStart:F.default.bool,isEnd:F.default.bool,isWall:F.default.bool,isQueued:F.default.bool,cost:F.default.number,colors:F.default.object,onMouseDown:F.default.func,onMouseEnter:F.default.func,r:F.default.number,c:F.default.number};function St({algorithm:e,state:t,updateState:n,toggleWall:r,gridTool:i,isEditingDisabled:a}){let[o,s]=(0,M.useState)(!1),[c,l]=(0,M.useState)(null),{rows:u=15,cols:d=45,startNode:f,endNode:p,visited:m,path:h,activeNode:g,walls:_,costs:v,activeBranch:y,queue:b,openSet:x}=t||{},S=(0,M.useMemo)(()=>e?.legendItems||[],[e?.legendItems]),C=(0,M.useMemo)(()=>Object.fromEntries(S.map(e=>[e.label.toLowerCase(),e.color])),[S]),w=(0,M.useMemo)(()=>new Set((h||[]).map(e=>`${e.r},${e.c}`)),[h]),T=(0,M.useMemo)(()=>new Set((y||[]).map(e=>`${e.r},${e.c}`)),[y]),E=(0,M.useMemo)(()=>_ instanceof Set?_:new Set((_||[]).map(e=>`${e.r},${e.c}`)),[_]),D=(0,M.useMemo)(()=>new Set((b||x||[]).map(e=>`${e.r},${e.c}`)),[b,x]),O=(0,M.useMemo)(()=>{if(!m)return new Set;if(m instanceof Set)return m;let e=new Set;return m.forEach((t,n)=>{t.forEach((t,r)=>{t&&e.add(`${n},${r}`)})}),e},[m]),ee=(0,M.useCallback)((e,t,n)=>{if(f?.r===e&&f?.c===t||p?.r===e&&p?.c===t)return;let i=`${e},${t}`,a=E.has(i),o=n||(a?`removing`:`adding`);return(o===`adding`&&!a||o===`removing`&&a)&&r(e,t),o},[f,p,E,r]),k=(0,M.useCallback)((e,t,r=null)=>{if(a)return;let o=f?.r===e&&f?.c===t,s=p?.r===e&&p?.c===t,c=n=>{if(n instanceof Set){let r=new Set(n);return r.delete(`${e},${t}`),r}return(n||[]).filter(n=>n.r!==e||n.c!==t)};if(i===`start`){if(s)return;n(n=>({...n,startNode:{r:e,c:t},walls:c(n.walls)}))}else if(i===`end`){if(o)return;n(n=>({...n,endNode:{r:e,c:t},walls:c(n.walls)}))}else if(i===`wall`)return ee(e,t,r)},[a,i,f,p,ee,n]),te=(0,M.useCallback)((e,t)=>{s(!0);let n=k(e,t);i===`wall`&&l(n)},[k,i]),ne=(0,M.useCallback)((e,t)=>{o&&k(e,t,c)},[k,o,c]),re=(0,M.useCallback)(()=>{s(!1),l(null)},[]),ie=(0,M.useMemo)(()=>({display:`grid`,gridTemplateColumns:`repeat(${d}, 1fr)`,gridTemplateRows:`repeat(${u}, 1fr)`,gap:`1px`,width:`100%`,height:`auto`,maxWidth:`calc(450px * ${d} / ${u})`,maxHeight:`100%`,aspectRatio:`${d} / ${u}`,margin:`auto`}),[d,u]),ae=u*d,oe=(0,M.useMemo)(()=>Array.from({length:ae}).map((e,n)=>{let r=Math.floor(n/d),i=n%d,a=`${r},${i}`,o=f?.r===r&&f?.c===i,s=p?.r===r&&p?.c===i,c=O.has(a),l=w.has(a);return(0,I.jsx)(xt,{r,c:i,isVisited:c,isPath:l,isActive:g?.r===r&&g?.c===i,isMuted:t.activeBranch?.length>0&&c&&!T.has(a)&&!l&&!o&&!s,isStart:o,isEnd:s,isWall:E.has(a),isQueued:D.has(a),cost:v?.[r]?.[i],colors:C,onMouseDown:te,onMouseEnter:ne},a)}),[ae,d,f,p,O,w,g,t.activeBranch,T,E,D,v,C,te,ne]);return(0,I.jsx)(`div`,{className:`relative w-full h-[450px] flex flex-col justify-center items-center select-none overflow-visible transition-all duration-500`,children:(0,I.jsx)(`div`,{role:`grid`,tabIndex:0,"aria-label":`Pathfinding Grid`,className:`grid gap-1 outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl`,onMouseLeave:re,onMouseUp:re,style:ie,children:t?.rows===void 0?(0,I.jsx)(`div`,{className:`absolute inset-0 flex items-center justify-center text-slate-500 font-black ${V.logicText.split(` `)[0]} uppercase tracking-widest bg-slate-950/20 rounded-2xl`,children:`Initializing Grid...`}):oe})})}St.propTypes={state:F.default.shape({rows:F.default.number.isRequired,cols:F.default.number.isRequired,startNode:F.default.shape({r:F.default.number,c:F.default.number}),endNode:F.default.shape({r:F.default.number,c:F.default.number}),visited:F.default.oneOfType([F.default.arrayOf(F.default.arrayOf(F.default.bool)),F.default.instanceOf(Set)]),path:F.default.arrayOf(F.default.shape({r:F.default.number,c:F.default.number})),activeNode:F.default.shape({r:F.default.number,c:F.default.number}),walls:F.default.arrayOf(F.default.shape({r:F.default.number,c:F.default.number})),queue:F.default.array,openSet:F.default.array,activeBranch:F.default.array,costs:F.default.arrayOf(F.default.arrayOf(F.default.number)),legendItems:F.default.arrayOf(F.default.shape({label:F.default.string,color:F.default.string}))}),updateState:F.default.func.isRequired,toggleWall:F.default.func.isRequired,gridTool:F.default.string,isEditingDisabled:F.default.bool};var Ct={container:`flex items-center gap-4 relative`,toolBtn:(e,t,n)=>`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border-2 transition-all duration-300 font-black ${H.button} ${e?`${t.color} ${t.bgColor} ${t.borderColor} scale-105 shadow-lg shadow-indigo-500/10`:`text-slate-500 bg-slate-900/50 border-slate-800/40 hover:bg-slate-800 hover:text-slate-300`} ${n?`opacity-40 cursor-not-allowed scale-100`:`active:scale-95`}`,clearBtn:`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border-2 border-rose-500/30 text-rose-400 bg-rose-500/5 hover:bg-rose-500/15 transition-all duration-300 font-black ${H.button} active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed`,lockBadge:`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg animate-bounce`};function wt({selectedTool:e,setTool:t,disabled:n,onClear:r}){let i=[{id:`start`,label:`Start`,icon:ae,color:`text-amber-400`,bgColor:`bg-amber-400/10`,borderColor:`border-amber-400/30`},{id:`end`,label:`End`,icon:k,color:`text-emerald-400`,bgColor:`bg-emerald-400/10`,borderColor:`border-emerald-400/30`},{id:`wall`,label:`Wall`,icon:he,color:`text-slate-200`,bgColor:`bg-slate-600/40`,borderColor:`border-slate-500/50`}];return(0,I.jsxs)(`div`,{className:Ct.container,children:[i.map(r=>{let i=r.icon,a=e===r.id;return(0,I.jsxs)(`button`,{onClick:()=>!n&&t(r.id),disabled:n,className:Ct.toolBtn(a,r,n),children:[(0,I.jsx)(i,{className:`w-3.5 h-3.5 ${a?`animate-pulse`:``}`}),r.label]},r.id)}),r&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`div`,{className:`w-px h-8 bg-slate-800 mx-1`}),(0,I.jsxs)(`button`,{onClick:r,disabled:n,className:Ct.clearBtn,children:[(0,I.jsx)(me,{className:`w-3.5 h-3.5`}),`Clear`]})]}),n&&(0,I.jsx)(`span`,{className:Ct.lockBadge,children:`Locked`})]})}wt.propTypes={selectedTool:F.default.string.isRequired,setTool:F.default.func.isRequired,disabled:F.default.bool,onClear:F.default.func};var U={panel:`w-full h-full bg-slate-900/40 backdrop-blur-md border border-slate-800/60 ${V.cardRound} p-5 shadow-2xl`,configContainer:`flex items-center gap-6 bg-slate-950/50 border border-slate-800/60 rounded-2xl px-4 py-2 shadow-inner`,configTitle:H.controlTitle,speedContainer:`bg-slate-950/50 border border-slate-800/60 rounded-2xl px-5 py-3 shadow-inner group`,speedInput:`w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 group-hover:bg-slate-700 transition-colors`,sizeInput:{container:`w-12 bg-slate-900 border border-slate-800 rounded-xl px-1.5 py-1 ${R.typography.sizes.baseSmall} font-mono text-sky-400 focus:border-sky-500 outline-none text-center`,label:`${R.typography.sizes.subtext} font-bold text-slate-600 uppercase`},input:`!py-4 !px-6 !rounded-xl !${R.typography.sizes.baseSmall} bg-slate-950/50 shadow-inner`},Tt=(0,M.memo)(({target:e,setTarget:t,pattern:n,setPattern:r,isPlaying:i,type:a,label:o,label2:s,placeholder1:c,gridTool:l,setGridTool:u,isEditingDisabled:d,playbackRate:f,setPlaybackRate:p,clearWalls:m,gridSize:h,setGridSize:g})=>{let _=a===`pathfinding`,v=a===`sorting`||a===`searching`,[y,b]=(0,M.useState)(h.rows),[x,S]=(0,M.useState)(h.cols);(0,M.useEffect)(()=>{b(h.rows),S(h.cols)},[h]);let C=()=>{let e=Math.max(3,parseInt(y)||3);b(e),g(e,h.cols)},w=()=>{let e=Math.max(3,parseInt(x)||3);S(e),g(h.rows,e)};return(0,I.jsx)(`div`,{className:U.panel,children:_?(0,I.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,I.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-2 ml-1`,children:[(0,I.jsx)(`div`,{className:`w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]`}),(0,I.jsx)(`label`,{className:`${U.configTitle}`,children:`Playback Speed`})]}),(0,I.jsx)(`div`,{className:U.speedContainer,children:(0,I.jsx)(`input`,{type:`range`,min:`0.25`,max:`3`,step:`0.05`,value:f,onChange:e=>p(parseFloat(e.target.value)),className:U.speedInput})})]}),(0,I.jsx)(`div`,{className:`w-px h-12 bg-slate-800/60 mt-4`}),(0,I.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-2 ml-1`,children:[(0,I.jsx)(`div`,{className:`w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]`}),(0,I.jsx)(`label`,{className:`${U.configTitle}`,children:`Grid Size`})]}),(0,I.jsxs)(`div`,{className:`${U.configContainer}`,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,I.jsx)(`span`,{className:`${U.sizeInput.label}`,children:`H`}),(0,I.jsx)(`input`,{type:`number`,value:y,onChange:e=>b(e.target.value),onBlur:C,onKeyDown:e=>e.key===`Enter`&&C(),disabled:d,className:`${U.sizeInput.container}`})]}),(0,I.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,I.jsx)(`span`,{className:`${U.sizeInput.label}`,children:`W`}),(0,I.jsx)(`input`,{type:`number`,value:x,onChange:e=>S(e.target.value),onBlur:w,onKeyDown:e=>e.key===`Enter`&&w(),disabled:d,className:`${U.sizeInput.container}`})]})]})]}),(0,I.jsx)(`div`,{className:`w-px h-12 bg-slate-800/60 mt-4`}),(0,I.jsxs)(`div`,{className:`flex-1 flex flex-col gap-2`,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-2 ml-1`,children:[(0,I.jsx)(`div`,{className:`w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]`}),(0,I.jsx)(`label`,{className:`${U.configTitle}`,children:`Grid Visualization Tools`})]}),(0,I.jsx)(`div`,{className:`${U.configContainer}`,children:(0,I.jsx)(wt,{selectedTool:l,setTool:u,disabled:d,onClear:m})})]})]}):(0,I.jsxs)(`div`,{className:`flex flex-wrap items-center justify-start gap-12`,children:[(0,I.jsxs)(`div`,{className:`flex flex-col gap-3 min-w-[200px]`,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-2 ml-1`,children:[(0,I.jsx)(`div`,{className:`w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]`}),(0,I.jsx)(`label`,{className:`${U.configTitle}`,children:`Playback Speed`})]}),(0,I.jsx)(`div`,{className:`${U.speedContainer} py-4`,children:(0,I.jsx)(`input`,{type:`range`,min:`0.25`,max:`3`,step:`0.05`,value:f,onChange:e=>p(parseFloat(e.target.value)),className:U.speedInput})})]}),(0,I.jsxs)(`div`,{className:`flex-1 flex flex-wrap gap-10 items-center border-l border-slate-800/60 pl-10`,children:[(0,I.jsxs)(`div`,{className:`flex-1 min-w-[300px] flex flex-col gap-3`,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-2 ml-1`,children:[(0,I.jsx)(`div`,{className:`w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]`}),(0,I.jsx)(`label`,{className:`${U.configTitle}`,children:o||(v?`Data Input`:`Target String`)})]}),(0,I.jsx)(`input`,{type:`text`,value:e,onChange:e=>{let n=e.target.value;t(v?n:n.toUpperCase())},placeholder:c||`Enter values...`,className:`${V.inputBase} ${U.input}`,disabled:i})]}),(a===`searching`||!_&&!v)&&(0,I.jsxs)(`div`,{className:`w-56 flex flex-col gap-3`,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-2 ml-1`,children:[(0,I.jsx)(`div`,{className:`w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]`}),(0,I.jsx)(`label`,{className:`${U.configTitle}`,children:s||(a===`searching`?`Target Value`:`Search Pattern`)})]}),(0,I.jsx)(`input`,{type:`text`,value:n,onChange:e=>{let t=e.target.value;r(v?t:t.toUpperCase())},placeholder:a===`searching`?`X`:`PATTERN`,className:`${V.inputBase} ${U.input} text-center`,disabled:i})]})]})]})})});Tt.propTypes={target:F.default.string,setTarget:F.default.func,pattern:F.default.string,setPattern:F.default.func,isPlaying:F.default.bool,type:F.default.string,label:F.default.string,label2:F.default.string,placeholder1:F.default.string,placeholder2:F.default.string,gridTool:F.default.string,setGridTool:F.default.func,isEditingDisabled:F.default.bool,playbackRate:F.default.number,setPlaybackRate:F.default.func,clearWalls:F.default.func,gridSize:F.default.object,setGridSize:F.default.func};var Et={container:`${V.glassPanel} ${V.cardRound} p-3 h-full flex items-center justify-center`,itemLabel:H.key},Dt=(0,M.memo)(({items:e})=>!e||e.length===0?null:(0,I.jsx)(`div`,{className:Et.container,children:(0,I.jsx)(`div`,{className:`flex flex-wrap gap-x-8 gap-y-6 items-center justify-center`,children:e.map((e,t)=>(0,I.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,I.jsx)(`div`,{className:`w-5 h-5 rounded-md border border-white/10 ${e.color} shadow-lg`}),(0,I.jsx)(`span`,{className:Et.itemLabel,children:e.label})]},t))})}));Dt.propTypes={items:F.default.arrayOf(F.default.shape({label:F.default.string.isRequired,color:F.default.string.isRequired})).isRequired};var Ot={container:e=>`p-8 ${V.cardRound} border transition-all duration-500 ${e.bg} ${e.border} shadow-2xl min-h-[300px] h-full flex flex-col backdrop-blur-sm shadow-inner`,title:H.consoleTitle,content:`${H.console} whitespace-pre-line text-slate-100 font-bold flex-1`},kt=(0,M.memo)(({log:e,algorithm:t})=>{let n={info:{text:`text-indigo-400`,bg:`bg-indigo-500/10`,border:`border-indigo-500/30`,icon:(0,I.jsx)(xe,{className:`w-5 h-5`})},match:{text:`text-emerald-400`,bg:`bg-emerald-500/10`,border:`border-emerald-500/30`,icon:(0,I.jsx)(w,{className:`w-5 h-5`})},mismatch:{text:`text-rose-400`,bg:`bg-rose-500/10`,border:`border-rose-500/30`,icon:(0,I.jsx)(h,{className:`w-5 h-5`})},success:{text:`text-emerald-400`,bg:`bg-emerald-500/20`,border:`border-emerald-500/50`,icon:(0,I.jsx)(w,{className:`w-5 h-5`})},shift:{text:`text-amber-400`,bg:`bg-amber-500/10`,border:`border-amber-500/30`,icon:(0,I.jsx)(le,{className:`w-5 h-5`})}},r=n[e?.type]||n.info,i=(()=>{if(!e)return``;let n=e.messageKey,r=t?.stepMessages?.[n]||t?.visualSteps?.[n]?.message;return r?r.replace(/{(\w+)}/g,(t,n)=>{let r=e.params?.[n];return r===void 0?`{${n}}`:r}):e.content||``})();return(0,I.jsxs)(`div`,{className:Ot.container(r),children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-3 mb-6 ${r.text}`,children:[r.icon,(0,I.jsx)(`span`,{className:Ot.title,children:e?.title})]}),(0,I.jsx)(`div`,{className:Ot.content,children:i})]})});kt.propTypes={log:F.default.shape({type:F.default.string,title:F.default.string,content:F.default.string,messageKey:F.default.string,params:F.default.object}),algorithm:F.default.object};var At={constant:`M2 18 L18 18`,log:`M2 18 Q10 16 18 12`,linear:`M2 18 L18 2`,nlog:`M2 18 Q8 12 18 2`,quadratic:`M2 18 Q12 18 18 2`,exponential:`M2 18 Q16 18 18 2`},jt=({type:e,color:t,size:n=30})=>{let r=At[e];return r?(0,I.jsx)(`svg`,{width:n,height:n,viewBox:`0 0 20 20`,className:`stroke-[2.5] fill-none ${t}`,children:(0,I.jsx)(`path`,{d:r,strokeLinecap:`round`,strokeLinejoin:`round`})}):null};jt.propTypes={type:F.default.oneOf(Object.keys(At)).isRequired,color:F.default.string.isRequired,size:F.default.number};var W={hero:{badge:`INTERACTIVE Visualiser`,title:`Introduction to`,titleAccent:`Algorithms`,description:`A visual guide to algorithmic complexity and performance.`},categoryMeta:{"Sorting Algorithms":`Layers`,"Searching Algorithms":`Search`,"Pathfinding Algorithms":`Map`,"Pattern Matching Algorithms":`Zap`,default:`HelpCircle`},difficultyColors:{Easy:`bg-emerald-500/10 text-emerald-500 border-emerald-500/20`,Medium:`bg-amber-500/10 text-amber-500 border-amber-500/20`,Hard:`bg-rose-500/10 text-rose-500 border-rose-500/20`,default:`bg-slate-500/10 text-slate-500 border-slate-500/20`},difficultyMap:{Easy:1,Medium:2,Hard:3},complexityColors:{elite:`text-emerald-400`,excellent:`text-blue-400`,good:`text-indigo-400`,fair:`text-amber-400`,poor:`text-rose-400`,default:`text-slate-400`},complexityLabels:{best:`B:`,avg:`A:`,worst:`W:`,prep:`PREP:`,space:`SPACE:`,examples:`EXAMPLES:`},footer:{copyright:`2026 INTERACTIVE Visualiser PLATFORM`}},G={appCard:`group relative text-left p-8 bg-slate-900/40 border border-slate-800/60 hover:border-indigo-500/50 rounded-3xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.15)] flex flex-col justify-between overflow-hidden`,cardHeading:`text-2xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight`,cardDescription:V.cardDescription,badgeBase:`text-[10px] font-black uppercase tracking-widest rounded-lg border`,complexityPill:`flex items-center gap-2 px-3 py-1.5 bg-slate-950/60 border border-slate-800/50 rounded-xl text-[11px] font-bold shadow-inner flex-shrink-0`,complexityLabel:`text-slate-500 uppercase tracking-tighter`},Mt=e=>{if(!e)return W.complexityColors.default;let t=e.toLowerCase();return t.includes(`1`)&&!t.includes(`n`)&&!t.includes(`v`)||t.includes(`ω(d)`)||t.includes(`o(d)`)?W.complexityColors.elite:t.includes(`log`)&&!t.includes(`n log`)&&!t.includes(`v`)||t.includes(`√`)||t.includes(`n/m`)||t.includes(`v`)&&!t.includes(`+`)&&!t.includes(`e`)&&!t.includes(`^`)?W.complexityColors.excellent:t.includes(`n`)&&!t.includes(`log`)&&!t.includes(`^`)&&!t.includes(`{`)&&(!t.includes(`m`)||t.includes(`+ m`))&&!t.includes(`nk`)||t.includes(`v + e`)?W.complexityColors.good:t.includes(`n log`)||t.includes(`nk`)||t.includes(`)log v`)?W.complexityColors.fair:W.complexityColors.poor},Nt=e=>W.difficultyColors[e]||W.difficultyColors.default,Pt=({algo:e,onSelect:t})=>(0,I.jsxs)(`button`,{type:`button`,onClick:()=>t(e.id),className:G.appCard,children:[(0,I.jsx)(`div`,{className:`absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] group-hover:bg-indigo-500/10 transition-all duration-500`}),(0,I.jsxs)(`div`,{className:`space-y-6 relative z-10 flex-1`,children:[(0,I.jsxs)(`div`,{className:`flex justify-between items-start gap-4`,children:[(0,I.jsx)(`h3`,{className:G.cardHeading,children:e.name}),(0,I.jsx)(`span`,{className:`${G.badgeBase} ${Nt(e.difficulty)} py-1 px-3`,children:e.difficulty})]}),(0,I.jsx)(`p`,{className:G.cardDescription,children:e.description}),e.complexity&&(0,I.jsxs)(`div`,{className:`pt-4 flex flex-col gap-3`,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide`,children:[(0,I.jsxs)(`div`,{className:G.complexityPill,title:`Best Case`,children:[(0,I.jsx)(`span`,{className:G.complexityLabel,children:`B:`}),(0,I.jsx)(`span`,{className:Mt(e.complexity.timeBest),children:e.complexity.timeBest})]}),(0,I.jsxs)(`div`,{className:G.complexityPill,title:`Average Case`,children:[(0,I.jsx)(`span`,{className:G.complexityLabel,children:`A:`}),(0,I.jsx)(`span`,{className:Mt(e.complexity.timeAvg),children:e.complexity.timeAvg})]}),(0,I.jsxs)(`div`,{className:G.complexityPill,title:`Worst Case`,children:[(0,I.jsx)(`span`,{className:G.complexityLabel,children:`W:`}),(0,I.jsx)(`span`,{className:Mt(e.complexity.timeWorst),children:e.complexity.timeWorst})]})]}),(0,I.jsxs)(`div`,{className:`flex items-center gap-2 overflow-x-auto scrollbar-hide`,children:[e.complexity.timePre&&(0,I.jsxs)(`div`,{className:G.complexityPill,title:`Preprocessing Time`,children:[(0,I.jsx)(`span`,{className:G.complexityLabel,children:`PREP:`}),(0,I.jsx)(`span`,{className:`text-indigo-400`,children:e.complexity.timePre})]}),(0,I.jsxs)(`div`,{className:G.complexityPill,title:`Space Complexity`,children:[(0,I.jsx)(`span`,{className:G.complexityLabel,children:`SPACE:`}),(0,I.jsx)(`span`,{className:`text-indigo-400`,children:e.complexity.space})]})]})]})]})]});Pt.propTypes={algo:F.default.object.isRequired,onSelect:F.default.func.isRequired};var Ft={sectionHeader:{container:`w-full group focus:outline-none`,border:`flex items-center gap-6 py-4 border-b border-${R.colors.borderStrong} transition-colors group-hover:border-${R.colors.border}`,iconBox:e=>`p-3 transition-all rounded-2xl ${e?`bg-${R.colors.primary} text-${R.colors.textHigh} shadow-[0_0_20px_rgba(99,102,241,0.4)]`:`bg-slate-900 text-${R.colors.textDisabled}`}`,title:e=>`${R.typography.semantics.home.section} font-black uppercase tracking-normal transition-colors ${e?`text-${R.colors.textHigh}`:`text-${R.colors.textDisabled}`}`}},It=({category:e,algorithms:t,icon:n,isCollapsed:r,toggleCollapse:i,onSelect:a,cols:o=3})=>{if(!t||t.length===0)return null;let s=`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${o} gap-4 pt-4 pb-6`;return(0,I.jsxs)(`div`,{className:`space-y-0`,children:[(0,I.jsx)(`button`,{onClick:i,className:Ft.sectionHeader.container,children:(0,I.jsxs)(`div`,{className:Ft.sectionHeader.border,children:[(0,I.jsx)(`div`,{className:Ft.sectionHeader.iconBox(!r),children:n}),(0,I.jsxs)(`h2`,{className:Ft.sectionHeader.title(!r),children:[e,` `,(0,I.jsxs)(`span`,{className:`ml-6 ${R.typography.sizes.baseSmall} text-slate-700 font-black tracking-[0.2em]`,children:[`(`,t.length,`)`]})]}),(0,I.jsx)(`div`,{className:`flex-1`}),(0,I.jsx)(C,{className:`w-10 h-10 text-slate-600 group-hover:text-indigo-500 transition-all duration-500 ${r?`-rotate-90 opacity-40`:`rotate-0 opacity-100`}`})]})}),(0,I.jsx)(p,{initial:!1,children:!r&&(0,I.jsx)(m.div,{initial:{height:0,opacity:0},animate:{height:`auto`,opacity:1},exit:{height:0,opacity:0},transition:{duration:.5,ease:[.04,.62,.23,.98]},className:`overflow-hidden`,children:(0,I.jsx)(`div`,{className:s,children:t.map(e=>(0,I.jsx)(Pt,{algo:e,onSelect:a},e.id))})})})]})};It.propTypes={category:F.default.string.isRequired,algorithms:F.default.array.isRequired,icon:F.default.node,isCollapsed:F.default.bool.isRequired,toggleCollapse:F.default.func.isRequired,onSelect:F.default.func.isRequired,cols:F.default.number};var Lt=[{id:`Sorting Algorithms`,name:`Sorting Algorithms`,icon:(0,I.jsx)(x,{className:`w-5 h-5`}),cols:3},{id:`Searching Algorithms`,name:`Searching Algorithms`,icon:(0,I.jsx)(ue,{className:`w-5 h-5`}),cols:3},{id:`Pathfinding Algorithms`,name:`Pathfinding Algorithms`,icon:(0,I.jsx)(ne,{className:`w-5 h-5`}),cols:2},{id:`Pattern Matching Algorithms`,name:`Pattern Matching`,icon:(0,I.jsx)(ge,{className:`w-5 h-5`}),cols:3}],Rt={caseCards:[{label:`BEST CASE`,icon:ue,color:`text-emerald-400`,bg:`bg-emerald-500/5`,border:`border-emerald-500/20`,desc:`The minimum time required for an algorithm to finish (e.g., searching for the first element in an array).`},{label:`AVERAGE CASE`,icon:y,color:`text-amber-400`,bg:`bg-amber-500/5`,border:`border-amber-500/20`,desc:`The statistical expectation of time over all possible inputs. Calculated as the sum of cases divided by n (e.g. n/2 for Linear Search).`},{label:`WORST CASE`,icon:fe,color:`text-rose-400`,bg:`bg-rose-500/5`,border:`border-rose-500/20`,desc:`The absolute maximum time an algorithm can take. Essential for critical system safety and guarantees.`},{label:`SPACE COMPLEXITY`,icon:v,color:`text-blue-400`,bg:`bg-blue-500/5`,border:`border-blue-500/20`,desc:`The amount of extra memory an algorithm needs to run as the input size grows. Goal is to minimize memory footprint.`},{label:`STABILITY`,icon:ve,color:`text-indigo-400`,bg:`bg-indigo-500/5`,border:`border-indigo-500/20`,desc:`A property where equal elements maintain their relative order after sorting. Vital for multi-key sorting operations.`},{label:`ADAPTIVE`,icon:ge,color:`text-purple-400`,bg:`bg-purple-500/5`,border:`border-purple-500/20`,desc:`An algorithm is adaptive if its performance improves when the input is already partially sorted (e.g., Insertion Sort).`},{label:`UPPER BOUND (O)`,icon:b,color:`text-fuchsia-400`,bg:`bg-fuchsia-500/5`,border:`border-fuchsia-500/20`,desc:`The mathematical "ceiling" of an algorithm's growth rate. Guarantees the algorithm will never perform worse than this.`},{label:`LOWER BOUND (Ω)`,icon:Se,color:`text-pink-400`,bg:`bg-pink-500/5`,border:`border-pink-500/20`,desc:`The mathematical "floor" of an algorithm's growth rate. Represents the minimum time an algorithm will ever take.`},{label:`IN-PLACE`,icon:O,color:`text-violet-400`,bg:`bg-violet-500/5`,border:`border-violet-500/20`,desc:`An algorithm that transforms input without using auxiliary data structures, maintaining O(1) extra space complexity.`},{label:`DIVIDE & CONQUER`,icon:D,color:`text-cyan-400`,bg:`bg-cyan-500/5`,border:`border-cyan-500/20`,desc:`A paradigm that breaks a problem into smaller sub-problems, solves them recursively, and combines results.`},{label:`ITERATIVE`,icon:re,color:`text-teal-400`,bg:`bg-teal-500/5`,border:`border-teal-500/20`,desc:`An incremental approach that processes elements one by one using loops, often simpler than recursive paradigms.`},{label:`GREEDY STRATEGY`,icon:k,color:`text-lime-400`,bg:`bg-lime-500/5`,border:`border-lime-500/20`,desc:`An approach that makes the locally optimal choice at each step with the hope of finding a global optimum.`}],bigONotations:[{label:`O(1)`,type:`constant`,name:`CONSTANT`,desc:`No matter the input size, it always takes the same time.`,color:`stroke-emerald-400`,bg:`bg-emerald-500/5`},{label:`O(log n)`,type:`log`,name:`LOGARITHMIC`,desc:`Execution time grows slowly as input size increases.`,color:`stroke-blue-400`,bg:`bg-blue-500/5`},{label:`O(n)`,type:`linear`,name:`LINEAR`,desc:`Time grows in direct proportion to the input size.`,color:`stroke-indigo-400`,bg:`bg-indigo-500/5`},{label:`O(n log n)`,type:`nlog`,name:`LINEARITHMIC`,desc:`Slightly slower than linear. Common in efficient sorting.`,color:`stroke-amber-400`,bg:`bg-amber-500/5`},{label:`O(n²)`,type:`quadratic`,name:`QUADRATIC`,desc:`Time grows exponentially with input size doubled...`,color:`stroke-rose-400`,bg:`bg-rose-500/5`},{label:`O(2ⁿ)`,type:`exponential`,name:`EXPONENTIAL`,desc:`Time doubles with each new element. Very inefficient.`,color:`stroke-red-500`,bg:`bg-red-500/5`}],spaceComplexities:[{label:`O(1) Space`,name:`IN-PLACE`,desc:`Uses a fixed amount of memory regardless of input size.`,examples:`Bubble Sort, Selection Sort`},{label:`O(log n) Space`,name:`RECURSIVE`,desc:`Memory grows with the depth of the recursion tree.`,examples:`Quick Sort (recursive stack)`},{label:`O(n) Space`,name:`LINEAR EXTRA`,desc:`Requires extra memory proportional to the input size.`,examples:`Merge Sort, Counting Sort`}]},K={container:`bg-transparent text-${R.colors.textHigh} font-sans relative`,wrapper:`min-h-screen max-w-[1200px] mx-auto z-10 grow`,header:`text-center space-y-4 pt-4`,homeTitle:`${R.typography.semantics.home.title} font-black text-${R.colors.textHigh} tracking-tight mb-2`,conceptCard:`p-5 bg-slate-900/40 border border-slate-800/60 ${V.cardRound} space-y-4 hover:border-slate-700 transition-colors shadow-xl`,iconBox:`p-2 rounded-xl bg-slate-950 border border-slate-800`,notationCard:`p-4 ${V.cardRound} border border-slate-800/60 space-y-3 flex flex-col justify-between`,complexityCard:`p-4 ${V.cardRound} border border-slate-800/60 bg-indigo-500/5 space-y-3 group hover:border-slate-700 transition-colors shadow-xl`,footer:`text-center border-t border-${R.colors.borderStrong}`,copyright:`pt-2 pb-2 font-black ${R.typography.sizes.baseSmall} text-${R.colors.textDisabled} uppercase ${R.typography.tracking.wider}`,homeSubtitle:`${R.typography.semantics.home.subtitle} font-medium text-${R.colors.textMuted} max-w-2xl mx-auto mb-4`,sectionHeader:{container:`w-full group focus:outline-none`,border:`flex items-center gap-4 py-3 border-b border-${R.colors.borderStrong} transition-colors group-hover:border-${R.colors.border}`,iconBox:e=>`p-2 transition-all rounded-xl ${e?`bg-${R.colors.primary} text-${R.colors.textHigh} shadow-[0_0_15px_rgba(99,102,241,0.3)]`:`bg-slate-900 text-${R.colors.textDisabled}`}`,title:e=>`${R.typography.semantics.home.section} font-black uppercase tracking-normal transition-colors ${e?`text-${R.colors.textHigh}`:`text-${R.colors.textDisabled}`}`}};function zt({algorithms:e,onSelect:t}){let[n,r]=(0,M.useState)(new Set([`cheatsheet`,...Lt.map(e=>e.id)])),i=(0,M.useMemo)(()=>(e||[]).reduce((e,t)=>{let n=t.category||`Other`;return e[n]||(e[n]=[]),e[n].push(t),e},{}),[e]),a=e=>{r(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})};return(0,I.jsxs)(`div`,{className:K.container,children:[(0,I.jsxs)(`div`,{className:K.wrapper,children:[(0,I.jsxs)(`div`,{className:K.header,children:[(0,I.jsxs)(`h1`,{className:K.homeTitle,children:[W.hero.title,` `,(0,I.jsx)(`span`,{className:`text-indigo-500`,children:W.hero.titleAccent})]}),(0,I.jsx)(`p`,{className:K.homeSubtitle,children:W.hero.description})]}),(0,I.jsxs)(`div`,{className:`space-y-0`,children:[(0,I.jsx)(`button`,{onClick:()=>a(`cheatsheet`),className:K.sectionHeader.container,children:(0,I.jsxs)(`div`,{className:K.sectionHeader.border,children:[(0,I.jsx)(`div`,{className:K.sectionHeader.iconBox(!n.has(`cheatsheet`)),children:(0,I.jsx)(ye,{className:`w-5 h-5`})}),(0,I.jsxs)(`h2`,{className:K.sectionHeader.title(!n.has(`cheatsheet`)),children:[`Big O Cheatsheet`,` `,(0,I.jsxs)(`span`,{className:`ml-4 ${R.typography.sizes.baseSmall} text-slate-700 font-black tracking-[0.1em]`,children:[`(`,Rt.caseCards.length,`)`]})]}),(0,I.jsx)(`div`,{className:`flex-1`}),(0,I.jsx)(C,{className:`w-8 h-8 text-slate-600 group-hover:text-indigo-500 transition-all duration-500 ${n.has(`cheatsheet`)?`-rotate-90 opacity-40`:`rotate-0 opacity-100`}`})]})}),(0,I.jsx)(p,{initial:!1,children:!n.has(`cheatsheet`)&&(0,I.jsx)(m.div,{initial:{height:0,opacity:0},animate:{height:`auto`,opacity:1},exit:{height:0,opacity:0},transition:{duration:.5,ease:[.04,.62,.23,.98]},className:`overflow-hidden`,children:(0,I.jsxs)(`div`,{className:`space-y-4`,children:[(0,I.jsx)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4`,children:Rt.caseCards.map(e=>(0,I.jsxs)(`div`,{className:K.conceptCard,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,I.jsx)(`div`,{className:`${K.iconBox} ${e.color}`,children:(0,I.jsx)(e.icon,{className:`w-5 h-5`})}),(0,I.jsx)(`h3`,{className:`font-black text-white ${R.typography.sizes.baseSmall} uppercase tracking-[0.1em]`,children:e.label})]}),(0,I.jsx)(`p`,{className:`text-slate-500 ${R.typography.sizes.baseSmall} font-medium leading-relaxed`,children:e.desc})]},e.label))}),(0,I.jsx)(`div`,{className:`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4`,children:Rt.bigONotations.map(e=>(0,I.jsxs)(`div`,{className:`${K.notationCard} ${e.bg}`,children:[(0,I.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,I.jsx)(`span`,{className:`${R.typography.sizes.header} font-black ${e.color.replace(`stroke-`,`text-`)}`,children:e.label}),(0,I.jsx)(jt,{type:e.type,color:e.color})]}),(0,I.jsxs)(`div`,{className:`h-full`,children:[(0,I.jsx)(`div`,{className:`${R.typography.sizes.baseLarge} font-black text-white uppercase tracking-[0.1em] mb-1`,children:e.name}),(0,I.jsx)(`p`,{className:`${R.typography.sizes.subtext} text-slate-500 font-medium leading-snug items-center `,children:e.desc})]})]},e.label))}),(0,I.jsx)(`div`,{className:`grid grid-cols-1 md:grid-cols-3 gap-4`,children:Rt.spaceComplexities.map(e=>(0,I.jsxs)(`div`,{className:K.complexityCard,children:[(0,I.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,I.jsx)(`span`,{className:`${R.typography.sizes.baseLarge} font-black text-indigo-400`,children:e.label}),(0,I.jsx)(`div`,{className:`${R.typography.sizes.baseLarge} font-black text-white/40 uppercase tracking-[0.2em]`,children:e.name})]}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`p`,{className:`${R.typography.sizes.baseSmall} text-slate-500 font-medium leading-relaxed mb-4`,children:e.desc}),(0,I.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,I.jsx)(`span`,{className:`${R.typography.sizes.baseSmall} font-black text-indigo-500/50 uppercase`,children:`EX:`}),(0,I.jsx)(`span`,{className:`${R.typography.sizes.baseSmall} text-slate-600 font-mono italic truncate`,children:e.examples})]})]})]},e.label))})]})})})]}),(0,I.jsx)(`div`,{className:`space-y-0`,children:Lt.map(e=>(0,I.jsx)(It,{category:e.name,algorithms:i[e.id],icon:e.icon,cols:e.cols,isCollapsed:n.has(e.id),toggleCollapse:()=>a(e.id),onSelect:t},e.id))})]}),(0,I.jsx)(`footer`,{className:`${K.footer}`,children:(0,I.jsx)(`div`,{className:`${K.copyright}`,children:`© 2026 Interactive Visualizer Platform`})})]})}zt.propTypes={algorithms:F.default.arrayOf(F.default.shape({id:F.default.string.isRequired,name:F.default.string.isRequired,category:F.default.string.isRequired,difficulty:F.default.string,description:F.default.string,complexity:F.default.shape({timeBest:F.default.string,timeAvg:F.default.string,timeWorst:F.default.string,space:F.default.string})})).isRequired,onSelect:F.default.func.isRequired};var Bt=e=>{let t={};return e.map(e=>{let n=typeof e==`object`&&!!e,r=n?e.value:e,i=n?e.id:null;return i===null?(t[r]=(t[r]||0)+1,{id:`${r}-${t[r]}`,value:r}):{id:i,value:r}})},Vt=(e,t,n,r=10,i=75)=>{let a=n-t||1;return r+(e-t)/a*i},q=(0,M.memo)(({array:e=[],activeIndices:t=[],sortedIndices:n=[],pivotIndex:r=-1,swapIndices:i=[],compact:a=!1})=>{let o=(0,M.useMemo)(()=>Array.isArray(e)?e:[],[e]),s=(0,M.useMemo)(()=>Bt(o),[o]),c=(0,M.useMemo)(()=>Array.from({length:o.length},(e,t)=>`slot-${t}`),[o.length]),l=(0,M.useMemo)(()=>new Set(Array.isArray(t)?t:Array.from(t||[])),[t]),u=(0,M.useMemo)(()=>new Set(Array.isArray(n)?n:Array.from(n||[])),[n]),d=(0,M.useMemo)(()=>new Set(Array.isArray(i)?i:Array.from(i||[])),[i]),f=s.map(e=>e.value),p=Math.max(...f,1),h=Math.min(...f,0),g=(0,M.useMemo)(()=>s.map((e,t)=>{let{id:n,value:i}=e,a=Vt(i,h,p),o=l.has(t),c=u.has(t),f=r===t,g=d.has(t),_=`bg-slate-700 border-slate-600`;return o&&(_=`bg-indigo-500 border-indigo-400 ring-4 ring-indigo-500/30 z-10 shadow-[0_0_15px_rgba(99,102,241,0.4)]`),f&&(_=`bg-amber-400 border-amber-300 ring-4 ring-amber-400/40 z-20 shadow-[0_0_20px_rgba(251,191,36,0.4)]`),g&&(_=`bg-rose-500 border-rose-400 animate-pulse`),c&&(_=`bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]`),(0,I.jsx)(m.div,{layout:s.length<50,transition:{type:`spring`,stiffness:500,damping:30,mass:1},className:`flex-1 flex flex-col items-center justify-end h-full`,children:(0,I.jsx)(`div`,{className:`w-full min-w-[8px] max-w-[40px] rounded-t-lg transition-all duration-300 relative group ${_} border-t border-x`,style:{height:`${a}%`},children:(0,I.jsx)(`span`,{className:`absolute -top-8 left-1/2 -translate-x-1/2 ${H.visualiser} font-black text-white opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded-md border border-slate-700 whitespace-nowrap z-30`,children:i})})},n)}),[s,h,p,l,u,r,d]),_=(0,M.useMemo)(()=>c.map((e,t)=>{let n=l.has(t),i=r===t;return(0,I.jsx)(`div`,{className:`flex-1 flex justify-center items-center`,children:(0,I.jsx)(`span`,{className:`${H.visualiser} font-black font-mono transition-colors ${n||i?`text-white`:`text-slate-600`}`,children:t})},e)}),[c,l,r]);return o.length===0?(0,I.jsx)(`div`,{className:V.vizContainer,children:Array.isArray(e)?`No array data available to visualize.`:`Preparing array data...`}):(0,I.jsxs)(`div`,{className:`${V.vizContainer} pt-8`,children:[(0,I.jsx)(`div`,{className:`absolute top-8 bottom-8 left-0 right-0 flex flex-col justify-between px-4 pointer-events-none opacity-5`,children:[...[,,,,,]].map((e,t)=>(0,I.jsx)(`div`,{className:`w-full h-px bg-white`},t))}),(0,I.jsx)(`div`,{className:`flex-1 min-h-0 flex items-end justify-center gap-1 md:gap-2 px-4 relative z-10 border-b border-slate-700/50 pb-0`,children:g}),(0,I.jsx)(`div`,{className:`h-8 flex gap-1 md:gap-2 px-4 justify-center items-center pointer-events-none bg-slate-900/30 border-t border-slate-800/50`,children:_})]})});q.propTypes={array:F.default.arrayOf(F.default.oneOfType([F.default.number,F.default.object])),activeIndices:F.default.oneOfType([F.default.arrayOf(F.default.number),F.default.instanceOf(Set)]),sortedIndices:F.default.oneOfType([F.default.arrayOf(F.default.number),F.default.instanceOf(Set)]),pivotIndex:F.default.number,swapIndices:F.default.oneOfType([F.default.arrayOf(F.default.number),F.default.instanceOf(Set)])};function Ht({target:e=``,pattern:t=``,currentIndex:n,phase:r,compIdx:i,mismatchFound:a,isFinished:o,accessedIndices:s,activeIndices:c,lookAheadIndex:l,comparesRightToLeft:u,showShiftArrow:d}){let f=s instanceof Set?s:new Set(s||[]),p=c instanceof Set?c:new Set(c||[]);return(0,I.jsx)(`div`,{className:`overflow-x-auto pb-8 scrollbar-hide flex justify-center`,children:(0,I.jsxs)(`div`,{className:`inline-flex flex-col px-8 items-start`,children:[(0,I.jsx)(`div`,{className:`flex gap-1 mb-1`,children:e.split(``).map((e,t)=>({i:t,id:`idx-slot-${t}`})).map(e=>(0,I.jsx)(`div`,{className:`w-10 flex-shrink-0 text-center ${V.logicText.split(` `)[0]} font-bold text-slate-500 font-mono`,children:e.i},e.id))}),(0,I.jsx)(`div`,{className:`flex gap-1`,children:e.split(``).map((e,t)=>({char:e,i:t,id:`tcell-slot-${t}`})).map(e=>{let t=l!==void 0&&l!==-1&&e.i===l,r=p.has(e.i),a=i>=0&&e.i===n+i,o=f.has(e.i),s=e.i<n,c=`${V.cellBase} w-10 h-10 bg-slate-800 border-slate-700 text-slate-100`;return r?c=`${V.cellBase} w-10 h-10 bg-indigo-500/40 border-indigo-500 text-indigo-100 ring-4 ring-indigo-500/20 scale-105 z-10`:t?c=`${V.cellBase} w-10 h-10 bg-sky-400 border-sky-300 text-white shadow-xl shadow-sky-400/40 scale-110 z-10 animate-pulse`:a?c=`${V.cellBase} w-10 h-10 bg-blue-900/40 border-blue-500 text-blue-200 ring-4 ring-blue-500/20 scale-105`:(o||s)&&(c=`${V.cellBase} w-10 h-10 bg-slate-800/40 border-slate-800 text-slate-600`),(0,I.jsx)(`div`,{className:c,children:e.char},e.id)})}),(0,I.jsxs)(`div`,{className:`mt-4 flex gap-1 relative h-10`,children:[(0,I.jsx)(`div`,{className:`flex-shrink-0 transition-all duration-500 ease-in-out -mr-1`,style:{width:`${n*2.75}rem`}}),t.split(``).map((e,t)=>({char:e,i:t,id:`pcell-slot-${t}`})).map(e=>{let n=i!==-1&&e.i===i,r=i!==-1&&!u&&e.i<i||i!==-1&&u&&e.i>i||o&&!a&&e.i<t.length,s=a&&e.i===i,c=`${V.cellBase} w-10 h-10 bg-slate-700 border-slate-600 text-slate-100 shadow-md`;return n&&(c=`${V.cellBase} w-10 h-10 bg-amber-400 border-amber-300 text-amber-950 ring-4 ring-amber-400/30 scale-110 z-20 shadow-xl`),s&&(c=`${V.cellBase} w-10 h-10 bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20`),r&&(c=`${V.cellBase} w-10 h-10 bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20`),(0,I.jsx)(`div`,{className:c,children:e.char},e.id)}),d&&!o&&(0,I.jsx)(`div`,{className:`flex items-center px-2`,children:(0,I.jsx)(de,{className:`w-6 h-6 text-sky-400 animate-bounce-x`})})]})]})})}Ht.propTypes={target:F.default.string.isRequired,pattern:F.default.string.isRequired,currentIndex:F.default.number.isRequired,phase:F.default.number.isRequired,compIdx:F.default.number.isRequired,mismatchFound:F.default.bool.isRequired,isFinished:F.default.bool.isRequired,accessedIndices:F.default.oneOfType([F.default.instanceOf(Set),F.default.arrayOf(F.default.number)]),activeIndices:F.default.oneOfType([F.default.instanceOf(Set),F.default.arrayOf(F.default.number)]),lookAheadIndex:F.default.number,comparesRightToLeft:F.default.bool,showShiftArrow:F.default.bool};function Ut({concat:e,z:t,i:n,l:r,r:i,activeIndices:a,referenceIndex:o}){let s=a instanceof Set?a:new Set(a||[]),c=o??-1,l=e||``,u=l.indexOf(`$`),d=l.split(``).map((e,t)=>({char:e,pos:t,id:`slot-${t}`}));return(0,I.jsx)(`div`,{className:`space-y-8 overflow-x-auto pb-8 scrollbar-hide`,children:(0,I.jsxs)(`div`,{className:`inline-flex flex-col min-w-full px-4`,children:[(0,I.jsx)(`div`,{className:`flex gap-1 mb-1`,children:d.map(e=>(0,I.jsx)(`div`,{className:`w-10 flex-shrink-0 text-center ${V.logicText.split(` `)[0]} font-bold text-slate-500 font-mono`,children:e.pos},`idx-row-${e.id}`))}),(0,I.jsx)(`div`,{className:`flex gap-1`,children:d.map(e=>{let t=e.pos>=r&&e.pos<=i&&r!==0,a=s.has(e.pos)||e.pos===n,o=e.pos<u,l=e.char===`$`,d=`${V.cellBase} `;return l?d+=`bg-slate-900 border-slate-800 text-rose-500 shadow-none`:e.pos===c?d+=`bg-amber-400 border-amber-500 text-amber-950 ring-4 ring-amber-400/30 scale-110 z-20`:a?d+=`bg-indigo-500 border-indigo-400 text-white scale-110 z-20 ring-4 ring-indigo-500/20`:t?d+=`bg-indigo-500/20 border-indigo-500/50 text-indigo-100`:o?d+=`bg-slate-800/80 border-slate-700 text-emerald-400`:d+=`bg-slate-800 border-slate-700 text-slate-100`,(0,I.jsx)(`div`,{className:`${d} w-10 h-10`,children:e.char},`char-row-${e.id}`)})}),(0,I.jsx)(`div`,{className:`flex gap-1 mt-4`,children:(0,I.jsx)(p,{mode:`popLayout`,children:d.map(e=>{let r=t[e.pos],i=r!=null,a=e.pos===n,o=e.pos<=u,s=i&&r===u&&!o,c=i&&r>0&&r!==u&&!o,l=`${V.cellValueBase} `;a?l+=`bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/20`:s?l+=`bg-emerald-500/10 border-emerald-500/50`:c?l+=`bg-rose-500/10 border-rose-500/50`:l+=`bg-slate-900 border-slate-800/50`;let d=i&&!o?r:`-`,f=`text-slate-400`;return s?f=`text-emerald-400`:c&&(f=`text-rose-400`),(0,I.jsxs)(m.div,{layout:!0,initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:`${l} w-10 h-14`,children:[(0,I.jsxs)(`span`,{className:`${V.logicText.split(` `)[0]} font-black text-slate-600 mb-1`,children:[`Z[`,e.pos,`]`]}),(0,I.jsx)(`span`,{className:`${V.logicText.split(` `)[0]} font-bold ${f}`,children:d})]},`z-val-row-${e.id}`)})})}),(0,I.jsx)(`div`,{className:`mt-8 flex gap-1 relative h-6 min-h-[1.5rem]`,children:(0,I.jsx)(p,{children:r!==0&&i>=r&&(0,I.jsxs)(m.div,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},exit:{opacity:0,y:5},className:`absolute h-1 bg-indigo-500/50 rounded-full bottom-0 transition-all duration-500`,style:{left:`${r*2.75}rem`,width:`${(i-r+1)*2.75-.25}rem`},children:[(0,I.jsx)(`div`,{className:`absolute inset-0 bg-indigo-500 blur-[2px] opacity-50`}),(0,I.jsxs)(`span`,{className:`absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap ${V.logicText.split(` `)[0]} font-black text-indigo-400 uppercase tracking-tighter bg-slate-950 px-2 py-0.5 border border-indigo-500/30 rounded-md shadow-xl z-30`,children:[`Z-Box [`,r,`, `,i,`]`]})]})})})]})})}Ut.propTypes={concat:F.default.string.isRequired,z:F.default.arrayOf(F.default.number).isRequired,i:F.default.number.isRequired,l:F.default.number.isRequired,r:F.default.number.isRequired,activeIndices:F.default.oneOfType([F.default.instanceOf(Set),F.default.arrayOf(F.default.number)]),referenceIndex:F.default.number};var Wt={label:`${R.typography.sizes.subtext} font-black text-slate-500 uppercase tracking-widest leading-none mb-1`,value:`${R.typography.semantics.home.title} font-mono font-black leading-none`};function Gt({iterations:e,comparisons:t,accesses:n}){let r=Wt;return(0,I.jsx)(`div`,{className:`flex flex-wrap gap-4`,children:[{label:`Passes`,value:e,icon:ve,color:`text-white`,bg:`bg-white/5`},{label:`Comparisons`,value:t,icon:ge,color:`text-blue-400`,bg:`bg-blue-400/5`},{label:`Accesses`,value:n,icon:oe,color:`text-indigo-400`,bg:`bg-indigo-400/5`}].map(e=>(0,I.jsxs)(`div`,{className:`bg-slate-900/40 border border-slate-800/60 p-3 px-5 rounded-lg flex items-center gap-4 transition-all hover:border-slate-700/80`,children:[(0,I.jsx)(`div`,{className:`p-2 ${e.bg} rounded-xl`,children:(0,I.jsx)(e.icon,{className:`w-4 h-4 ${e.color}`})}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:r.label,children:e.label}),(0,I.jsx)(`div`,{className:`${r.value} ${e.color}`,children:e.value||0})]})]},e.label))})}Gt.propTypes={iterations:F.default.number,comparisons:F.default.number,accesses:F.default.number};var{typography:Kt}=R,J={category:`text-[18px] md:text-[22px] font-black text-white/30 uppercase tracking-tighter`,name:`${H.title} text-white leading-none`,metricLabel:`${Kt.sizes.subtext} font-black text-slate-500 uppercase tracking-widest`,metricValue:e=>`${Kt.sizes.baseSmall} font-mono font-black text-${e}-400`,btnBase:`flex items-center gap-2 px-4 py-2 rounded-xl ${H.button} transition-all active:scale-95 border`},Y={bar:`px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center gap-6`,backBtn:`p-2.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all group shadow-inner`,category:J.category,name:J.name,metricPill:`hidden lg:flex items-center gap-8 px-8 py-2.5 bg-slate-950/50 rounded-full border border-slate-800/50 shadow-inner`,metricLabel:J.metricLabel,metricValue:J.metricValue,controlGroup:`flex items-center gap-3 bg-slate-950/40 p-1.5 rounded-2xl border border-slate-800/40 shadow-inner`,btnBase:J.btnBase,btnReset:`bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20`,btnPrimary:e=>e?`bg-cyan-500/15 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/25`:`bg-slate-800/80 border-slate-700/50 text-slate-300 hover:bg-slate-700 shadow-md`,btnGhost:`bg-slate-800/30 border-slate-700/40 text-amber-400/80 hover:bg-slate-700/50`,btnFinished:`bg-purple-500/15 text-purple-400 border-purple-500/30 hover:bg-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.1)]`};function qt({name:e,isFinished:t,onBack:n,reset:r,prevStep:i,nextStep:a,togglePlay:o,canPrev:s,canNext:c,isPlaying:l,buttonText:u,state:d,algorithm:f}){let p=f?.type===`pathfinding`,m=d?.path?.length||0,h=(d?.visited instanceof Set?d.visited.size:(d?.visited||[]).flat().filter(Boolean).length)+(d?.queue||d?.openSet||[]).length;return(0,I.jsxs)(`div`,{className:Y.bar,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-6`,children:[n&&(0,I.jsx)(`button`,{onClick:n,className:Y.backBtn,title:`Back to Dashboard`,children:(0,I.jsx)(E,{className:`w-5 h-5 group-hover:-translate-x-1 transition-transform`})}),(0,I.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,I.jsx)(`span`,{className:Y.category,children:f.category}),(0,I.jsx)(`span`,{className:`text-slate-800 font-thin select-none mb-1`,children:` / `}),(0,I.jsxs)(`span`,{className:`${Y.name} text-slate-800 font-thin select-none mb-1`,children:[` `,e]})]})]}),p&&(0,I.jsxs)(`div`,{className:Y.metricPill,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,I.jsx)(`div`,{className:Y.metricLabel,children:`Path:`}),(0,I.jsx)(`div`,{className:Y.metricValue(`emerald`),children:m})]}),(0,I.jsx)(`div`,{className:`w-px h-5 bg-slate-800/50`}),(0,I.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,I.jsx)(`div`,{className:Y.metricLabel,children:`Checked:`}),(0,I.jsxs)(`div`,{className:`${Y.metricValue(`indigo`)} flex items-baseline`,children:[h,(0,I.jsxs)(`span`,{className:`${H.key} text-slate-500/60 font-black ml-1.5`,children:[`/`,` `,Math.max(0,(d?.rows||0)*(d?.cols||0)-(d?.walls?.size??d?.walls?.length??0)-2)]})]})]})]}),(0,I.jsxs)(`div`,{className:Y.controlGroup,children:[(0,I.jsxs)(`button`,{onClick:r,className:`${Y.btnBase} ${Y.btnReset}`,title:`Hard Reset`,children:[(0,I.jsx)(_e,{className:`w-3.5 h-3.5`}),`Reset`]}),(0,I.jsx)(`div`,{className:`w-px h-6 bg-slate-800/50 mx-1`}),(0,I.jsxs)(`button`,{onClick:o,className:`${Y.btnBase} ${Y.btnPrimary(l)}`,children:[l?(0,I.jsx)(pe,{className:`w-3.5 h-3.5 fill-current`}):(0,I.jsx)(ie,{className:`w-3.5 h-3.5 fill-current`}),l?`Pause`:`Auto Play`]}),(0,I.jsxs)(`button`,{onClick:i,disabled:!s,className:`${Y.btnBase} ${Y.btnGhost} px-4`,children:[(0,I.jsx)(S,{className:`w-3.5 h-3.5`}),` Prev`]}),(0,I.jsxs)(`button`,{onClick:a,disabled:!c&&!t,className:`${Y.btnBase} ${t?Y.btnFinished:Y.btnGhost} px-5`,children:[t?`Restart`:u||`Next`,t?(0,I.jsx)(_e,{className:`w-3.5 h-3.5`}):(0,I.jsx)(ce,{className:`w-3.5 h-3.5`})]})]})]})}qt.propTypes={name:F.default.string.isRequired,isFinished:F.default.bool,onBack:F.default.func,reset:F.default.func.isRequired,prevStep:F.default.func.isRequired,nextStep:F.default.func.isRequired,togglePlay:F.default.func.isRequired,canPrev:F.default.bool.isRequired,canNext:F.default.bool.isRequired,isPlaying:F.default.bool.isRequired,buttonText:F.default.string,state:F.default.object,algorithm:F.default.object};var X={label:`${R.typography.sizes.subtext} font-black text-slate-500 uppercase tracking-widest`,value:`${R.typography.semantics.home.title} font-mono font-black text-white`};function Jt({state:e}){let{path:t,visited:n,rows:r,cols:i}=e,a=t?.length||0,o=(n||[]).flat().filter(Boolean).length,s=r*i,c=s>0?(o/s*100).toFixed(1):0;return(0,I.jsxs)(`div`,{className:`grid grid-cols-1 md:grid-cols-3 gap-4`,children:[(0,I.jsxs)(`div`,{className:`bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center gap-4`,children:[(0,I.jsx)(`div`,{className:`p-3 bg-emerald-500/10 rounded-xl`,children:(0,I.jsx)(k,{className:`w-5 h-5 text-emerald-400`})}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:X.label,children:`Path Length`}),(0,I.jsx)(`div`,{className:X.value,children:a})]})]}),(0,I.jsxs)(`div`,{className:`bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center gap-4`,children:[(0,I.jsx)(`div`,{className:`p-3 bg-indigo-500/10 rounded-xl`,children:(0,I.jsx)(g,{className:`w-5 h-5 text-indigo-400`})}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:X.label,children:`Visited Nodes`}),(0,I.jsx)(`div`,{className:X.value,children:o})]})]}),(0,I.jsxs)(`div`,{className:`bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center gap-4`,children:[(0,I.jsx)(`div`,{className:`p-3 bg-blue-500/10 rounded-xl`,children:(0,I.jsx)(be,{className:`w-5 h-5 text-blue-400`})}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{className:X.label,children:`Grid Coverage`}),(0,I.jsxs)(`div`,{className:X.value,children:[c,`%`]})]})]})]})}Jt.propTypes={state:F.default.shape({path:F.default.array,visited:F.default.arrayOf(F.default.arrayOf(F.default.bool)),rows:F.default.number,cols:F.default.number}).isRequired};function Yt({state:e}){return!e.countArray&&!e.temp&&!e.output&&!e.buckets?null:(0,I.jsxs)(`div`,{className:`p-8 bg-slate-900/40 border border-slate-800/60 ${V.cardRound} backdrop-blur-md space-y-8 shadow-2xl`,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-3 pb-2 border-b border-slate-800/60`,children:[(0,I.jsx)(ve,{className:`w-4 h-4 text-indigo-400`}),(0,I.jsx)(`h3`,{className:`${H.consoleTitle} text-white`,children:`Auxiliary Visualization`})]}),(0,I.jsxs)(`div`,{className:`space-y-8`,children:[e.countArray&&(0,I.jsxs)(`div`,{className:`space-y-4`,children:[(0,I.jsx)(`div`,{className:`${V.logicText.split(` `)[0]} font-black text-indigo-400/80 uppercase tracking-widest flex items-center gap-2 ml-2`,children:`Count Array (Occurrences)`}),(0,I.jsx)(q,{array:e.countArray,activeIndices:e.phase===2?[e.i]:[]})]}),e.temp&&e.phase===2&&(0,I.jsxs)(`div`,{className:`space-y-4`,children:[(0,I.jsx)(`div`,{className:`${V.logicText.split(` `)[0]} font-black text-indigo-400/80 uppercase tracking-widest flex items-center gap-2 ml-2`,children:`Working Buffer (Temp)`}),(0,I.jsx)(q,{array:e.temp,activeIndices:[e.k]})]}),e.output&&(0,I.jsxs)(`div`,{className:`space-y-4`,children:[(0,I.jsx)(`div`,{className:`${V.logicText.split(` `)[0]} font-black text-emerald-400/80 uppercase tracking-widest flex items-center gap-2 ml-2`,children:`Output Array (Building)`}),(0,I.jsx)(q,{array:e.output})]}),e.buckets&&(0,I.jsxs)(`div`,{className:`space-y-4`,children:[(0,I.jsx)(`div`,{className:`${V.logicText.split(` `)[0]} font-black text-indigo-400/80 uppercase tracking-widest flex items-center gap-2 ml-2`,children:`Distribution Buckets (0-9)`}),(0,I.jsx)(`div`,{className:`grid grid-cols-5 md:grid-cols-10 gap-4`,children:e.buckets.map((e,t)=>({bucket:e,bIdx:t,id:`bucket-slot-${t}`})).map(e=>(0,I.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,I.jsxs)(`div`,{className:`${V.logicText.split(` `)[0]} font-black text-slate-500 text-center uppercase tracking-tighter`,children:[`B`,e.bIdx]}),(0,I.jsx)(`div`,{className:`flex-1 bg-slate-950 border border-slate-800/60 rounded-xl p-2 min-h-[60px] flex flex-col-reverse gap-1.5 items-center shadow-inner`,children:e.bucket.map((e,t)=>({val:e,vIdx:t,subId:`val-${t}-${e}`})).map(e=>(0,I.jsx)(`div`,{className:`w-full h-2.5 bg-indigo-500/50 rounded-sm shadow-[0_0_8px_rgba(99,102,241,0.3)]`},e.subId))}),(0,I.jsx)(`div`,{className:`${V.logicText.split(` `)[0]} font-mono text-center text-slate-400 font-black`,children:e.bucket.length})]},e.id))})]})]})]})}Yt.propTypes={state:F.default.object.isRequired};var Z={section:`${V.glassPanel} ${V.cardRound} p-6 shadow-xl`,title:`flex items-center gap-2 font-black text-indigo-400 uppercase tracking-widest text-[10px]`,label:`text-[10px] font-black text-slate-500 uppercase tracking-widest`,charBox:`w-6 h-6 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center font-mono font-black text-white text-[11px] shadow-inner`,dataBox:`flex flex-col items-center justify-center min-w-[2.5rem] p-2 bg-slate-950/50 rounded-xl shadow-inner transition-all duration-300`,logicTitle:`font-black text-slate-300 uppercase tracking-widest text-[10px] mb-2`,logicText:`text-[10px] font-medium leading-relaxed text-slate-500`,logicNote:`block mt-2 pt-2 border-t border-slate-800/60 text-slate-600 italic`};function Xt({shiftTable:e,lookAheadChar:t,patternLength:n,pattern:r,title:i=`Shift Table`,logic:a,defaultText:o}){return(0,I.jsxs)(`div`,{className:Z.section,children:[(0,I.jsxs)(`div`,{className:`flex justify-between items-center mb-6`,children:[(0,I.jsxs)(`div`,{className:Z.title,children:[(0,I.jsx)(A,{className:`w-3.5 h-3.5`}),` `,i]}),r&&(0,I.jsxs)(`div`,{className:`flex gap-1 items-center`,children:[(0,I.jsx)(`span`,{className:Z.label,children:`Pattern:`}),r.split(``).map((e,t)=>(0,I.jsx)(`div`,{className:Z.charBox,children:e},t))]})]}),(0,I.jsxs)(`div`,{className:`flex flex-col md:flex-row gap-6 items-stretch`,children:[(0,I.jsxs)(`div`,{className:`flex flex-wrap gap-3 flex-1`,children:[Object.entries(e).map(([e,n])=>{let r=t===e;return(0,I.jsxs)(`div`,{className:`${Z.dataBox} border ${r?`border-indigo-400 ring-4 ring-indigo-400/20 scale-110 z-10 shadow-lg bg-slate-700`:`border-slate-700 opacity-60`}`,children:[(0,I.jsx)(`span`,{className:`font-black text-white text-[13px]`,children:e}),(0,I.jsx)(`span`,{className:`text-indigo-400 font-mono font-black ${Z.logicText}`,children:n})]},e)}),(0,I.jsxs)(`div`,{className:`${Z.dataBox} border ${t&&!e[t]?`border-indigo-400 ring-4 ring-indigo-400/20 scale-110 z-10 shadow-lg bg-slate-700`:`border-slate-700 opacity-30`}`,children:[(0,I.jsx)(`span`,{className:`font-black text-slate-500 ${Z.logicText}`,children:`?`}),(0,I.jsx)(`span`,{className:`text-slate-500 font-mono font-black ${Z.logicText}`,children:n+1})]})]}),(0,I.jsxs)(`div`,{className:`md:w-40 flex-shrink-0 flex flex-col justify-center pl-6 border-l border-slate-800/60 hidden md:flex`,children:[(0,I.jsx)(`div`,{className:Z.logicTitle,children:`Shift Logic`}),(0,I.jsxs)(`p`,{className:Z.logicText,children:[a||`Shift = m - last_index`,(0,I.jsx)(`br`,{}),(0,I.jsxs)(`span`,{className:Z.logicNote,children:[`Default: `,o||`m + 1`]})]})]})]})]})}Xt.propTypes={shiftTable:F.default.object.isRequired,lookAheadChar:F.default.string,patternLength:F.default.number.isRequired,pattern:F.default.string,title:F.default.string,logic:F.default.string,defaultText:F.default.string};var Q={section:`${V.glassPanel} ${V.cardRound} p-8 shadow-2xl`,sectionTitle:`flex items-center gap-2 font-black text-indigo-400 uppercase tracking-widest text-[11px]`,label:`text-[10px] font-black text-slate-500 uppercase tracking-widest`,charBox:`w-8 h-8 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center font-mono font-black text-white shadow-inner`,dataBox:`flex flex-col items-center justify-center min-w-[3.5rem] p-3 bg-slate-950/50 border border-slate-800/60 rounded-2xl shadow-inner`,dataCard:`flex items-center justify-between p-5 bg-slate-950/50 border border-slate-800 rounded-2xl shadow-inner`,dataLabel:`text-[11px] font-black text-slate-500 uppercase tracking-widest`,dataValue:`font-mono text-2xl font-black`,logicTitle:`font-black text-slate-300 uppercase tracking-widest text-[11px] mb-3`,logicText:`text-[11px] font-medium leading-relaxed text-slate-500`,logicNote:`block mt-3 pt-3 border-t border-slate-800/60 text-slate-600 italic`,arrayItem:(e,t)=>`flex flex-col items-center justify-center p-3 min-w-[3rem] bg-slate-950/50 border transition-all duration-300 rounded-xl shadow-inner ${e?`border-${t}-500/50 bg-${t}-500/10 scale-105 shadow-[0_0_15px_rgba(99,102,241,0.2)]`:`border-slate-800/60`}`,bucketContainer:`flex flex-col-reverse gap-1.5 p-2 min-h-[100px] bg-slate-950/50 border border-slate-800/60 rounded-2xl shadow-inner`},Zt=(0,M.memo)(({algorithm:e,state:t,preprocessing:n,target:r,pattern:i,isArrayBased:a})=>{let o=e.auxDataConfig;return(0,I.jsxs)(`div`,{className:`h-full space-y-8`,children:[o?.type===`map`&&n?.[o.dataKey]&&(0,I.jsx)(Xt,{shiftTable:n[o.dataKey],lookAheadChar:r[t.currentIndex+i.length-+(o.dataKey===`badCharTable`)],patternLength:i.length,pattern:i,title:o.title,logic:o.logic,defaultText:o.defaultText}),o?.type===`failureFunction`&&n?.[o.dataKey]&&(0,I.jsxs)(`div`,{className:Q.section,children:[(0,I.jsxs)(`div`,{className:`flex justify-between items-center mb-8`,children:[(0,I.jsx)(`div`,{className:Q.sectionTitle,children:o.title}),i&&(0,I.jsxs)(`div`,{className:`flex gap-2 items-center`,children:[(0,I.jsx)(`span`,{className:Q.label,children:`Pattern:`}),i.split(``).map((e,t)=>(0,I.jsx)(`div`,{className:Q.charBox,children:e},`char-box-${t}-${e}`))]})]}),(0,I.jsxs)(`div`,{className:`flex flex-col md:flex-row gap-8 items-stretch`,children:[(0,I.jsx)(`div`,{className:`flex-1 flex gap-2.5 flex-wrap`,children:n[o.dataKey].map((e,t)=>({val:e,i:t,id:`pi-${t}`})).map(e=>(0,I.jsxs)(`div`,{className:Q.dataBox,children:[(0,I.jsxs)(`span`,{className:`${Q.logicText} font-black text-slate-500 mb-1.5 uppercase`,children:[`p[`,e.i,`]`]}),(0,I.jsx)(`span`,{className:`text-white font-mono font-black ${V.cardDescription.split(` `)[0]}`,children:i[e.i]}),(0,I.jsx)(`span`,{className:`text-indigo-400 font-mono font-black ${V.cardDescription.split(` `)[0]}`,children:e.val})]},e.id))}),(0,I.jsxs)(`div`,{className:`md:w-56 flex-shrink-0 flex flex-col justify-center pl-8 border-l border-slate-800/60 hidden md:flex`,children:[(0,I.jsx)(`div`,{className:Q.logicTitle,children:`Shift Logic`}),(0,I.jsxs)(`p`,{className:Q.logicText,children:[o.logic.split(`
`).map((e,t)=>(0,I.jsxs)(`span`,{children:[e,(0,I.jsx)(`br`,{})]},`${o.title}-line-${t}`)),o.logicNote&&(0,I.jsx)(`span`,{className:Q.logicNote,children:o.logicNote})]})]})]})]}),o?.type===`rollingHash`&&t.patternHash!==void 0&&(0,I.jsxs)(`div`,{className:Q.section,children:[(0,I.jsxs)(`div`,{className:`flex justify-between items-center mb-8`,children:[(0,I.jsxs)(`div`,{className:Q.sectionTitle,children:[(0,I.jsx)(te,{className:`w-4 h-4`}),` `,o.title]}),i&&(0,I.jsxs)(`div`,{className:`flex gap-2 items-center`,children:[(0,I.jsx)(`span`,{className:Q.label,children:`Pattern:`}),i.split(``).map((e,t)=>(0,I.jsx)(`div`,{className:`w-6 h-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center ${Q.logicText} font-mono font-bold text-slate-300`,children:e},`char-box-${t}-${e}`))]})]}),(0,I.jsxs)(`div`,{className:`flex flex-col md:flex-row gap-8 items-stretch`,children:[(0,I.jsxs)(`div`,{className:`flex-1 space-y-5`,children:[(0,I.jsxs)(`div`,{className:Q.dataCard,children:[(0,I.jsx)(`span`,{className:Q.dataLabel,children:`Pattern Hash`}),(0,I.jsx)(`span`,{className:`text-emerald-400 ${Q.dataValue}`,children:t.patternHash})]}),(0,I.jsxs)(`div`,{className:`${Q.dataCard} transition-all ${t.targetHash===t.patternHash?`border-emerald-500 ring-2 ring-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]`:`border-slate-800`}`,children:[(0,I.jsx)(`span`,{className:Q.dataLabel,children:`Window Hash`}),(0,I.jsx)(`span`,{className:`${Q.dataValue} ${t.targetHash===t.patternHash?`text-emerald-400`:`text-rose-400`}`,children:t.targetHash})]})]}),(0,I.jsxs)(`div`,{className:`md:w-56 flex-shrink-0 flex flex-col justify-center pl-8 border-l border-slate-800/60 hidden md:flex`,children:[(0,I.jsx)(`div`,{className:Q.logicTitle,children:`Hash Logic`}),(0,I.jsxs)(`p`,{className:Q.logicText,children:[o.logic.split(`
`).map((e,t)=>(0,I.jsxs)(`span`,{children:[e,(0,I.jsx)(`br`,{})]},`${o.title}-hash-line-${t}`)),o.logicNote&&(0,I.jsx)(`span`,{className:Q.logicNote,children:o.logicNote})]})]})]})]}),a&&(0,I.jsxs)(`div`,{className:`space-y-8`,children:[o?.type===`countingArrays`&&(t.countArray||t.output)&&(0,I.jsx)(`div`,{className:Q.section,children:(0,I.jsxs)(`div`,{className:`flex flex-col md:flex-row gap-10`,children:[t.countArray&&(0,I.jsxs)(`div`,{className:`flex-1 space-y-5`,children:[(0,I.jsxs)(`div`,{className:Q.sectionTitle,children:[(0,I.jsx)(A,{className:`w-4 h-4`}),` Count Array`]}),(0,I.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:t.countArray.map((e,t)=>({c:e,i:t,id:`count-${t}`})).map(e=>(0,I.jsxs)(`div`,{className:Q.arrayItem(t.phase===2&&t.i===e.i,`indigo`),children:[(0,I.jsx)(`span`,{className:`${Q.logicText} text-slate-600 font-bold uppercase`,children:e.i}),(0,I.jsx)(`span`,{className:`${V.cardDescription.split(` `)[0]} text-white font-mono font-black`,children:e.c})]},e.id))})]}),t.output&&(0,I.jsxs)(`div`,{className:`flex-1 space-y-5 border-t xl:border-t-0 xl:border-l border-slate-800/60 pt-6 xl:pt-0 xl:pl-10`,children:[(0,I.jsxs)(`div`,{className:Q.sectionTitle.replace(`indigo`,`emerald`),children:[(0,I.jsx)(A,{className:`w-4 h-4`}),` Output Array`]}),(0,I.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:t.output.map((e,t)=>({val:e,i:t,id:`output-${t}`})).map(e=>(0,I.jsxs)(`div`,{className:Q.arrayItem(t.swapIndices?.includes(e.i),`emerald`),children:[(0,I.jsx)(`span`,{className:`${Q.logicText} text-slate-600 font-bold uppercase`,children:e.i}),(0,I.jsx)(`span`,{className:`${V.cardDescription.split(` `)[0]} text-white font-mono font-black`,children:e.val??`-`})]},e.id))})]})]})}),o?.type===`buckets`&&t.buckets&&(0,I.jsxs)(`div`,{className:Q.section,children:[(0,I.jsxs)(`div`,{className:Q.sectionTitle,children:[(0,I.jsx)(A,{className:`w-4 h-4`}),` Distribution Buckets`]}),(0,I.jsx)(`div`,{className:`grid grid-cols-5 md:grid-cols-10 gap-4`,children:t.buckets.map((e,t)=>({bucket:e,bIdx:t,id:`bucket-slot-${t}`})).map(e=>(0,I.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,I.jsxs)(`div`,{className:`${Q.logicText} font-black text-slate-500 text-center uppercase tracking-widest`,children:[`B`,e.bIdx]}),(0,I.jsx)(`div`,{className:Q.bucketContainer,children:e.bucket.map((e,t)=>({val:e,vIdx:t,subId:`val-${t}-${e}`})).map(e=>(0,I.jsx)(`div`,{className:`w-full h-2.5 bg-indigo-500/50 rounded-sm shadow-[0_0_8px_rgba(99,102,241,0.4)]`,title:e.val},e.subId))}),(0,I.jsx)(`div`,{className:`${Q.logicText} font-mono text-center text-slate-400 font-black`,children:e.bucket.length})]},e.id))})]})]})]})});Zt.propTypes={algorithm:F.default.object.isRequired,state:F.default.object.isRequired,preprocessing:F.default.object.isRequired,target:F.default.string,pattern:F.default.string,isArrayBased:F.default.bool.isRequired};function Qt(e,t,n,r=500){let[i,a]=(0,M.useState)(!1),o=(0,M.useRef)(null),s=(0,M.useCallback)(()=>{o.current&&=(clearInterval(o.current),null),a(!1)},[]),c=(0,M.useCallback)(()=>{i?s():(n&&t(),a(!0))},[i,n,t,s]);return(0,M.useEffect)(()=>(i&&!n?o.current=setInterval(()=>{e()},r):o.current&&=(clearInterval(o.current),null),()=>{o.current&&clearInterval(o.current)}),[i,n,e,r]),{isPlaying:i,togglePlay:c,stopPlay:s}}function $t(e,t){let n=(0,M.useMemo)(()=>e?.metadata||{},[e]),r=(0,M.useMemo)(()=>e?.algorithmPage?.uiConfig||e?.uiConfig||{},[e]),i=(0,M.useMemo)(()=>e?.homeCard?.name||e?.name||``,[e]),a=(0,M.useMemo)(()=>n.type||e?.type||``,[e,n]),o=(0,M.useCallback)(()=>t?t.isFinished?L.labels.restart:t.phase>0?L.labels.next:r.startButton?r.startButton:a===`data-structure`?L.labels.startOperation:a===`sorting`?L.labels.startSort:L.labels.startSearch:L.labels.next,[t,a,r.startButton]);return(0,M.useMemo)(()=>{if(!e)return{button:L.labels.next,label:``,vizTitle:``};let n=a===`sorting`,s=a===`searching`,c=r.statusLabel||`${i} State`;c=c.replaceAll(/{(\w+)}/g,(e,n)=>{let r=t?.[n];return r===void 0?`{${n}}`:r}),r.statusLabel||(n?c=L.labels.arrayElements:s&&(c=L.labels.targetValue.replace(`{value}`,t?.targetValue||``)));let l=r.vizTitle;l||=n?L.labels.sortingViz:s?L.labels.searchingViz:L.labels.dsViz;let u=r.inputLabel1||(s||n?L.labels.arrayInput:L.labels.targetText),d=r.inputLabel2||(s?L.labels.target:L.labels.pattern),f=r.inputPlaceholder1||(n||s?L.labels.arrayPlaceholder:``),p=r.inputPlaceholder2||(s?L.labels.target:L.labels.pattern);return{button:o(),label:c,vizTitle:l,inputLabel1:u,inputLabel2:d,inputPlaceholder1:f,inputPlaceholder2:p}},[e,t,o,r,a,i])}var $={contentWrapper:`space-y-6 p-6`,vizArea:`relative ${V.glassPanel} ${V.cardRound} p-6 min-h-[300px]`,gridSection:`grid grid-cols-1 xl:grid-cols-10 gap-6 items-stretch`,inputWrapper:`xl:col-span-7 w-full min-w-0`,legendWrapper:`xl:col-span-3 w-full min-w-0`,bottomGrid:e=>`grid grid-cols-1 ${e?`xl:grid-cols-3`:`xl:grid-cols-2`} gap-8 items-stretch`,footerIcon:`w-3 h-3 text-${R.colors.primaryLight}`,panel:`w-full max-w-[1400px] bg-${R.colors.background}/40 backdrop-blur-xl border border-${R.colors.border} rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col`,footer:`p-6 flex justify-between items-center border-t border-${R.colors.border} bg-slate-950/50 text-${R.colors.textMuted} font-medium tracking-wider uppercase`,logicText:`${H.key} text-${R.colors.textDisabled} leading-relaxed`},en=(0,M.memo)(({algorithm:e,state:t,target:n,pattern:r,updateState:i,toggleWall:a,gridTool:o,isEditingDisabled:s})=>{let c=e.type===`sorting`||e.type===`searching`;return e.visualiserType===`array`||c?(0,I.jsx)(q,{array:t.array||t.nodes||t.table||t.tree||[],activeIndices:t.activeIndices,sortedIndices:t.sortedIndices,pivotIndex:t.pivotIndex||t.curIdx||t.hashValue,swapIndices:t.swapIndices}):e.visualiserType===`z`?(0,I.jsx)(Ut,{concat:t.concat,z:t.z||[],i:t.i,l:t.l||0,r:t.r||0,activeIndices:t.activeIndices,referenceIndex:t.referenceIndex}):e.visualiserType===`grid`||e.type===`pathfinding`?(0,I.jsx)(St,{algorithm:e,state:t,updateState:i,toggleWall:a,gridTool:o,isEditingDisabled:s}):(0,I.jsx)(Ht,{target:n,pattern:r,currentIndex:t.currentIndex,phase:t.phase,compIdx:t.compIdx,mismatchFound:t.mismatchFound,isFinished:t.isFinished,accessedIndices:t.accessedIndices,activeIndices:t.activeIndices,lookAheadIndex:t.lookAheadIndex,comparesRightToLeft:t.comparesRightToLeft,showShiftArrow:t.showShiftArrow})});en.propTypes={algorithm:F.default.object.isRequired,state:F.default.object.isRequired,target:F.default.string,pattern:F.default.string,updateState:F.default.func,toggleWall:F.default.func,gridTool:F.default.string,isEditingDisabled:F.default.bool};function tn({algorithm:e,state:t,target:n,setTarget:r,pattern:i,setPattern:a,softReset:o,factoryReset:s,prevStep:c,nextStep:l,updateState:u,toggleWall:d,clearWalls:f,history:p,preprocessing:m,onBack:h,gridTool:g,setGridTool:_,playbackRate:v,setPlaybackRate:y,gridSize:b,setGridSize:x}){let S=(0,M.useMemo)(()=>{if(e.lineHighlights&&Object.keys(e.lineHighlights).length>0)return e.lineHighlights;let t={};return Object.entries(e.visualSteps||{}).forEach(([e,n])=>{n.highlights&&(t[e]=n.highlights)}),t},[e]),C=t.log?.messageKey||t.log?.codeStep||t.log?.title,w=(e.uiConfig?.playbackSpeed||500)/v,{isPlaying:T,togglePlay:E,stopPlay:D}=Qt(l,o,t.isFinished,w),O=$t(e,t),k=T||t.phase>0||(t.iterations||0)>0,te=e.type===`sorting`||e.type===`searching`;return(0,I.jsx)(`div`,{className:V.pageWrapper,children:(0,I.jsxs)(`div`,{className:$.panel,children:[(0,I.jsx)(qt,{name:e.name,isFinished:t.isFinished,onBack:h,reset:()=>{D(),s()},prevStep:()=>{D(),c()},nextStep:()=>{D(),t.isFinished?o():l()},togglePlay:E,canPrev:p.length>0&&!T,canNext:!T,isPlaying:T,buttonText:O.button,state:t,algorithm:e}),(0,I.jsxs)(`div`,{className:$.contentWrapper,children:[(0,I.jsxs)(`div`,{className:$.gridSection,children:[(0,I.jsx)(`div`,{className:$.inputWrapper,children:(0,I.jsx)(Tt,{target:n,setTarget:r,pattern:i,setPattern:a,isPlaying:T,type:e.type,label:O.inputLabel1,label2:O.inputLabel2,placeholder1:O.inputPlaceholder1,placeholder2:O.inputPlaceholder2,gridTool:g,setGridTool:_,isEditingDisabled:k,playbackRate:v,setPlaybackRate:y,clearWalls:f,gridSize:b,setGridSize:x})}),(0,I.jsx)(`div`,{className:$.legendWrapper,children:(0,I.jsx)(Dt,{items:e.legendItems||[]})})]}),(0,I.jsx)(`div`,{className:$.vizArea,children:(0,I.jsx)(`div`,{className:`w-full px-2`,children:(0,I.jsx)(en,{algorithm:e,state:t,target:n,pattern:i,updateState:u,toggleWall:d,gridTool:g,isEditingDisabled:k})})}),(0,I.jsx)(Yt,{state:t}),(0,I.jsxs)(`div`,{className:$.bottomGrid(!!e.auxDataConfig),children:[(0,I.jsx)(kt,{log:t.log,algorithm:e}),e.auxDataConfig&&(0,I.jsx)(Zt,{algorithm:e,state:t,preprocessing:m,target:n,pattern:i,texts:O,isArrayBased:te}),e.codeSnippets&&(0,I.jsx)(bt,{codeSnippets:e.codeSnippets,lineHighlights:S,activeStep:C})]})]}),(0,I.jsxs)(`div`,{className:$.footer,children:[(0,I.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,I.jsx)(ee,{className:$.footerIcon}),` `,e.category]}),(0,I.jsx)(`div`,{className:`font-mono ${$.logicText} text-slate-500`,children:`Interactive Tool`})]})]})})}tn.propTypes={algorithm:F.default.shape({id:F.default.string.isRequired,name:F.default.string.isRequired,type:F.default.string.isRequired,category:F.default.string.isRequired,visualiserType:F.default.string,cheatSheetData:F.default.object,phaseNames:F.default.arrayOf(F.default.string),codeSnippets:F.default.object,lineHighlights:F.default.object,legendItems:F.default.arrayOf(F.default.object),uiConfig:F.default.shape({playbackSpeed:F.default.number,startButton:F.default.string,statusLabel:F.default.string,vizTitle:F.default.string,inputLabel1:F.default.string,inputLabel2:F.default.string,inputPlaceholder1:F.default.string,inputPlaceholder2:F.default.string})}).isRequired,state:F.default.object.isRequired,target:F.default.string.isRequired,setTarget:F.default.func.isRequired,pattern:F.default.string.isRequired,setPattern:F.default.func.isRequired,softReset:F.default.func.isRequired,factoryReset:F.default.func.isRequired,prevStep:F.default.func.isRequired,nextStep:F.default.func.isRequired,updateState:F.default.func.isRequired,toggleWall:F.default.func,clearWalls:F.default.func,history:F.default.array.isRequired,preprocessing:F.default.object.isRequired,onBack:F.default.func.isRequired,gridTool:F.default.string,setGridTool:F.default.func,playbackRate:F.default.number,setPlaybackRate:F.default.func,gridSize:F.default.object,setGridSize:F.default.func};var nn=()=>{let{pathname:e}=r();return(0,M.useEffect)(()=>{window.scrollTo(0,0)},[e]),null},rn=({children:e})=>(0,I.jsx)(m.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.4,ease:`easeOut`},className:`flex-1 flex flex-col`,children:e}),an=({algorithms:e,stateManager:t})=>{let a=i(),s=r();return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(nn,{}),(0,I.jsx)(p,{mode:`wait`,children:(0,I.jsxs)(f,{location:s,children:[(0,I.jsx)(o,{path:`/`,element:(0,I.jsx)(rn,{children:(0,I.jsx)(zt,{algorithms:e,onSelect:e=>{t.setSelectedAlgoId(e),a(`/${e}`)}})})}),(0,I.jsx)(o,{path:`/:algoId`,element:(0,I.jsx)(rn,{children:(0,I.jsx)(on,{stateManager:t,algorithms:e})})}),(0,I.jsx)(o,{path:`*`,element:(0,I.jsx)(n,{to:`/`,replace:!0})})]},s.pathname)})]})},on=({stateManager:e,algorithms:t})=>{let{algoId:n}=l(),r=i();return(0,M.useEffect)(()=>{n&&e.selectedAlgoId!==n&&(t.some(e=>e.id===n)?e.setSelectedAlgoId(n):r(`/`))},[n,e,t,r]),(0,I.jsx)(tn,{algorithm:e.algorithm,state:e.state,target:e.target,setTarget:e.setTarget,pattern:e.pattern,setPattern:e.setPattern,softReset:e.softReset,factoryReset:e.factoryReset,nextStep:e.nextStep,prevStep:e.prevStep,updateState:e.updateState,toggleWall:e.toggleWall,clearWalls:e.clearWalls,history:e.history,preprocessing:e.preprocessing,onBack:()=>r(`/`),gridTool:e.gridTool,setGridTool:e.setGridTool,playbackRate:e.playbackRate,setPlaybackRate:e.setPlaybackRate,gridSize:e.gridSize,setGridSize:e.setGridSize},e.algorithm.id)},sn=e=>{let t=i(),n=r(),a=(0,M.useMemo)(()=>{let t=n.pathname.split(`/`).filter(Boolean),r=t[t.length-1];return e.some(e=>e.id===r)?r:e[0].id},[n.pathname,e]),o=(0,M.useMemo)(()=>e.find(e=>e.id===a),[a,e]);return{selectedAlgoId:a,setSelectedAlgoId:(0,M.useCallback)(e=>{e!==a&&t(`/${e}`)},[a,t]),algorithm:o,onBack:()=>t(`/`)}},cn=(e=15,t=45)=>{let[n,r]=(0,M.useState)({rows:e,cols:t}),[i,a]=(0,M.useState)(`wall`),o=(0,M.useCallback)((e,t,n)=>{n(n=>{if(n.isFinished||n.phase!==0)return n;let r=`${e},${t}`;if(n.walls instanceof Set){let e=new Set(n.walls);return e.has(r)?e.delete(r):e.add(r),{...n,walls:e}}let i=n.walls||[],a=i.some(n=>n.r===e&&n.c===t)?i.filter(n=>!(n.r===e&&n.c===t)):[...i,{r:e,c:t}];return{...n,walls:a}})},[]),s=(0,M.useCallback)((e,t)=>{e(e=>({...e,walls:e.walls instanceof Set?new Set:[],isFinished:!1,iterations:0,phase:0,visited:new Set,path:[],queue:[e.startNode||t],stack:[e.startNode||t],distances:{[`${(e.startNode||t).r},${(e.startNode||t).c}`]:0},gScore:{[`${(e.startNode||t).r},${(e.startNode||t).c}`]:0},fScore:{[`${(e.startNode||t).r},${(e.startNode||t).c}`]:0}}))},[]);return{gridSize:n,setGridSize:(0,M.useCallback)((e,t)=>{r({rows:e,cols:t})},[]),gridTool:i,setGridTool:a,toggleWall:o,clearWalls:s}},ln=(e=2.45)=>{let[t,n]=(0,M.useState)(e);return{playbackRate:t,setPlaybackRate:n}},un=(e,t)=>{if(!e)return null;if(t===`sorting`||t===`searching`){let t=e.split(`,`).map(e=>Number.parseInt(e.trim(),10)).filter(e=>!Number.isNaN(e));if(t.length>0)return t;let n=Number.parseInt(e.trim(),10);return Number.isNaN(n)?e:n}return e},dn=e=>{let{selectedAlgoId:t,setSelectedAlgoId:n,algorithm:r,onBack:i}=sn(e),{gridSize:a,setGridSize:o,gridTool:s,setGridTool:c,toggleWall:l,clearWalls:u}=cn(),{playbackRate:d,setPlaybackRate:f}=ln(),[p,m]=(0,M.useState)(``),[h,g]=(0,M.useState)(``),[_,v]=(0,M.useState)({currentIndex:0,isFinished:!1,iterations:0,comparisons:0,accessedIndices:new Set}),[y,b]=(0,M.useState)([]),x=(0,M.useCallback)((e,t,n,r=null)=>{if(!e?.getInitialState)return{};let i=un(n,e.type||e.category?.toLowerCase()),o=un(t,e.type||e.category?.toLowerCase()),s={...e,gridConfig:{rows:a.rows,cols:a.cols,...e.gridConfig||{}}},c=e.getInitialState(o,i,s,r);return e.type===`pathfinding`&&r?.walls&&!c.walls&&(c.walls=r.walls),{...c,legendItems:e.legendItems||[],log:{...c.log||{},content:e.extendedDescription||e.description||c.log?.content||``}}},[a]),S=(0,M.useCallback)((e=r,t=h,n=p,i=!0)=>{e&&(v(r=>({currentIndex:0,isFinished:!1,iterations:0,comparisons:0,accessedIndices:new Set,...x(e,t,n,i?r:null)})),b([]))},[r,h,p,x]),C=(0,M.useCallback)(()=>{let e=r.defaultInputs;m(e.target),g(e.pattern),S(r,e.pattern,e.target,!1)},[r,S]),w=(0,M.useRef)(null);(0,M.useEffect)(()=>{if(t&&w.current!==t){w.current=t;let n=e.find(e=>e.id===t);if(n){let{target:e,pattern:t}=n.defaultInputs;setTimeout(()=>{m(e),g(t),S(n,t,e,!0)},0)}}},[t,e,S]);let T=(0,M.useCallback)(e=>{m(e),S(r,h,e,!0)},[r,h,S]),E=(0,M.useCallback)(e=>{g(e),S(r,e,p,!0)},[r,p,S]),D=(0,M.useMemo)(()=>r?.getPreprocessing?r.getPreprocessing(h,p):{},[h,p,r]);return{selectedAlgoId:t,setSelectedAlgoId:n,algorithm:r,onBack:i,target:p,setTarget:T,pattern:h,setPattern:E,state:_,history:y,preprocessing:D,nextStep:(0,M.useCallback)(()=>{v(e=>{if(e.isFinished||!r?.nextStep)return e;let t=r.nextStep(e,p,h,D);return b(t=>[...t,{...e,accessedIndices:new Set(e.accessedIndices)}]),t})},[r,p,h,D]),prevStep:(0,M.useCallback)(()=>{if(y.length===0)return;let e=y.at(-1);b(e=>e.slice(0,-1)),v(e)},[y]),softReset:S,factoryReset:C,updateState:(0,M.useCallback)(e=>{v(t=>{let n=typeof e==`function`?e(t):e,i={...t,...n};if(n.startNode||n.endNode||n.rows||n.cols){let e=x(r,h,p,i);i={...i,...e,isFinished:!1,iterations:0,phase:0},b([])}return i})},[r,h,p,x]),toggleWall:(e,t)=>l(e,t,v),clearWalls:()=>u(v,_.startNode),gridTool:s,setGridTool:c,gridSize:a,setGridSize:(e,t)=>{o(e,t);let n={rows:e,cols:t},i=r,a=h,s=p;v(e=>({currentIndex:0,isFinished:!1,iterations:0,comparisons:0,accessedIndices:new Set,...x({...i,gridConfig:{...i.gridConfig||{},...n}},a,s,null)})),b([])},playbackRate:d,setPlaybackRate:f}};function fn(){return(0,I.jsx)(d,{basename:`/algorithms`,children:(0,I.jsxs)(`div`,{className:`relative min-h-screen text-slate-200 overflow-hidden font-outfit`,children:[(0,I.jsx)(gt,{}),(0,I.jsx)(pn,{})]})})}function pn(){return(0,I.jsx)(an,{algorithms:ht,stateManager:dn(ht)})}Ee.createRoot(document.getElementById(`root`)).render((0,I.jsx)(M.StrictMode,{children:(0,I.jsx)(fn,{})}));