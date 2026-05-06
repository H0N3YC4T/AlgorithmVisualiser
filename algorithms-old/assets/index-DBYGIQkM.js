import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{ct as t,ot as n,s as r,st as i}from"./vendor-Dqm5qM7D.js";import{n as a,t as o}from"./vendor-animations-CdAQbf87.js";import{A as s,C as c,D as l,E as u,F as d,I as f,L as p,M as m,N as h,O as g,P as _,S as v,T as y,_ as b,a as x,b as S,c as C,d as w,f as T,g as E,h as ee,i as D,j as O,k as te,l as ne,m as re,n as ie,o as ae,p as oe,r as se,s as ce,t as le,u as ue,v as de,w as fe,x as pe,y as me}from"./vendor-icons-BQZsW_lE.js";import{a as k,i as he,n as ge,r as _e,t as ve}from"./vendor-syntax-uLU6XfnT.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var A=e(t(),1),ye=i(),j={id:`sunday`,name:`Sunday Search`,getInitialState:()=>({phase:0,compIdx:-1,mismatchFound:!1,activeIndices:new Set,log:{title:`Ready`,type:`info`,messageKey:`READY`}}),getPreprocessing:e=>{let t={},n=e.length;for(let r=0;r<n;r++)t[e[r]]=n-r;return{shiftTable:t,getShift:n=>t[n]||e.length+1}},nextStep:(e,t,n,r)=>{let{currentIndex:i,phase:a,compIdx:o}=e,{getShift:s,shiftTable:c}=r,l=n.length,u=t.length,d={...e,activeIndices:new Set};return a===0?j.handleStartPhase(d,i,l,t):a===1?j.handleComparisonPhase(d,i,o,t,n,l):a===2?j.handleIdentifyLookAheadPhase(d,i,l,u,t):a===3?j.handleLookupShiftPhase(d,i,l,s,c,t):a===4?j.handleExecuteShiftPhase(d,i,l,u,s,t):d},handleStartPhase:(e,t,n,r)=>({...e,phase:1,compIdx:0,mismatchFound:!1,lookAheadIndex:-1,showShiftArrow:!1,log:{title:`PHASE 1: COMPARISON`,type:`info`,messageKey:`START_PHASE`,params:{currentIndex:t,targetRange:r.substring(t,t+n)}}}),handleComparisonPhase:(e,t,n,r,i,a)=>{let o=t+n,s=r[o],c=i[n];return e.comparisons+=1,e.accessedIndices.add(o),e.activeIndices.add(o),s===c?n+1===a?{...e,isFinished:!0,log:{title:`SUCCESS: MATCH FOUND`,type:`success`,messageKey:`SUCCESS_MATCH_FOUND`,params:{m:a,currentIndex:t}}}:{...e,compIdx:n+1,log:{title:`CHARACTER MATCH`,type:`match`,messageKey:`CHAR_MATCH`,params:{textIdx:o,targetChar:s,compIdx:n,patternChar:c}}}:{...e,mismatchFound:!0,phase:2,lookAheadIndex:t+a,showShiftArrow:!1,log:{title:`MISMATCH DETECTED`,type:`mismatch`,messageKey:`MISMATCH_DETECTED`,params:{textIdx:o,targetChar:s,compIdx:n,patternChar:c}}}},handleIdentifyLookAheadPhase:(e,t,n,r,i)=>{let a=t+n;if(a>=r)return{...e,isFinished:!0,log:{title:`SEARCH TERMINATED`,type:`mismatch`,messageKey:`SEARCH_TERMINATED`,params:{lookAheadIdx:a}}};let o=i[a];return e.accessedIndices.add(a),e.activeIndices.add(a),{...e,phase:3,lookAheadIndex:a,showShiftArrow:!0,log:{title:`PHASE 2: LOOK-AHEAD`,type:`info`,messageKey:`IDENTIFY_LOOKAHEAD`,params:{lookAheadIdx:a,char:o}}}},handleLookupShiftPhase:(e,t,n,r,i,a)=>{let o=t+n,s=a[o],c=r(s);return e.activeIndices.add(o),{...e,phase:4,log:{title:`PHASE 3: CALCULATE SHIFT`,type:`shift`,messageKey:`LOOKUP_SHIFT`,params:{char:s,shiftValue:c,charStatus:i[s]?`Character '${s}' exists in the pattern`:`Character '${s}' is not in the pattern`}}}},handleExecuteShiftPhase:(e,t,n,r,i,a)=>{let o=i(a[t+n]),s=t+o;return e.iterations+=1,s+n>r?{...e,currentIndex:s,isFinished:!0,log:{title:`FINAL SHIFT`,type:`info`,messageKey:`FINAL_SHIFT`,params:{shiftValue:o,nextPos:s}}}:{...e,currentIndex:s,phase:1,compIdx:0,mismatchFound:!1,lookAheadIndex:-1,showShiftArrow:!1,log:{title:`EXECUTING SHIFT`,type:`shift`,messageKey:`EXECUTING_SHIFT`,params:{shiftValue:o,nextPos:s}}}}},be={id:`naive`,name:`Naive Search`,getInitialState:()=>({phase:1,compIdx:0,mismatchFound:!1,log:{title:`INITIALIZING`,type:`info`,messageKey:`READY`}}),getPreprocessing:()=>({}),nextStep:(e,t,n)=>{let{currentIndex:r,phase:i,compIdx:a}=e,o=n.length,s=t.length,c={...e};if(i===1){let e=r+a,i=t[e],s=n[a];return c.comparisons+=1,c.accessedIndices.add(e),i===s?a+1===o?{...c,isFinished:!0,log:{title:`MATCH FOUND ✓`,type:`success`,messageKey:`MATCH_FOUND`,params:{m:o,idx:r}}}:{...c,compIdx:a+1,log:{title:`CHARACTER MATCH`,type:`match`,messageKey:`CHAR_MATCH`,params:{targetChar:i,patternChar:s}}}:{...c,mismatchFound:!0,phase:2,log:{title:`MISMATCH`,type:`mismatch`,messageKey:`MISMATCH`,params:{idx:e,targetChar:i,patternChar:s}}}}if(i===2){let e=r+1;return c.iterations+=1,e+o>s?{...c,currentIndex:e,isFinished:!0,log:{title:`END OF TEXT`,type:`info`,messageKey:`END_OF_TEXT`,params:{nextPos:e}}}:{...c,currentIndex:e,phase:1,compIdx:0,mismatchFound:!1,log:{title:`SHIFTING`,type:`shift`,messageKey:`SHIFTING`,params:{currentIndex:r,nextPos:e}}}}return c}},xe={id:`boyermoore`,name:`Boyer-Moore Search`,getInitialState:()=>({phase:1,comparesRightToLeft:!0,lookAheadIndex:-1,showShiftArrow:!1,log:{title:`INITIALIZING`,type:`info`,messageKey:`READY`}}),getPreprocessing:e=>{let t=e.length,n={};for(let r=0;r<t-1;r++)n[e[r]]=t-1-r;return{badCharTable:n,getShift:e=>n[e]||t}},nextStep:(e,t,n,r)=>{let{currentIndex:i,phase:a,compIdx:o}=e,{getShift:s,badCharTable:c}=r,l=n.length,u=t.length,d=o===void 0?l-1:o,f={...e,compIdx:d,activeIndices:new Set,accessedIndices:e.accessedIndices||new Set};if(a===1){let e=i+d,r=t[e],a=n[d];return f.comparisons+=1,f.accessedIndices.add(e),f.activeIndices.add(e),r===a?d===0?{...f,isFinished:!0,log:{title:`MATCH FOUND ✓`,type:`success`,messageKey:`MATCH_FOUND`,params:{idx:i}}}:{...f,compIdx:d-1,log:{title:`RIGHT-TO-LEFT MATCH`,type:`match`,messageKey:`CHAR_MATCH`,params:{targetChar:r,patternChar:a}}}:{...f,compIdx:d,mismatchFound:!0,phase:2,lookAheadIndex:i+l-1,showShiftArrow:!1,log:{title:`MISMATCH`,type:`mismatch`,messageKey:`MISMATCH`}}}if(a===2){let e=i+l-1,n=t[e],r=s(n);return f.activeIndices.add(e),{...f,phase:3,lookAheadIndex:e,showShiftArrow:!0,log:{title:`BAD CHARACTER RULE`,type:`shift`,messageKey:`BAD_CHAR_RULE`,params:{badChar:n,shiftValue:r,foundStatus:c[n]?`exists in the pattern`:`does not exist in the pattern`}}}}if(a===3){let e=t[i+l-1],n=s(e),r=i+n;return f.iterations+=1,r+l>u?{...f,currentIndex:r,isFinished:!0,log:{title:`END OF TEXT`,type:`info`,messageKey:`END_OF_TEXT`,params:{nextPos:r}}}:{...f,currentIndex:r,phase:1,compIdx:l-1,mismatchFound:!1,lookAheadIndex:-1,showShiftArrow:!1,log:{title:`SHIFT EXECUTED`,type:`shift`,messageKey:`SHIFT_EXECUTED`,params:{shiftValue:n,nextPos:r}}}}return f}},M={id:`kmp`,name:`KMP Search`,getInitialState:()=>({phase:1,compIdx:0,mismatchFound:!1,activeIndices:new Set,comparisons:0,log:{title:`INITIALIZING`,type:`info`,messageKey:`READY`}}),getPreprocessing:e=>{let t=e.length,n=Array(t).fill(0),r=0;for(let i=1;i<t;i++){for(;r>0&&e[r]!==e[i];)r=n[r-1];e[r]===e[i]&&r++,n[i]=r}return{pi:n}},nextStep:(e,t,n,r)=>{let i={...e,activeIndices:new Set},{phase:a}=e;return a===1?M.handleComparisonPhase(i,t,n):a===2?M.handleFailurePhase(i,r):a===3?M.handleShiftPhase(i,t,n,r):i},handleComparisonPhase:(e,t,n)=>{let{currentIndex:r,compIdx:i}=e,a=n.length,o=r+i,s=t[o],c=n[i];return e.comparisons+=1,e.accessedIndices.add(o),e.activeIndices.add(o),s===c?i+1===a?{...e,isFinished:!0,log:{title:`MATCH FOUND ✓`,type:`success`,messageKey:`MATCH_FOUND`,params:{idx:r}}}:{...e,compIdx:i+1,log:{title:`CHARACTER MATCH`,type:`match`,messageKey:`CHAR_MATCH`,params:{targetChar:s,patternChar:c,newLen:i+1}}}:{...e,mismatchFound:!0,phase:2,log:{title:`MISMATCH`,type:`mismatch`,messageKey:`MISMATCH`,params:{idx:o,targetChar:s,patternChar:c}}}},handleFailurePhase:(e,t)=>{let{compIdx:n}=e,{pi:r}=t;if(n===0)return{...e,phase:3,log:{title:`NO PREFIX MATCHED`,type:`shift`,messageKey:`NO_PREFIX`}};let i=r[n-1],a=n-i;return{...e,phase:3,log:{title:`CONSULTING π TABLE`,type:`shift`,messageKey:`CONSULT_PI`,params:{compIdx:n,piIdx:n-1,newCompIdx:i,shiftValue:a}}}},handleShiftPhase:(e,t,n,r)=>{let{currentIndex:i,compIdx:a}=e,{pi:o}=r,s=n.length,c=t.length,l=a>0?o[a-1]:0,u=i+(a>0?a-l:1);if(e.iterations+=1,u+s>c)return{...e,currentIndex:u,isFinished:!0,log:{title:`END OF TEXT`,type:`info`,messageKey:`END_OF_TEXT`,params:{nextPos:u}}};let d=new Set;for(let e=0;e<l;e++)d.add(u+e);return{...e,currentIndex:u,compIdx:l,phase:1,mismatchFound:!1,activeIndices:d,log:{title:`SMART SHIFT`,type:`shift`,messageKey:`SMART_SHIFT`,params:{nextPos:u,newCompIdx:l}}}}},N={id:`rabinkarp`,name:`Rabin-Karp Search`,getInitialState:e=>{let t=0;if(e&&typeof e==`string`)for(let n=0;n<e.length;n++)t=(256*t+e.codePointAt(n))%101;return{phase:0,compIdx:-1,mismatchFound:!1,targetHash:0,patternHash:t,log:{title:`Ready`,type:`info`,messageKey:`READY`}}},getPreprocessing:e=>{let t=e.length,n=0,r=1;for(let e=0;e<t-1;e++)r=r*256%101;for(let r=0;r<t;r++)n=(256*n+e.codePointAt(r))%101;return{prime:101,base:256,h:r,pHash:n}},nextStep:(e,t,n,r)=>{let{phase:i}=e,a={...e,activeIndices:new Set(e.accessedIndices)};return i===0?N.handleInitHashPhase(a,t,n,r):i===1?N.handleCompareHashesPhase(a,n):i===2?N.handleVerificationPhase(a,t,n):i===3?N.handleRollHashPhase(a,t,n,r):a},handleInitHashPhase:(e,t,n,r)=>{let{base:i,prime:a}=r,o=n.length,s=0,c=new Set;for(let e=0;e<o;e++)s=(i*s+t.codePointAt(e))%a,c.add(e);return{...e,phase:1,targetHash:s,patternHash:r.pHash,accessedIndices:c,activeIndices:c,log:{title:`INITIAL HASHING`,type:`info`,messageKey:`INITIAL_HASHING`,params:{pHash:r.pHash,tHash:s}}}},handleCompareHashesPhase:(e,t)=>{let{currentIndex:n,targetHash:r,patternHash:i}=e,a=t.length,o=new Set;for(let e=0;e<a;e++)o.add(n+e);return r===i?{...e,phase:2,compIdx:0,activeIndices:o,log:{title:`HASH MATCH!`,type:`match`,messageKey:`HASH_MATCH`,params:{targetHash:r,patternHash:i}}}:{...e,phase:3,activeIndices:o,log:{title:`HASH MISMATCH`,type:`mismatch`,messageKey:`HASH_MISMATCH`,params:{targetHash:r,patternHash:i}}}},handleVerificationPhase:(e,t,n)=>{let{currentIndex:r,compIdx:i}=e,a=n.length,o=r+i;e.comparisons+=1;let s=new Set(e.accessedIndices);return s.add(o),t[o]===n[i]?i+1===a?{...e,isFinished:!0,accessedIndices:s,activeIndices:new Set([o]),log:{title:`SUCCESS: FULL MATCH`,type:`success`,messageKey:`SUCCESS_FULL_MATCH`,params:{currentIndex:r}}}:{...e,compIdx:i+1,accessedIndices:s,activeIndices:new Set([o]),log:{title:`CHARACTER MATCH`,type:`match`,messageKey:`CHAR_MATCH`}}:{...e,phase:3,accessedIndices:s,activeIndices:new Set([o]),log:{title:`SPURIOUS HIT`,type:`mismatch`,messageKey:`SPURIOUS_HIT`,params:{textIdx:o}}}},handleRollHashPhase:(e,t,n,r)=>{let{currentIndex:i,targetHash:a}=e,{prime:o,base:s,h:c}=r,l=n.length,u=t.length,d=i+1;if(e.iterations+=1,d+l>u)return{...e,currentIndex:d,isFinished:!0,log:{title:`SEARCH COMPLETED`,type:`info`,messageKey:`SEARCH_COMPLETED`}};let f=t.codePointAt(i),p=t.codePointAt(d+l-1),m=(s*(a-f*c%o)+p)%o;m<0&&(m+=o);let h=new Set(e.accessedIndices);return h.add(d+l-1),{...e,currentIndex:d,targetHash:m,phase:1,accessedIndices:h,activeIndices:new Set([d+l-1]),log:{title:`ROLLING HASH`,type:`shift`,messageKey:`ROLLING_HASH`,params:{charToRemove:t[i],charToAdd:t[d+l-1],tHash:m}}}}},P={id:`zalgorithm`,name:`Z-Algorithm`,getInitialState:(e=``,t=``)=>{let n=e+`$`+t,r=n.length,i=Array(r).fill(0),a=0,o=0,s=e.length;for(let e=1;e<=s;e++){for(e<=o&&(i[e]=Math.min(o-e+1,i[e-a]));e+i[e]<r&&n[i[e]]===n[e+i[e]];)i[e]++;e+i[e]-1>o&&(a=e,o=e+i[e]-1)}return{phase:1,i:s+1,l:0,r:0,z:i,concat:n,activeIndices:[],comparisons:0,log:{title:`INITIALIZING`,type:`info`,messageKey:`READY`,params:{p:e,t,concat:n,pLen:s,startIndex:s+1}}}},getPreprocessing:(e,t)=>({concat:e+`$`+t}),nextStep:(e,t,n,r)=>{let{phase:i,concat:a}=e,{concat:o}=r,s=a||o||n+`$`+t,c=s.length,l={...e,activeIndices:new Set,concat:s};return i===1?P.handleDecisionPhase(l,n,c):i===2?P.handleManualComparisonPhase(l,c):l},handleDecisionPhase:(e,t,n)=>{let{i:r,l:i,r:a,z:o}=e;if(r>=n){let r=[],i=t.length;for(let e=i+1;e<n;e++)o[e]===i&&r.push(e-(i+1));return{...e,isFinished:!0,log:{title:`Z-ARRAY COMPLETE ✓`,type:`success`,messageKey:`Z_ARRAY_COMPLETE`,params:{foundCountStatus:r.length>0?`Found ${r.length} matches at indices: ${r.join(`, `)}`:`No matches found in the text`}}}}if(r>a)return{...e,phase:2,l:r,r:r-1,activeIndices:[r,0],log:{title:`OUTSIDE Z-BOX`,type:`info`,messageKey:`OUTSIDE_Z_BOX`,params:{i:r,r:a}}};let s=r-i,c=a-r+1;if(o[s]<c){let t=[...o];return t[r]=o[s],{...e,z:t,i:r+1,activeIndices:[r],referenceIndex:s,log:{title:`INSIDE Z-BOX (OPTIMIZED)`,type:`match`,messageKey:`INSIDE_Z_BOX_OPTIMIZED`,params:{i:r,l:i,r:a,k:s,zK:o[s]}}}}return{...e,phase:2,l:r,activeIndices:[r,a-r+1],log:{title:`EXTENDING Z-BOX`,type:`info`,messageKey:`EXTENDING_Z_BOX`,params:{i:r,k:s,r:a}}}},handleManualComparisonPhase:(e,t)=>{let{l:n,r,i,z:a,concat:o}=e,s=r-n+1,c=s,l=n+s;if(e.referenceIndex=c,l<t&&o[c]===o[l])return e.comparisons+=1,{...e,r:l,activeIndices:[c,l],log:{title:`CHARACTER MATCH`,type:`match`,messageKey:`CHARACTER_MATCH`,params:{patternIdx:c,textIdx:l,char:o[c]}}};l<t&&(e.comparisons+=1);let u=[...a];return u[i]=r-n+1,{...e,z:u,phase:1,i:i+1,activeIndices:[l<t?l:t-1],referenceIndex:c<t?c:t-1,log:{title:`MISMATCH / BOX END`,type:`mismatch`,messageKey:`MISMATCH_BOX_END`,params:{patternIdx:c,i,zValue:u[i],l:n,r}}}}},Se={id:`bubble`,name:`Bubble Sort`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[6,2,8,1,9,3,7,4];return{phase:1,i:0,j:0,swapped:!1,array:n,activeIndices:[0,1],sortedIndices:[],swapIndices:[],comparisons:0,log:{title:`PASS 1`,type:`info`,messageKey:`READY`,params:{totalPasses:n.length-1,val0:n[0],val1:n[1]}}}},getPreprocessing:()=>({}),nextStep:e=>{let{array:t,i:n,j:r,phase:i,sortedIndices:a}=e,o=t.length,s={...e,activeIndices:[],swapIndices:[]};if(i===1){if(r>=o-1-n){let e=[...a,o-1-n],r=n+1;return r>=o-1?{...s,isFinished:!0,sortedIndices:[...Array(t.length).keys()],activeIndices:[],log:{title:`SORTED ✓`,type:`success`,messageKey:`SORTED`,params:{nMinusOne:o-1}}}:{...s,phase:1,i:r,j:0,swapped:!1,sortedIndices:e,activeIndices:[0,1],comparisons:s.comparisons+1,log:{title:`PASS ${r+1}`,type:`info`,messageKey:`PASS_DONE`,params:{val:t[o-1-n],idx:o-1-n,nextPass:r+1,totalPasses:o-1,remaining:o-1-r,val0:t[0],val1:t[1]}}}}if(s.comparisons+=1,s.activeIndices=[r,r+1],t[r]>t[r+1])return{...s,phase:2,log:{title:`OUT OF ORDER`,type:`mismatch`,messageKey:`OUT_OF_ORDER`,params:{j:r,valJ:t[r],jPlusOne:r+1,valJPlusOne:t[r+1]}}};let e=r+1;return e>=o-1-n?Se.nextStep({...s,j:e}):{...s,j:e,activeIndices:[e,e+1],log:{title:`IN ORDER`,type:`match`,messageKey:`IN_ORDER`,params:{j:r,valJ:t[r],jPlusOne:r+1,valJPlusOne:t[r+1]}}}}if(i===2){let e=[...t];[e[r],e[r+1]]=[e[r+1],e[r]];let i=r+1;return{...s,array:e,phase:1,j:i,swapped:!0,swapIndices:[r,r+1],activeIndices:i<o-1-n?[i,i+1]:[],log:{title:`SWAPPED`,type:`shift`,messageKey:`SWAPPED`,params:{j:r,jPlusOne:r+1,valNewJPlusOne:e[r+1],valNewJ:e[r]}}}}return s}},F={id:`selection`,name:`Selection Sort`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[5,3,8,1,9,2,7,4];return{phase:1,i:0,j:1,minIdx:0,array:n,activeIndices:[1],sortedIndices:[],swapIndices:[],pivotIndex:0,comparisons:0,log:{title:`SCANNING`,type:`info`,messageKey:`READY`,params:{iteration:1,val:n[0],idx:0}}}},getPreprocessing:()=>({}),nextStep:e=>{let{phase:t}=e,n={...e,activeIndices:[],swapIndices:[],pivotIndex:-1};return t===1?F.handleScanPhase(n):t===2?F.handleSwapPhase(n):t===3?{...n,isFinished:!0,sortedIndices:[...Array(e.array.length).keys()],log:{title:`SORTED ✓`,type:`success`,messageKey:`SORTED`}}:n},handleScanPhase:e=>{let{array:t,j:n,minIdx:r}=e,i=t.length;if(n>=i)return{...e,phase:2,pivotIndex:r,activeIndices:[e.i,r],log:{title:`MINIMUM FOUND`,type:`match`,messageKey:`MINIMUM_FOUND`,params:{val:t[r],i:e.i}}};if(e.comparisons+=1,e.activeIndices=[n],e.pivotIndex=r,t[n]<t[r]){let a=r,o=n+1;return{...e,minIdx:n,j:o,pivotIndex:n,activeIndices:[o<i?o:n],log:{title:`NEW MINIMUM`,type:`mismatch`,messageKey:`NEW_MINIMUM`,params:{val:t[n],j:n,oldVal:t[a]}}}}let a=n+1;return{...e,j:a,activeIndices:[a<i?a:n],log:{title:`COMPARING`,type:`info`,messageKey:`COMPARING`,params:{val:t[n],minVal:t[r]}}}},handleSwapPhase:e=>{let{array:t,i:n,minIdx:r,sortedIndices:i}=e,a=t.length,o=n+1,s=[...i,n];if(r===n)return o>=a-1?{...e,phase:3,sortedIndices:s,log:{title:`NO_SWAP_NEEDED`,type:`info`,messageKey:`FINAL_NO_SWAP`,params:{i:n}}}:{...e,phase:1,i:o,j:o+1,minIdx:o,pivotIndex:o,sortedIndices:s,activeIndices:[o+1],log:{title:`NO SWAP NEEDED`,type:`info`,messageKey:`NO_SWAP`,params:{i:n}}};let c=[...t];return[c[n],c[r]]=[c[r],c[n]],o>=a-1?{...e,array:c,phase:3,sortedIndices:s,swapIndices:[n,r],log:{title:`FINAL SWAP`,type:`shift`,messageKey:`FINAL_SWAP`,params:{i:n}}}:{...e,array:c,phase:1,i:o,j:o+1,minIdx:o,pivotIndex:o,sortedIndices:s,swapIndices:[n,r],activeIndices:[o+1],log:{title:`SWAP EXECUTED`,type:`shift`,messageKey:`SWAP_EXECUTED`,params:{val:c[n],i:n}}}}},Ce={id:`insertion`,name:`Insertion Sort`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[7,2,9,4,1,8,3,6];return{phase:1,i:1,j:0,array:n,activeIndices:[1],sortedIndices:[0],swapIndices:[],pivotIndex:1,comparisons:0,log:{title:`INSERTING 2`,type:`info`,codeStep:`INSERTING`,messageKey:`READY`,params:{val:n[1]}}}},getPreprocessing:()=>({}),nextStep:e=>{let{array:t,i:n,j:r,phase:i}=e,a=t.length,o={...e,activeIndices:[],swapIndices:[],pivotIndex:-1};if(i===1){if(r<0||t[r]<=t[r+1]){let e=n+1;return e>=a?{...o,isFinished:!0,sortedIndices:[...Array(a).keys()],log:{title:`SORT COMPLETED ✓`,type:`success`,messageKey:`SORT_COMPLETE`}}:{...o,i:e,j:e-1,pivotIndex:e,activeIndices:[e],log:{title:`INSERTING ${t[e]}`,type:`info`,codeStep:`INSERTING`,messageKey:`NEXT_INSERT`,params:{val:t[e],idx:e}}}}o.comparisons+=1,o.activeIndices=[r,r+1];let e=[...t];return[e[r+1],e[r]]=[e[r],e[r+1]],{...o,array:e,j:r-1,swapIndices:[r,r+1],log:{title:`SWAPPING`,type:`shift`,messageKey:`SWAPPING`,params:{val1:e[r+1],val2:e[r]}}}}return o}},I={id:`cocktail`,name:`Cocktail Shaker Sort`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[7,1,6,2,5,3,8,4];return{phase:1,start:0,end:n.length-1,k:0,swapped:!1,direction:1,passes:1,array:n,activeIndices:[0,1],sortedIndices:[],swapIndices:[],comparisons:0,log:{title:`FORWARD PASS`,type:`info`,messageKey:`READY`,params:{val0:n[0],val1:n[1]}}}},getPreprocessing:()=>({}),nextStep:e=>{let{phase:t}=e,n={...e,activeIndices:[],swapIndices:[]};return t===1?I.handleComparisonPhase(n):t===2?I.handleSwapPhase(n):n},handleComparisonPhase:e=>{let{array:t,start:n,end:r,k:i,swapped:a,direction:o}=e,s=t.length;if(o===1?i>=r:i<n)return a?I.prepareNextPass(e):{...e,isFinished:!0,sortedIndices:[...Array(s).keys()],log:{title:`SORTED ✓`,type:`success`,messageKey:`SORTED`}};if(e.comparisons+=1,e.activeIndices=[i,i+1],t[i]>t[i+1])return{...e,phase:2,log:{title:`OUT OF ORDER`,type:`mismatch`,messageKey:`OUT_OF_ORDER`,params:{k:i,valK:t[i],kPlusOne:i+1,valKPlusOne:t[i+1]}}};let c=i+o;return{...e,k:c,activeIndices:[c,c+1],log:{title:`IN ORDER`,type:`match`,messageKey:`IN_ORDER`,params:{k:i,valK:t[i],kPlusOne:i+1,valKPlusOne:t[i+1]}}}},prepareNextPass:e=>{let{start:t,end:n,direction:r,sortedIndices:i,passes:a}=e;if(r===1){let r=n-1,o=r-1;return{...e,direction:-1,end:r,k:o,swapped:!1,passes:a+1,sortedIndices:[...i,n],activeIndices:[o,o+1],log:{title:`BACKWARD PASS`,type:`info`,messageKey:`BACKWARD_PASS`,params:{end:n,nextK:o,start:t}}}}else{let r=t+1,o=r;return{...e,direction:1,start:r,k:o,swapped:!1,passes:a+1,sortedIndices:[...i,t],activeIndices:[o,o+1],log:{title:`FORWARD PASS`,type:`info`,messageKey:`FORWARD_PASS`,params:{start:t,nextK:o,end:n}}}}},handleSwapPhase:e=>{let{array:t,start:n,end:r,k:i,direction:a}=e,o=[...t];[o[i],o[i+1]]=[o[i+1],o[i]];let s=i+a,c=(a===1?s<r:s>=n)?[s,s+1]:[];return{...e,array:o,phase:1,swapped:!0,swapIndices:[i,i+1],k:s,activeIndices:c,log:{title:`SWAPPED`,type:`shift`,messageKey:`SWAPPED`,params:{k:i,kPlusOne:i+1,valK:o[i],valKPlusOne:o[i+1]}}}}},L={id:`merge`,name:`Merge Sort`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[5,2,8,3,9,1,7,4];return{phase:0,stack:[[0,n.length-1]],mergeQueue:[],array:n,activeIndices:[],sortedIndices:[],swapIndices:[],pivotIndex:-1,comparisons:0,log:{title:`INITIALIZING`,type:`info`,messageKey:`READY`}}},getPreprocessing:()=>({}),nextStep:e=>{let{phase:t}=e,n={...e,activeIndices:[],swapIndices:[],pivotIndex:-1};return t===0?L.handleDividePhase(n):t===1?L.handlePickSegmentPhase(n):t===2?L.handleInternalMergePhase(n):t===3?L.handleCopyBackPhase(n):n},handleDividePhase:e=>{let{stack:t,mergeQueue:n}=e;if(t.length===0)return{...e,phase:1,log:{title:`MERGE START`,type:`info`,messageKey:`MERGE_START`}};let r=[...t],[i,a]=r.pop();if(i>=a)return L.nextStep({...e,stack:r});let o=Math.floor((i+a)/2),s=[...n,[i,o,a]];return r.push([o+1,a],[i,o]),{...e,stack:r,mergeQueue:s,activeIndices:[i,a],log:{title:`DIVIDING`,type:`info`,messageKey:`DIVIDING`,params:{l:i,r:a,mid:o,midPlusOne:o+1}}}},handlePickSegmentPhase:e=>{let{array:t,mergeQueue:n}=e;if(n.length===0)return{...e,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`SORTED ✓`,type:`success`,messageKey:`SORTED`}};let r=[...n],[i,a,o]=r.pop();return{...e,mergeQueue:r,phase:2,currentMerge:{l:i,mid:a,r:o,i,j:a+1,k:0,temp:[]},log:{title:`MERGING SEGMENTS`,type:`info`,messageKey:`MERGING_SEGMENTS`,params:{l:i,mid:a,midPlusOne:a+1,r:o}}}},handleInternalMergePhase:e=>{let{mid:t,r:n,i:r,j:i,l:a}=e.currentMerge;return r<=t||i<=n?r<=t&&(i>n||e.array[r]<=e.array[i])?L.takeFromLeft(e):L.takeFromRight(e):{...e,phase:3,currentMerge:{...e.currentMerge,k:0},log:{title:`COPYING BACK`,type:`shift`,messageKey:`COPYING_BACK`,params:{l:a,r:n}}}},takeFromLeft:e=>{let{array:t}=e,{i:n,j:r,k:i,temp:a}=e.currentMerge,o=[...a,t[n]],s=r<=e.currentMerge.r;return{...e,comparisons:e.comparisons+ +!!s,activeIndices:[n,s?r:n],currentMerge:{...e.currentMerge,i:n+1,k:i+1,temp:o},log:{title:`TAKING LEFT`,type:`match`,messageKey:`TAKING_LEFT`,params:{val:t[n]}}}},takeFromRight:e=>{let{array:t}=e,{i:n,j:r,k:i,temp:a,mid:o}=e.currentMerge,s=[...a,t[r]],c=n<=o;return{...e,comparisons:e.comparisons+ +!!c,activeIndices:[c?n:r,r],currentMerge:{...e.currentMerge,j:r+1,k:i+1,temp:s},log:{title:`TAKING RIGHT`,type:`match`,messageKey:`TAKING_RIGHT`,params:{val:t[r]}}}},handleCopyBackPhase:e=>{let{array:t}=e,{l:n,k:r,temp:i}=e.currentMerge;if(r>=i.length)return L.nextStep({...e,phase:1});let a=[...t];return a[n+r]=i[r],{...e,array:a,swapIndices:[n+r],currentMerge:{...e.currentMerge,k:r+1},log:{title:`WRITING VALUE`,type:`shift`,messageKey:`WRITING_VALUE`,params:{val:i[r],idx:n+r}}}}},R={id:`quicklomuto`,name:`Quick Sort (Lomuto)`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[6,2,8,4,9,3,7,5];return{phase:0,stack:[[0,n.length-1]],array:n,activeIndices:[],sortedIndices:[],swapIndices:[],pivotIndex:-1,log:{title:`Ready`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{phase:t}=e,n={...e,activeIndices:[],swapIndices:[]};return t===0?R.handleInitPartitionPhase(n):t===1?R.handleScanLoopPhase(n):t===2?R.handleFinalPivotSwapPhase(n):n},handleInitPartitionPhase:e=>{let{array:t,stack:n}=e;if(n.length===0)return{...e,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`SORTED ✓`,type:`success`,messageKey:`SORTED`}};let r=[...n],[i,a]=r.pop();if(i>=a)return i===a&&(e.sortedIndices=[...new Set([...e.sortedIndices,i])]),R.nextStep({...e,stack:r,pivotIndex:-1});let o=i+Math.floor(Math.random()*(a-i+1)),s=[...t];[s[o],s[a]]=[s[a],s[o]];let c=s[a];return{...e,array:s,stack:r,phase:1,l:i,r:a,pivot:c,pivotIndex:a,i:i-1,j:i,log:{title:`START PARTITION`,type:`info`,messageKey:`START_PARTITION`,params:{l:i,r:a,pivot:c}}}},handleScanLoopPhase:e=>{let{array:t,r:n,i:r,j:i,pivot:a}=e;if(i<n){if(e.activeIndices=[i],e.pivotIndex=n,t[i]<a){let n=r+1,o=[...t];return[o[n],o[i]]=[o[i],o[n]],{...e,array:o,i:n,j:i+1,swapIndices:[n,i],log:{title:`SWAP SMALLER`,type:`match`,messageKey:`SWAP_SMALLER`,params:{val:t[i],pivot:a,nextI:n}}}}return{...e,j:i+1,log:{title:`KEEP LARGER`,type:`mismatch`,messageKey:`KEEP_LARGER`,params:{val:t[i],pivot:a}}}}return{...e,phase:2,log:{title:`PLACE PIVOT`,type:`shift`,messageKey:`PLACE_PIVOT`,params:{pivot:a,pivotPos:r+1}}}},handleFinalPivotSwapPhase:e=>{let{array:t,l:n,r,i,stack:a}=e,o=i+1,s=[...t];[s[o],s[r]]=[s[r],s[o]];let c=[...a,[o+1,r],[n,o-1]],l=[...e.sortedIndices,o];return{...e,array:s,phase:0,stack:c,sortedIndices:l,swapIndices:[o,r],pivotIndex:-1,log:{title:`PIVOT PLACED`,type:`success`,messageKey:`PIVOT_PLACED`,params:{pivotPos:o}}}}},z={id:`quickhoare`,name:`Quick Sort (Hoare)`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[5,8,1,9,3,7,2,6];return{phase:0,stack:[[0,n.length-1]],array:n,activeIndices:[],sortedIndices:[],swapIndices:[],pivotIndex:-1,log:{title:`Ready`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{phase:t}=e,n={...e,activeIndices:[],swapIndices:[]};return t===0?z.handleInitPartitionPhase(n):t===1?z.handleMoveIPhase(n):t===2?z.handleMoveJPhase(n):t===3?z.handleCheckSwapPhase(n):n},handleInitPartitionPhase:e=>{let{array:t,stack:n}=e;if(n.length===0)return{...e,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`SORTED ✓`,type:`success`,messageKey:`SORTED`}};let r=[...n],[i,a]=r.pop();if(i>=a)return i===a&&(e.sortedIndices=[...new Set([...e.sortedIndices,i])]),z.nextStep({...e,stack:r});let o=Math.floor((i+a)/2),s=t[o];return{...e,phase:1,stack:r,l:i,r:a,pivot:s,pivotIndex:o,i:i-1,j:a+1,log:{title:`START PARTITION`,type:`info`,messageKey:`START_PARTITION`,params:{l:i,r:a,pivot:s}}}},handleMoveIPhase:e=>{let{array:t,i:n,pivot:r}=e,i=n+1;return t[i]<r?{...e,i,activeIndices:[i],log:{title:`MOVING i`,type:`info`,messageKey:`MOVING_I`,params:{val:t[i],pivot:r}}}:{...e,i,phase:2,activeIndices:[i],log:{title:`i STOPPED`,type:`match`,messageKey:`I_STOPPED`,params:{val:t[i],pivot:r}}}},handleMoveJPhase:e=>{let{array:t,j:n,pivot:r}=e,i=n-1;return t[i]>r?{...e,j:i,activeIndices:[i],log:{title:`MOVING j`,type:`info`,messageKey:`MOVING_J`,params:{val:t[i],pivot:r}}}:{...e,j:i,phase:3,activeIndices:[i],log:{title:`j STOPPED`,type:`match`,messageKey:`J_STOPPED`,params:{val:t[i],pivot:r}}}},handleCheckSwapPhase:e=>{let{array:t,l:n,r,i,j:a,stack:o}=e;if(i>=a){let t=[...o,[a+1,r],[n,a]];return{...e,phase:0,stack:t,activeIndices:[i,a],pivotIndex:-1,log:{title:`CROSSED`,type:`shift`,messageKey:`CROSSED`,params:{i,j:a}}}}let s=[...t],c=e.pivotIndex;return i===e.pivotIndex?c=a:a===e.pivotIndex&&(c=i),[s[i],s[a]]=[s[a],s[i]],{...e,array:s,phase:1,swapIndices:[i,a],pivotIndex:c,log:{title:`SWAPPING`,type:`shift`,messageKey:`SWAPPING`,params:{i,j:a,valI:t[i],valJ:t[a]}}}}},we={id:`counting`,name:`Counting Sort`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[4,2,6,1,3,2,5,1];return{phase:0,i:0,array:n,countArray:[],maxVal:n.length>0?Math.max(...n):1,output:Array(n.length).fill(null),activeIndices:[],sortedIndices:[],swapIndices:[],log:{title:`Ready`,type:`info`,messageKey:`READY`}}},getPreprocessing:()=>({}),nextStep:e=>{let{array:t,i:n,phase:r,countArray:i,maxVal:a,output:o}=e,s={...e,activeIndices:[],swapIndices:[]};if(r===0)return{...s,phase:1,countArray:Array(a+1).fill(0),log:{title:`INITIALIZING`,type:`info`,messageKey:`INITIALIZING`,params:{maxVal:a}}};if(r===1){if(n>=t.length)return{...s,phase:2,i:1,log:{title:`COUNTING COMPLETE`,type:`match`,messageKey:`COUNTING_COMPLETE`}};let e=t[n],r=[...i];return r[e]++,{...s,countArray:r,i:n+1,activeIndices:[n],log:{title:`RECORDING COUNT`,type:`info`,messageKey:`RECORDING_COUNT`,params:{i:n,val:e,newCountVal:r[e]}}}}if(r===2){if(n>a)return{...s,phase:3,i:t.length-1,log:{title:`CUMULATIVE DONE`,type:`match`,messageKey:`CUMULATIVE_DONE`}};let e=[...i];return e[n]+=e[n-1],{...s,countArray:e,i:n+1,log:{title:`ACCUMULATING`,type:`info`,messageKey:`ACCUMULATING`,params:{i:n,iMinusOne:n-1,newCountI:e[n]}}}}if(r===3){if(n<0)return{...s,isFinished:!0,array:o,sortedIndices:[...Array(t.length).keys()],log:{title:`SORT COMPLETED`,type:`success`,messageKey:`SORT_COMPLETE`}};let e=t[n],r=i[e]-1,a=[...i];a[e]--;let c=[...o];return c[r]=e,{...s,output:c,countArray:a,i:n-1,activeIndices:[n],swapIndices:[r],log:{title:`PLACING ELEMENT`,type:`shift`,messageKey:`PLACING_ELEMENT`,params:{val:e,i:n,pos:r}}}}return s}},Te={id:`bucket`,name:`Bucket Sort`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[42,8,76,31,95,19,58,14];return{phase:0,i:0,array:n,buckets:[[],[],[],[]],maxVal:Math.max(...n),activeIndices:[],sortedIndices:[],swapIndices:[],log:{title:`Ready`,type:`info`,messageKey:`READY`}}},getPreprocessing:()=>({}),nextStep:e=>{let{array:t,i:n,phase:r,buckets:i,maxVal:a}=e,o={...e,activeIndices:[],swapIndices:[]};if(r===0){if(n>=t.length)return{...o,phase:1,i:0,log:{title:`DISTRIBUTION COMPLETE`,type:`match`,messageKey:`DISTRIBUTION_COMPLETE`}};let e=t[n],r=Math.min(Math.floor(e/(a+1)*i.length),i.length-1),s=i.map((t,n)=>n===r?[...t,e]:t);return{...o,buckets:s,i:n+1,activeIndices:[n],log:{title:`BUCKETING`,type:`info`,messageKey:`BUCKETING`,params:{val:e,bucketIdx:r}}}}if(r===1){if(n>=i.length)return{...o,phase:2,i:0,log:{title:`BUCKETS SORTED`,type:`match`,messageKey:`BUCKETS_SORTED`}};let e=[...i];return e[n]=[...i[n]].sort((e,t)=>e-t),{...o,buckets:e,i:n+1,log:{title:`SORTING BUCKET`,type:`info`,messageKey:`SORTING_BUCKET`,params:{i:n}}}}if(r===2){if(i.every(e=>e.length===0))return{...o,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`SORT COMPLETE`,type:`success`,messageKey:`SORT_COMPLETE`}};let r=i.findIndex(e=>e.length>0),a=i[r][0],s=[...i];s[r]=s[r].slice(1);let c=[...t];return c[n]=a,{...o,array:c,buckets:s,i:n+1,activeIndices:[n],swapIndices:[n],sortedIndices:[...e.sortedIndices,n],log:{title:`CONCATENATING`,type:`shift`,messageKey:`CONCATENATING`,params:{val:a,bucketIdx:r,i:n}}}}return o}},Ee={id:`radix`,name:`Radix Sort`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[53,17,82,34,91,26,45,68];return{phase:0,exp:1,array:n,maxVal:Math.max(...n),buckets:Array.from({length:10},()=>[]),i:0,activeIndices:[],sortedIndices:[],swapIndices:[],log:{title:`Ready`,type:`info`,messageKey:`READY`}}},getPreprocessing:()=>({}),nextStep:e=>{let{array:t,exp:n,maxVal:r,phase:i,i:a,buckets:o}=e,s={...e,activeIndices:[],swapIndices:[]};if(i===0)return Math.floor(r/n)<=0?{...s,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`SORT COMPLETE`,type:`success`,messageKey:`SORT_COMPLETE`}}:{...s,phase:1,i:0,buckets:Array.from({length:10},()=>[]),log:{title:`PROCESSING ${n}s DIGIT`,type:`info`,messageKey:`PROCESSING_DIGIT`,params:{exp:n}}};if(i===1){if(a>=t.length)return{...s,phase:2,log:{title:`DISTRIBUTION COMPLETE`,type:`match`,messageKey:`DISTRIBUTION_COMPLETE`,params:{exp:n}}};let e=t[a],r=Math.floor(e/n%10),i=o.map((t,n)=>n===r?[...t,e]:t);return{...s,buckets:i,i:a+1,activeIndices:[a],log:{title:`BUCKETING`,type:`info`,messageKey:`BUCKETING`,params:{val:e,digit:r,exp:n}}}}if(i===2){let e=o.flat();return{...s,array:e,phase:0,exp:n*10,log:{title:`PASS COMPLETE`,type:`shift`,messageKey:`PASS_COMPLETE`,params:{exp:n}}}}return s}},B={id:`heapsort`,name:`Heap Sort`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[3,9,2,8,1,7,4,6];return{phase:0,i:Math.floor(n.length/2)-1,array:n,n:n.length,heapSize:n.length,activeIndices:[],sortedIndices:[],swapIndices:[],log:{title:`Ready`,type:`info`,messageKey:`READY`}}},getPreprocessing:()=>({}),nextStep:e=>{let{phase:t}=e,n={...e,activeIndices:[],swapIndices:[]};return t===0?B.handleBuildHeapPhase(n):t===1||t===3?B.handleSiftDownPhase(n):t===2?B.handleExtractionPhase(n):n},handleBuildHeapPhase:e=>{let{array:t,i:n}=e;return n<0?{...e,phase:2,i:t.length-1,log:{title:`MAX HEAP BUILT`,type:`match`,messageKey:`MAX_HEAP_BUILT`}}:{...e,phase:1,heapSize:t.length,curParent:n,log:{title:`HEAPIFYING`,type:`info`,messageKey:`HEAPIFYING`,params:{i:n}}}},handleSiftDownPhase:e=>{let{array:t,curParent:n,heapSize:r,phase:i}=e,a=n,o=2*n+1,s=2*n+2;if(e.activeIndices=[n,o<r?o:-1,s<r?s:-1].filter(e=>e!==-1),o<r&&t[o]>t[a]&&(a=o),s<r&&t[s]>t[a]&&(a=s),a===n)return i===3?{...e,phase:2,i:e.i-1,log:{title:`NODE POSITIONED`,type:`match`,messageKey:`NODE_POSITIONED_PHASE_3`}}:{...e,phase:0,i:e.i-1,log:{title:`NODE POSITIONED`,type:`match`,messageKey:`NODE_POSITIONED`}};let c=[...t];return[c[n],c[a]]=[c[a],c[n]],{...e,array:c,curParent:a,swapIndices:[n,a],log:{title:`SIFT DOWN`,type:`shift`,messageKey:`SIFT_DOWN`,params:{valParent:t[n],valChild:t[a]}}}},handleExtractionPhase:e=>{let{array:t,i:n,sortedIndices:r}=e;if(n<=0)return{...e,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`SORT COMPLETE`,type:`success`,messageKey:`SORT_COMPLETE`}};let i=[...t];return[i[0],i[n]]=[i[n],i[0]],{...e,array:i,phase:3,curParent:0,heapSize:n,i:n,swapIndices:[0,n],sortedIndices:[...r,n],log:{title:`EXTRACT MAX`,type:`shift`,messageKey:`EXTRACT_MAX`,params:{valRoot:t[0],i:n}}}}},De={id:`shellsort`,name:`Shell Sort`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[23,29,15,19,31,7,9,5,2];return{phase:0,gap:Math.floor(n.length/2),i:Math.floor(n.length/2),j:Math.floor(n.length/2),array:n,activeIndices:[],sortedIndices:[],swapIndices:[],log:{title:`Ready`,type:`info`,messageKey:`READY`}}},getPreprocessing:()=>({}),nextStep:e=>{let{array:t,gap:n,i:r,phase:i}=e,a=t.length,o={...e,activeIndices:[],swapIndices:[]};if(i===0)return n<=0?{...o,isFinished:!0,sortedIndices:[...Array(t.length).keys()],log:{title:`SORT COMPLETE`,type:`success`,messageKey:`SORT_COMPLETE`}}:{...o,phase:1,i:n,log:{title:`GAP SIZE: ${n}`,type:`info`,messageKey:`GAP_SIZE`,params:{gap:n}}};if(i===1)return r>=a?{...o,phase:0,gap:Math.floor(n/2),log:{title:`PASS FINISHED`,type:`match`,messageKey:`PASS_FINISHED`,params:{gap:n}}}:{...o,phase:2,j:r,log:{title:`INSERTION AT GAP`,type:`info`,messageKey:`INSERTION_AT_GAP`,params:{val:t[r],i:r}}};if(i===2){if(e.j<n||t[e.j-n]<=t[e.j])return{...o,phase:1,i:r+1,activeIndices:[e.j],log:{title:`POSITION FOUND`,type:`match`,messageKey:`POSITION_FOUND`,params:{j:e.j}}};o.comparisons=(o.comparisons||0)+1,o.activeIndices=[e.j,e.j-n];let i=[...t];return[i[e.j],i[e.j-n]]=[i[e.j-n],i[e.j]],{...o,array:i,j:e.j-n,swapIndices:[e.j,e.j-n],log:{title:`GAP SWAP`,type:`shift`,messageKey:`GAP_SWAP`,params:{valLeft:t[e.j-n],valRight:t[e.j],gap:n}}}}return o}},Oe={id:`linear`,name:`Linear Search`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[12,5,14,8,4,11,8,15,4,6,13,10],r=typeof e==`number`?e:Number.parseInt(e,10)||13;return{phase:0,i:0,targetValue:r,array:n,activeIndices:[],sortedIndices:[],log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{targetValue:r}}}},getPreprocessing:()=>({}),nextStep:e=>{let{array:t,i:n,targetValue:r,phase:i}=e,a=t.length,o={...e,activeIndices:[]};return i===0?{...o,phase:1,i:0,log:{title:`STARTING SEARCH`,type:`info`,messageKey:`STARTING_SEARCH`,params:{targetValue:r}}}:i===1?n>=a?{...o,isFinished:!0,log:{title:`NOT FOUND`,type:`mismatch`,messageKey:`NOT_FOUND`,params:{targetValue:r}}}:(o.comparisons+=1,o.activeIndices=[n],t[n]===r?{...o,isFinished:!0,sortedIndices:[n],log:{title:`VALUE FOUND!`,type:`success`,messageKey:`VALUE_FOUND`,params:{i:n,targetValue:r}}}:{...o,i:n+1,log:{title:`NO MATCH`,type:`info`,messageKey:`NO_MATCH`,params:{i:n,val:t[n],targetValue:r}}}):o}},V={id:`binarysearch`,name:`Binary Search`,getInitialState:(e,t)=>{let n=[...Array.isArray(t)?t:[3,7,11,14,19,22,26,30,35,41,47,53]].sort((e,t)=>e-t),r=typeof e==`number`?e:Number.parseInt(e,10)||26;return{phase:0,l:0,r:n.length-1,mid:-1,targetValue:r,array:n,activeIndices:[],sortedIndices:[],pivotIndex:-1,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{targetValue:r}}}},getPreprocessing:()=>({}),nextStep:e=>{let{phase:t}=e,n={...e,activeIndices:[],pivotIndex:-1};return t===0?V.handleStartPhase(n):t===1?V.handleMidPhase(n):t===2?V.handleComparePhase(n):n},handleStartPhase:e=>{let{array:t,targetValue:n}=e;return{...e,phase:1,l:0,r:t.length-1,log:{title:`INITIALIZING`,type:`info`,messageKey:`INITIALIZING`,params:{targetValue:n,lenMinusOne:t.length-1}}}},handleMidPhase:e=>{let{array:t,l:n,r,targetValue:i}=e;if(n>r)return{...e,isFinished:!0,log:{title:`NOT FOUND`,type:`mismatch`,messageKey:`NOT_FOUND`,params:{targetValue:i}}};let a=Math.floor((n+r)/2);return{...e,phase:2,mid:a,pivotIndex:a,activeIndices:[n,r],log:{title:`CALCULATING MID`,type:`info`,messageKey:`CALCULATING_MID`,params:{l:n,r,mid:a,val:t[a]}}}},handleComparePhase:e=>{let{array:t,mid:n,targetValue:r}=e;return e.comparisons+=1,e.pivotIndex=n,t[n]===r?{...e,isFinished:!0,sortedIndices:[n],log:{title:`MATCH FOUND!`,type:`success`,messageKey:`MATCH_FOUND`,params:{mid:n}}}:t[n]<r?{...e,phase:1,l:n+1,log:{title:`SEARCH RIGHT`,type:`match`,messageKey:`SEARCH_RIGHT`,params:{val:t[n],targetValue:r,midPlusOne:n+1,r:e.r}}}:{...e,phase:1,r:n-1,log:{title:`SEARCH LEFT`,type:`mismatch`,messageKey:`SEARCH_LEFT`,params:{val:t[n],targetValue:r,midMinusOne:n-1,l:e.l}}}}},ke={id:`jumpsearch`,name:`Jump Search`,getInitialState:(e,t)=>{let n=[...Array.isArray(t)?t:[3,7,11,14,19,22,26,30,35,41,47,53]].sort((e,t)=>e-t),r=typeof e==`number`?e:Number.parseInt(e,10)||30;return{phase:0,i:0,prev:0,step:Math.floor(Math.sqrt(n.length)),targetValue:r,array:n,activeIndices:[],sortedIndices:[],pivotIndex:-1,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{step:Math.floor(Math.sqrt(n.length))}}}},getPreprocessing:()=>({}),nextStep:e=>{let{array:t,i:n,prev:r,step:i,targetValue:a,phase:o}=e,s=t.length,c={...e,activeIndices:[],pivotIndex:-1};if(o===0){let e=Math.min(n,s-1);return c.activeIndices=[e],c.comparisons+=1,t[e]<a&&n<s?{...c,prev:n,i:n+i,log:{title:`JUMPING`,type:`info`,messageKey:`JUMPING`,params:{currentJump:e,val:t[e],targetValue:a,step:i,nextI:n+i}}}:{...c,phase:1,i:Math.min(n,s-1),log:{title:`BLOCK IDENTIFIED`,type:`match`,messageKey:`BLOCK_IDENTIFIED`,params:{prev:r,curr:Math.min(n,s-1)}}}}return o===1?r>n?{...c,isFinished:!0,log:{title:`NOT FOUND`,type:`mismatch`,messageKey:`NOT_FOUND`}}:(c.activeIndices=[r],c.comparisons+=1,t[r]===a?{...c,isFinished:!0,sortedIndices:[r],log:{title:`MATCH FOUND!`,type:`success`,messageKey:`MATCH_FOUND`,params:{prev:r}}}:{...c,prev:r+1,log:{title:`LINEAR SCAN`,type:`info`,messageKey:`LINEAR_SCAN`,params:{prev:r}}}):c}},H={id:`exponentialsearch`,name:`Exponential Search`,getInitialState:(e,t)=>{let n=[...Array.isArray(t)?t:[3,7,11,14,19,22,26,30,35,41,47,53]].sort((e,t)=>e-t);return{phase:0,i:1,l:0,r:0,mid:-1,targetValue:typeof e==`number`?e:Number.parseInt(e,10)||47,array:n,activeIndices:[],sortedIndices:[],pivotIndex:-1,log:{title:`Ready`,type:`info`,content:`Exponential Search first doubles an index to bound the target range, then runs Binary Search within that range.`}}},getPreprocessing:()=>({}),nextStep:e=>{let{targetValue:t,phase:n,array:r}=e,i=r.length,a={...e,activeIndices:[],pivotIndex:-1};return n===0?H.handleCheckZeroPhase(a,t):n===1?H.handleJumpPhase(a,i,t):n===2?H.handleBSCalcPhase(a,t):n===3?H.handleBSComparePhase(a,t):a},handleCheckZeroPhase:(e,t)=>{let{array:n}=e;return e.activeIndices=[0],e.comparisons+=1,n[0]===t?{...e,isFinished:!0,sortedIndices:[0],log:{title:`FOUND AT 0`,type:`success`,messageKey:`FOUND_AT_0`}}:{...e,phase:1,i:1,log:{title:`STARTING EXPONENTIAL JUMPS`,type:`info`,messageKey:`STARTING_JUMPS`,params:{targetValue:t}}}},handleJumpPhase:(e,t,n)=>{let{array:r,i}=e;if(i<t&&r[i]<=n)return e.activeIndices=[i],e.comparisons+=1,{...e,i:i*2,log:{title:`DOUBLING INDEX`,type:`info`,messageKey:`DOUBLING_INDEX`,params:{i,val:r[i],targetValue:n,nextI:i*2}}};let a=i/2,o=Math.min(i,t-1);return{...e,phase:2,l:a,r:o,log:{title:`BOUNDS FOUND`,type:`match`,messageKey:`BOUNDS_FOUND`,params:{left:a,right:o}}}},handleBSCalcPhase:(e,t)=>{let{l:n,r,array:i}=e;if(n>r)return{...e,isFinished:!0,log:{title:`NOT FOUND`,type:`mismatch`,messageKey:`BS_NOT_FOUND`,params:{targetValue:t}}};let a=Math.floor((n+r)/2);return e.pivotIndex=a,e.activeIndices=[n,r],{...e,phase:3,mid:a,log:{title:`BS: CALC MID`,type:`info`,messageKey:`BS_CALC_MID`,params:{l:n,r,mid:a,val:i[a]}}}},handleBSComparePhase:(e,t)=>{let{mid:n,array:r,r:i,l:a}=e;return e.comparisons+=1,e.pivotIndex=n,r[n]===t?{...e,isFinished:!0,sortedIndices:[n],log:{title:`MATCH FOUND!`,type:`success`,messageKey:`BS_MATCH_FOUND`,params:{mid:n}}}:r[n]<t?{...e,phase:2,l:n+1,log:{title:`BS: SEARCH RIGHT`,type:`match`,messageKey:`BS_SEARCH_RIGHT`,params:{val:r[n],targetValue:t,midPlusOne:n+1,r:i}}}:{...e,phase:2,r:n-1,log:{title:`BS: SEARCH LEFT`,type:`mismatch`,messageKey:`BS_SEARCH_LEFT`,params:{val:r[n],targetValue:t,l:a,midMinusOne:n-1}}}}},Ae={id:`interpolationsearch`,name:`Interpolation Search`,getInitialState:(e,t)=>{let n=[...Array.isArray(t)?t:[3,9,15,21,27,33,39,45,51,57,63,69]].sort((e,t)=>e-t),r=typeof e==`number`?e:Number.parseInt(e,10)||39;return{phase:0,low:0,high:n.length-1,pos:-1,targetValue:r,array:n,activeIndices:[],sortedIndices:[],pivotIndex:-1,log:{title:`Ready`,type:`info`,messageKey:`READY`}}},getPreprocessing:()=>({}),nextStep:e=>{let{array:t,low:n,high:r,targetValue:i,phase:a}=e,o={...e,activeIndices:[],pivotIndex:-1};if(a===0){if(n>r||i<t[n]||i>t[r])return{...o,isFinished:!0,log:{title:`OUT OF BOUNDS`,type:`mismatch`,messageKey:`OUT_OF_BOUNDS`}};let e=n+Math.floor((i-t[n])*(r-n)/(t[r]-t[n]));return{...o,phase:1,pos:e,pivotIndex:e,activeIndices:[n,r],log:{title:`ESTIMATING POSITION`,type:`info`,messageKey:`ESTIMATING_POSITION`,params:{pos:e}}}}if(a===1){let{pos:n}=e;return o.comparisons+=1,o.pivotIndex=n,t[n]===i?{...o,isFinished:!0,sortedIndices:[n],log:{title:`MATCH FOUND!`,type:`success`,messageKey:`MATCH_FOUND`,params:{pos:n}}}:t[n]<i?{...o,phase:0,low:n+1,log:{title:`ESTIMATE TOO LOW`,type:`match`,messageKey:`ESTIMATE_TOO_LOW`,params:{pos:n,val:t[n],targetValue:i}}}:{...o,phase:0,high:n-1,log:{title:`ESTIMATE TOO HIGH`,type:`mismatch`,messageKey:`ESTIMATE_TOO_HIGH`,params:{pos:n,val:t[n],targetValue:i}}}}return o}},je={id:`quickselect`,name:`Quickselect`,getInitialState:(e,t)=>{let n=Array.isArray(t)?t:[5,2,8,3,9,1,7,4],r=e;Array.isArray(e)&&(r=e[0]);let i=typeof r==`number`?r:Number.parseInt(r,10),a=Number.isNaN(i)?3:i,o=Math.max(0,a-1);return{phase:0,k:o,targetK:a,l:0,r:n.length-1,array:n,activeIndices:[],sortedIndices:[],pivotIndex:-1,isFinished:!1,log:{title:`INITIALIZING`,type:`info`,messageKey:`INITIALIZING`,params:{k:o,targetK:a}}}},nextStep:e=>{let{array:t,l:n,r,k:i,phase:a}=e,o={...e,activeIndices:[],pivotIndex:-1};if(n>r)return{...o,isFinished:!0,log:{title:`ERROR`,type:`mismatch`,messageKey:`ERROR`}};if(a===0){let e=t[r];return{...o,phase:1,pivot:e,pivotIndex:r,i:n,j:n,log:{title:`START PARTITION`,type:`info`,messageKey:`START_PARTITION`,params:{l:n,r,pivot:e,k:i}}}}if(a===1){let{i:n,j:i,pivot:a}=e;if(i<r)if(o.activeIndices=[i,r],t[i]<a){let e=[...t];return[e[n],e[i]]=[e[i],e[n]],{...o,array:e,i:n+1,j:i+1,log:{title:`SWAP SMALLER`,type:`match`,messageKey:`SWAP_SMALLER`,params:{val:t[i],pivot:a,i:n}}}}else return{...o,j:i+1,log:{title:`CONTINUE SCAN`,type:`info`,messageKey:`CONTINUE_SCAN`,params:{val:t[i],pivot:a}}};else{let e=[...t];return[e[n],e[r]]=[e[r],e[n]],{...o,array:e,phase:2,pivotIndex:n,log:{title:`PIVOT PLACED`,type:`shift`,messageKey:`PIVOT_PLACED`,params:{i:n}}}}}if(a===2){let a=e.pivotIndex;return a===i?{...o,isFinished:!0,sortedIndices:[a],log:{title:`FOUND ✓`,type:`success`,messageKey:`FOUND`,params:{k:i,kPlusOne:i+1,val:t[a]}}}:a>i?{...o,phase:0,l:n,r:a-1,log:{title:`SEARCH LEFT`,type:`shift`,messageKey:`SEARCH_LEFT`,params:{pivotIdx:a,k:i,l:n,pivotIdxMinusOne:a-1}}}:{...o,phase:0,l:a+1,r,log:{title:`SEARCH RIGHT`,type:`shift`,messageKey:`SEARCH_RIGHT`,params:{pivotIdx:a,k:i,pivotIdxPlusOne:a+1,r}}}}return o}},Me={rows:15,cols:15},U=(e={})=>{let t=e.gridConfig||e||{},n=t.rows||Me.rows,r=t.cols||Me.cols,i=e=>{let t=Math.floor((e-1)/2);return Math.floor(Math.random()*t)*2+1},a=t.startNode||{r:i(n),c:i(r)},o=t.endNode;if(!o){let e,t,s=0,c=Math.floor((n+r)/2.5);do e=i(n),t=i(r),s++;while(s<20&&Math.abs(e-a.r)+Math.abs(t-a.c)<c);o={r:e,c:t}}return{rows:n,cols:r,startNode:a,endNode:o}},Ne=(e,t,n,r)=>{let i=[],a=Array.from({length:e},()=>Array(t).fill(!0)),o=(n,r)=>{a[n][r]=!1;let i=[[0,2],[0,-2],[2,0],[-2,0]].sort(()=>Math.random()-.5);for(let[s,c]of i){let i=n+s,l=r+c;i>0&&i<e-1&&l>0&&l<t-1&&a[i][l]&&(a[n+s/2][r+c/2]=!1,o(i,l))}};o(1,1);for(let n=1;n<e-1;n++)for(let e=1;e<t-1;e++)a[n][e]&&Math.random()<.15&&(a[n][e]=!1);let s=n=>{if(!n)return;a[n.r][n.c]=!1;let r=[[0,1],[0,-1],[1,0],[-1,0]];if(!r.some(([r,i])=>{let o=n.r+r,s=n.c+i;return o>=0&&o<e&&s>=0&&s<t&&!a[o][s]}))for(let[i,o]of r){let r=n.r+i,s=n.c+o;if(r>=0&&r<e&&s>=0&&s<t){a[r][s]=!1;break}}};s(n),s(r);for(let o=0;o<e;o++)for(let e=0;e<t;e++)if(a[o][e]){if(n&&o===n.r&&e===n.c||r&&o===r.r&&e===r.c)continue;i.push({r:o,c:e})}return i},W={id:`dijkstra`,name:`Dijkstra's Algorithm`,getInitialState:(e,t,n,r)=>{let{rows:i,cols:a,startNode:o,endNode:s}=U(r||n),c=r?.walls||[],l=r?.costs||Array(i).fill().map(()=>Array(a).fill().map(()=>Math.floor(Math.random()*10))),u=Array(i).fill().map(()=>Array(a).fill(1/0));return u[o.r][o.c]=0,{rows:i,cols:a,startNode:o,endNode:s,walls:c,costs:l,distances:u,visited:Array(i).fill().map(()=>Array(a).fill(!1)),previous:Array(i).fill().map(()=>Array(a).fill(null)),queue:[o],path:[],phase:0,activeNode:null,isFinished:!1,log:{title:`Ready`,type:`info`,messageKey:`READY`,params:{startR:o.r,startC:o.c,endR:s.r,endC:s.c}}}},nextStep:e=>{let{distances:t,visited:n,previous:r,queue:i,phase:a}=e,o={...e,activeNode:null,distances:t.map(e=>[...e]),visited:n.map(e=>[...e]),previous:r.map(e=>[...e]),queue:[...i]};return a===0?W.handleSearchPhase(o):a===1?W.handleBacktrackPhase(o):o},handleSearchPhase:e=>{let{rows:t,cols:n,endNode:r}=e;if(e.queue.length===0)return{...e,isFinished:!0,log:{title:`NO PATH`,type:`mismatch`,messageKey:`NO_PATH`}};let i=e.queue.reduce((t,n)=>e.distances[n.r][n.c]<e.distances[t.r][t.c]?n:t,e.queue[0]);if(e.queue=e.queue.filter(e=>e!==i),e.visited[i.r][i.c])return W.nextStep(e);if(e.visited[i.r][i.c]=!0,e.activeNode=i,i.r===r.r&&i.c===r.c)return{...e,phase:1,log:{title:`TARGET FOUND`,type:`success`,messageKey:`TARGET_FOUND`}};let a=[{r:i.r-1,c:i.c},{r:i.r+1,c:i.c},{r:i.r,c:i.c-1},{r:i.r,c:i.c+1}];for(let r of a){let a=(e.walls||[]).some(e=>e.r===r.r&&e.c===r.c);if(r.r>=0&&r.r<t&&r.c>=0&&r.c<n&&!e.visited[r.r][r.c]&&!a){let t=(e.costs[r.r][r.c]||0)+1,n=e.distances[i.r][i.c]+t;n<e.distances[r.r][r.c]&&(e.distances[r.r][r.c]=n,e.previous[r.r][r.c]=i,e.queue.push(r))}}return{...e,log:{title:`EXPLORING`,type:`info`,messageKey:`EXPLORING`,params:{r:i.r,c:i.c}}}},handleBacktrackPhase:e=>{let{endNode:t,previous:n,path:r}=e,i=r.length===0?t:n[r[0].r][r[0].c];if(i===null)return{...e,isFinished:!0,log:{title:`PATH COMPLETE ✓`,type:`success`,messageKey:`PATH_COMPLETE`}};let a=[i,...r];return{...e,path:a,activeNode:i,log:{title:`BACKTRACKING`,type:`shift`,messageKey:`BACKTRACKING`,params:{r:i.r,c:i.c}}}}},G={id:`astar`,name:`A* Search`,getInitialState:(e,t,n,r)=>{let{rows:i,cols:a,startNode:o,endNode:s}=U(r||n),c=r?.walls||[],l=Array(i).fill().map(()=>Array(a).fill(1/0)),u=Array(i).fill().map(()=>Array(a).fill(1/0));return l[o.r][o.c]=0,u[o.r][o.c]=Math.abs(o.r-s.r)+Math.abs(o.c-s.c),{rows:i,cols:a,startNode:o,endNode:s,walls:c,costs:r?.costs||Array(i).fill().map(()=>Array(a).fill().map(()=>Math.floor(Math.random()*10))),gScore:l,fScore:u,visited:Array(i).fill().map(()=>Array(a).fill(!1)),previous:Array(i).fill().map(()=>Array(a).fill(null)),openSet:[o],path:[],phase:0,activeNode:null,isFinished:!1,log:{title:`Ready`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{gScore:t,fScore:n,visited:r,previous:i,openSet:a,phase:o}=e,s={...e,activeNode:null,gScore:t.map(e=>[...e]),fScore:n.map(e=>[...e]),visited:r.map(e=>[...e]),previous:i.map(e=>[...e]),openSet:[...a]};return o===0?G.handleSearchPhase(s):o===1?G.handleBacktrackPhase(s):s},handleSearchPhase:e=>{let{rows:t,cols:n,endNode:r}=e;if(e.openSet.length===0)return{...e,isFinished:!0,log:{title:`NO PATH`,type:`mismatch`,messageKey:`NO_PATH`}};let i=e.openSet.reduce((t,n)=>e.fScore[n.r][n.c]<e.fScore[t.r][t.c]?n:t,e.openSet[0]);if(e.openSet=e.openSet.filter(e=>e!==i),e.visited[i.r][i.c]=!0,e.activeNode=i,i.r===r.r&&i.c===r.c)return{...e,phase:1,log:{title:`TARGET REACHED`,type:`success`,messageKey:`TARGET_REACHED`}};let a=[{r:i.r-1,c:i.c},{r:i.r+1,c:i.c},{r:i.r,c:i.c-1},{r:i.r,c:i.c+1}];for(let o of a){let a=(e.walls||[]).some(e=>e.r===o.r&&e.c===o.c);if(o.r>=0&&o.r<t&&o.c>=0&&o.c<n&&!e.visited[o.r][o.c]&&!a){let t=(e.costs[o.r][o.c]||0)+1,n=e.gScore[i.r][i.c]+t;if(n<e.gScore[o.r][o.c]){e.previous[o.r][o.c]=i,e.gScore[o.r][o.c]=n;let t=Math.abs(o.r-r.r)+Math.abs(o.c-r.c);e.fScore[o.r][o.c]=n+t,e.openSet.some(e=>e.r===o.r&&e.c===o.c)||e.openSet.push(o)}}}let o=Math.abs(i.r-r.r)+Math.abs(i.c-r.c);return{...e,log:{title:`SEARCHING`,type:`info`,messageKey:`SEARCHING`,params:{r:i.r,c:i.c,gScore:e.gScore[i.r][i.c],hScore:o,fScore:e.fScore[i.r][i.c]}}}},handleBacktrackPhase:e=>{let{endNode:t,path:n}=e,r=n.length===0?t:e.previous[n[0].r][n[0].c];return r===null?{...e,isFinished:!0,log:{title:`DONE ✓`,type:`success`,messageKey:`DONE`}}:{...e,path:[r,...n],activeNode:r,log:{title:`BACKTRACKING`,type:`shift`,messageKey:`BACKTRACKING`,params:{r:r.r,c:r.c}}}}},K={id:`bfs`,name:`Breadth-First Search`,getInitialState:(e,t,n,r)=>{let{rows:i,cols:a,startNode:o,endNode:s}=U(r||n);return{rows:i,cols:a,startNode:o,endNode:s,walls:r?.walls||[],visited:Array(i).fill().map(()=>Array(a).fill(!1)),previous:Array(i).fill().map(()=>Array(a).fill(null)),queue:[o],path:[],phase:0,activeNode:null,isFinished:!1,log:{title:`Ready`,type:`info`,messageKey:`READY`}}},nextStep:e=>{let{visited:t,previous:n,queue:r,phase:i}=e,a={...e,activeNode:null,visited:t.map(e=>[...e]),previous:n.map(e=>[...e]),queue:[...r]};return i===0?K.handleSearchPhase(a):i===1?K.handleBacktrackPhase(a):a},handleSearchPhase:e=>{let{rows:t,cols:n,endNode:r}=e;if(e.queue.length===0)return{...e,isFinished:!0,log:{title:`NO PATH`,type:`mismatch`,messageKey:`NO_PATH`}};let i=e.queue.shift();if(e.visited[i.r][i.c]=!0,e.activeNode=i,i.r===r.r&&i.c===r.c)return{...e,phase:1,log:{title:`TARGET REACHED`,type:`success`,messageKey:`TARGET_REACHED`}};let a=[{r:i.r-1,c:i.c},{r:i.r+1,c:i.c},{r:i.r,c:i.c-1},{r:i.r,c:i.c+1}];for(let r of a){let a=(e.walls||[]).some(e=>e.r===r.r&&e.c===r.c);r.r>=0&&r.r<t&&r.c>=0&&r.c<n&&!e.visited[r.r][r.c]&&!a&&(e.queue.some(e=>e.r===r.r&&e.c===r.c)||(e.previous[r.r][r.c]=i,e.queue.push(r)))}return{...e,log:{title:`SEARCHING`,type:`info`,messageKey:`SEARCHING`,params:{r:i.r,c:i.c}}}},handleBacktrackPhase:e=>{let{endNode:t,path:n}=e,r=n.length===0?t:e.previous[n[0].r][n[0].c];return r===null?{...e,isFinished:!0,log:{title:`DONE ✓`,type:`success`,messageKey:`DONE`}}:{...e,path:[r,...n],activeNode:r,log:{title:`BACKTRACKING`,type:`shift`,messageKey:`BACKTRACKING`,params:{r:r.r,c:r.c}}}}},Pe={name:`Z-Algorithm`,type:`pattern-matching`,visualizerType:`pattern-matching`,category:`Pattern Matching Algorithms`,difficulty:`Hard`,description:`Uses a special Z-array to find all occurrences of a pattern in linear time.`,extendedDescription:`The Z-algorithm builds a "Z-array" for a concatenated string P + $ + T. Z[i] is the length of the longest substring starting from index i that is also a prefix of the concatenated string. By identifying indices in the Z-array equal to the pattern length, we find all occurrences of the pattern in linear O(n + m) time.`,defaultInputs:{target:`THE FASTEST FOX TESTS`,pattern:`TEST`},complexity:{timeBest:`Ω(n + m)`,timeAvg:`Θ(n + m)`,timeWorst:`O(n + m)`,timePre:`O(n)`,space:`O(n + m)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Inside Z-box`,color:`bg-indigo-500`},{label:`Match`,color:`bg-emerald-500`},{label:`Mismatch`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Z-Algorithm: A linear-time pattern matching strategy.

• Context: Operating on the concatenated string S = P + $ + T.

• Objective: Constructing a 'Z-array' where Z[i] is the longest prefix
  of S starting at index i.

• Skipping pattern self-comparison: Processing starting at index
  {startIndex}.`,Z_ARRAY_COMPLETE:`Z-Array Construction Finalized.

• Execution Status: {foundCountStatus}.

• Logic: Text indices where Z[i] ≥ |P| signify a full pattern match.`,OUTSIDE_Z_BOX:`Probe Point {i} exceeds right boundary {r}.

• Context: Current index is not covered by a previously discovered
  prefix match.

• Strategy: Initiating manual naive comparison from index {i}
  against the global prefix (index 0).`,INSIDE_Z_BOX_OPTIMIZED:`Index {i} resides within the active Z-box [{l}..{r}].

• Optimization: Leveraging internal symmetry via k = i - l = {k}.

• Action: Inheriting Z[{k}] = {zK} directly as it is contained within
  the established box boundaries.`,EXTENDING_Z_BOX:`Boundary Condition: Index {i} is inside the Z-box, but the prefix
match Z[{k}] extends to the boundary {r}.

• Strategy: Utilizing the known prefix length as a baseline and
  resuming manual character comparison beyond the boundary.`,CHARACTER_MATCH:`Prefix Correspondence: charAt({patternIdx}) == charAt({textIdx})
('{char}').

• Extension: Expanding the current match and advancing the Z-box
  right-boundary to {textIdx}.`,MISMATCH_BOX_END:`Prefix Divergence at pattern index {patternIdx}.

• Match Finalized: Z[{i}] = {zValue}.

• State Update: New active Z-box established at [{l}..{r}].`},uiConfig:{statusLabel:`Index: {i}, Box: [{l}, {r}]`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function getZArray(s) {
  let n = s.length, z = new Array(n).fill(0);
  let l = 0, r = 0;
  for (let i = 1; i < n; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
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
    return z`,csharp:`int[] GetZArray(string s) {
    int n = s.Length;
    int[] z = new int[n];
    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i <= r) z[i] = Math.Min(r - i + 1, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] - 1 > r) { l = i; r = i + z[i] - 1; }
    }
    return z;
}`},lineHighlights:{INSIDE_Z_BOX_OPTIMIZED:{javascript:5,python:6,csharp:6},CHARACTER_MATCH:{javascript:6,python:8,csharp:9},MISMATCH_BOX_END:{javascript:7,python:10,csharp:10}}},Fe={name:`KMP Search`,type:`pattern-matching`,visualizerType:`pattern-matching`,category:`Pattern Matching Algorithms`,difficulty:`Hard`,description:`Uses a "Failure Function" to avoid re-comparing characters that have already been matched.`,extendedDescription:`Knuth-Morris-Pratt (KMP) is an efficient string searching algorithm that avoids redundant comparisons by using information gathered during previous character matches. It uses a precomputed "Failure Function" (or prefix table) that tells the algorithm where to start the next match attempt if a mismatch occurs, effectively skipping over parts of the text that have already been matched.`,defaultInputs:{target:`A WILD LIT WILLOW`,pattern:`WILLOW`},complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n)`,timeWorst:`O(n)`,timePre:`O(m)`,space:`O(m)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500`},{label:`Match`,color:`bg-emerald-500`},{label:`Mismatch`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Knuth-Morris-Pratt (KMP) Search.

• Strategy: Utilizing a 'Partial Match Table' (failure function) to
  avoid redundant character comparisons.

• Optimization: Skipping ahead by identifying the longest proper
  prefix that is also a suffix within the current match.`,MATCH_FOUND:`Pattern Instance Finalized!

• Result: Full character correspondence verified.

• Match identified at starting index {idx}.`,CHAR_MATCH:`Local Correspondence: '{targetChar}' == '{patternChar}'.

• Alignment validated for current prefix segment.

• Strategy: Extending the active match length to {newLen}
  characters.`,MISMATCH:`Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.

• Character violation identified at global text index {idx}.

• Action: Querying the prefix table for the next optimal
  alignment.`,NO_PREFIX:`Prefix Table Null: No usable symmetry identified.

• Current match length has no proper prefix that is also a suffix.

• Action: Shifting the search window by exactly 1 unit.`,CONSULT_PI:`Consulting Prefix Table (pi[{piIdx}] = {newCompIdx}).

• Result: Identifying a shift of {shiftValue} units that preserves
  {newCompIdx} existing character matches.

• Objective: Minimize redundant comparisons.`,SMART_SHIFT:`Intelligent Shift Executed: Origin moved to {nextPos}.

• Strategy: Resuming character verification from the first
  uncertain character.

• Note: The first {newCompIdx} characters are mathematically
  guaranteed to match.`,END_OF_TEXT:`Search Domain Exhausted.

• Result: Remaining text buffer length is less than pattern
  length 'm'.

• Execution terminated.`},uiConfig:{statusLabel:`Index: {currentIndex}`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function kmpSearch(text, pattern) {
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
}

function computePrefixFunction(pattern) {
  const m = pattern.length;
  const pi = new Array(m).fill(0);
  let k = 0;
  for (let q = 1; q < m; q++) {
    while (k > 0 && pattern[k] !== pattern[q]) k = pi[k - 1];
    if (pattern[k] === pattern[q]) k++;
    pi[q] = k;
  }
  return pi;
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
    return -1

def compute_prefix_function(pattern):
    m = len(pattern)
    pi = [0] * m
    k = 0
    for q in range(1, m):
        while k > 0 and pattern[k] != pattern[q]:
            k = pi[k-1]
        if pattern[k] == pattern[q]:
            k += 1
        pi[q] = k
    return pi`,csharp:`public int KMPSearch(string text, string pattern) {
    int n = text.Length, m = pattern.Length;
    int[] pi = ComputePrefixFunction(pattern);
    int q = 0;
    for (int i = 0; i < n; i++) {
        while (q > 0 && pattern[q] != text[i])
            q = pi[q - 1];
        if (pattern[q] == text[i]) q++;
        if (q == m) return i - m + 1;
    }
    return -1;
}

private int[] ComputePrefixFunction(string pattern) {
    int m = pattern.Length;
    int[] pi = new int[m];
    int k = 0;
    for (int q = 1; q < m; q++) {
        while (k > 0 && pattern[k] != pattern[q])
            k = pi[k - 1];
        if (pattern[k] == pattern[q]) k++;
        pi[q] = k;
    }
    return pi;
}`},lineHighlights:{CHAR_MATCH:{javascript:11,python:9,csharp:9},MISMATCH:{javascript:[9,10],python:[7,8],csharp:[7,8]},"MATCH FOUND ✓":{javascript:12,python:11,csharp:10}}},Ie={name:`Boyer-Moore Search`,type:`pattern-matching`,visualizerType:`pattern-matching`,category:`Pattern Matching Algorithms`,difficulty:`Medium`,description:`A high-performance search that skips characters using precomputed bad-character and good-suffix tables.`,extendedDescription:`Boyer-Moore is one of the most efficient string searching algorithms. It works by comparing characters from right to left and uses two powerful heuristics—the Bad Character Rule and the Good Suffix Rule—to skip large portions of the text. In practice, the Boyer-Moore algorithm often achieves sub-linear time complexity, meaning it doesn't even need to look at every character in the text.`,defaultInputs:{target:`THE FASTEST FOX TESTS`,pattern:`TEST`},complexity:{timeBest:`Ω(n/m)`,timeAvg:`Θ(n/m)`,timeWorst:`O(n)`,timePre:`O(m + Σ)`,space:`O(k)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500`},{label:`Match`,color:`bg-emerald-500`},{label:`Mismatch`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Boyer-Moore (Horspool Variant) Search.

• Strategy: Right-to-left character comparison within the current
  search window.

• Heuristic: Utilizing the 'Bad Character Rule' to achieve
  sub-linear performance by skipping irrelevant text segments.`,MATCH_FOUND:`Pattern Instance Finalized!

• Result: Successful right-to-left verification for all {m}
  pattern characters.

• Match identified at starting index {idx}.`,CHAR_MATCH:`Local Correspondence: '{targetChar}' == '{patternChar}'.

• Alignment validated at the current offset.

• Strategy: Moving LEFT to verify the preceding character in the
  pattern sequence.`,MISMATCH:`Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.

• Character violation identified at text index {idx}.

• Action: Executing the Bad Character heuristic to determine the
  maximum safe shift.`,BAD_CHAR_RULE:`Bad Character Heuristic: '{badChar}' {foundStatus}.

• Logic: Aligning the pattern's rightmost occurrence of
  '{badChar}' with the mismatched text character.

• Shift Distance: {shiftValue} units.`,SHIFT_EXECUTED:`Window Jump Resolved.

• Search origin translated {shiftValue} positions to index
  {nextPos}.

• Strategy: Resetting comparison pointers for the next
  right-to-left verification pass.`,END_OF_TEXT:`Search Domain Exhausted.

• Result: Remaining text buffer length is less than pattern
  length 'm'.

• Execution terminated.`},uiConfig:{statusLabel:`Index: {currentIndex}`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function boyerMoore(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const badCharTable = buildBadCharTable(pattern);
  let s = 0;

  while (s <= n - m) {
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[s + j]) j--;
    if (j < 0) {
      return s; // Found
      // s += (s + m < n) ? m - badCharTable[text[s + m]] : 1;
    } else {
      s += Math.max(1, j - (badCharTable[text[s + j]] || -1));
    }
  }
  return -1;
}

function buildBadCharTable(pattern) {
  const table = {};
  for (let i = 0; i < pattern.length; i++) {
    table[pattern[i]] = i;
  }
  return table;
}`,python:`def boyer_moore(text, pattern):
    n, m = len(text), len(pattern)
    bad_char = build_bad_char_table(pattern)
    s = 0
    while s <= n - m:
        j = m - 1
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1
        if j < 0:
            return s
        else:
            s += max(1, j - bad_char.get(text[s + j], -1))
    return -1

def build_bad_char_table(pattern):
    return {c: i for i, c in enumerate(pattern)}`,csharp:`public int BoyerMoore(string text, string pattern) {
    int n = text.Length, m = pattern.Length;
    var badChar = BuildBadCharTable(pattern);
    int s = 0;
    while (s <= n - m) {
        int j = m - 1;
        while (j >= 0 && pattern[j] == text[s + j]) j--;
        if (j < 0) return s;
        else s += Math.Max(1, j - (badChar.ContainsKey(text[s + j]) ? badChar[text[s + j]] : -1));
    }
    return -1;
}

private Dictionary<char, int> BuildBadCharTable(string pattern) {
    var table = new Dictionary<char, int>();
    for (int i = 0; i < pattern.Length; i++) table[pattern[i]] = i;
    return table;
}`},lineHighlights:{CHAR_MATCH:{javascript:10,python:8,csharp:8},MISMATCH:{javascript:13,python:12,csharp:10},"MATCH FOUND ✓":{javascript:11,python:10,csharp:9}}},Le={name:`Sunday Search`,type:`pattern-matching`,visualizerType:`pattern-matching`,category:`Pattern Matching Algorithms`,difficulty:`Medium`,description:`A fast substring search algorithm that uses a look-ahead character to determine shift values.`,extendedDescription:`The Sunday Search algorithm is a variation of the Boyer-Moore algorithm. It is often faster in practice because it uses a simpler shift rule: it looks at the character in the text immediately following the current window. This "look-ahead" character alone determines the shift distance, often allowing the algorithm to skip large sections of the text with minimal preprocessing.`,defaultInputs:{target:`A WILD LIT WILLOW`,pattern:`WILLOW`},complexity:{timeBest:`Ω(n/m)`,timeAvg:`Θ(n)`,timeWorst:`O(nm)`,timePre:`O(m + Σ)`,space:`O(k)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500`},{label:`Match`,color:`bg-emerald-500`},{label:`Mismatch`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Sunday Search: An optimized string matching algorithm.

• Strategy: Utilizing a 'Look-Ahead' heuristic to maximize window
  translation distance.

• Mechanism: Evaluating the character immediately following the
  search window to determine the next jump.`,START_PHASE:`Aligning Search Window.

• Current Scope: '{targetRange}' starting at index {currentIndex}.

• Objective: Initiating character-by-character verification from
  left to right.`,CHAR_MATCH:`Local Correspondence: '{targetChar}' == '{patternChar}'.

• Correspondence validated at window offset {compIdx}.

• Strategy: Advancing to verify the next character in the pattern.`,MISMATCH_DETECTED:`Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.

• Character violation at global text index {textIdx}.

• Action: Aborting current scan and querying the look-ahead
  character for shift resolution.`,SUCCESS_MATCH_FOUND:`Pattern Instance Finalized!

• Result: Successful validation for all {m} pattern characters.

• Match identified at starting index {currentIndex}.`,IDENTIFY_LOOKAHEAD:`Heuristic Probe: Analyzing the look-ahead character.

• Encountered: '{char}' at text index {lookAheadIdx}.

• Strategy: Determining the shift based on this character's
  relative position in the pattern.`,SEARCH_TERMINATED:`Boundary Condition Encountered.

• Look-ahead index {lookAheadIdx} is outside the text buffer.

• Result: Execution terminated.`,LOOKUP_SHIFT:`Shift Calculation: {charStatus}.

• Heuristic: Aligning the pattern's rightmost occurrence of
  '{char}' with the look-ahead position.

• Jump Distance: {shiftValue} units.`,FINAL_SHIFT:`Terminal Window Shift.

• Executing final translation to index {nextPos}.

• Result: Domain exhausted.`,EXECUTING_SHIFT:`Window Translation Resolved.

• Search origin moved {shiftValue} positions to index {nextPos}.

• Strategy: Re-initiating character verification at the new
  alignment.`},uiConfig:{statusLabel:`Index: {currentIndex}`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function sundaySearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const shiftTable = buildShiftTable(pattern);
  let s = 0;

  while (s <= n - m) {
    let j = 0;
    while (j < m && pattern[j] === text[s + j]) j++;
    if (j === m) return s; // Found
    
    if (s + m >= n) break;
    s += shiftTable[text[s + m]] || (m + 1);
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
    var shiftTable = new Dictionary<char, int>();
    for (int i = 0; i < m; i++) shiftTable[pattern[i]] = m - i;

    int s = 0;
    while (s <= n - m) {
        if (text.Substring(s, m) == pattern) return s;
        if (s + m >= n) break;
        s += shiftTable.ContainsKey(text[s + m]) ? shiftTable[text[s + m]] : m + 1;
    }
    return -1;
}`},lineHighlights:{CHAR_MATCH:{javascript:[8,9],python:7,csharp:8},MISMATCH_DETECTED:{javascript:12,python:10,csharp:10},SUCCESS_MATCH_FOUND:{javascript:10,python:8,csharp:8}}},Re={name:`Rabin-Karp Search`,type:`pattern-matching`,visualizerType:`pattern-matching`,category:`Pattern Matching Algorithms`,difficulty:`Hard`,description:`Uses rolling hashes to efficiently locate pattern matches within a text stream in average linear time.`,extendedDescription:`Rabin-Karp is a string-searching algorithm that uses hashing to find any one of a set of pattern strings in a text. For text of length n and p patterns of combined length m, its average and best-case running time is O(n+m) in space O(p), but its worst-case time is O(nm). It is particularly useful for detecting multiple patterns or identifying plagiarism.`,defaultInputs:{target:`THE FASTEST FOX TESTS`,pattern:`TEST`},complexity:{timeBest:`Ω(n + m)`,timeAvg:`Θ(n + m)`,timeWorst:`O(nm)`,timePre:`O(m)`,space:`O(1)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Hashing`,color:`bg-indigo-500`},{label:`Match`,color:`bg-emerald-500`},{label:`Mismatch`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Rabin-Karp Search: A hashing-based string matching
  algorithm.

• Mechanism: Mapping string windows to numerical 'fingerprints' for
  accelerated comparison.

• Optimization: Performing character-by-character validation only
  upon fingerprint (hash) collisions.`,INITIAL_HASHING:`Fingerprint Generation Phase.

• Pattern Hash: {pHash}

• Initial Window Hash: {tHash}

• Strategy: Initializing the search state by hashing the pattern
  and the first text window.`,HASH_MATCH:`Fingerprint Collision Detected.

• Target hash ({targetHash}) matches pattern hash ({patternHash}).

• Action: Initiating character-by-character verification to
  confirm the match or identify a spurious hit.`,HASH_MISMATCH:`Fingerprint Divergence.

• Window hash ({targetHash}) ≠ pattern hash ({patternHash}).

• Logic: Invariant failure—the window cannot contain the pattern.

• Action: Shifting the window via rolling hash.`,SPURIOUS_HIT:`Spurious Hit Identified (Hash Collision).

• Hashes matched, but the character sequence at index {textIdx}
  differs.

• Note: A collision occurred in the hash function's finite range.`,SUCCESS_FULL_MATCH:`Pattern Instance Finalized!

• Result: Both fingerprints and character sequences are fully
  synchronized at index {currentIndex}.

• Match Confirmed.`,CHAR_MATCH:`Verification Scan.

• Local character match confirmed within a valid hash window.

• Continuing sequential validation of the remaining pattern length.`,ROLLING_HASH:`Rolling Hash Update (O(1) Shift).

• Evicting: '{charToRemove}' | Admitting: '{charToAdd}'.

• Updated Hash: {tHash}

• Strategy: Recalculating the fingerprint in constant time by
  shifting the sliding window digits.`,SEARCH_COMPLETED:`Search Domain Exhausted.

• All potential window alignments have been fingerprints and/or
  validated.

• Result: Execution terminated.`},uiConfig:{statusLabel:`Hashes: P={patternHash}, T={targetHash}`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function rabinKarp(text, pattern) {
  const d = 256, q = 101; // base, prime
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
      if (t < 0) t += q;
    }
  }
  return -1;
}`,python:`def rabin_karp(text, pattern):
    d, q = 256, 101 # base, prime
    n, m = len(text), len(pattern)
    p = t = 0
    h = pow(d, m-1, q)
    
    for i in range(m):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q
        
    for i in range(n - m + 1):
        if p == t:
            if text[i:i+m] == pattern:
                return i
        if i < n - m:
            t = (d * (t - ord(text[i]) * h) + ord(text[i+m])) % q
    return -1`,csharp:`public int RabinKarp(string text, string pattern) {
    int d = 256, q = 101;
    int n = text.Length, m = pattern.Length;
    int p = 0, t = 0, h = 1;

    for (int i = 0; i < m - 1; i++) h = (h * d) % q;
    for (int i = 0; i < m; i++) {
        p = (d * p + pattern[i]) % q;
        t = (d * t + text[i]) % q;
    }

    for (int i = 0; i <= n - m; i++) {
        if (p == t) {
            if (text.Substring(i, m) == pattern) return i;
        }
        if (i < n - m) {
            t = (d * (t - text[i] * h) + text[i + m]) % q;
            if (t < 0) t += q;
        }
    }
    return -1;
}`},lineHighlights:{HASH_MATCH:{javascript:13,python:13,csharp:13},ROLLING_HASH:{javascript:[17,18],python:17,csharp:[17,18]},SUCCESS_FULL_MATCH:{javascript:14,python:14,csharp:14}}},ze={name:`Naive Search`,type:`pattern-matching`,visualizerType:`pattern-matching`,category:`Pattern Matching Algorithms`,difficulty:`Easy`,description:`Exhaustive brute-force search that checks every possible alignment character-by-character.`,extendedDescription:`The Naive String Search algorithm is the simplest approach to finding a substring. It checks for the pattern at all possible positions in the text. For each position, it compares characters one by one. If all characters match, the pattern is found. If a mismatch occurs, it shifts the pattern by exactly one position and repeats the process.`,defaultInputs:{target:`THE FASTEST FOX TESTS`,pattern:`TEST`},complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n + m)`,timeWorst:`O(nm)`,timePre:`None`,space:`O(1)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500`},{label:`Match`,color:`bg-emerald-500`},{label:`Mismatch`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Naive Pattern Matching: The baseline brute-force
string search algorithm.

• Mechanism: Sliding a search window of size 'm' across a text
  of size 'n'.

• Strategy: Exhaustive character-by-character validation at
  every possible alignment.`,MATCH_FOUND:`Pattern Instance Resolved!

• Sequential validation verified for all {m} pattern characters.

• Result: Pattern successfully identified starting at index {idx}.`,CHAR_MATCH:`Local Alignment Validated: '{targetChar}' == '{patternChar}'.

• Correspondence confirmed at current offset.

• Strategy: Advancing to verify the next character in sequence.`,MISMATCH:`Inconsistency Detected: '{targetChar}' ≠ '{patternChar}'.

• Alignment invalid at global text index {idx}.

• Action: Aborting the current scan and preparing for a
  unit window shift.`,SHIFTING:`Window Translation.

• Shifting search origin from index {currentIndex} to {nextPos}.

• Strategy: Resetting pattern pointers to re-initiate scanning
  at the next alignment.`,END_OF_TEXT:`Search Domain Exhausted.

• Remaining text length is less than pattern length 'm'.

• Result: Search terminated.`},uiConfig:{statusLabel:`Index: {currentIndex}`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function naiveSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;

  for (let i = 0; i <= n - m; i++) {
    let j;
    for (j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) break;
    }
    if (j === m) return i; // Found
  }
  return -1;
}`,python:`def naive_search(text, pattern):
    n = len(text)
    m = len(pattern)
    
    for i in range(n - m + 1):
        for j in range(m):
            if text[i + j] != pattern[j]:
                break
        else: # Found
            return i
    return -1`,csharp:`public int NaiveSearch(string text, string pattern) {
    int n = text.Length;
    int m = pattern.Length;

    for (int i = 0; i <= n - m; i++) {
        int j;
        for (j = 0; j < m; j++) {
            if (text[i + j] != pattern[j]) break;
        }
        if (j == m) return i;
    }
    return -1;
}`},lineHighlights:{CHAR_MATCH:{javascript:8,python:8,csharp:9},MISMATCH:{javascript:8,python:8,csharp:9},SHIFTING:{javascript:5,python:6,csharp:6},"MATCH FOUND ✓":{javascript:10,python:11,csharp:11}}},Be={name:`Bubble Sort`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Easy`,description:`A simple comparison sort that repeatedly swaps adjacent elements if they are in the incorrect order.`,extendedDescription:`Bubble Sort is the simplest sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.`,defaultInputs:{target:`6, 2, 8, 1, 9, 3, 7, 4`,pattern:``},complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n^2)`,timeWorst:`O(n^2)`,space:`O(1)`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500`},{label:`Swap`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Commencing Bubble Sort: A fundamental exchange-based
sort.

• Mechanism: Repeatedly swapping adjacent elements to
  'bubble' the largest values to the end.

• Invariant: After pass 'i', the i-th largest element is
  guaranteed to be in its terminal position.`,SORTED:`Convergence Reached.

• Result: Array satisfies the global sorted invariant
  (arr[j] ≤ arr[j+1]).

• No further inversions detected.`,PASS_DONE:`Pass {nextPass} Initiated.

• Previous pass successfully finalized index {idx} ({val}).

• Scoping the current scan to the remaining {remaining}
  unsorted elements.`,OUT_OF_ORDER:`Inversion Detected: {valJ} > {valJPlusOne}.

• The local sorted invariant is violated.

• Preparing to perform an adjacent swap to resolve
  the inversion.`,IN_ORDER:`Local Invariant Satisfied: {valJ} ≤ {valJPlusOne}.

• No swap required for this pair.

• Advancing scan pointers to the next adjacent candidate.`,SWAPPED:`Adjacent Swap Executed.

• Larger element moved towards the tail of the array.

• Smaller element propagated towards the head.`},uiConfig:{statusLabel:`Pass: {i}`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function bubbleSort(arr) {
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
}`},lineHighlights:{"OUT OF ORDER":{javascript:5,python:5,csharp:5},SWAPPED:{javascript:7,python:6,csharp:[7,8,9]},"IN ORDER":{javascript:4,python:4,csharp:4},"PASS DONE":{javascript:3,python:3,csharp:3}}},Ve={name:`Selection Sort`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Easy`,description:`Repeatedly finds the minimum element from the unsorted part and moves it to the beginning.`,extendedDescription:`Selection Sort is a simple comparison-based sorting algorithm. The algorithm divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. It repeatedly finds the smallest (or largest) element in the unsorted part and swaps it with the first element of the unsorted part.`,defaultInputs:{target:`5, 3, 8, 1, 9, 2, 7, 4`,pattern:``},complexity:{timeBest:`Ω(n^2)`,timeAvg:`Θ(n^2)`,timeWorst:`O(n^2)`,space:`O(1)`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Scanning`,color:`bg-indigo-500`},{label:`Current Min`,color:`bg-amber-400`},{label:`Swap`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Commencing Selection Sort: A comparison-based in-place sort.

• Mechanism: Iteratively identifying the minimum element from
  the unsorted partition.

• Note: Performance is O(n²) regardless of initial order due to
  consistent linear scans.`,SORTED:`Selection Chain Complete.

• Global array invariant satisfied: Fully Ordered.`,MINIMUM_FOUND:`Linear Scan Resolved.

• Identified global minimum in current unsorted segment: {val}.

• Ready to perform index stabilization at index {i}.`,NEW_MINIMUM:`Candidate Update: {val} < current minimum ({oldVal}).

• Redefining the local minimum candidate to index {j}.

• Continuing scan for potential smaller elements.`,COMPARING:`Comparison: Evaluating {val} against current candidate {minVal}.`,NO_SWAP:`Invariant Check: Index {i} already contains the minimum value.

• No swap required for this iteration.

• Advancing the sorted boundary.`,FINAL_NO_SWAP:`Boundary Resolution: Last remaining element is inherently sorted.`,SWAP_EXECUTED:`In-place Swap Complete.

• Value {val} is now stabilized at index {i}.

• This index is now part of the final sorted partition.`,FINAL_SWAP:`Last Element Finalized: Reconstructing full sorted array.`},uiConfig:{statusLabel:`Iteration: {i}`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function selectionSort(arr) {
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
}`},lineHighlights:{"NEW MINIMUM":{javascript:6,python:6,csharp:6},"SWAP EXECUTED":{javascript:10,python:7,csharp:[10,11,12]},COMPARING:{javascript:5,python:5,csharp:5},"MINIMUM FOUND":{javascript:4,python:4,csharp:4}}},He={name:`Insertion Sort`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Easy`,description:`Builds the sorted array by taking an unsorted element and inserting it into its relative position.`,extendedDescription:`Insertion Sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it provides several advantages: it is simple to implement, efficient for small data sets, and stable.`,defaultInputs:{target:`7, 2, 9, 4, 1, 8, 3, 6`,pattern:``},complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n^2)`,timeWorst:`O(n^2)`,space:`O(1)`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500`},{label:`Swap`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Commencing Insertion Sort: An incremental, comparison-based sorting
  algorithm.

• Strategy: Progressively build a sorted partition by inserting each
  unsorted element into its correct relative position.

• Advantage: Highly efficient for small or nearly-sorted datasets
  (Ω(n) best-case).`,NEXT_INSERT:`Selecting Candidate: Value {val} from index {idx}.

• Objective: Compare this element with the preceding sorted sequence
  to determine its final rank in the current partition.

• State: The elements to the left of index {idx} are already
  sorted relative to each other.`,SWAPPING:`Shifting Element: {val1} > candidate.

• Action: Moving {val1} one position to the right to clear a path for
  the candidate's insertion.

• Progress: Scanning backward through the sorted segment until the
  correct insertion point is found.`,SORT_COMPLETE:`Sorting Finalized: All elements successfully integrated.

• Result: The entire array now satisfies the non-decreasing order
  invariant.

• Final State: Global array is fully ordered.`},uiConfig:{statusLabel:`Pass: {i}`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function insertionSort(arr) {
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
}`},lineHighlights:{NEXT_INSERT:{javascript:3,python:2,csharp:4},SWAPPING:{javascript:[7,8],python:[6,7],csharp:[8,9]}}},Ue={name:`Cocktail Shaker Sort`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Medium`,description:`A variation of bubble sort that sorts in both directions each pass through the list.`,extendedDescription:`Cocktail Shaker Sort is a bidirectional variation of Bubble Sort. It passes through the array in both directions alternately, which helps to rapidly move small elements ("turtles") to the beginning of the list, a common bottleneck in standard Bubble Sort.`,defaultInputs:{target:`7, 1, 6, 2, 5, 3, 8, 4`,pattern:``},complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n^2)`,timeWorst:`O(n^2)`,space:`O(1)`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500`},{label:`Swap`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Commencing Cocktail Shaker Sort: A bidirectional variant of Bubble Sort.
• Mechanism: Alternating forward and backward passes to resolve both
  'rabbits' (large elements) and 'turtles' (small elements) efficiently.
• Benefit: Faster convergence than standard bubble sort for specific distributions.`,SORTED:`Convergence Achieved.
• Result: Pass completed without a single exchange.
• Global array invariant satisfied: Fully Ordered.`,FORWARD_PASS:`Head Stabilized: Minimum value resolved at index {start}.
• Initiating Forward Pass from {nextK} to {end}.
• Objective: Propagate the next largest element towards the tail.`,BACKWARD_PASS:`Tail Stabilized: Maximum value resolved at index {end}.
• Initiating Backward Pass from {nextK} to {start}.
• Objective: Propagate the next smallest element towards the head.`,OUT_OF_ORDER:`Inversion Detected: {valK} > {valKPlusOne}.
• Pair violates the local sorted invariant.
• Preparing to resolve via adjacent exchange.`,IN_ORDER:`Local Invariant Satisfied: {valK} ≤ {valKPlusOne}.
• Relative order is correct for this pair.
• Advancing scan pointers.`,SWAPPED:`Adjacent Exchange Executed.
• Elements swapped positions to reduce the global inversion count.
• Marking current iteration for continued refinement.`},uiConfig:{statusLabel:`Passes: {passes}`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function cocktailShakerSort(arr) {
  let start = 0, end = arr.length - 1;
  let swapped = true;
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
  return arr;
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
        if not swapped:
            break
        swapped = False
        end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start += 1
    return arr`,csharp:`public void CocktailShakerSort(int[] arr) {
    int start = 0, end = arr.Length - 1;
    bool swapped = true;
    while (swapped) {
        swapped = false;
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        start++;
    }
}`},lineHighlights:{"SORTED ✓":{javascript:[12,13],python:[11,12],csharp:[14,15]},"OUT OF ORDER":{javascript:7,python:8,csharp:7},"IN ORDER":{javascript:7,python:8,csharp:7},SWAPPED:{javascript:[8,9],python:[9,10],csharp:[8,9,10,11]},"BACKWARD PASS":{javascript:[15,16],python:[14,15],csharp:[17,18]},"FORWARD PASS":{javascript:[6,7],python:[7,8],csharp:[6,7]}}},We={name:`Merge Sort`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Hard`,description:`A stable divide-and-conquer sort that recursively divides the array and merges sorted halves.`,extendedDescription:`Merge Sort is a stable, comparison-based, divide and conquer sorting algorithm.`,defaultInputs:{target:`5, 2, 8, 3, 9, 1, 7, 4`,pattern:``},complexity:{timeBest:`Ω(n log(n))`,timeAvg:`Θ(n log(n))`,timeWorst:`O(n log(n))`,space:`O(n)`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Dividing`,color:`bg-indigo-500`},{label:`Comparing`,color:`bg-amber-400`},{label:`Writing`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Commencing Merge Sort: A stable Divide & Conquer algorithm.

• Phase 1: Recursively decompose the array into unit-length
  sub-problems.

• Phase 2: Systematically merge sorted segments to reconstruct
  the solution.`,DIVIDING:`Decomposing Range [{l}..{r}].

• Split Point: Index {mid}.

• Creating sub-problems: [{l}..{mid}] and [{midPlusOne}..{r}].`,MERGE_START:`Decomposition phase complete.

• Reached leaf nodes (base cases).

• Transitioning to the systematic merge and reconstruction phase.`,MERGING_SEGMENTS:`Merging segments [{l}..{mid}] and [{midPlusOne}..{r}].

• Using a two-pointer approach to compare the leading elements.

• Aiming to maintain the stable sort property.`,TAKING_LEFT:`Comparison Result: Left[{val}] is the next candidate.

• Moving {val} into the temporary sorted buffer.

• Advancing the left-segment pointer.`,TAKING_RIGHT:`Comparison Result: Right[{val}] is the next candidate.

• Moving {val} into the temporary sorted buffer.

• Advancing the right-segment pointer.`,COPYING_BACK:`Segment Merge Resolved: Buffer contains sorted values for
  [{l}..{r}].

• Finalizing: Overwriting the original segment with sorted results.

• This step completes the 'conquer' part of the recursion.`,WRITING_VALUE:`Memory Update: Writing value {val} to primary array index {idx}.`,SORTED:`Global Merge Chain Complete.

• All recursive call stacks have popped.

• Array has been fully reconstructed into its sorted state.`},uiConfig:{statusLabel:`Segment: [{l}..{r}]`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function mergeSort(arr) {
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
}`},lineHighlights:{DIVIDING:{javascript:[3,4,5],python:[3,4,5],csharp:[3,4,5]},TAKING_LEFT:{javascript:12,python:14,csharp:13},TAKING_RIGHT:{javascript:13,python:17,csharp:14}}},Ge={name:`Quick Sort (Lomuto)`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Medium`,description:`An efficient divide-and-conquer sort that uses the Lomuto partition scheme with a fixed pivot.`,extendedDescription:`Quick Sort (Lomuto) is a highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays. The Lomuto partition scheme chooses a pivot that is typically the last element in the array. The algorithm maintains two pointers as it scans the array, one to track the boundary of the smaller elements and another to scan the array.`,defaultInputs:{target:`6, 2, 8, 4, 9, 3, 7, 5`,pattern:``},complexity:{timeBest:`Ω(n log(n))`,timeAvg:`Θ(n log(n))`,timeWorst:`O(n^2)`,space:`O(log(n))`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500`},{label:`Pivot`,color:`bg-amber-400`},{label:`Swap`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Initializing Quick Sort using the Lomuto Partition Scheme.

• Strategy: Select a pivot and partition the array around it.

• Optimization: Using fixed pivot (last element) for clarity in
  demonstrating basic partitioning.`,START_PARTITION:`Partitioning subarray [{l}..{r}] with pivot {pivot}.

• The boundary 'i' will track the tail of elements ≤ pivot.

• Scan pointer 'j' will iterate through the segment.`,SWAP_SMALLER:`Element {val} < pivot ({pivot}).

• Incrementing partition boundary 'i' to index {nextI}.

• Performing in-place swap to move {val} into lower partition.`,KEEP_LARGER:`Element {val} ≥ pivot ({pivot}).

• This element belongs in the upper partition.

• Advancing scan pointer 'j' without moving the boundary.`,PLACE_PIVOT:`Partitioning segment scan complete.

• Finalizing: Moving pivot {pivot} from index {r} to its resolved
  position at {pivotPos}.

• This ensures all elements to the left are ≤ pivot.`,PIVOT_PLACED:`Pivot successfully resolved at index {pivotPos}.

• Invariant: The element at {pivotPos} is in its final sorted position.

• Recursively applying the same logic to sub-segments.`,SORTED:`All recursive partitions have been resolved.

• Pivot invariants satisfied across the global array.

• Sort execution completed successfully.`},uiConfig:{statusLabel:`Segment: [{l}..{r}]`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function quickSort(arr, left = 0, right = arr.length - 1) {
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
}`},lineHighlights:{START_PARTITION:{javascript:11,python:10,csharp:10},SWAP_SMALLER:{javascript:[14,15,16],python:[13,14,15],csharp:[13,14,15,16]},PIVOT_PLACED:{javascript:19,python:17,csharp:[19,20,21]}}},Ke={name:`Quick Sort (Hoare)`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Medium`,description:`An optimized divide-and-conquer sort using two pointers that converge from opposite ends.`,extendedDescription:`Quick Sort (Hoare) is an efficient partitioning scheme that uses two pointers that start at the ends of the array being partitioned, then move toward each other, until they find an inversion: a pair of elements, one greater than or equal to the pivot, one less than or equal, that are in the wrong order relative to each other. The inverted elements are then swapped.`,defaultInputs:{target:`5, 8, 1, 9, 3, 7, 2, 6`,pattern:``},complexity:{timeBest:`Ω(n log(n))`,timeAvg:`Θ(n log(n))`,timeWorst:`O(n^2)`,space:`O(log(n))`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Scanning`,color:`bg-indigo-500`},{label:`Pivot`,color:`bg-amber-400`},{label:`Swap`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Commencing Quick Sort using the Hoare Partition Scheme.
• Pivot Selection: Median element to improve balance on various distributions.
• Mechanism: Two pointers converging from opposite boundaries to identify and resolve inversions.`,START_PARTITION:`Partitioning subarray [{l}..{r}] around pivot {pivot}.
• Pointer 'i' will scan from the left for elements ≥ pivot.
• Pointer 'j' will scan from the right for elements ≤ pivot.`,MOVING_I:`Left Scan: Value {val} < pivot ({pivot}).
• Element is already correctly partitioned.
• Incrementing 'i' to evaluate the next candidate.`,I_STOPPED:`Left Scan Halted: {val} ≥ pivot ({pivot}).
• Found an element belonging in the upper partition.
• Pointer 'i' will maintain this position for a future swap.`,MOVING_J:`Right Scan: Value {val} > pivot ({pivot}).
• Element is already correctly partitioned.
• Decrementing 'j' to evaluate the next candidate.`,J_STOPPED:`Right Scan Halted: {val} ≤ pivot ({pivot}).
• Found an element belonging in the lower partition.
• Pointer 'j' has identified a swap candidate.`,SWAPPING:`Inversion Identified: Swapping indices {i} and {j}.
• Moving {valI} to the upper partition and {valJ} to the lower partition.
• This resolves the relative order violation between these two elements.`,CROSSED:`Partition Convergence: Pointers i({i}) and j({j}) have crossed.
• Subarray is now partitioned relative to the chosen pivot.
• Returning split index {j} for the next level of recursion.`,SORTED:`Recursive Partitioning Complete.
• All sub-problems merged successfully.
• Global array invariant satisfied: Fully Ordered.`},uiConfig:{statusLabel:`Segment: [{l}..{r}]`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let p = partition(arr, left, right);
    quickSort(arr, left, p);
    quickSort(arr, p + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  let pivot = arr[Math.floor((left + right) / 2)];
  let i = left - 1;
  let j = right + 1;
  while (true) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);
    if (i >= j) return j;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}`,python:`def quick_sort(arr, left=0, right=None):
    if right is None: right = len(arr) - 1
    if left < right:
        p = partition(arr, left, right)
        quick_sort(arr, left, p)
        quick_sort(arr, p + 1, right)
    return arr

def partition(arr, left, right):
    pivot = arr[(left + right) // 2]
    i = left - 1
    j = right + 1
    while True:
        i += 1
        while arr[i] < pivot: i += 1
        j -= 1
        while arr[j] > pivot: j -= 1
        if i >= j: return j
        arr[i], arr[j] = arr[j], arr[i]`,csharp:`public void QuickSort(int[] arr, int left, int right) {
    if (left < right) {
        int p = Partition(arr, left, right);
        QuickSort(arr, left, p);
        QuickSort(arr, p + 1, right);
    }
}

private int Partition(int[] arr, int left, int right) {
    int pivot = arr[(left + right) / 2];
    int i = left - 1;
    int j = right + 1;
    while (true) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`},lineHighlights:{START_PARTITION:{javascript:11,python:10,csharp:10},SWAPPING:{javascript:17,python:17,csharp:[17,18,19]},CROSSED:{javascript:16,python:16,csharp:16}}},qe={name:`Counting Sort`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Medium`,description:`Counts the number of times an element occurs. It then calculates their positions in a new array.`,extendedDescription:`Counting Sort is a sorting technique based on keys between a specific range. It works by counting the number of objects having distinct key values (kind of hashing). Then doing some arithmetic to calculate the position of each object in the output sequence. It is not a comparison sort and is most efficient when the range of input data is not significantly larger than the number of objects to be sorted.`,defaultInputs:{target:`4, 2, 6, 1, 3, 2, 5, 1`,pattern:``},complexity:{timeBest:`Ω(n + k)`,timeAvg:`Θ(n + k)`,timeWorst:`O(n + k)`,space:`O(k)`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Counting`,color:`bg-indigo-500`},{label:`Writing`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Commencing Counting Sort: A non-comparative integer sorting algorithm.
• Precondition: Input values must be within a known, finite range [0..k].
• Mechanism: Mapping input values to frequency counts to determine their final rank.`,INITIALIZING:`Phase 1: Domain Analysis.
• Maximum value identified: {maxVal}.
• Initializing frequency array of size {maxVal} + 1 with zero-initialization.`,RECORDING_COUNT:`Frequency Histogram: Encountered {val} at input index {i}.
• Incrementing count[{val}] to {newCountVal}.
• This builds a profile of the input distribution.`,COUNTING_COMPLETE:`Phase 2: Frequency aggregation complete.
• Ready to transform frequencies into starting positions (offsets).
• Transitioning to cumulative prefix sum calculation.`,ACCUMULATING:`Prefix Sum: count[{i}] += count[{iMinusOne}].
• New cumulative total: {newCountI}.
• This value now represents the right-hand boundary for element '{i}' in the sorted output.`,CUMULATIVE_DONE:`Rank Determination Complete.
• The cumulative count array now provides the final insertion indices for all values.
• Ready to perform stable distribution into the output array.`,PLACING_ELEMENT:`Stable Distribution: Value {val} from input index {i}.
• Offset lookup: count[{val}] points to target index {pos}.
• Decrementing rank pointer to maintain stability for duplicate keys.`,SORT_COMPLETE:`Sort Finalized.
• Elements mapped to their respective ranks via the frequency-index transform.
• Result: Fully sorted array in O(n + k) time.`},uiConfig:{statusLabel:`Phase: {phase}`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function countingSort(arr) {
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
    return output`,csharp:`public int[] CountingSort(int[] arr) {
    int n = arr.Length;
    int max = arr.Max();
    int[] count = new int[max + 1];
    int[] output = new int[n];

    for (int i = 0; i < n; i++) count[arr[i]]++;
    for (int i = 1; i <= max; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}`},lineHighlights:{RECORDING_COUNT:{javascript:7,python:7,csharp:7},ACCUMULATING:{javascript:8,python:9,csharp:8},PLACING_ELEMENT:{javascript:[10,11],python:[11,12],csharp:[10,11]}}},Je={name:`Bucket Sort`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Hard`,description:`Distributes elements into buckets, sorting them individually before merging the results.`,extendedDescription:`Bucket Sort is a comparison-based sorting algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm. It is a distribution sort, a generalization of pigeonhole sort, and is cousins with radix sort.`,defaultInputs:{target:`42, 8, 76, 31, 95, 19, 58, 14`,pattern:``},complexity:{timeBest:`Ω(n + k)`,timeAvg:`Θ(n + k)`,timeWorst:`O(n^2)`,space:`O(n)`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Bucketing`,color:`bg-indigo-500`},{label:`Writing`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Commencing Bucket Sort: A distribution-based sorting strategy.
• Mechanism: Partitioning the global range into discrete 'buckets' and scattering elements into them.
• Performance: Optimal (O(n+k)) when input is uniformly distributed across the domain.`,DISTRIBUTION_COMPLETE:`Phase 1: Distribution Resolved.
• Elements have been scattered into their corresponding buckets.
• Ready to initiate localized sorting for each bucket subset.`,BUCKETING:`Scattering Operation: Value {val} assigned to Bucket {bucketIdx}.
• Normalizing value to determine its bucket index within the domain.`,BUCKETS_SORTED:`Localized Sorts Finalized.
• Every individual bucket is now internally ordered.
• Transitioning to the gathering phase to reconstruct the global sequence.`,SORTING_BUCKET:`Conquering Bucket {i}.
• Applying a secondary sort to finalize the relative order within this value range.`,CONCATENATING:`Gathering: Extracting {val} from Bucket {bucketIdx}.
• Writing sorted local values back to primary array index {i}.`,SORT_COMPLETE:`Global Reconstruction Complete.
• All sorted buckets have been concatenated in sequence.
• Result: Fully Ordered Array.`},uiConfig:{statusLabel:`Phase: {phase}`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;

  let min = Math.min(...arr);
  let max = Math.max(...arr);

  let bucketCount = Math.floor((max - min) / bucketSize) + 1;
  let buckets = new Array(bucketCount);
  for (let i = 0; i < buckets.length; i++) buckets[i] = [];

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
    return arr`,csharp:`public void BucketSort(List<int> arr) {
    if (arr.Count == 0) return;
    
    int min = arr.Min(), max = arr.Max();
    int bucketCount = 5;
    List<int>[] buckets = new List<int>[bucketCount];
    for (int i = 0; i < bucketCount; i++) buckets[i] = new List<int>();
    
    foreach (int x in arr) {
        int idx = (int)((double)(x - min) / (max - min + 1) * bucketCount);
        buckets[idx].Add(x);
    }
    
    arr.Clear();
    foreach (var b in buckets) {
        b.Sort();
        arr.AddRange(b);
    }
}`},lineHighlights:{BUCKETING:{javascript:11,python:10,csharp:10},"SORTING BUCKET":{javascript:16,python:15,csharp:16},CONCATENATING:{javascript:[17,18],python:16,csharp:17}}},Ye={name:`Radix Sort`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Hard`,description:`Sorts elements by processing individual digits using counting sort as a subroutine.`,extendedDescription:`Radix Sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix. For elements with more than one significant digit, this bucketing process is repeated for each digit, while preserving the ordering of the prior step, until all digits have been considered. For this reason, it is also called bucket sort and digital sort.`,defaultInputs:{target:`53, 17, 82, 34, 91, 26, 45, 68`,pattern:``},complexity:{timeBest:`Ω(nk)`,timeAvg:`Θ(nk)`,timeWorst:`O(nk)`,space:`O(n + k)`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Bucketing`,color:`bg-indigo-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Initializing Radix Sort (LSD): A non-comparative integer sorting algorithm.
• Mechanism: Sorting elements digit-by-digit from Least Significant (LSD) to Most Significant (MSD).
• Property: Stable distribution into 10 buckets (radix 10).`,PROCESSING_DIGIT:`Analyzing the {exp}s digit position.
• Current pass will stabilize the relative order based on this magnitude.
• Essential for the correctness of subsequent significant digit passes.`,BUCKETING:`Digit Extraction: Value {val} has '{digit}' at the {exp}s place.
• Assigning to Bucket {digit}.
• This preserves the stable order from previous passes (LSD property).`,DISTRIBUTION_COMPLETE:`Distribution phase for {exp}s digit finished.
• All elements have been partitioned into their respective radix buckets.
• Stable order maintained within each bucket.`,PASS_COMPLETE:`Pass Resolution: Reconstructing array from buckets.
• Order finalized for the {exp}s significant digit.
• Advancing to the next power of 10.`,SORT_COMPLETE:`Radix Sort Complete.
• All significant digits processed.
• Result: Fully sorted array in O(nk) time, where k is the number of digits.`},uiConfig:{statusLabel:`Digit: {exp}s`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function radixSort(arr) {
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
        arr[i] = output[i]`,csharp:`public void RadixSort(int[] arr) {
    int max = arr.Max();
    for (int exp = 1; max / exp > 0; exp *= 10) {
        CountingSortForRadix(arr, exp);
    }
}

private void CountingSortForRadix(int[] arr, int exp) {
    int n = arr.Length;
    int[] output = new int[n];
    int[] count = new int[10];

    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}`},lineHighlights:{PROCESSING_DIGIT:{javascript:3,python:4,csharp:3},BUCKETING:{javascript:14,python:14,csharp:13},PASS_COMPLETE:{javascript:21,python:21,csharp:20}}},Xe={name:`Heap Sort`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Hard`,description:`Organizes elements into a binary heap to efficiently extract and sort the largest elements.`,extendedDescription:`Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining elements.`,defaultInputs:{target:`3, 9, 2, 8, 1, 7, 4, 6`,pattern:``},complexity:{timeBest:`Ω(n log(n))`,timeAvg:`Θ(n log(n))`,timeWorst:`O(n log(n))`,space:`O(1)`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Heapified`,color:`bg-indigo-500`},{label:`Checking`,color:`bg-amber-400`},{label:`Swap`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Commencing Heap Sort: A comparison-based sort utilizing an implicit
  binary heap.

• Phase 1: Build-Max-Heap from the input array in O(n) time.

• Phase 2: Successively extract the maximum element to reconstruct
  the array in sorted order.`,MAX_HEAP_BUILT:`Max-Heap Construction Complete.

• Invariant: Every parent node is ≥ its children.

• Ready to transition to the extraction phase.`,HEAPIFYING:`Invoking Max-Heapify on internal node at index {i}.

• Goal: Restore the max-heap property for this subtree.

• Sifting the element down to its valid hierarchical position.`,NODE_POSITIONED_PHASE_3:`Max-Heap Property Restored.

• Node has successfully settled at its correct level.

• Ready for the next root extraction.`,NODE_POSITIONED:`Subtree Invariant Satisfied.

• Node now satisfies the max-heap property relative to its
  children.`,SIFT_DOWN:`Sift-Down Operation: Parent {valParent} < Child {valChild}.

• Violates heap invariant. Performing swap to promote the larger
  child.`,EXTRACT_MAX:`Extraction Phase: Moving current maximum {valRoot} to resolved
  index {i}.

• Effectively removing the root from the heap.

• Decrementing active heap boundary to preserve the sorted
  partition.`,SORT_COMPLETE:`Sort Completed Successfully.

• All elements extracted and heapified.

• Result: Fully sorted array with O(n log n) time complexity
  and O(1) auxiliary space.`},uiConfig:{statusLabel:`Heap Size: {heapSize}`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function heapSort(arr) {
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
}`},lineHighlights:{HEAPIFYING:{javascript:3,python:3,csharp:3},SIFT_DOWN:{javascript:21,python:18,csharp:20},EXTRACT_MAX:{javascript:6,python:7,csharp:7}}},Ze={name:`Shell Sort`,type:`sorting`,visualizerType:`array`,category:`Sorting Algorithms`,difficulty:`Easy`,description:`Optimizes insertion sort by using gaps to compare elements that are far apart.`,extendedDescription:`Shell Sort is a generalized version of insertion sort. It starts by sorting elements far apart from each other and progressively reduces the gap between elements to be sorted. By starting with distant elements, it can move some out-of-place elements into position faster than a simple nearest-neighbor exchange.`,defaultInputs:{target:`23, 29, 15, 19, 31, 7, 9, 5, 2`,pattern:``},complexity:{timeBest:`Ω(n log(n))`,timeAvg:`Θ(n log (n))`,timeWorst:`O(n^2)`,space:`O(1)`},legendItems:[{label:`Unsorted`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500`},{label:`Gap Swap`,color:`bg-rose-500`},{label:`Sorted`,color:`bg-emerald-500`}],stepMessages:{READY:`Commencing Shell Sort: A generalized Insertion Sort approach.
• Strategy: Reducing large-scale inversions by comparing elements separated by a decreasing 'gap'.
• Optimization: Moving elements across large distances early to minimize subsequent nearest-neighbor shifts.`,GAP_SIZE:`Active Gap Interval: {gap} positions.
• Performing an 'h-sort' pass where h = {gap}.
• This creates multiple interleaved subsequences that are sorted independently.`,INSERTION_AT_GAP:`Gap-Insertion: Candidate {val} at index {i}.
• Inserting into its rank within the current {gap}-spaced subsequence.
• This incrementally reduces the array's total inversion count.`,POSITION_FOUND:`Subsequence Position Resolved: index {j}.
• Element has reached its local equilibrium for the current gap.
• Advancing scan to the next subsequence element.`,GAP_SWAP:`H-Swap Operation: {valLeft} > {valRight}.
• Resolving an inversion across distance {gap}.
• Accelerating the convergence of elements towards their final positions.`,PASS_FINISHED:`H-Sort Complete for gap {gap}.
• Array is now more ordered than before this pass.
• Decaying gap size to refine the sorting granularity.`,SORT_COMPLETE:`Shell Sort Finalized.
• The final 1-sort (insertion sort) pass has resolved all remaining inversions.
• Result: Fully Ordered Array.`},uiConfig:{statusLabel:`Gap: {gap}`,startButton:`Start Sorting`,playbackSpeed:400},codeSnippets:{javascript:`function shellSort(arr) {
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
    return arr`,csharp:`public void ShellSort(int[] arr) {
    int n = arr.Length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`},lineHighlights:{GAP_SIZE:{javascript:3,python:4,csharp:3},INSERTION_AT_GAP:{javascript:5,python:6,csharp:5},GAP_SWAP:{javascript:8,python:9,csharp:8}}},Qe={name:`Linear Search`,type:`searching`,visualizerType:`array`,category:`Searching Algorithms`,difficulty:`Easy`,description:`A basic sequential search that checks every element in the collection until the target is identified.`,extendedDescription:`Linear Search (also known as Sequential Search) is the most basic search algorithm. It starts at the first element of the list and compares it with the target value. If the values don't match, it moves to the next element and repeats the process until a match is found or the end of the list is reached.`,defaultInputs:{target:`13`,pattern:`12, 5, 14, 8, 4, 11, 8, 15, 4, 6, 13, 10`},complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(n)`,timeWorst:`O(n)`,space:`O(1)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Checking`,color:`bg-indigo-500`},{label:`Match`,color:`bg-emerald-500`},{label:`Mismatch`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Linear Search: The most fundamental search method.

• Strategy: Systematically evaluate each element in the
  collection from start to finish.

• Use Case: Ideal for small or unsorted datasets where indexing
  overhead is undesirable.`,CHECKING:`Evaluating index {i}: Comparing '{val}' with target '{target}'.

• Action: Performing a direct equality check.

• Status: Scanning sequentially through the array.`,FOUND:`Target Identified!

• Location: Index {i}.

• Result: Search successful. The element exists within the
  collection.`,NOT_FOUND:`Search Domain Exhausted.

• Result: Target '{target}' was not located in the array.

• Complexity: Processed n elements in O(n) time.`,SORTED:`Search Completed.`},uiConfig:{statusLabel:`Index: {i}`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,python:`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,csharp:`public int LinearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.Length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`},lineHighlights:{NO_MATCH:{javascript:2,python:2,csharp:2},VALUE_FOUND:{javascript:3,python:3,csharp:3}}},$e={name:`Binary Search`,type:`searching`,visualizerType:`array`,category:`Searching Algorithms`,difficulty:`Medium`,description:`Efficiently locates a target value in a sorted array by repeatedly bisecting the search interval.`,extendedDescription:`Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.`,defaultInputs:{target:`1, 2, 3, 4, 5, 6, 7, 8, 9, 10`,pattern:`7`},complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(log(n))`,timeWorst:`O(log(n))`,space:`O(1)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Midpoint`,color:`bg-amber-400`},{label:`Checking`,color:`bg-indigo-500`},{label:`Found`,color:`bg-emerald-500`},{label:`Not Found`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Binary Search: A logarithmic-time search strategy.

• Precondition: Input array must be strictly monotonic (sorted).

• Mechanism: Repeatedly bisecting the search space to eliminate
  half of the remaining candidates.`,INITIALIZING:`Search Parameters Defined.

• Target Value: {targetValue}.

• Search Interval: [0..{lenMinusOne}].

• Expected Complexity: O(log n) comparisons.`,NOT_FOUND:`Search Space Exhausted.

• Pointer cross-over detected (low > high).

• Result: Target {targetValue} is not present in the dataset.`,CALCULATING_MID:`Interval Bisection: Range [{l}..{r}].

• Calculated Midpoint: Index {mid}.

• Current Observation: {val}.

• Evaluating relative order against target {targetValue}.`,MATCH_FOUND:`Search Successful!

• Target {targetValue} identified at index {mid}.

• The bisection process has converged on the result.`,SEARCH_RIGHT:`Comparison Result: {val} < {targetValue}.

• Invariant: All elements in [{l}..{mid}] are strictly less than
  target.

• Narrowing search interval to the upper partition:
  [{midPlusOne}..{r}].`,SEARCH_LEFT:`Comparison Result: {val} > {targetValue}.

• Invariant: All elements in [{mid}..{r}] are strictly greater
  than target.

• Narrowing search interval to the lower partition:
  [{l}..{midMinusOne}].`},uiConfig:{statusLabel:`Target: {targetValue}`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid; // Match found
    }

    if (arr[mid] < target) {
      low = mid + 1; // Search right half
    } else {
      high = mid - 1; // Search left half
    }
  }
  return -1; // Not found
}`,python:`def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == target:
            return mid # Match found

        if arr[mid] < target:
            low = mid + 1 # Search right half
        else:
            high = mid - 1 # Search left half

    return -1 # Not found`,csharp:`public int BinarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.Length - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid; // Match found
        }

        if (arr[mid] < target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }
    return -1; // Not found
}`},lineHighlights:{INITIALIZING:{javascript:[2,3],python:[2,3],csharp:[2,3]},"CALCULATING MID":{javascript:6,python:6,csharp:6},"MATCH FOUND!":{javascript:[8,9],python:[8,9],csharp:[8,9]},"SEARCH RIGHT":{javascript:[12,13],python:[11,12],csharp:[12,13]},"SEARCH LEFT":{javascript:[14,15],python:[13,14],csharp:[14,15]},"NOT FOUND":{javascript:18,python:16,csharp:18}}},et={name:`Jump Search`,type:`searching`,visualizerType:`array`,category:`Searching Algorithms`,difficulty:`Medium`,description:`Searches sorted arrays by jumping fixed steps to locate the target block, followed by a linear search.`,extendedDescription:`Jump Search is an algorithm for sorted arrays. It checks fewer elements by jumping ahead by a fixed number of steps (usually √n) rather than searching sequentially. Once it finds a block where the target value could exist (because the current element is greater than the target), it performs a linear search backwards or within that block to find the exact match.`,defaultInputs:{target:`30`,pattern:`3, 7, 11, 14, 19, 22, 26, 30, 35, 41, 47, 53`},complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(√n)`,timeWorst:`O(√n)`,space:`O(1)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Jumping`,color:`bg-indigo-500`},{label:`Match`,color:`bg-emerald-500`},{label:`Mismatch`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Jump Search: An optimized search for sorted datasets.

• Strategy: Skipping ahead by fixed intervals to locate the
  target's block.

• Optimal Interval: Step size s = √n to balance jump frequency
  and linear scan depth.`,JUMPING:`Jumping forward from index {currentJump}.

• Observation: {val} < {targetValue}.

• Strategy: Advancing by {step} to index {nextI}.

• Logic: Since the array is sorted, the target must lie beyond
  the current position.`,BLOCK_IDENTIFIED:`Target Block Localized.

• Observation: Index {curr} value is ≥ target.

• Result: Target {targetValue} is constrained to the interval
  [{prev}..{curr}].

• Transitioning to linear refinement within this block.`,LINEAR_SCAN:`Refinement Phase: Sequential scan of the identified block.

• Checking index {prev}.

• This linear phase resolves the exact position within the √n
  boundary.`,MATCH_FOUND:`Search Successful!

• target {targetValue} identified at index {prev}.

• Convergence achieved after block-jump and linear refinement
  phases.`,NOT_FOUND:`Search Exhausted.

• Linear scan completed without identifying a match.

• Result: Target {targetValue} is not present in the dataset.`},uiConfig:{statusLabel:`Block: [{prev}..{i}]`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function jumpSearch(arr, target) {
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
    
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
            
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1
            
    if arr[prev] == target:
        return prev
    return -1`,csharp:`public int JumpSearch(int[] arr, int target) {
    int n = arr.Length;
    int step = (int)Math.Floor(Math.Sqrt(n));
    int prev = 0;

    while (arr[Math.Min(step, n) - 1] < target) {
        prev = step;
        step += (int)Math.Floor(Math.Sqrt(n));
        if (prev >= n) return -1;
    }

    while (arr[prev] < target) {
        prev++;
        if (prev == Math.Min(step, n)) return -1;
    }

    if (arr[prev] == target) return prev;
    return -1;
}`},lineHighlights:{JUMPING:{javascript:[6,7],python:[8,9],csharp:[8,9]},LINEAR_SCAN:{javascript:13,python:14,csharp:14},MATCH_FOUND:{javascript:17,python:18,csharp:18}}},tt={name:`Exponential Search`,type:`searching`,visualizerType:`array`,category:`Searching Algorithms`,difficulty:`Medium`,description:`Locates a search range by doubling indices, then performs a binary search within that range.`,extendedDescription:`Exponential Search involves two stages. First, it finds a range where the target element could be by doubling the index (1, 2, 4, 8...) until the element at that index is greater than the target. Second, it performs a Binary Search within the identified range [i/2, min(i, n-1)]. It is particularly useful for searching in infinite arrays or unbounded lists.`,defaultInputs:{target:`1, 2, 3, 4, 5, 6, 7, 8, 9, 10`,pattern:`7`},complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(log n)`,timeWorst:`O(log n)`,space:`O(1)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Jump Index`,color:`bg-indigo-500`},{label:`Binary Mid`,color:`bg-amber-400`},{label:`Found`,color:`bg-emerald-500`},{label:`Not Found`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Exponential Search: A multi-stage search strategy.

• Stage 1: Exponentially increasing probes to define a target
  range.

• Stage 2: Binary Search within the localized interval.

• Context: Highly efficient for unbounded lists or searching
  near the head of a large collection.`,FOUND_AT_0:`Edge Case Optimization: Target identified at index 0.

• Comparison successful on initial probe.`,STARTING_JUMPS:`Range Localization Phase: Target not at head.

• Initiating exponential jumps (2^k) to bound the search
  interval.

• Objective: Identify index 'i' such that target is in [i/2..i].`,DOUBLING_INDEX:`Exponential Expansion: i={i}, value={val} ≤ target.

• Doubling current index to {nextI}.

• This rapidly expands the search domain until the target is
  surpassed.`,BOUNDS_FOUND:`Search Interval Stabilized: [{left}..{right}].

• Target is now bounded between the previous jump and current
  position.

• Transitioning to Binary Search for logarithmic refinement.`,BS_NOT_FOUND:`Binary Refinement: Search space exhausted.

• Result: Target {targetValue} not found within the exponential
  bound.`,BS_CALC_MID:`Binary Search: Probing midpoint index {mid} ({val}).

• Narrowing the current [{l}..{r}] interval.`,BS_MATCH_FOUND:`Binary Search Successful!

• target identified at index {mid}.

• Convergence achieved.`,BS_SEARCH_RIGHT:`Binary Refinement: {val} < target.

• Shifting low boundary to index {midPlusOne}.

• Focusing on the upper half of the exponential block.`,BS_SEARCH_LEFT:`Binary Refinement: {val} > target.

• Shifting high boundary to index {midMinusOne}.

• Focusing on the lower half of the exponential block.`},uiConfig:{statusLabel:`Target: {targetValue}`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function exponentialSearch(arr, target) {
  let n = arr.length;
  if (arr[0] === target) return 0;

  let i = 1;
  while (i < n && arr[i] <= target) {
    i = i * 2;
  }

  return binarySearch(arr, target, i / 2, Math.min(i, n - 1));
}

function binarySearch(arr, target, low, high) {
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,python:`def exponential_search(arr, target):
    n = len(arr)
    if arr[0] == target:
        return 0
        
    i = 1
    while i < n and arr[i] <= target:
        i = i * 2
        
    return binary_search(arr, target, i // 2, min(i, n - 1))

def binary_search(arr, target, low, high):
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        if arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1`,csharp:`public int ExponentialSearch(int[] arr, int target) {
    int n = arr.Length;
    if (arr[0] == target) return 0;
    
    int i = 1;
    while (i < n && arr[i] <= target) {
        i = i * 2;
    }
    
    return BinarySearch(arr, target, i / 2, Math.Min(i, n - 1));
}

private int BinarySearch(int[] arr, int target, int low, int high) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`},lineHighlights:{"STARTING JUMPS":{javascript:5,python:6,csharp:6},"DOUBLING INDEX":{javascript:[6,7,8],python:[7,8,9],csharp:[7,8,9]},"BOUNDS FOUND":{javascript:11,python:11,csharp:12},"BS: CALC MID":{javascript:15,python:16,csharp:17},"BS: MATCH FOUND!":{javascript:16,python:17,csharp:18}}},nt={name:`Interpolation Search`,type:`searching`,visualizerType:`array`,category:`Searching Algorithms`,difficulty:`Hard`,description:`An adaptive search for uniform sorted data. Estimates the target position based on value-proportionality.`,extendedDescription:`Interpolation Search is an algorithm for searching for a key in an array that has been ordered by numerical values assigned to the keys (index values). It behaves like a person searching for a name in a telephone directory: we estimate the position based on the value we are looking for relative to the values at the current bounds.`,defaultInputs:{target:`1, 2, 3, 4, 5, 6, 7, 8, 9, 10`,pattern:`7`},complexity:{timeBest:`Ω(1)`,timeAvg:`Θ(log log n)`,timeWorst:`O(n)`,space:`O(1)`},legendItems:[{label:`Unvisited`,color:`bg-slate-800 border-slate-700`},{label:`Low/High Bound`,color:`bg-indigo-500`},{label:`Estimate (Pos)`,color:`bg-amber-400`},{label:`Found`,color:`bg-emerald-500`},{label:`Not Found`,color:`bg-rose-500`}],stepMessages:{READY:`Commencing Interpolation Search: An adaptive search strategy.

• Context: Highly efficient for sorted datasets with uniform
  distribution.

• Mechanism: Proportional estimation of target index based on
  value magnitude (linear interpolation).`,OUT_OF_BOUNDS:`Range Violation: Target {targetValue} is outside current
  boundary [{low}..{high}].

• Logic: Since the collection is sorted, the target cannot
  reside in the search space.

• Result: Not Found.`,ESTIMATING_POSITION:`Applying Interpolation Formula:

• pos = low + [(target - arr[low]) * (high - low) / (arr[high] - arr[low])]

• Result: Probabilistic probe at index {pos}.

• Strategy: Minimizing steps by targeting expected value
  location.`,MATCH_FOUND:`Search Successful!

• target {targetValue} identified at index {pos}.

• Prediction converged successfully.`,ESTIMATE_TOO_LOW:`Probe Result: {val} < target ({targetValue}).

• Observation: Value is below the target estimate.

• Strategy: Adjusting the 'low' boundary to {pos} + 1 to refine
  the search space.`,ESTIMATE_TOO_HIGH:`Probe Result: {val} > target ({targetValue}).

• Observation: Value exceeds the target estimate.

• Strategy: Adjusting the 'high' boundary to {pos} - 1 to refine
  the search space.`},uiConfig:{statusLabel:`Target: {targetValue}`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      if (arr[low] === target) return low;
      return -1;
    }

    let pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );

    if (arr[pos] === target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`,python:`def interpolation_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high and target >= arr[low] and target <= arr[high]:
        if low == high:
            if arr[low] == target: return low
            return -1
            
        pos = low + int(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]))

        if arr[pos] == target: return pos
        if arr[pos] < target: low = pos + 1
        else: high = pos - 1
    return -1`,csharp:`public int InterpolationSearch(int[] arr, int target) {
    int low = 0;
    int high = arr.Length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            if (arr[low] == target) return low;
            return -1;
        }

        int pos = low + (int)Math.Floor(
            (double)((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        if (arr[pos] == target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}`},lineHighlights:{"ESTIMATING POSITION":{javascript:[10,11,12],python:11,csharp:[11,12,13]},"MATCH FOUND!":{javascript:14,python:13,csharp:15},"ESTIMATE TOO LOW":{javascript:15,python:14,csharp:16},"ESTIMATE TOO HIGH":{javascript:16,python:15,csharp:17}}},rt={name:`Quickselect`,type:`searching`,visualizerType:`array`,category:`Searching Algorithms`,difficulty:`Hard`,description:`Finds the k-th smallest element in an unsorted array using partitioning.`,extendedDescription:`Quickselect is a selection algorithm related to Quick Sort. It uses the same partitioning logic but only recurses into one side of the partition—the one containing the target index k—achieving O(n) average time complexity.`,defaultInputs:{target:`10, 5, 2, 8, 3, 9, 1, 7, 4`,pattern:`3`},complexity:{timeBest:`Ω(n)`,timeAvg:`Θ(n)`,timeWorst:`O(n^2)`,space:`O(1)`},legendItems:[{label:`Checking`,color:`bg-indigo-500`},{label:`Swap`,color:`bg-rose-500`},{label:`Pivot`,color:`bg-amber-400`},{label:`Found`,color:`bg-emerald-500`}],stepMessages:{INITIALIZING:`Commencing Quickselect: An O(n) average-time selection algorithm.

• Goal: Identify the {targetK}-th smallest element (corresponds to
  sorted index {k}).

• Mechanism: Utilizing randomized partitioning to prune the
  search space without a full sort.`,ERROR:`Execution Error: Search space has been exhausted without rank
  resolution.`,START_PARTITION:`Partitioning Range [{l}..{r}] around pivot {pivot}.

• We are seeking index {k} within this subarray.

• Elements will be re-organized relative to the pivot's value.`,SWAP_SMALLER:`Partition Boundary Extension: {val} < {pivot}.

• Moving {val} to the lower partition at index {i}.

• Incrementing the 'smaller-than-pivot' boundary.`,CONTINUE_SCAN:`Partition Scan: {val} ≥ {pivot}.

• Element belongs in the upper partition.

• Advancing scan pointer to evaluate the next element.`,PIVOT_PLACED:`Pivot Finalized: Index {i}.

• Invariant: All elements to the left are ≤ pivot, all to the
  right are > pivot.

• Comparing finalized rank {i} with target rank {k}.`,FOUND:`Target Rank Convergence!

• Pivot position exactly matches target index {k}.

• Result: The {targetK}-th smallest element is {val}.`,SEARCH_LEFT:`Search Space Pruning: Pivot Rank {pivotIdx} > Target Rank {k}.

• The target element must reside in the lower partition.

• Narrowing focus to range [{l}..{pivotIdxMinusOne}].`,SEARCH_RIGHT:`Search Space Pruning: Pivot Rank {pivotIdx} < Target Rank {k}.

• The target element must reside in the upper partition.

• Narrowing focus to range [{pivotIdxPlusOne}..{r}].`},uiConfig:{statusLabel:`K-th Smallest (k={targetK}, index={k})`,startButton:`Start Search`,playbackSpeed:500},codeSnippets:{javascript:`function quickselect(arr, k, left = 0, right = arr.length - 1) {
  if (left === right) return arr[left];
  
  let pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
  pivotIndex = partition(arr, left, right, pivotIndex);
  
  if (k === pivotIndex) {
    return arr[k];
  } else if (k < pivotIndex) {
    return quickselect(arr, k, left, pivotIndex - 1);
  } else {
    return quickselect(arr, k, pivotIndex + 1, right);
  }
}

function partition(arr, left, right, pivotIndex) {
  let pivotValue = arr[pivotIndex];
  [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
  let storeIndex = left;
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
      storeIndex++;
    }
  }
  [arr[right], arr[storeIndex]] = [arr[storeIndex], arr[right]];
  return storeIndex;
}`,python:`import random
def quickselect(arr, k, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    if left == right:
        return arr[left]
        
    pivot_index = random.randint(left, right)
    pivot_index = partition(arr, left, right, pivot_index)
    
    if k == pivot_index:
        return arr[k]
    elif k < pivot_index:
        return quickselect(arr, k, left, pivot_index - 1)
    else:
        return quickselect(arr, k, pivot_index + 1, right)
        
def partition(arr, left, right, pivot_index):
    pivot_value = arr[pivot_index]
    arr[pivot_index], arr[right] = arr[right], arr[pivot_index]
    store_index = left
    for i in range(left, right):
        if arr[i] < pivot_value:
            arr[store_index], arr[i] = arr[i], arr[store_index]
            store_index += 1
    arr[right], arr[store_index] = arr[store_index], arr[right]
    return store_index`,csharp:`public int QuickSelect(int[] arr, int k, int left, int right) {
    if (left == right) return arr[left];
    
    Random rnd = new Random();
    int pivotIndex = rnd.Next(left, right + 1);
    pivotIndex = Partition(arr, left, right, pivotIndex);
    
    if (k == pivotIndex) {
        return arr[k];
    } else if (k < pivotIndex) {
        return QuickSelect(arr, k, left, pivotIndex - 1);
    } else {
        return QuickSelect(arr, k, pivotIndex + 1, right);
    }
}

private int Partition(int[] arr, int left, int right, int pivotIndex) {
    int pivotValue = arr[pivotIndex];
    Swap(arr, pivotIndex, right);
    int storeIndex = left;
    for (int i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            Swap(arr, storeIndex, i);
            storeIndex++;
        }
    }
    Swap(arr, right, storeIndex);
    return storeIndex;
}`},lineHighlights:{INITIALIZING:{javascript:1,python:[2,3],csharp:1},"START PARTITION":{javascript:17,python:18,csharp:18},"SWAP SMALLER":{javascript:[22,23],python:[24,25],csharp:[23,24]},"CONTINUE SCAN":{javascript:21,python:23,csharp:22},"PIVOT PLACED":{javascript:27,python:26,csharp:27},"FOUND ✓":{javascript:[7,8],python:[11,12],csharp:[8,9]},"SEARCH LEFT":{javascript:[9,10],python:[13,14],csharp:[10,11]},"SEARCH RIGHT":{javascript:[11,12],python:[15,16],csharp:[12,13]}}},it={name:`Dijkstra's Algorithm`,type:`pathfinding`,visualizerType:`grid`,category:`Pathfinding Algorithms`,difficulty:`Hard`,description:`Finds the shortest path in a weighted grid where lower cell values are cheaper to traverse.`,extendedDescription:`Dijkstra's algorithm is a greedy search that finds the shortest path between nodes in a weighted graph. In this visualization, each cell has a 'cost' (0-9). The total cost of a path is the sum of the values of all cells entered. Lower-valued cells (represented by lighter colors) are significantly 'cheaper' to traverse than high-valued ones.`,defaultInputs:{target:`GRID`,pattern:``},complexity:{timeBest:`Ω(E + V log V)`,timeAvg:`Θ((E + V)log V)`,timeWorst:`O(V^2)`,space:`O(V + E)`},legendItems:[{label:`Active`,color:`bg-white/50 border-white/40`,hidden:!0},{label:`Unvisited`,color:`bg-slate-900/40 border-slate-800/50`,hidden:!0},{label:`Visited`,color:`bg-purple-400/35 border-purple-200/45`,hidden:!0},{label:`Checked`,color:`bg-indigo-400/15 border-indigo-200/25`},{label:`Path`,color:`bg-violet-400 border-violet-400`},{label:`Start`,color:`bg-blue-500 border-blue-400`},{label:`End`,color:`bg-emerald-500 border-emerald-400`},{label:`Wall`,color:`bg-rose-500/40 border-rose-500/30`}],stepMessages:{READY:`Commencing Dijkstra's Algorithm: Optimal pathfinding for weighted graphs.
• Goal: Identify the minimum-cost path from start to destination.
• Mechanism: Greedy selection of the unvisited node with the absolute lowest tentative distance.`,TARGET_FOUND:`Destination Finalized.
• The greedy search has reached the target node with a confirmed minimal cost.
• Transitioning to the backtracking phase to reconstruct the optimal route.`,EXPLORING:`Edge Relaxation Phase.
• Active Node: ({r}, {c}).
• Strategy: Evaluating neighbor edges and updating 'tentative' distances if a cheaper path is identified.
• Cost: Based on the value of the destination cell (lower is better).`,BACKTRACKING:`Path Reification: Backtracking through ({r}, {c}).
• Following the sequence of minimal cost links to reconstruct the globally optimal route.`,PATH_COMPLETE:`Path Reconstruction Finalized.
• All intermediate nodes stabilized in the output sequence.
• Result: Globally optimal weighted path identified.`,NO_PATH:`Convergence Failure.
• Priority queue exhausted without target resolution.
• Result: No valid traversal exists within the reachable graph components.`},uiConfig:{statusLabel:`Visited: {visitedCount}`,startButton:`Find Path`,playbackSpeed:40},codeSnippets:{javascript:`function dijkstra(grid, start, end) {
  let distances = createGrid(Infinity);
  let visited = createGrid(false);
  distances[start.r][start.c] = 0;
  let queue = [start];
  while (queue.length > 0) {
    queue.sort((a, b) => distances[a.r][a.c] - distances[b.r][b.c]);
    let curr = queue.shift();
    if (curr.r === end.r && curr.c === end.c) return reconstructPath(curr);
    if (visited[curr.r][curr.c]) continue;
    visited[curr.r][curr.c] = true;
    for (let neighbor of getNeighbors(curr)) {
      if (!visited[neighbor.r][neighbor.c]) {
        let alt = distances[curr.r][curr.c] + 1;
        if (alt < distances[neighbor.r][neighbor.c]) {
          distances[neighbor.r][neighbor.c] = alt;
          neighbor.prev = curr;
          queue.push(neighbor);
        }
      }
    }
  }
  return null;
}`,python:`def dijkstra(grid, start, end):
    distances = create_grid(float('inf'))
    visited = create_grid(False)
    distances[start.r][start.c] = 0
    queue = [start]
    while queue:
        queue.sort(key=lambda node: distances[node.r][node.c])
        curr = queue.pop(0)
        if curr.r == end.r and curr.c == end.c:
            return reconstruct_path(curr)
        if visited[curr.r][curr.c]:
            continue
        visited[curr.r][curr.c] = True
        for neighbor in get_neighbors(curr):
            if not visited[neighbor.r][neighbor.c]:
                alt = distances[curr.r][curr.c] + 1
                if alt < distances[neighbor.r][neighbor.c]:
                    distances[neighbor.r][neighbor.c] = alt
                    neighbor.prev = curr
                    queue.append(neighbor)
    return None`,csharp:`public List<Node> Dijkstra(Grid grid, Node start, Node end) {
    float[,] distances = CreateGrid(float.PositiveInfinity);
    bool[,] visited = CreateGrid(false);
    distances[start.r, start.c] = 0;
    List<Node> queue = new List<Node> { start };
    while (queue.Count > 0) {
        queue.Sort((a, b) => distances[a.r, a.c].CompareTo(distances[b.r, b.c]));
        Node curr = queue[0];
        queue.RemoveAt(0);
        if (curr.r == end.r && curr.c == end.c) return ReconstructPath(curr);
        if (visited[curr.r, curr.c]) continue;
        visited[curr.r, curr.c] = true;
        foreach (Node neighbor in GetNeighbors(curr)) {
            if (!visited[neighbor.r, neighbor.c]) {
                float alt = distances[curr.r, curr.c] + 1;
                if (alt < distances[neighbor.r, neighbor.c]) {
                    distances[neighbor.r, neighbor.c] = alt;
                    neighbor.prev = curr;
                    queue.Add(neighbor);
                }
            }
        }
    }
    return null;
}`},lineHighlights:{INITIALIZING:{javascript:[2,3,4,5],python:[2,3,4,5],csharp:[2,3,4,5]},TARGET_FOUND:{javascript:9,python:9,csharp:10},EXPLORING:{javascript:[12,13,14,15,16],python:[13,14,15,16,17],csharp:[13,14,15,16,17]},BACKTRACKING:{javascript:9,python:10,csharp:10},PATH_COMPLETE:{javascript:9,python:10,csharp:10},NO_PATH:{javascript:23,python:21,csharp:25}}},at={name:`A* Search`,type:`pathfinding`,visualizerType:`grid`,category:`Pathfinding Algorithms`,difficulty:`Medium`,description:`Uses a heuristic to find the shortest path more efficiently than Dijkstra.`,extendedDescription:`A* Search is an informed search algorithm, or a best-first search, meaning that it is formulated in terms of weighted graphs: starting from a specific starting node of a graph, it aims to find a path to the given goal node having the smallest cost. It uses a heuristic function (usually Manhattan distance) to estimate the cost to reach the goal, allowing it to prioritize directions that seem closer to the end.`,defaultInputs:{target:`GRID`,pattern:``},complexity:{timeBest:`Ω(d)`,timeAvg:`Θ(b^d)`,timeWorst:`O(b^d)`,space:`O(d)`},legendItems:[{label:`Active`,color:`bg-white/50 border-white/40`,hidden:!0},{label:`Unvisited`,color:`bg-slate-900/40 border-slate-800/50`,hidden:!0},{label:`Visited`,color:`bg-purple-400/35 border-purple-200/45`,hidden:!0},{label:`Checked`,color:`bg-indigo-400/15 border-indigo-200/25`},{label:`Path`,color:`bg-violet-400 border-violet-400`},{label:`Start`,color:`bg-blue-500 border-blue-400`},{label:`End`,color:`bg-emerald-500 border-emerald-400`},{label:`Wall`,color:`bg-rose-500/40 border-rose-500/30`}],stepMessages:{READY:`Commencing A* Search: An informed heuristic search algorithm.
• Mechanism: Best-first search utilizing the Manhattan Distance heuristic.
• Strategy: Prioritizing nodes with the lowest estimated total cost (F-Score).`,TARGET_REACHED:`Goal Convergence Achieved.
• Target node identified with an optimal F-Score.
• Transitioning to the backtracking phase to finalize the shortest path.`,SEARCHING:`Node Evaluation: ({r}, {c}).
• F-Score ({fScore}) = G-Score ({gScore}) + H-Score ({hScore}).
• G-Score: Actual cost from start.
• H-Score: Admissible heuristic estimate to the target.`,BACKTRACKING:`Path Reification: Linking ({r}, {c}) into the final solution.
• Reconstructing the optimal route from the verified greedy choices.`,DONE:`Path Finalization Complete.
• Result: Globally optimal route identified with heuristic acceleration.`,NO_PATH:`Graph Fully Explored.
• Search space exhausted without identifying a valid route to the destination.
• Result: Target is unreachable.`},uiConfig:{statusLabel:`Visited: {visitedCount}`,startButton:`Find Path`,playbackSpeed:20},codeSnippets:{javascript:`function aStar(grid, start, end) {
  let openSet = [start];
  let gScore = createGrid(Infinity);
  let fScore = createGrid(Infinity);
  gScore[start.r][start.c] = 0;
  fScore[start.r][start.c] = heuristic(start, end);

  while (openSet.length > 0) {
    let curr = getLowestFScore(openSet, fScore);
    if (curr.r === end.r && curr.c === end.c) return reconstructPath(curr);

    openSet = openSet.filter(node => node !== curr);
    for (let neighbor of getNeighbors(curr)) {
      let tentativeG = gScore[curr.r][curr.c] + 1;
      if (tentativeG < gScore[neighbor.r][neighbor.c]) {
        gScore[neighbor.r][neighbor.c] = tentativeG;
        fScore[neighbor.r][neighbor.c] = tentativeG + heuristic(neighbor, end);
        if (!openSet.includes(neighbor)) openSet.push(neighbor);
      }
    }
  }
  return null;
}`,python:`def a_star(grid, start, end):
    open_set = [start]
    g_score = create_grid(float('inf'))
    f_score = create_grid(float('inf'))
    g_score[start.r][start.c] = 0
    f_score[start.r][start.c] = heuristic(start, end)

    while open_set:
        curr = min(open_set, key=lambda n: f_score[n.r][n.c])
        if curr.r == end.r and curr.c == end.c:
            return reconstruct_path(curr)

        open_set.remove(curr)
        for neighbor in get_neighbors(curr):
            tentative_g = g_score[curr.r][curr.c] + 1
            if tentative_g < g_score[neighbor.r][neighbor.c]:
                g_score[neighbor.r][neighbor.c] = tentative_g
                f_score[neighbor.r][neighbor.c] = tentative_g + heuristic(neighbor, end)
                if neighbor not in open_set:
                    open_set.append(neighbor)
    return None`,csharp:`public List<Node> AStar(Grid grid, Node start, Node end) {
    List<Node> openSet = new List<Node> { start };
    float[,] gScore = CreateGrid(float.PositiveInfinity);
    float[,] fScore = CreateGrid(float.PositiveInfinity);
    gScore[start.r, start.c] = 0;
    fScore[start.r, start.c] = Heuristic(start, end);

    while (openSet.Count > 0) {
        Node curr = openSet.OrderBy(n => fScore[n.r, n.c]).First();
        if (curr.r == end.r && curr.c == end.c) return ReconstructPath(curr);

        openSet.Remove(curr);
        foreach (Node neighbor in GetNeighbors(curr)) {
            float tentativeG = gScore[curr.r, curr.c] + 1;
            if (tentativeG < gScore[neighbor.r, neighbor.c]) {
                gScore[neighbor.r, neighbor.c] = tentativeG;
                fScore[neighbor.r, neighbor.c] = tentativeG + Heuristic(neighbor, end);
                if (!openSet.Contains(neighbor)) openSet.Add(neighbor);
            }
        }
    }
    return null;
}`},lineHighlights:{INITIALIZING:{javascript:[2,3,4,5,6],python:[2,3,4,5,6],csharp:[2,3,4,5,6]},SEARCHING:{javascript:[12,13,14,15,16],python:[13,14,15,16,17],csharp:[13,14,15,16,17]},TARGET_REACHED:{javascript:10,python:9,csharp:10}}},ot={name:`Breadth-First Search`,type:`pathfinding`,visualizerType:`grid`,category:`Pathfinding Algorithms`,difficulty:`Easy`,isWeighted:!1,description:`Explores the grid layer by layer to find the shortest path in an unweighted graph.`,extendedDescription:`Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the source node and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. It is guaranteed to find the shortest path in an unweighted grid.`,defaultInputs:{target:`GRID`,pattern:``},complexity:{timeBest:`Ω(V)`,timeAvg:`Θ(V + E)`,timeWorst:`O(V^2)`,space:`O(V)`},legendItems:[{label:`Active`,color:`bg-white/50 border-white/40`,hidden:!0},{label:`Unvisited`,color:`bg-slate-900/40 border-slate-800/50`,hidden:!0},{label:`Visited`,color:`bg-purple-400/35 border-purple-200/45`,hidden:!0},{label:`Checked`,color:`bg-indigo-400/15 border-indigo-200/25`},{label:`Path`,color:`bg-violet-400 border-violet-400`},{label:`Start`,color:`bg-blue-500 border-blue-400`},{label:`End`,color:`bg-emerald-500 border-emerald-400`},{label:`Wall`,color:`bg-rose-500/40 border-rose-500/30`}],stepMessages:{READY:`Commencing Breadth-First Search (BFS).
• Strategy: Level-order traversal of the grid.
• Property: Guaranteed to identify the shortest path in unweighted graphs (minimal edge count).`,TARGET_REACHED:`Target Node Resolved.
• The exploration frontier has converged on the destination.
• Transitioning to backtracking to reconstruct the optimal shortest path.`,SEARCHING:`Frontier Expansion.
• Active Node: ({r}, {c}).
• Mechanism: FIFO (First-In, First-Out) queue processing.
• Strategy: Enqueueing unvisited neighbors to ensure layer-by-layer discovery.`,BACKTRACKING:`Path Reconstruction: Tracing parent link at ({r}, {c}).
• Reversing the BFS discovery links to materialize the shortest route.`,DONE:`Path Finalization Complete.
• All intermediate nodes mapped from start to destination.`,NO_PATH:`Exploration Exhausted.
• All reachable grid nodes have been traversed without target resolution.
• Result: No valid path exists.`},uiConfig:{statusLabel:`Visited: {visitedCount}`,startButton:`Find Path`,playbackSpeed:20},codeSnippets:{javascript:`function bfs(grid, start, end) {
  let queue = [start];
  let visited = new Set();
  visited.add(\`\${start.r},\${start.c}\`);
  let parent = {};

  while (queue.length > 0) {
    let curr = queue.shift();
    if (curr.r === end.r && curr.c === end.c) return reconstructPath(curr);

    for (let neighbor of getNeighbors(curr)) {
      let key = \`\${neighbor.r},\${neighbor.c}\`;
      if (!visited.has(key)) {
        visited.add(key);
        parent[key] = curr;
        queue.push(neighbor);
      }
    }
  }
  return null;
}`,python:`def bfs(grid, start, end):
    queue = collections.deque([start])
    visited = {start}
    parent = {}

    while queue:
        curr = queue.popleft()
        if curr == end:
            return reconstruct_path(curr)

        for neighbor in get_neighbors(curr):
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] = curr
                queue.append(neighbor)

    return None`,csharp:`public List<Node> BFS(Grid grid, Node start, Node end) {
    var queue = new Queue<Node>();
    queue.Enqueue(start);
    var visited = new HashSet<Node> { start };
    var parent = new Dictionary<Node, Node>();

    while (queue.Count > 0) {
        var curr = queue.Dequeue();
        if (curr == end) return ReconstructPath(curr);

        foreach (var neighbor in GetNeighbors(curr)) {
            if (!visited.Contains(neighbor)) {
                visited.Add(neighbor);
                parent[neighbor] = curr;
                queue.Enqueue(neighbor);
            }
        }
    }
    return null;
}`},lineHighlights:{SEARCHING:{javascript:7,python:6,csharp:6},TARGET_REACHED:{javascript:8,python:7,csharp:7},BACKTRACKING:{javascript:8,python:7,csharp:7}}},q=[{...P,...Pe},{...M,...Fe},{...xe,...Ie},{...j,...Le},{...N,...Re},{...be,...ze},{...we,...qe},{...Ee,...Ye},{...L,...We},{...B,...Xe},{...z,...Ke},{...R,...Ge},{...De,...Ze},{...Te,...Je},{...Ce,...He},{...I,...Ue},{...Se,...Be},{...F,...Ve},{...V,...$e},{...H,...tt},{...Ae,...nt},{...ke,...et},{...je,...rt},{...Oe,...Qe},{...W,category:`Pathfinding Algorithms`,...it},{...G,category:`Pathfinding Algorithms`,...at},{...K,category:`Pathfinding Algorithms`,...ot}],st=[`Pattern Matching Algorithms`,`Sorting Algorithms`,`Searching Algorithms`,`Pathfinding Algorithms`],J=e(r(),1),Y={difficultyColors:{Easy:`text-emerald-400 bg-emerald-500/10 border-emerald-500/20`,Medium:`text-amber-400 bg-amber-500/10 border-amber-500/20`,Hard:`text-rose-400 bg-rose-500/10 border-rose-500/20`,default:`text-slate-400 bg-slate-500/10 border-slate-500/20`},difficultyMap:{Easy:1,Medium:2,Hard:3},complexityColors:{elite:`text-sky-400`,excellent:`text-emerald-400`,good:`text-yellow-400`,fair:`text-orange-400`,poor:`text-rose-400`,default:`text-slate-400`},categoryMeta:{"Pattern Matching Algorithms":ce,"Sorting Algorithms":E,"Searching Algorithms":_,"Pathfinding Algorithms":y,default:me},hero:{badge:`Interactive Visualizer`,title:`Introduction to`,titleAccent:`Algorithms`,description:`A visual guide to algorithmic complexity and performance.`},caseCards:[{label:`Best Case`,icon:c,color:`text-emerald-400`,bg:`bg-emerald-500/10`,border:`border-emerald-500/20`,desc:`The minimum time required for an algorithm to finish (e.g., searching for the first element in an array).`},{label:`Average Case`,icon:c,color:`text-amber-400`,bg:`bg-amber-500/10`,border:`border-amber-500/20`,desc:`The statistical expectation of time over all possible inputs. Calculated as the sum of cases divided by n (e.g. for Linear Search: (1+2+...+n)/n ≈ n/2).`},{label:`Worst Case`,icon:c,color:`text-rose-400`,bg:`bg-rose-500/10`,border:`border-rose-500/20`,desc:`The absolute maximum time an algorithm can take. Essential for critical system safety and guarantees.`},{label:`Space Complexity`,icon:v,color:`text-blue-400`,bg:`bg-blue-500/10`,border:`border-blue-500/20`,desc:`The amount of extra memory an algorithm needs to run as the input size grows. Goal is to minimize memory footprint.`},{label:`Stability`,icon:C,color:`text-indigo-400`,bg:`bg-indigo-500/10`,border:`border-indigo-500/20`,desc:`A property where equal elements maintain their relative order after sorting. Vital for multi-key sorting operations.`},{label:`Adaptive`,icon:le,color:`text-violet-400`,bg:`bg-violet-500/10`,border:`border-violet-500/20`,desc:`An algorithm is adaptive if its performance improves when the input is already partially sorted (e.g. Insertion Sort).`},{label:`Upper Bound (O)`,icon:d,color:`text-purple-400`,bg:`bg-purple-500/10`,border:`border-purple-500/20`,desc:`The mathematical "ceiling" of an algorithm's growth rate. Guarantees the algorithm will never perform worse than this.`},{label:`Lower Bound (Ω)`,icon:p,color:`text-fuchsia-400`,bg:`bg-fuchsia-500/10`,border:`border-fuchsia-500/20`,desc:`The mathematical "floor" of an algorithm's growth rate. Represents the minimum time an algorithm will ever take.`},{label:`In-Place`,icon:h,color:`text-pink-400`,bg:`bg-pink-500/10`,border:`border-pink-500/20`,desc:`An algorithm that transforms input without using auxiliary data structures, maintaining O(1) extra space complexity.`},{label:`Divide & Conquer`,icon:S,color:`text-cyan-400`,bg:`bg-cyan-500/10`,border:`border-cyan-500/20`,desc:`A paradigm that breaks a problem into smaller sub-problems, solves them recursively, and combines results (e.g. Merge Sort).`},{label:`Iterative`,icon:ne,color:`text-teal-400`,bg:`bg-teal-500/10`,border:`border-teal-500/20`,desc:`An incremental approach that processes elements one by one using loops, often simpler but potentially slower than recursive paradigms.`},{label:`Greedy Strategy`,icon:D,color:`text-lime-400`,bg:`bg-lime-500/10`,border:`border-lime-500/20`,desc:`An approach that makes the locally optimal choice at each step with the hope of finding a global optimum (e.g. Dijkstra).`}],bigONotations:[{label:`O(1)`,name:`Constant`,type:`constant`,color:`stroke-sky-400`,bg:`bg-sky-500/5`,desc:`No matter the input size, it always takes the same time.`},{label:`O(log n)`,name:`Logarithmic`,type:`log`,color:`stroke-emerald-400`,bg:`bg-emerald-500/5`,desc:`Execution time grows slowly as input size increases.`},{label:`O(n)`,name:`Linear`,type:`linear`,color:`stroke-yellow-400`,bg:`bg-yellow-500/5`,desc:`Time grows in direct proportion to the input size.`},{label:`O(n log n)`,name:`Log-linear`,type:`logLinear`,color:`stroke-orange-400`,bg:`bg-orange-500/5`,desc:`Slightly slower than linear. Common in efficient sorting.`},{label:`O(n²)`,name:`Quadratic`,type:`quadratic`,color:`stroke-rose-400`,bg:`bg-rose-500/5`,desc:`Time grows exponentially with input size (nested loops).`},{label:`O(2ⁿ)`,name:`Exponential`,type:`exponential`,color:`stroke-red-600`,bg:`bg-red-500/5`,desc:`Time doubles with each new element. Very inefficient.`}],charts:{constant:`M 0 15 L 20 15`,log:`M 0 18 Q 10 18, 20 5`,linear:`M 0 20 L 20 0`,logLinear:`M 0 20 Q 5 18, 20 0`,quadratic:`M 0 20 Q 5 20, 18 0`,exponential:`M 0 20 Q 2 20, 12 0`},complexityLabels:{best:`B:`,avg:`A:`,worst:`W:`,prep:`Prep:`,space:`Space:`,examples:`Examples:`},spaceComplexities:[{label:`O(1) Space`,name:`In-Place`,desc:`Uses a fixed amount of extra memory regardless of input size.`,examples:`Bubble Sort, Selection Sort`},{label:`O(log n) Space`,name:`Recursive`,desc:`Memory grows with the depth of the recursion tree.`,examples:`Quick Sort (recursive stack)`},{label:`O(n) Space`,name:`Linear Extra`,desc:`Needs extra memory proportional to the input size.`,examples:`Merge Sort, Counting Sort`}],footer:{copyright:`2026 Interactive Visualizer Platform`}},X={glass:`bg-slate-900/30 backdrop-blur-xl border-slate-800/50`,glassHover:`hover:bg-slate-900/40 transition-colors duration-300`,pageWrapper:`min-h-screen bg-transparent p-4 md:p-8 flex justify-center items-start text-slate-200`,mainPanel:`w-full max-w-[1400px] bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500`,panelFooter:`p-4 bg-slate-900/80 border-t border-slate-800 flex justify-between items-center px-8 text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]`,subPanel:`bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden text-slate-300 shadow-2xl flex flex-col h-full`,subPanelHeader:`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-slate-800 bg-slate-900/80`,sidebarSection:`bg-slate-800/20 border border-slate-800/40 rounded-2xl p-6 shadow-xl`,cardBase:`p-4 rounded-2xl border transition-all duration-300`,cardInteractive:`cursor-pointer hover:shadow-[0_0_40px_rgba(79,70,229,0.1)]`,cheatsheetCard:`p-4 rounded-2xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-xl space-y-3 hover:bg-slate-900/40 transition-colors`,algoCard:`group relative p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col hover:shadow-[0_0_40px_rgba(79,70,229,0.1)] text-left`,controlGroup:`flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800`,inputBase:`w-full h-11 px-6 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all font-mono font-bold text-white text-base disabled:opacity-50 placeholder:text-slate-600`,labelBase:`block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2`,buttonBase:`h-9 px-4 font-bold rounded-lg text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 disabled:opacity-20`,vizContainer:`w-full h-64 flex items-center justify-center bg-slate-900/40 rounded-2xl border border-slate-800/60 text-slate-500 italic text-sm overflow-hidden relative`,cellBase:`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg border transition-all duration-300 font-mono font-bold text-lg shadow-lg`,cellValueBase:`w-10 h-14 flex-shrink-0 flex flex-col items-center justify-center rounded-xl border transition-all duration-300 font-mono shadow-md`,heading:`font-black uppercase tracking-wider`,smallHeading:`text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2`,sectionHeader:{container:`w-full flex items-center group cursor-pointer focus:outline-none`,border:`flex items-center gap-3 border-b border-slate-800 pb-4 w-full group-hover:border-slate-700 transition-colors`,iconBox:e=>`p-2 rounded-lg border transition-all duration-300 ${e?`bg-slate-900 text-indigo-400 border-slate-800 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30`:`bg-slate-950 border-slate-900 text-slate-600`}`,title:e=>`text-xl font-black uppercase tracking-wider transition-all duration-300 ${e?`text-white group-hover:text-indigo-400`:`text-slate-600`}`},grid:`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 pb-14`},Z=n(),ct=({type:e,color:t})=>(0,Z.jsx)(`svg`,{width:`24`,height:`24`,viewBox:`0 0 20 20`,className:`stroke-[3] fill-none ${t}`,children:(0,Z.jsx)(`path`,{d:Y.charts[e],strokeLinecap:`round`,strokeLinejoin:`round`})});ct.propTypes={type:J.default.string.isRequired,color:J.default.string.isRequired};function lt({algorithms:e,categories:t,onSelect:n}){let r=e=>(0,Z.jsx)(Y.categoryMeta[e]||Y.categoryMeta.default,{className:`w-5 h-5`}),i=e=>{if(!e)return Y.complexityColors.default;let t=e.toLowerCase();return t.includes(`1`)&&!t.includes(`n`)&&!t.includes(`v`)||t.includes(`ω(d)`)||t.includes(`o(d)`)?Y.complexityColors.elite:t.includes(`log`)&&!t.includes(`n log`)&&!t.includes(`v`)||t.includes(`√`)||t.includes(`n/m`)||t.includes(`v`)&&!t.includes(`+`)&&!t.includes(`e`)&&!t.includes(`^`)?Y.complexityColors.excellent:t.includes(`n`)&&!t.includes(`log`)&&!t.includes(`^`)&&!t.includes(`{`)&&(!t.includes(`m`)||t.includes(`+ m`))&&!t.includes(`nk`)||t.includes(`v + e`)?Y.complexityColors.good:t.includes(`n log`)||t.includes(`nk`)||t.includes(`)log v`)?Y.complexityColors.fair:Y.complexityColors.poor},s=e=>Y.difficultyColors[e]||Y.difficultyColors.default,[c,l]=(0,A.useState)(new Set([`cheatsheet`,...t])),u=e=>{l(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})};return(0,Z.jsx)(`div`,{className:`min-h-screen bg-transparent text-slate-200 p-6 md:p-8 font-sans relative overflow-hidden`,children:(0,Z.jsxs)(`div`,{className:`max-w-6xl mx-auto space-y-14`,children:[(0,Z.jsxs)(`div`,{className:`text-center space-y-3`,children:[(0,Z.jsxs)(`div`,{className:`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] animate-pulse`,children:[(0,Z.jsx)(me,{className:`w-4 h-4`}),` `,Y.hero.badge]}),(0,Z.jsxs)(`h1`,{className:`text-4xl md:text-6xl font-black text-white tracking-tighter leading-none`,children:[Y.hero.title,` `,(0,Z.jsx)(`span`,{className:`text-indigo-500`,children:Y.hero.titleAccent})]}),(0,Z.jsx)(`p`,{className:`text-slate-400 max-w-2xl mx-auto font-medium text-lg`,children:Y.hero.description})]}),(0,Z.jsxs)(`div`,{className:`space-y-0`,children:[(0,Z.jsx)(`button`,{onClick:()=>u(`cheatsheet`),className:X.sectionHeader.container,children:(0,Z.jsxs)(`div`,{className:X.sectionHeader.border,children:[(0,Z.jsx)(`div`,{className:X.sectionHeader.iconBox(!c.has(`cheatsheet`)),children:(0,Z.jsx)(pe,{className:`w-5 h-5`})}),(0,Z.jsxs)(`h2`,{className:X.sectionHeader.title(!c.has(`cheatsheet`)),children:[`Big O Cheatsheet `,(0,Z.jsx)(`span`,{className:`ml-3 text-[10px] text-slate-700 font-black tracking-widest`,children:`(3)`})]}),(0,Z.jsx)(`div`,{className:`flex-1`}),(0,Z.jsx)(O,{className:`w-5 h-5 text-slate-600 group-hover:text-indigo-500 transition-all duration-500 ${c.has(`cheatsheet`)?`-rotate-90 opacity-40`:`rotate-0 opacity-100`}`})]})}),(0,Z.jsx)(a,{initial:!1,children:!c.has(`cheatsheet`)&&(0,Z.jsx)(o.div,{initial:{height:0,opacity:0},animate:{height:`auto`,opacity:1},exit:{height:0,opacity:0},transition:{duration:.4,ease:[.04,.62,.23,.98]},className:`overflow-hidden`,children:(0,Z.jsxs)(`div`,{className:`space-y-6 pt-6 pb-14`,children:[(0,Z.jsx)(`div`,{className:`grid grid-cols-2 lg:grid-cols-3 gap-6`,children:Y.caseCards.map(e=>(0,Z.jsxs)(`div`,{className:X.cheatsheetCard,children:[(0,Z.jsx)(`div`,{className:`flex items-center justify-between`,children:(0,Z.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,Z.jsx)(`div`,{className:`p-2 rounded-lg ${e.bg} border ${e.border}`,children:(0,Z.jsx)(e.icon,{className:`w-4 h-4 ${e.color}`})}),(0,Z.jsx)(`h3`,{className:`font-black text-white text-sm uppercase tracking-wider`,children:e.label})]})}),(0,Z.jsx)(`p`,{className:`text-slate-500 text-xs font-bold leading-relaxed`,children:e.desc})]},e.label))}),(0,Z.jsx)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6`,children:Y.bigONotations.map(e=>(0,Z.jsxs)(`div`,{className:`p-4 rounded-xl border border-slate-800/60 ${e.bg} space-y-3 group hover:border-slate-700 transition-colors`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,Z.jsx)(`span`,{className:`text-xs font-black ${e.color.replace(`stroke-`,`text-`)}`,children:e.label}),(0,Z.jsx)(ct,{type:e.type,color:e.color})]}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`div`,{className:`text-[9px] font-black text-white uppercase tracking-wider mb-1`,children:e.name}),(0,Z.jsx)(`p`,{className:`text-[10px] text-slate-500 font-bold leading-tight line-clamp-2`,children:e.desc})]})]},e.label))}),(0,Z.jsx)(`div`,{className:`grid grid-cols-1 md:grid-cols-3 gap-6`,children:Y.spaceComplexities.map(e=>(0,Z.jsxs)(`div`,{className:`p-4 rounded-xl border border-slate-800/60 bg-indigo-500/5 space-y-3 group hover:border-slate-700 transition-colors`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,Z.jsx)(`span`,{className:`text-xs font-black text-indigo-400`,children:e.label}),(0,Z.jsx)(`div`,{className:`text-[9px] font-black text-white/40 uppercase tracking-widest`,children:e.name})]}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`text-[10px] text-slate-500 font-bold leading-tight mb-2`,children:e.desc}),(0,Z.jsxs)(`div`,{className:`flex items-center gap-1.5`,children:[(0,Z.jsx)(`span`,{className:`text-[8px] font-black text-indigo-500 uppercase`,children:Y.complexityLabels.examples}),(0,Z.jsx)(`span`,{className:`text-[9px] text-slate-400 font-mono italic`,children:e.examples})]})]})]},e.label))})]})})})]}),t.map(t=>{let l=e.filter(e=>e.category===t).sort((e,t)=>(Y.difficultyMap[e.difficulty]||0)-(Y.difficultyMap[t.difficulty]||0));if(l.length===0)return null;let d=c.has(t);return(0,Z.jsxs)(`div`,{className:`space-y-0`,children:[(0,Z.jsx)(`button`,{onClick:()=>u(t),className:X.sectionHeader.container,children:(0,Z.jsxs)(`div`,{className:X.sectionHeader.border,children:[(0,Z.jsx)(`div`,{className:X.sectionHeader.iconBox(!d),children:r(t)}),(0,Z.jsxs)(`h2`,{className:X.sectionHeader.title(!d),children:[t,` `,(0,Z.jsxs)(`span`,{className:`ml-3 text-[10px] text-slate-700 font-black tracking-widest`,children:[`(`,l.length,`)`]})]}),(0,Z.jsx)(`div`,{className:`flex-1`}),(0,Z.jsx)(O,{className:`w-5 h-5 text-slate-600 group-hover:text-indigo-500 transition-all duration-500 ${d?`-rotate-90 opacity-40`:`rotate-0 opacity-100`}`})]})}),(0,Z.jsx)(a,{initial:!1,children:!d&&(0,Z.jsx)(o.div,{initial:{height:0,opacity:0},animate:{height:`auto`,opacity:1},exit:{height:0,opacity:0},transition:{duration:.4,ease:[.04,.62,.23,.98]},className:`overflow-hidden`,children:(0,Z.jsx)(`div`,{className:X.grid,children:l.map(e=>(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>n(e.id),className:X.algoCard,children:[(0,Z.jsx)(`div`,{className:`absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500`}),(0,Z.jsxs)(`div`,{className:`space-y-3 relative z-10 flex-1`,children:[(0,Z.jsxs)(`div`,{className:`flex justify-between items-start`,children:[(0,Z.jsx)(`h3`,{className:`text-lg font-black text-white group-hover:text-indigo-400 transition-colors`,children:e.name}),(0,Z.jsx)(`span`,{className:`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${s(e.difficulty)}`,children:e.difficulty})]}),(0,Z.jsx)(`p`,{className:`text-slate-500 text-[11px] font-bold leading-relaxed line-clamp-2`,children:e.description}),e.complexity&&(0,Z.jsxs)(`div`,{className:`pt-2 flex flex-col gap-1.5`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center gap-1 px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-black shrink-0`,title:`Best Case`,children:[(0,Z.jsx)(`span`,{className:`text-slate-500`,children:Y.complexityLabels.best}),(0,Z.jsx)(`span`,{className:i(e.complexity.timeBest),children:e.complexity.timeBest})]}),(0,Z.jsxs)(`div`,{className:`flex items-center gap-1 px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-black shrink-0`,title:`Average Case`,children:[(0,Z.jsx)(`span`,{className:`text-slate-500`,children:Y.complexityLabels.avg}),(0,Z.jsx)(`span`,{className:i(e.complexity.timeAvg),children:e.complexity.timeAvg})]}),(0,Z.jsxs)(`div`,{className:`flex items-center gap-1 px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-black shrink-0`,title:`Worst Case`,children:[(0,Z.jsx)(`span`,{className:`text-slate-500`,children:Y.complexityLabels.worst}),(0,Z.jsx)(`span`,{className:i(e.complexity.timeWorst),children:e.complexity.timeWorst})]})]}),(0,Z.jsxs)(`div`,{className:`flex items-center gap-1.5 overflow-x-auto scrollbar-hide`,children:[e.complexity.timePre&&(0,Z.jsxs)(`div`,{className:`flex items-center gap-1 px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-black shrink-0`,title:`Preprocessing Time`,children:[(0,Z.jsx)(`span`,{className:`text-slate-500 uppercase tracking-wider`,children:Y.complexityLabels.prep}),(0,Z.jsx)(`span`,{className:`text-indigo-300`,children:e.complexity.timePre})]}),(0,Z.jsxs)(`div`,{className:`flex items-center gap-1 px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-black shrink-0`,title:`Space Complexity`,children:[(0,Z.jsx)(`span`,{className:`text-slate-500 uppercase tracking-wider`,children:Y.complexityLabels.space}),(0,Z.jsx)(`span`,{className:`text-indigo-300`,children:e.complexity.space})]})]})]})]})]},e.id))})})})]},t)}),(0,Z.jsx)(`div`,{className:`pt-16 border-t border-slate-900 text-center`,children:(0,Z.jsxs)(`p`,{className:`text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]`,children:[`© `,Y.footer.copyright]})})]})})}lt.propTypes={algorithms:J.default.arrayOf(J.default.shape({id:J.default.string.isRequired,name:J.default.string.isRequired,category:J.default.string.isRequired,difficulty:J.default.string,description:J.default.string,complexity:J.default.shape({timeBest:J.default.string,timeAvg:J.default.string,timeWorst:J.default.string,space:J.default.string})})).isRequired,categories:J.default.arrayOf(J.default.string).isRequired,onSelect:J.default.func.isRequired};function ut({selectedTool:e,setTool:t,disabled:n,onClear:r,rows:i,cols:a,onDimensionsChange:o,playbackSpeed:s,onSpeedChange:c}){let l=[{id:`start`,label:`Start`,icon:re,color:`text-sky-400`,bgColor:`bg-sky-400/10`,borderColor:`border-sky-400/30`},{id:`end`,label:`End`,icon:D,color:`text-emerald-400`,bgColor:`bg-emerald-400/10`,borderColor:`border-emerald-400/30`},{id:`wall`,label:`Wall`,icon:ae,color:`text-rose-400`,bgColor:`bg-rose-400/10`,borderColor:`border-rose-400/30`}],u=(e,t)=>{let n=parseInt(t);isNaN(n)||(e===`rows`?o(Math.max(2,Math.min(25,n)),a):o(i,Math.max(2,Math.min(30,n))))},d=e=>{c(100-(parseInt(e)-15))},f=100-(s-15);return(0,Z.jsxs)(`div`,{className:`flex flex-col xl:flex-row items-center gap-6`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center gap-6`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,Z.jsx)(`span`,{className:`text-[10px] font-black uppercase tracking-widest text-slate-500 mr-2`,children:`Grid Size:`}),(0,Z.jsxs)(`div`,{className:`flex gap-2 items-center bg-slate-900/50 p-1 rounded-xl border border-slate-800 shadow-inner`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center gap-2 px-2`,children:[(0,Z.jsx)(`span`,{className:`text-[9px] font-bold text-slate-600 uppercase`,children:`H`}),(0,Z.jsx)(`input`,{type:`number`,value:i,min:2,max:25,disabled:n,onChange:e=>u(`rows`,e.target.value),className:`w-10 bg-transparent text-xs font-mono font-bold text-indigo-400 focus:outline-none`})]}),(0,Z.jsx)(`div`,{className:`w-[1px] h-4 bg-slate-800`}),(0,Z.jsxs)(`div`,{className:`flex items-center gap-2 px-2`,children:[(0,Z.jsx)(`span`,{className:`text-[9px] font-bold text-slate-600 uppercase`,children:`W`}),(0,Z.jsx)(`input`,{type:`number`,value:a,min:2,max:30,disabled:n,onChange:e=>u(`cols`,e.target.value),className:`w-10 bg-transparent text-xs font-mono font-bold text-indigo-400 focus:outline-none`})]})]})]}),(0,Z.jsxs)(`div`,{className:`flex flex-col gap-2 items-center min-w-[140px] pt-1`,children:[(0,Z.jsx)(`span`,{className:`text-[10px] font-black uppercase tracking-widest text-slate-500`,children:`Speed`}),(0,Z.jsx)(`input`,{type:`range`,min:`15`,max:`100`,value:f,onChange:e=>d(e.target.value),style:{background:`linear-gradient(to right, #6366f1 ${(f-15)/85*100}%, #020617 ${(f-15)/85*100}%)`},className:`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-500`})]})]}),(0,Z.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,Z.jsx)(`span`,{className:`text-[10px] font-black uppercase tracking-widest text-slate-500 mr-2`,children:`Grid Tools:`}),(0,Z.jsxs)(`div`,{className:`flex bg-slate-900/50 p-1 rounded-xl border border-slate-800 shadow-inner`,children:[l.map(r=>{let i=r.icon,a=e===r.id;return(0,Z.jsxs)(`button`,{onClick:()=>!n&&t(r.id),disabled:n,className:`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300
                  ${a?`${r.bgColor} ${r.color} ${r.borderColor} border shadow-lg scale-105 z-10`:`text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border-transparent border`}
                  ${n?`opacity-50 cursor-not-allowed`:`cursor-pointer`}
                `,children:[(0,Z.jsx)(i,{className:`w-3.5 h-3.5 ${a?`animate-pulse`:``}`}),r.label]},r.id)}),(0,Z.jsx)(`div`,{className:`w-[1px] h-6 bg-slate-800 mx-1 self-center`}),(0,Z.jsxs)(`button`,{onClick:()=>!n&&r(),disabled:n,className:`
              flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300
              text-rose-500/70 hover:text-rose-400 hover:bg-rose-500/10 border-transparent border
              ${n?`opacity-20 cursor-not-allowed`:`cursor-pointer`}
            `,children:[(0,Z.jsx)(ie,{className:`w-3.5 h-3.5`}),`Clear Walls`]})]})]})]})}ut.propTypes={selectedTool:J.default.string.isRequired,setTool:J.default.func.isRequired,disabled:J.default.bool,onClear:J.default.func,rows:J.default.number,cols:J.default.number,onDimensionsChange:J.default.func,playbackSpeed:J.default.number,onSpeedChange:J.default.func};function dt({target:e,setTarget:t,pattern:n,setPattern:r,isPlaying:i,type:a,label:o,label2:s,placeholder1:c,placeholder2:l,gridTool:u,setGridTool:d,isEditingDisabled:f,onClearWalls:p,rows:m,cols:h,onDimensionsChange:g,playbackSpeed:_,onSpeedChange:v}){return(0,Z.jsxs)(`div`,{className:`h-full flex flex-col justify-center items-center bg-slate-800/30 py-4 px-8 rounded-2xl border border-slate-800/40 shadow-inner`,children:[e===`GRID`&&(0,Z.jsx)(ut,{selectedTool:u,setTool:d,disabled:f,onClear:p,rows:m,cols:h,onDimensionsChange:g,playbackSpeed:_,onSpeedChange:v}),a!==`pathfinding`&&!(a===`sorting`||a===`searching`)&&(0,Z.jsxs)(`div`,{className:`w-full flex flex-wrap gap-6 items-end justify-center`,children:[(0,Z.jsxs)(`div`,{className:`flex-1 min-w-[200px]`,children:[(0,Z.jsx)(`label`,{htmlFor:`target-input`,className:X.labelBase,children:o||`Target Text`}),(0,Z.jsx)(`input`,{id:`target-input`,type:`text`,value:e,onChange:e=>t(e.target.value.toUpperCase()),className:X.inputBase,disabled:i,placeholder:c})]}),(0,Z.jsxs)(`div`,{className:`w-full md:w-64`,children:[(0,Z.jsx)(`label`,{htmlFor:`pattern-input`,className:X.labelBase,children:s||`Pattern`}),(0,Z.jsx)(`input`,{id:`pattern-input`,type:`text`,value:n,onChange:e=>r(e.target.value.toUpperCase()),className:X.inputBase,disabled:i,placeholder:l})]})]}),a===`searching`&&(0,Z.jsxs)(`div`,{className:`w-full max-w-4xl flex flex-col xl:flex-row gap-6 items-end justify-center`,children:[(0,Z.jsxs)(`div`,{className:`flex-1 min-w-[200px]`,children:[(0,Z.jsx)(`label`,{className:X.labelBase,children:o||`Array Input`}),(0,Z.jsx)(`input`,{type:`text`,value:e,onChange:e=>t(e.target.value),placeholder:c||`e.g. 10, 20, 30, 40, 50`,className:X.inputBase,disabled:i})]}),(0,Z.jsxs)(`div`,{className:`w-full md:w-32`,children:[(0,Z.jsx)(`label`,{className:X.labelBase,children:s||`Target`}),(0,Z.jsx)(`input`,{type:`text`,value:n,onChange:e=>r(e.target.value),placeholder:l||`Target`,className:`${X.inputBase} text-center px-4`,disabled:i})]}),(0,Z.jsxs)(`div`,{className:`flex flex-col gap-2 items-center min-w-[140px] pb-1`,children:[(0,Z.jsx)(`span`,{className:`text-[10px] font-black uppercase tracking-widest text-slate-500`,children:`Speed`}),(0,Z.jsx)(`input`,{type:`range`,min:`150`,max:`1000`,value:1e3-(_-150),onChange:e=>v(1e3-(parseInt(e.target.value)-150)),style:{background:`linear-gradient(to right, #6366f1 ${(1e3-(_-150)-150)/850*100}%, #020617 ${(1e3-(_-150)-150)/850*100}%)`},className:`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-500`})]})]}),a===`sorting`&&(0,Z.jsxs)(`div`,{className:`w-full max-w-2xl flex flex-col md:flex-row gap-6 items-end justify-center`,children:[(0,Z.jsxs)(`div`,{className:`flex-1`,children:[(0,Z.jsx)(`label`,{className:X.labelBase,children:o||`Array Input`}),(0,Z.jsx)(`input`,{type:`text`,value:e,onChange:e=>t(e.target.value),placeholder:c||`e.g. 5, 2, 8, 1, 9`,className:`${X.inputBase} text-center`,disabled:i})]}),(0,Z.jsxs)(`div`,{className:`flex flex-col gap-2 items-center min-w-[140px] pb-1`,children:[(0,Z.jsx)(`span`,{className:`text-[10px] font-black uppercase tracking-widest text-slate-500`,children:`Speed`}),(0,Z.jsx)(`input`,{type:`range`,min:`150`,max:`1000`,value:1e3-(_-150),onChange:e=>v(1e3-(parseInt(e.target.value)-150)),style:{background:`linear-gradient(to right, #6366f1 ${(1e3-(_-150)-150)/850*100}%, #020617 ${(1e3-(_-150)-150)/850*100}%)`},className:`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-500`})]})]})]})}dt.propTypes={target:J.default.string,setTarget:J.default.func,pattern:J.default.string,setPattern:J.default.func,isPlaying:J.default.bool,type:J.default.string,label:J.default.string,label2:J.default.string,placeholder1:J.default.string,placeholder2:J.default.string,gridTool:J.default.string,setGridTool:J.default.func,isEditingDisabled:J.default.bool,onClearWalls:J.default.func,rows:J.default.number,cols:J.default.number,onDimensionsChange:J.default.func};function ft({items:e=[]}){return!e||e.length===0?null:(0,Z.jsx)(`div`,{className:`h-full flex flex-col justify-center items-center py-4 px-8 bg-slate-800/20 rounded-2xl border border-slate-800/40 shadow-inner`,children:(0,Z.jsx)(`div`,{className:`flex flex-wrap gap-x-8 gap-y-4 justify-center`,children:e.filter(e=>!e.hidden).map(e=>(0,Z.jsxs)(`div`,{className:`flex items-center gap-3 font-bold text-slate-400 text-[10px] uppercase tracking-wider`,children:[(0,Z.jsx)(`div`,{className:`w-3 h-3 rounded-full border shadow-sm ${e.color}`}),e.label]},e.label))})})}ft.propTypes={items:J.default.arrayOf(J.default.shape({label:J.default.string.isRequired,color:J.default.string.isRequired}))};function pt({array:e=[],activeIndices:t=[],sortedIndices:n=[],pivotIndex:r=-1,swapIndices:i=[]}){let a=(0,A.useMemo)(()=>Array.isArray(e)?e:[],[e]),s=(0,A.useMemo)(()=>{let e={};return a.map(t=>{let n=typeof t==`object`&&!!t,r=n?t.value:t,i=n?t.id:null;return i===null?(e[r]=(e[r]||0)+1,{id:`${r}-${e[r]}`,value:r}):{id:i,value:r}})},[a]),c=(0,A.useMemo)(()=>Array.from({length:a.length},(e,t)=>`slot-${t}`),[a.length]);if(!Array.isArray(e))return(0,Z.jsx)(`div`,{className:X.vizContainer,children:`Preparing array data...`});if(!Array.isArray(e)||e.length===0)return(0,Z.jsx)(`div`,{className:X.vizContainer,children:`No array data available to visualize.`});let l=s.map(e=>e.value),u=Math.max(...l,1),d=Math.min(...l,0),f=u-d||1,p=Array.isArray(t)?t:Array.from(t||[]),m=Array.isArray(n)?n:Array.from(n||[]),h=Array.isArray(i)?i:Array.from(i||[]);return(0,Z.jsxs)(`div`,{className:`${X.vizContainer} flex-col pt-8`,children:[(0,Z.jsx)(`div`,{className:`absolute top-8 bottom-8 left-0 right-0 flex flex-col justify-between px-4 pointer-events-none opacity-10`,children:[`grid-1`,`grid-2`,`grid-3`,`grid-4`,`grid-5`].map(e=>(0,Z.jsx)(`div`,{className:`w-full h-px bg-white`},e))}),(0,Z.jsx)(`div`,{className:`flex-1 w-full flex items-end gap-1 md:gap-2 px-8 relative z-10 border-b border-slate-700/50 pb-0`,children:s.map((e,t)=>{let{id:n,value:i}=e,a=10+(i-d)/f*75,s=p.includes(t),c=m.includes(t),l=r===t,u=h.includes(t),g=`bg-slate-700 border-slate-600`;return s&&(g=`bg-indigo-500 border-indigo-400 ring-4 ring-indigo-500/30 z-10 shadow-xl`),l&&(g=`bg-amber-400 border-amber-300 ring-4 ring-amber-400/40 z-20 shadow-2xl`),u&&(g=`bg-rose-500 border-rose-400 animate-pulse`),c&&(g=`bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]`),(0,Z.jsx)(o.div,{layout:!0,transition:{type:`spring`,stiffness:400,damping:30,mass:1},className:`flex-1 flex flex-col items-center justify-end h-full`,children:(0,Z.jsx)(`div`,{className:`w-full min-w-[4px] max-w-[60px] rounded-t-lg relative group transition-all duration-500 ${g} border-t border-x`,style:{height:`${a}%`},children:(0,Z.jsx)(`span`,{className:`absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-white opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded-md border border-slate-700 whitespace-nowrap z-30`,children:i})})},n)})}),(0,Z.jsx)(`div`,{className:`h-10 w-full flex gap-1 md:gap-2 px-8 items-center pointer-events-none bg-slate-900/30`,children:c.map((e,t)=>(0,Z.jsx)(`div`,{className:`flex-1 flex justify-center items-center`,children:(0,Z.jsx)(`span`,{className:`text-[11px] font-black font-mono transition-colors ${p.includes(t)||r===t?`text-white`:`text-slate-500`}`,children:t})},e))})]})}pt.propTypes={array:J.default.arrayOf(J.default.oneOfType([J.default.number,J.default.object])),activeIndices:J.default.oneOfType([J.default.arrayOf(J.default.number),J.default.instanceOf(Set)]),sortedIndices:J.default.oneOfType([J.default.arrayOf(J.default.number),J.default.instanceOf(Set)]),pivotIndex:J.default.number,swapIndices:J.default.oneOfType([J.default.arrayOf(J.default.number),J.default.instanceOf(Set)])};function mt({target:e=``,pattern:t=``,currentIndex:n,phase:r,compIdx:i,mismatchFound:a,isFinished:o,accessedIndices:s,activeIndices:c,lookAheadIndex:l,comparesRightToLeft:u,showShiftArrow:d}){let f=s instanceof Set?s:new Set(s||[]),p=c instanceof Set?c:new Set(c||[]);return(0,Z.jsx)(`div`,{className:`overflow-x-auto pb-8 scrollbar-hide flex justify-center`,children:(0,Z.jsxs)(`div`,{className:`inline-flex flex-col px-8 items-start`,children:[(0,Z.jsx)(`div`,{className:`flex gap-1 mb-1`,children:e.split(``).map((e,t)=>({i:t,id:`idx-slot-${t}`})).map(e=>(0,Z.jsx)(`div`,{className:`w-10 flex-shrink-0 text-center text-[9px] font-black text-slate-700 font-mono`,children:e.i},e.id))}),(0,Z.jsx)(`div`,{className:`flex gap-1`,children:e.split(``).map((e,t)=>({char:e,i:t,id:`tcell-slot-${t}`})).map(e=>{let t=l!==void 0&&l!==-1&&e.i===l,a=p.has(e.i),o=r===1&&e.i===n+i,s=f.has(e.i),c=e.i<n,u=`${X.cellBase} bg-slate-800 border-slate-700 text-slate-100`;return a?u=`${X.cellBase} bg-indigo-500/40 border-indigo-500 text-indigo-100 ring-4 ring-indigo-500/20 scale-105 z-10`:t?u=`${X.cellBase} bg-sky-400 border-sky-300 text-white shadow-xl shadow-sky-400/40 scale-110 z-10 animate-pulse`:o?u=`${X.cellBase} bg-blue-900/40 border-blue-500 text-blue-200 ring-4 ring-blue-500/20 scale-105`:(s||c)&&(u=`${X.cellBase} bg-slate-800/40 border-slate-800 text-slate-600`),(0,Z.jsx)(`div`,{className:u,children:e.char},e.id)})}),(0,Z.jsxs)(`div`,{className:`mt-4 flex gap-1 relative h-10`,children:[(0,Z.jsx)(`div`,{className:`flex-shrink-0 transition-all duration-500 ease-in-out -mr-1`,style:{width:`${n*2.75}rem`}}),t.split(``).map((e,t)=>({char:e,i:t,id:`pcell-slot-${t}`})).map(e=>{let n=r===1&&e.i===i,s=r===1&&!u&&e.i<i||r===1&&u&&e.i>i||o&&a===!1&&e.i<t.length,c=r>=2&&e.i===i&&a,l=`${X.cellBase} bg-slate-700 border-slate-600 text-slate-100`;return n&&(l=`${X.cellBase} bg-amber-400 border-amber-300 text-amber-950 ring-4 ring-amber-400/30 scale-110 z-20`),c&&(l=`${X.cellBase} bg-rose-500 border-rose-400 text-white`),s&&(l=`${X.cellBase} bg-emerald-500 border-emerald-400 text-white`),(0,Z.jsx)(`div`,{className:l,children:e.char},e.id)}),d&&!o&&(0,Z.jsx)(`div`,{className:`flex items-center px-2`,children:(0,Z.jsx)(oe,{className:`w-6 h-6 text-sky-400 animate-bounce-x`})})]})]})})}mt.propTypes={target:J.default.string.isRequired,pattern:J.default.string.isRequired,currentIndex:J.default.number.isRequired,phase:J.default.number.isRequired,compIdx:J.default.number.isRequired,mismatchFound:J.default.bool.isRequired,isFinished:J.default.bool.isRequired,accessedIndices:J.default.oneOfType([J.default.instanceOf(Set),J.default.arrayOf(J.default.number)]),activeIndices:J.default.oneOfType([J.default.instanceOf(Set),J.default.arrayOf(J.default.number)]),lookAheadIndex:J.default.number,comparesRightToLeft:J.default.bool,showShiftArrow:J.default.bool};function ht({concat:e,z:t,i:n,l:r,r:i,activeIndices:s,referenceIndex:c}){let l=s instanceof Set?s:new Set(s||[]),u=c??-1,d=e||``,f=d.indexOf(`$`),p=d.split(``).map((e,t)=>({char:e,pos:t,id:`slot-${t}`}));return(0,Z.jsx)(`div`,{className:`space-y-8 overflow-x-auto pb-8 scrollbar-hide`,children:(0,Z.jsxs)(`div`,{className:`inline-flex flex-col min-w-full px-4`,children:[(0,Z.jsx)(`div`,{className:`flex gap-1 mb-1`,children:p.map(e=>(0,Z.jsx)(`div`,{className:`w-10 flex-shrink-0 text-center text-[9px] font-black text-slate-700 font-mono`,children:e.pos},`idx-row-${e.id}`))}),(0,Z.jsx)(`div`,{className:`flex gap-1`,children:p.map(e=>{let t=e.pos>=r&&e.pos<=i&&r!==0,a=l.has(e.pos)||e.pos===n,o=e.pos<f,s=e.char===`$`,c=`${X.cellBase} `;return s?c+=`bg-slate-900 border-slate-800 text-rose-500 shadow-none`:e.pos===u?c+=`bg-amber-400 border-amber-500 text-amber-950 ring-4 ring-amber-400/30 scale-110 z-20`:a?c+=`bg-indigo-500 border-indigo-400 text-white scale-110 z-20 ring-4 ring-indigo-500/20`:t?c+=`bg-indigo-500/20 border-indigo-500/50 text-indigo-100`:o?c+=`bg-slate-800/80 border-slate-700 text-emerald-400`:c+=`bg-slate-800 border-slate-700 text-slate-100`,(0,Z.jsx)(`div`,{className:c,children:e.char},`char-row-${e.id}`)})}),(0,Z.jsx)(`div`,{className:`flex gap-1 mt-4`,children:(0,Z.jsx)(a,{mode:`popLayout`,children:p.map(e=>{let r=t[e.pos],i=r!=null,a=e.pos===n,s=e.pos<=f,c=i&&r===f&&!s,l=i&&r>0&&r!==f&&!s,u=`${X.cellValueBase} `;a?u+=`bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/20`:c?u+=`bg-emerald-500/10 border-emerald-500/50`:l?u+=`bg-rose-500/10 border-rose-500/50`:u+=`bg-slate-900 border-slate-800/50`;let d=i&&!s?r:`-`,p=`text-slate-400`;return c?p=`text-emerald-400`:l&&(p=`text-rose-400`),(0,Z.jsxs)(o.div,{layout:!0,initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:u,children:[(0,Z.jsxs)(`span`,{className:`text-[8px] font-black text-slate-600 mb-1`,children:[`Z[`,e.pos,`]`]}),(0,Z.jsx)(`span`,{className:`text-sm font-bold ${p}`,children:d})]},`z-val-row-${e.id}`)})})}),(0,Z.jsx)(`div`,{className:`mt-8 flex gap-1 relative h-6 min-h-[1.5rem]`,children:(0,Z.jsx)(a,{children:r!==0&&i>=r&&(0,Z.jsxs)(o.div,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},exit:{opacity:0,y:5},className:`absolute h-1 bg-indigo-500/50 rounded-full bottom-0 transition-all duration-500`,style:{left:`${r*2.75}rem`,width:`${(i-r+1)*2.75-.25}rem`},children:[(0,Z.jsx)(`div`,{className:`absolute inset-0 bg-indigo-500 blur-[2px] opacity-50`}),(0,Z.jsxs)(`span`,{className:`absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black text-indigo-400 uppercase tracking-tighter bg-slate-950 px-2 py-0.5 border border-indigo-500/30 rounded-md shadow-xl z-30`,children:[`Z-Box [`,r,`, `,i,`]`]})]})})})]})})}ht.propTypes={concat:J.default.string.isRequired,z:J.default.arrayOf(J.default.number).isRequired,i:J.default.number.isRequired,l:J.default.number.isRequired,r:J.default.number.isRequired,activeIndices:J.default.oneOfType([J.default.instanceOf(Set),J.default.arrayOf(J.default.number)]),referenceIndex:J.default.number};var Q=(0,A.memo)(({r:e,c:t,isVisited:n,isPath:r,isActive:i,isStart:a,isEnd:s,isWall:c,isQueued:l,cost:u,colors:d={},onMouseDown:f,onMouseEnter:p})=>{let m=d.unvisited||``;c?m=d.wall||``:a?m=d.start||``:s?m=d.end||``:i?m=d.active||``:r?m=d.path||``:n?m=d.visited||``:l&&(m=d.checked||d.queue||``),(a||s||r)&&(m+=` z-10`),i&&(m+=` z-20 scale-110 ring-2 ring-white/20`),m.trim()===``&&(m=`bg-slate-800/20 border-slate-800/50`);let h=i?1.25:r||n||l?1.05:1,g=u===void 0?``:`brightness(${1-u/20})`;return(0,Z.jsxs)(o.div,{className:`aspect-square w-full rounded-sm border flex items-center justify-center text-[8px] font-bold select-none ${m} relative`,onMouseDown:()=>f(e,t),onMouseEnter:()=>p(e,t),initial:!1,style:{filter:g},animate:{scale:h,borderRadius:a||s?`6px`:`3px`,zIndex:i?50:r?40:1},transition:{type:`spring`,stiffness:400,damping:25},whileHover:{scale:1.1,filter:`brightness(1.4)`,zIndex:100},children:[(i||r)&&(0,Z.jsx)(o.div,{className:`absolute inset-0 blur-md rounded-full ${i?`bg-white/40`:`bg-violet-400/20`}`,initial:{opacity:0},animate:{opacity:1},transition:{duration:.3}}),u!==void 0&&!a&&!s&&!c&&(0,Z.jsx)(`span`,{className:`text-white/40 relative z-10`,children:u})]})});Q.displayName=`GridNode`,Q.propTypes={r:J.default.number.isRequired,c:J.default.number.isRequired,isVisited:J.default.bool,isPath:J.default.bool,isActive:J.default.bool,isStart:J.default.bool,isEnd:J.default.bool,isWall:J.default.bool,isQueued:J.default.bool,cost:J.default.number,colors:J.default.object,onMouseDown:J.default.func,onMouseEnter:J.default.func};function gt({state:e,updateState:t,gridTool:n,isEditingDisabled:r}){let[i,a]=(0,A.useState)(!1),[o,s]=(0,A.useState)(null),c=(0,A.useMemo)(()=>(e?.legendItems||[]).reduce((e,t)=>(e[t.label.toLowerCase()]=t.color,e),{}),[e?.legendItems]);if(e?.rows===void 0)return(0,Z.jsx)(`div`,{className:X.vizContainer,children:`Initializing pathfinding grid...`});let{rows:l,cols:u,startNode:d,endNode:f,visited:p,path:m,activeNode:h,walls:g,costs:_}=e,v=(e,t)=>(m||[]).some(n=>n.r===e&&n.c===t),y=(e,t)=>h?.r===e&&h?.c===t,b=(e,t)=>d?.r===e&&d?.c===t,x=(e,t)=>f?.r===e&&f?.c===t,S=(e,t)=>(g||[]).some(n=>n.r===e&&n.c===t),C=(t,n)=>(e.queue||e.openSet||[]).some(e=>e.r===t&&e.c===n),w=(e,n,r)=>{if(b(e,n)||x(e,n))return;let i=(g||[]).some(t=>t.r===e&&t.c===n),a=r||(i?`removing`:`adding`);return a===`adding`&&!i?t(t=>({...t,walls:[...t.walls||[],{r:e,c:n}]})):a===`removing`&&i&&t(t=>({...t,walls:(t.walls||[]).filter(t=>!(t.r===e&&t.c===n))})),a},T=(e,i,a=null)=>{if(!r){if(n===`start`){if(x(e,i))return;t({startNode:{r:e,c:i},walls:(g||[]).filter(t=>t.r!==e||t.c!==i)})}else if(n===`end`){if(b(e,i))return;t({endNode:{r:e,c:i},walls:(g||[]).filter(t=>t.r!==e||t.c!==i)})}else if(n===`wall`)return w(e,i,a)}},E=(e,t)=>{a(!0);let r=T(e,t);n===`wall`&&s(r)},ee=(e,t)=>{i&&T(e,t,o)},D=()=>{a(!1),s(null)};return(0,Z.jsx)(`div`,{className:`${X.vizContainer} h-[450px] p-8 shadow-inner select-none bg-slate-900/20 rounded-3xl border-slate-800/40`,children:(0,Z.jsx)(`div`,{role:`grid`,tabIndex:0,"aria-label":`Pathfinding Grid`,className:`grid gap-1 outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-lg`,onMouseLeave:D,onMouseUp:D,style:{gridTemplateColumns:`repeat(${u}, 1fr)`,aspectRatio:`${u} / ${l}`,width:`100%`,maxWidth:`calc((450px - 64px) * ${u} / ${l})`,maxHeight:`100%`,margin:`0 auto`},children:Array.from({length:l}).map((e,t)=>Array.from({length:u}).map((e,n)=>(0,Z.jsx)(Q,{r:t,c:n,isVisited:p?.[t]?.[n],isPath:v(t,n),isActive:y(t,n),isStart:b(t,n),isEnd:x(t,n),isWall:S(t,n),isQueued:C(t,n),cost:_?.[t]?.[n],colors:c,onMouseDown:E,onMouseEnter:ee},`${t}-${n}`)))})})}gt.propTypes={state:J.default.shape({rows:J.default.number.isRequired,cols:J.default.number.isRequired,startNode:J.default.shape({r:J.default.number,c:J.default.number}),endNode:J.default.shape({r:J.default.number,c:J.default.number}),visited:J.default.arrayOf(J.default.arrayOf(J.default.bool)),path:J.default.arrayOf(J.default.shape({r:J.default.number,c:J.default.number})),activeNode:J.default.shape({r:J.default.number,c:J.default.number}),walls:J.default.arrayOf(J.default.shape({r:J.default.number,c:J.default.number})),queue:J.default.array,openSet:J.default.array,costs:J.default.arrayOf(J.default.arrayOf(J.default.number)),legendItems:J.default.arrayOf(J.default.shape({label:J.default.string,color:J.default.string}))}),updateState:J.default.func.isRequired,gridTool:J.default.string,isEditingDisabled:J.default.bool};function _t({log:e,algorithm:t}){let n={info:{text:`text-indigo-400`,bg:`bg-indigo-500/10`,border:`border-indigo-500/30`,icon:(0,Z.jsx)(b,{className:`w-4 h-4`})},match:{text:`text-emerald-400`,bg:`bg-emerald-500/10`,border:`border-emerald-500/30`,icon:(0,Z.jsx)(u,{className:`w-4 h-4`})},mismatch:{text:`text-rose-400`,bg:`bg-rose-500/10`,border:`border-rose-500/30`,icon:(0,Z.jsx)(g,{className:`w-4 h-4`})},success:{text:`text-emerald-400`,bg:`bg-emerald-500/20`,border:`border-emerald-500/50`,icon:(0,Z.jsx)(u,{className:`w-4 h-4`})},shift:{text:`text-amber-400`,bg:`bg-amber-500/10`,border:`border-amber-500/30`,icon:(0,Z.jsx)(l,{className:`w-4 h-4`})}},r=n[e?.type]||n.info;return(0,Z.jsxs)(`div`,{className:`p-6 rounded-2xl border transition-all duration-500 ${r.bg} ${r.border} shadow-2xl min-h-[240px] h-full flex flex-col`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center gap-2 mb-4 ${r.text}`,children:[r.icon,(0,Z.jsx)(`span`,{className:`text-xs font-black uppercase tracking-[0.2em]`,children:e?.title})]}),(0,Z.jsx)(`div`,{className:`font-mono text-sm leading-relaxed whitespace-pre-line text-slate-100 font-medium flex-1`,children:(()=>{if(!e)return``;if(!e.messageKey)return e.content||``;let n=t?.stepMessages?.[e.messageKey];return n?n.replace(/{(\w+)}/g,(t,n)=>{let r=e.params?.[n];return r===void 0?`{${n}}`:r}):e.content||``})()})]})}_t.propTypes={log:J.default.shape({type:J.default.string,title:J.default.string,content:J.default.string,messageKey:J.default.string,params:J.default.object}),algorithm:J.default.object};var $={codePanel:{title:`Example Code`,copySuccess:`Copied!`,languages:{javascript:`JS`,python:`PY`,csharp:`C#`}},labels:{startSort:`Start Sort`,startSearch:`Start Search`,startOperation:`Start Operation`,next:`Next`,restart:`Restart`,arrayElements:`Array Elements`,targetValue:`Target: {value}`,sortingViz:`Sorting Visualization`,searchingViz:`Searching Visualization`,dsViz:`Data Structure Visualization`,arrayInput:`Array Input`,targetText:`Target Text`,target:`Target`,pattern:`Pattern`,arrayPlaceholder:`e.g. 10, 20, 30, 40, 50`}};k.registerLanguage(`javascript`,he),k.registerLanguage(`python`,_e),k.registerLanguage(`csharp`,ge);function vt({codeSnippets:e,lineHighlights:t,activeStep:n}){let[r,i]=(0,A.useState)(`javascript`),[a,o]=(0,A.useState)(!1),s=()=>{navigator.clipboard.writeText(e[r]),o(!0),setTimeout(()=>o(!1),2e3)};if(!e)return null;let c=t?.[n]?.[r];return(0,Z.jsxs)(`div`,{className:X.subPanel,children:[(0,Z.jsxs)(`div`,{className:X.subPanelHeader,children:[(0,Z.jsxs)(`h3`,{className:X.smallHeading,children:[(0,Z.jsx)(se,{className:`w-4 h-4`}),` `,$.codePanel.title]}),(0,Z.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,Z.jsx)(`div`,{className:X.controlGroup,children:Object.keys($.codePanel.languages).map(e=>(0,Z.jsx)(`button`,{onClick:()=>i(e),className:`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${r===e?`bg-indigo-500 text-white shadow-lg shadow-indigo-500/20`:`text-slate-500 hover:text-slate-300 hover:bg-slate-800`}`,children:$.codePanel.languages[e]},e))}),(0,Z.jsx)(`button`,{onClick:s,className:`p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors`,children:a?(0,Z.jsx)(m,{className:`w-4 h-4 text-emerald-500`}):(0,Z.jsx)(fe,{className:`w-4 h-4`})})]})]}),(0,Z.jsx)(`div`,{className:`relative group flex-1`,children:(0,Z.jsx)(k,{language:r,style:ve,customStyle:{margin:0,padding:`1.25rem`,background:`transparent`,fontSize:`0.875rem`,lineHeight:`1.6`},showLineNumbers:!0,wrapLines:!0,lineProps:e=>{let t=Array.isArray(c)?c.includes(e):e===c;return{style:{display:`block`,backgroundColor:t?`rgba(99, 102, 241, 0.15)`:`transparent`,borderLeft:t?`3px solid #6366f1`:`3px solid transparent`,paddingLeft:`0.75rem`,marginLeft:`-1.25rem`,marginRight:`-1.25rem`,transition:`all 0.3s ease`}}},children:e[r]})})]})}vt.propTypes={codeSnippets:J.default.objectOf(J.default.string).isRequired,lineHighlights:J.default.object,activeStep:J.default.string};function yt({name:e,phase:t,isFinished:n,phaseNames:r,onBack:i,reset:a,prevStep:o,nextStep:c,togglePlay:l,canPrev:u,canNext:d,isPlaying:p,buttonText:m,state:h}){let g=h?.type===`pathfinding`||!!h?.gridConfig||!!h?.rows,_=h?.path?.length||0,v=(h?.visited||[]).flat().filter(Boolean).length+(h?.queue||h?.openSet||[]).length;return(0,Z.jsxs)(`div`,{className:`px-6 py-3 border-b border-slate-800 bg-slate-900/80 flex flex-wrap justify-between items-center gap-4`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center gap-4`,children:[i&&(0,Z.jsx)(`button`,{onClick:i,className:`p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors group`,title:`Back to Dashboard`,children:(0,Z.jsx)(f,{className:`w-5 h-5 group-hover:-translate-x-1 transition-transform`})}),(0,Z.jsx)(`div`,{className:`h-8 w-px bg-slate-800 mx-1`}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`h1`,{className:`text-lg font-black text-white m-0 tracking-tight leading-none mb-1`,children:e}),(0,Z.jsx)(`div`,{className:`flex items-center gap-4`,children:(0,Z.jsx)(`span`,{className:`text-[9px] font-bold uppercase tracking-widest ${n?`text-emerald-400`:`text-indigo-400`}`,children:n?`Completed`:r?.[t]||`Running`})})]})]}),g&&(0,Z.jsxs)(`div`,{className:`hidden lg:flex items-center gap-6 px-8 py-1 bg-slate-950/50 rounded-full border border-slate-800/50`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,Z.jsx)(`div`,{className:`text-[10px] font-black text-slate-500 uppercase tracking-widest`,children:`Path Length:`}),(0,Z.jsx)(`div`,{className:`text-sm font-mono font-black text-emerald-400`,children:_})]}),(0,Z.jsx)(`div`,{className:`w-px h-4 bg-slate-800`}),(0,Z.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,Z.jsx)(`div`,{className:`text-[10px] font-black text-slate-500 uppercase tracking-widest`,children:`Checked Nodes:`}),(0,Z.jsx)(`div`,{className:`text-sm font-mono font-black text-indigo-400`,children:v})]})]}),(0,Z.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,Z.jsxs)(`button`,{onClick:a,className:`${X.buttonBase} bg-rose-500/20 border border-rose-500/50 text-rose-400 hover:bg-rose-500/30`,title:`Hard Reset`,children:[(0,Z.jsx)(ue,{className:`w-3.5 h-3.5`}),`Reset`]}),(0,Z.jsx)(`div`,{className:`w-px h-6 bg-slate-800 mx-1`}),(0,Z.jsxs)(`button`,{onClick:l,className:`${X.buttonBase} ${p?`bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30 shadow-lg shadow-cyan-500/10`:`bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700`}`,children:[p?(0,Z.jsx)(T,{className:`w-3.5 h-3.5 fill-current`}):(0,Z.jsx)(w,{className:`w-3.5 h-3.5 fill-current`}),p?`Pause`:`Auto Play`]}),(0,Z.jsxs)(`button`,{onClick:o,disabled:!u,className:`${X.buttonBase} bg-slate-800/40 border border-slate-700/50 text-amber-400 hover:bg-slate-700/60 shadow-[inset_0_0_10px_rgba(251,191,36,0.05)]`,children:[(0,Z.jsx)(s,{className:`w-3.5 h-3.5`}),` Prev`]}),(0,Z.jsxs)(`button`,{onClick:c,disabled:!d&&!n,className:`${X.buttonBase} border px-6 ${n?`bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30 shadow-[inset_0_0_10px_rgba(168,85,247,0.05)]`:`bg-slate-800/40 text-sky-400 border border-slate-700/50 hover:bg-slate-700/60 shadow-[inset_0_0_10px_rgba(56,189,248,0.05)]`}`,children:[n?`Restart`:m||`Next`,n?(0,Z.jsx)(ue,{className:`w-3.5 h-3.5`}):(0,Z.jsx)(te,{className:`w-3.5 h-3.5`})]})]})]})}yt.propTypes={name:J.default.string.isRequired,phase:J.default.number,isFinished:J.default.bool,phaseNames:J.default.arrayOf(J.default.string),onBack:J.default.func,reset:J.default.func.isRequired,prevStep:J.default.func.isRequired,nextStep:J.default.func.isRequired,togglePlay:J.default.func.isRequired,canPrev:J.default.bool.isRequired,canNext:J.default.bool.isRequired,isPlaying:J.default.bool.isRequired,buttonText:J.default.string,state:J.default.object};function bt({shiftTable:e,lookAheadChar:t,patternLength:n,pattern:r,title:i=`Shift Table`,logic:a,defaultText:o}){return(0,Z.jsxs)(`div`,{className:`bg-slate-800/20 border border-slate-800/40 rounded-2xl p-6`,children:[(0,Z.jsxs)(`div`,{className:`flex justify-between items-center mb-6`,children:[(0,Z.jsxs)(`div`,{className:`text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2`,children:[(0,Z.jsx)(x,{className:`w-3.5 h-3.5`}),` `,i]}),r&&(0,Z.jsxs)(`div`,{className:`flex gap-1 items-center`,children:[(0,Z.jsx)(`span`,{className:`text-[9px] font-black text-slate-500 uppercase mr-2`,children:`Pattern:`}),r.split(``).map((e,t)=>(0,Z.jsx)(`div`,{className:`w-5 h-5 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-[10px] font-mono font-bold text-slate-300`,children:e},t))]})]}),(0,Z.jsxs)(`div`,{className:`flex flex-col md:flex-row gap-6 items-stretch`,children:[(0,Z.jsxs)(`div`,{className:`flex flex-wrap gap-3 flex-1`,children:[Object.entries(e).map(([e,n])=>(0,Z.jsxs)(`div`,{className:`w-11 h-14 bg-slate-800 border rounded-xl flex flex-col items-center justify-center transition-all ${t===e?`border-indigo-400 ring-4 ring-indigo-400/20 scale-110 z-10 shadow-lg bg-slate-700`:`border-slate-700 opacity-60`}`,children:[(0,Z.jsx)(`span`,{className:`font-black text-white text-sm`,children:e}),(0,Z.jsx)(`span`,{className:`text-indigo-400 font-mono font-black text-[11px]`,children:n})]},e)),(0,Z.jsxs)(`div`,{className:`w-11 h-14 bg-slate-800 border rounded-xl flex flex-col items-center justify-center transition-all ${t&&!e[t]?`border-indigo-400 ring-4 ring-indigo-400/20 scale-110 z-10 shadow-lg bg-slate-700`:`border-slate-700 opacity-30`}`,children:[(0,Z.jsx)(`span`,{className:`font-black text-slate-500 text-[11px]`,children:`?`}),(0,Z.jsx)(`span`,{className:`text-slate-500 font-mono font-black text-[11px]`,children:n+1})]})]}),(0,Z.jsxs)(`div`,{className:`md:w-40 flex-shrink-0 flex flex-col justify-center pl-6 border-l border-slate-800/60 hidden md:flex`,children:[(0,Z.jsx)(`div`,{className:`text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 opacity-50`,children:`Shift Logic`}),(0,Z.jsxs)(`p`,{className:`text-[9px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider`,children:[a||`Shift = m - last_index`,(0,Z.jsx)(`br`,{}),(0,Z.jsxs)(`span`,{className:`text-slate-600 mt-1 block italic text-[8px]`,children:[`Default: `,o||`m + 1`]})]})]})]})]})}bt.propTypes={shiftTable:J.default.object.isRequired,lookAheadChar:J.default.string,patternLength:J.default.number.isRequired,pattern:J.default.string,title:J.default.string,logic:J.default.string,defaultText:J.default.string};function xt({algorithm:e,state:t,preprocessing:n,target:r,pattern:i,isArrayBased:a}){let o=e.sidebarConfig;return(0,Z.jsxs)(`div`,{className:`lg:col-span-1 space-y-6`,children:[o?.type===`shiftTable`&&n?.[o.dataKey]&&(0,Z.jsx)(bt,{shiftTable:n[o.dataKey],lookAheadChar:r[t.currentIndex+i.length-+(o.dataKey===`badCharTable`)],patternLength:i.length,pattern:i,title:o.title,logic:o.logic,defaultText:o.defaultText}),o?.type===`failureFunction`&&n?.[o.dataKey]&&(0,Z.jsxs)(`div`,{className:X.sidebarSection,children:[(0,Z.jsxs)(`div`,{className:`flex justify-between items-center mb-6`,children:[(0,Z.jsx)(`div`,{className:`text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2`,children:o.title}),i&&(0,Z.jsxs)(`div`,{className:`flex gap-1 items-center`,children:[(0,Z.jsx)(`span`,{className:`text-[9px] font-black text-slate-500 uppercase mr-2`,children:`Pattern:`}),i.split(``).map((e,t)=>(0,Z.jsx)(`div`,{className:`w-5 h-5 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-[10px] font-mono font-bold text-slate-300`,children:e},`char-box-${t}-${e}`))]})]}),(0,Z.jsxs)(`div`,{className:`flex flex-col md:flex-row gap-6 items-stretch`,children:[(0,Z.jsx)(`div`,{className:`flex-1 flex gap-2 flex-wrap`,children:n[o.dataKey].map((e,t)=>({val:e,i:t,id:`pi-${t}`})).map(e=>(0,Z.jsxs)(`div`,{className:`w-10 h-14 bg-slate-800 border border-slate-700 rounded-xl flex flex-col items-center justify-center transition-all hover:bg-slate-700/50`,children:[(0,Z.jsxs)(`span`,{className:`text-[8px] font-black text-slate-500 mb-1`,children:[`p[`,e.i,`]`]}),(0,Z.jsx)(`span`,{className:`text-white font-mono font-bold`,children:i[e.i]}),(0,Z.jsx)(`span`,{className:`text-indigo-400 font-mono font-bold text-xs`,children:e.val})]},e.id))}),(0,Z.jsxs)(`div`,{className:`md:w-48 flex-shrink-0 flex flex-col justify-center pl-6 border-l border-slate-800/60 hidden md:flex`,children:[(0,Z.jsx)(`div`,{className:`text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 opacity-50`,children:`Shift Logic`}),(0,Z.jsxs)(`p`,{className:`text-[9px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider`,children:[o.logic.split(`
`).map((e,t)=>(0,Z.jsxs)(`span`,{children:[e,(0,Z.jsx)(`br`,{})]},`${o.title}-line-${t}`)),o.logicNote&&(0,Z.jsx)(`span`,{className:`text-slate-600 mt-1 block italic text-[8px]`,children:o.logicNote})]})]})]})]}),o?.type===`rollingHash`&&t.patternHash!==void 0&&(0,Z.jsxs)(`div`,{className:X.sidebarSection,children:[(0,Z.jsxs)(`div`,{className:`flex justify-between items-center mb-6`,children:[(0,Z.jsxs)(`div`,{className:`text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2`,children:[(0,Z.jsx)(de,{className:`w-3.5 h-3.5`}),` `,o.title]}),i&&(0,Z.jsxs)(`div`,{className:`flex gap-1 items-center`,children:[(0,Z.jsx)(`span`,{className:`text-[9px] font-black text-slate-500 uppercase mr-2`,children:`Pattern:`}),i.split(``).map((e,t)=>(0,Z.jsx)(`div`,{className:`w-5 h-5 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-[10px] font-mono font-bold text-slate-300`,children:e},`char-box-${t}-${e}`))]})]}),(0,Z.jsxs)(`div`,{className:`flex flex-col md:flex-row gap-6 items-stretch`,children:[(0,Z.jsxs)(`div`,{className:`flex-1 space-y-4`,children:[(0,Z.jsxs)(`div`,{className:`p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center`,children:[(0,Z.jsx)(`span`,{className:`text-[10px] font-black text-slate-500 uppercase`,children:`Pattern Hash`}),(0,Z.jsx)(`span`,{className:`text-emerald-400 font-mono font-bold`,children:t.patternHash})]}),(0,Z.jsxs)(`div`,{className:`p-3 bg-slate-900 rounded-xl border flex justify-between items-center transition-all ${t.targetHash===t.patternHash?`border-emerald-500 ring-2 ring-emerald-500/20`:`border-slate-800`}`,children:[(0,Z.jsx)(`span`,{className:`text-[10px] font-black text-slate-500 uppercase`,children:`Window Hash`}),(0,Z.jsx)(`span`,{className:`font-mono font-bold ${t.targetHash===t.patternHash?`text-emerald-400`:`text-rose-400`}`,children:t.targetHash})]})]}),(0,Z.jsxs)(`div`,{className:`md:w-48 flex-shrink-0 flex flex-col justify-center pl-6 border-l border-slate-800/60 hidden md:flex`,children:[(0,Z.jsx)(`div`,{className:`text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 opacity-50`,children:`Hash Logic`}),(0,Z.jsxs)(`p`,{className:`text-[9px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider`,children:[o.logic.split(`
`).map((e,t)=>(0,Z.jsxs)(`span`,{children:[e,(0,Z.jsx)(`br`,{})]},`${o.title}-hash-line-${t}`)),o.logicNote&&(0,Z.jsx)(`span`,{className:`text-slate-600 mt-1 block italic text-[8px]`,children:o.logicNote})]})]})]})]}),a&&(0,Z.jsxs)(`div`,{className:`space-y-6`,children:[o?.type===`countingArrays`&&(t.countArray||t.output)&&(0,Z.jsx)(`div`,{className:X.sidebarSection,children:(0,Z.jsxs)(`div`,{className:`flex flex-col md:flex-row gap-8`,children:[t.countArray&&(0,Z.jsxs)(`div`,{className:`flex-1 space-y-4`,children:[(0,Z.jsxs)(`div`,{className:`text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2`,children:[(0,Z.jsx)(x,{className:`w-3.5 h-3.5`}),` Count Array`]}),(0,Z.jsx)(`div`,{className:`flex flex-wrap gap-1.5`,children:t.countArray.map((e,t)=>({c:e,i:t,id:`count-${t}`})).map(e=>(0,Z.jsxs)(`div`,{className:`w-8 h-10 bg-slate-900 border ${t.phase===2&&t.i===e.i?`border-indigo-500 ring-2 ring-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]`:`border-slate-800`} rounded-xl flex flex-col items-center justify-center transition-all`,children:[(0,Z.jsx)(`span`,{className:`text-[7px] text-slate-600 font-bold uppercase`,children:e.i}),(0,Z.jsx)(`span`,{className:`text-[10px] text-white font-mono font-black`,children:e.c})]},e.id))})]}),t.output&&(0,Z.jsxs)(`div`,{className:`flex-1 space-y-4 border-t xl:border-t-0 xl:border-l border-slate-800/60 pt-4 xl:pt-0 xl:pl-8`,children:[(0,Z.jsxs)(`div`,{className:`text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2`,children:[(0,Z.jsx)(x,{className:`w-3.5 h-3.5`}),` Output Array`]}),(0,Z.jsx)(`div`,{className:`flex flex-wrap gap-1.5`,children:t.output.map((e,t)=>({val:e,i:t,id:`output-${t}`})).map(e=>(0,Z.jsxs)(`div`,{className:`w-8 h-10 bg-slate-900 border ${t.swapIndices?.includes(e.i)?`border-emerald-500 ring-2 ring-emerald-500/20`:`border-slate-800`} rounded-xl flex flex-col items-center justify-center transition-all`,children:[(0,Z.jsx)(`span`,{className:`text-[7px] text-slate-600 font-bold uppercase`,children:e.i}),(0,Z.jsx)(`span`,{className:`text-[10px] text-white font-mono font-black`,children:e.val??`-`})]},e.id))})]})]})}),o?.type===`buckets`&&t.buckets&&(0,Z.jsxs)(`div`,{className:X.sidebarSection,children:[(0,Z.jsxs)(`div`,{className:`text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2`,children:[(0,Z.jsx)(x,{className:`w-3.5 h-3.5`}),` Distribution Buckets`]}),(0,Z.jsx)(`div`,{className:`grid grid-cols-5 md:grid-cols-10 gap-3`,children:t.buckets.map((e,t)=>({bucket:e,bIdx:t,id:`bucket-slot-${t}`})).map(e=>(0,Z.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,Z.jsxs)(`div`,{className:`text-[8px] font-black text-slate-500 text-center uppercase tracking-tighter`,children:[`B`,e.bIdx]}),(0,Z.jsx)(`div`,{className:`flex-1 bg-slate-900 border border-slate-800/60 rounded-lg p-1.5 min-h-[50px] flex flex-col-reverse gap-1 items-center shadow-inner`,children:e.bucket.map((e,t)=>({val:e,vIdx:t,subId:`val-${t}-${e}`})).map(e=>(0,Z.jsx)(`div`,{className:`w-full h-2 bg-indigo-500/50 rounded-sm shadow-[0_0_5px_rgba(99,102,241,0.3)]`,title:e.val},e.subId))}),(0,Z.jsx)(`div`,{className:`text-[9px] font-mono text-center text-slate-400 font-bold`,children:e.bucket.length})]},e.id))})]})]})]})}xt.propTypes={algorithm:J.default.object.isRequired,state:J.default.object.isRequired,preprocessing:J.default.object.isRequired,target:J.default.string,pattern:J.default.string,isArrayBased:J.default.bool.isRequired};function St({state:e}){return null}St.propTypes={state:J.default.object.isRequired};function Ct(e,t,n,r=300){let[i,a]=(0,A.useState)(!1),o=r,s=(0,A.useRef)(e);return(0,A.useEffect)(()=>{s.current=e},[e]),(0,A.useEffect)(()=>{let e;if(i&&!n)e=setInterval(()=>{s.current()},o);else if(n&&i){let n=setTimeout(()=>{t()},2e3);return()=>{clearInterval(e),clearTimeout(n)}}return()=>clearInterval(e)},[i,n,o,t]),{isPlaying:i,togglePlay:()=>a(!i),stopPlay:()=>a(!1)}}function wt(e,t){let n=(0,A.useMemo)(()=>e?.uiConfig||{},[e]),r=(0,A.useCallback)(()=>t?t.isFinished?$.labels.restart:t.phase>0?$.labels.next:n.startButton?n.startButton:e?.type===`data-structure`?$.labels.startOperation:e?.type===`sorting`?$.labels.startSort:$.labels.startSearch:$.labels.next,[t,e?.type,n.startButton]);return(0,A.useMemo)(()=>{if(!e)return{button:$.labels.next,label:``,vizTitle:``};let i=e.type===`sorting`,a=e.type===`searching`,o=n.statusLabel||`${e.name} State`;o=o.replaceAll(/{(\w+)}/g,(e,n)=>{let r=t?.[n];return r===void 0?`{${n}}`:r}),n.statusLabel||(i?o=$.labels.arrayElements:a&&(o=$.labels.targetValue.replace(`{value}`,t?.targetValue||``)));let s=n.vizTitle;s||=i?$.labels.sortingViz:a?$.labels.searchingViz:$.labels.dsViz;let c=n.inputLabel1||(a||i?$.labels.arrayInput:$.labels.targetText),l=n.inputLabel2||(a?$.labels.target:$.labels.pattern),u=n.inputPlaceholder1||(i||a?$.labels.arrayPlaceholder:``),d=n.inputPlaceholder2||(a?$.labels.target:$.labels.pattern);return{button:r(),label:o,vizTitle:s,inputLabel1:c,inputLabel2:l,inputPlaceholder1:u,inputPlaceholder2:d}},[e,t,r,n])}function Tt({algorithm:e,state:t,target:n,pattern:r,updateState:i,toggleWall:a,gridTool:o,isEditingDisabled:s}){let c=e.type===`sorting`||e.type===`searching`;return e.visualizerType===`array`||c?(0,Z.jsx)(pt,{array:t.array||t.nodes||t.table||t.tree||[],activeIndices:t.activeIndices,sortedIndices:t.sortedIndices,pivotIndex:t.pivotIndex||t.curIdx||t.hashValue,swapIndices:t.swapIndices}):e.visualizerType===`z`?(0,Z.jsx)(ht,{concat:t.concat,z:t.z||[],i:t.i,l:t.l||0,r:t.r||0,activeIndices:t.activeIndices,referenceIndex:t.referenceIndex}):e.visualizerType===`grid`||e.type===`pathfinding`?(0,Z.jsx)(`div`,{className:`space-y-6`,children:(0,Z.jsx)(gt,{state:t,updateState:i,toggleWall:a,gridTool:o,isEditingDisabled:s})}):(0,Z.jsx)(mt,{target:n,pattern:r,currentIndex:t.currentIndex,phase:t.phase,compIdx:t.compIdx,mismatchFound:t.mismatchFound,isFinished:t.isFinished,accessedIndices:t.accessedIndices,activeIndices:t.activeIndices,lookAheadIndex:t.lookAheadIndex,comparesRightToLeft:t.comparesRightToLeft,showShiftArrow:t.showShiftArrow})}Tt.propTypes={algorithm:J.default.object.isRequired,state:J.default.object.isRequired,target:J.default.string,pattern:J.default.string,updateState:J.default.func,toggleWall:J.default.func,gridTool:J.default.string,isEditingDisabled:J.default.bool};function Et({algorithm:e,state:t,target:n,setTarget:r,pattern:i,setPattern:a,softReset:o,factoryReset:s,prevStep:c,nextStep:l,updateState:u,toggleWall:d,history:f,preprocessing:p,onBack:m,gridTool:h,setGridTool:g,onClearWalls:_,rows:v,cols:y,onDimensionsChange:b,playbackSpeed:x,onSpeedChange:S}){let{isPlaying:C,togglePlay:w,stopPlay:T}=Ct(l,o,t.isFinished,x),E=wt(e,t),D=C||t.phase>0||(t.iterations||0)>0,O=e.type===`sorting`||e.type===`searching`;return(0,Z.jsx)(`div`,{className:X.pageWrapper,children:(0,Z.jsxs)(`div`,{className:X.mainPanel,children:[(0,Z.jsx)(yt,{name:e.name,phase:t.phase,isFinished:t.isFinished,phaseNames:e.phaseNames,onBack:m,reset:()=>{T(),s()},prevStep:()=>{T(),c()},nextStep:()=>{T(),t.isFinished?o():l()},togglePlay:w,canPrev:f.length>0&&!C,canNext:!C,isPlaying:C,buttonText:E.button,state:t}),(0,Z.jsxs)(`div`,{className:`p-6 space-y-8`,children:[(0,Z.jsxs)(`div`,{className:`flex flex-col xl:flex-row gap-6 items-stretch`,children:[(0,Z.jsx)(`div`,{className:`flex-[0.7] w-full`,children:(0,Z.jsx)(dt,{target:n,setTarget:r,pattern:i,setPattern:a,isPlaying:C,type:e.type,label:E.inputLabel1,label2:E.inputLabel2,placeholder1:E.inputPlaceholder1,placeholder2:E.inputPlaceholder2,gridTool:h,setGridTool:g,isEditingDisabled:D,onClearWalls:_,rows:v,cols:y,onDimensionsChange:b,playbackSpeed:x,onSpeedChange:S})}),(0,Z.jsx)(`div`,{className:`flex-[0.3] w-full`,children:(0,Z.jsx)(ft,{items:e.legendItems||[]})})]}),(0,Z.jsx)(`div`,{className:`w-full px-2`,children:(0,Z.jsx)(Tt,{algorithm:e,state:t,target:n,pattern:i,updateState:u,toggleWall:d,gridTool:h,isEditingDisabled:D})}),(0,Z.jsx)(St,{state:t}),(0,Z.jsx)(`div`,{className:`flex flex-col gap-6`,children:(0,Z.jsxs)(`div`,{className:`flex flex-col xl:flex-row gap-6 items-stretch`,children:[(0,Z.jsxs)(`div`,{className:`flex-1 w-full flex flex-col gap-6`,children:[(0,Z.jsx)(_t,{log:t.log,algorithm:e}),(0,Z.jsx)(xt,{algorithm:e,state:t,preprocessing:p,target:n,pattern:i,texts:E,isArrayBased:O})]}),(0,Z.jsx)(`div`,{className:`flex-1 w-full`,children:e.codeSnippets&&(0,Z.jsx)(vt,{codeSnippets:e.codeSnippets,lineHighlights:e.lineHighlights,activeStep:t.log?.codeStep||t.log?.title})})]})})]}),(0,Z.jsxs)(`div`,{className:X.panelFooter,children:[(0,Z.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,Z.jsx)(ee,{className:`w-3 h-3`}),` `,e.category]}),(0,Z.jsx)(`div`,{className:`font-mono`,children:`Interactive Tool`})]})]})})}Et.propTypes={algorithm:J.default.shape({id:J.default.string.isRequired,name:J.default.string.isRequired,type:J.default.string.isRequired,category:J.default.string.isRequired,visualizerType:J.default.string,cheatSheetData:J.default.object,phaseNames:J.default.arrayOf(J.default.string),codeSnippets:J.default.object,lineHighlights:J.default.object,legendItems:J.default.arrayOf(J.default.object),uiConfig:J.default.shape({playbackSpeed:J.default.number,startButton:J.default.string,statusLabel:J.default.string,vizTitle:J.default.string,inputLabel1:J.default.string,inputLabel2:J.default.string,inputPlaceholder1:J.default.string,inputPlaceholder2:J.default.string})}).isRequired,state:J.default.object.isRequired,target:J.default.string.isRequired,setTarget:J.default.func.isRequired,pattern:J.default.string.isRequired,setPattern:J.default.func.isRequired,softReset:J.default.func.isRequired,factoryReset:J.default.func.isRequired,prevStep:J.default.func.isRequired,nextStep:J.default.func.isRequired,updateState:J.default.func.isRequired,toggleWall:J.default.func,history:J.default.array.isRequired,preprocessing:J.default.object.isRequired,onBack:J.default.func.isRequired,gridTool:J.default.string,setGridTool:J.default.func,onClearWalls:J.default.func,rows:J.default.number,cols:J.default.number,onDimensionsChange:J.default.func};function Dt(){return(0,Z.jsxs)(`div`,{className:`fixed inset-0 -z-10 overflow-hidden bg-slate-950`,children:[(0,Z.jsx)(o.div,{animate:{x:[0,100,0],y:[0,50,0],scale:[1,1.2,1]},transition:{duration:20,repeat:1/0,ease:`linear`},className:`absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]`}),(0,Z.jsx)(o.div,{animate:{x:[0,-80,0],y:[0,120,0],scale:[1,1.1,1]},transition:{duration:25,repeat:1/0,ease:`linear`},className:`absolute top-1/2 -right-24 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]`}),(0,Z.jsx)(o.div,{animate:{x:[0,50,0],y:[0,-100,0],scale:[1,1.3,1]},transition:{duration:18,repeat:1/0,ease:`linear`},className:`absolute -bottom-24 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[130px]`}),(0,Z.jsx)(`div`,{className:`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none`}),(0,Z.jsx)(`div`,{className:`absolute inset-0 opacity-[0.03] pointer-events-none`,style:{backgroundImage:`radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,backgroundSize:`32px 32px`}})]})}function Ot(){let[e,t]=(0,A.useState)(`home`),[n,r]=(0,A.useState)(null),[i,s]=(0,A.useState)(`wall`),[c,l]=(0,A.useState)(100),[u,d]=(0,A.useState)(q[0].defaultInputs.target),[f,p]=(0,A.useState)(q[0].defaultInputs.pattern),m=(0,A.useMemo)(()=>q.find(e=>e.id===n)||q[0],[n]),h=(e,t)=>{if(!e)return null;if(t===`sorting`||t===`searching`){let t=e.split(`,`).map(e=>Number.parseInt(e.trim(),10)).filter(e=>!Number.isNaN(e));if(t.length>0)return t;let n=Number.parseInt(e.trim(),10);return Number.isNaN(n)?e:n}return e},g=(e,t,n,r=null)=>{if(!e.getInitialState)return{};let i=h(n,e.type||e.category?.toLowerCase()),a=h(t,e.type||e.category?.toLowerCase()),o=e.getInitialState(a,i,e,r);return e.type===`pathfinding`&&(r?.walls?o.walls=r.walls:o.walls=Ne(o.rows,o.cols,o.startNode,o.endNode)),o.log&&={...o.log,content:e.extendedDescription||e.description||o.log.content},o.legendItems=e.legendItems||[],o},[_,v]=(0,A.useState)(()=>({currentIndex:0,isFinished:!1,iterations:0,comparisons:0,...g(m,q[0].defaultInputs.pattern,q[0].defaultInputs.target)})),[y,b]=(0,A.useState)([]),x=(0,A.useMemo)(()=>m.getPreprocessing?m.getPreprocessing(f,u):{},[f,u,m]),S=(e=m,t=f,n=u,r=!0)=>{e&&(v(i=>{let a=r?i:{rows:i.rows,cols:i.cols};return{currentIndex:0,isFinished:!1,iterations:0,comparisons:0,accessedIndices:new Set,...g(e,t,n,a)}}),b([]))};return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Dt,{}),(0,Z.jsx)(a,{mode:`wait`,children:e===`home`?(0,Z.jsx)(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.5,ease:[.22,1,.36,1]},children:(0,Z.jsx)(lt,{categories:st,algorithms:q,onSelect:e=>{r(e),t(`visualizer`);let n=q.find(t=>t.id===e),i=n.defaultInputs;d(i.target),p(i.pattern),l(n.uiConfig?.playbackSpeed||100),S(n,i.pattern,i.target)}})},`home`):(0,Z.jsx)(o.div,{initial:{opacity:0,scale:.98,filter:`blur(10px)`},animate:{opacity:1,scale:1,filter:`blur(0px)`},exit:{opacity:0,scale:1.02,filter:`blur(10px)`},transition:{duration:.6,ease:[.22,1,.36,1]},children:(0,Z.jsx)(Et,{algorithm:m,state:_,target:u,setTarget:e=>{d(e),v(t=>({currentIndex:0,isFinished:!1,iterations:0,comparisons:0,accessedIndices:new Set,...g(m,f,e,t)})),b([])},pattern:f,setPattern:e=>{p(e),v(t=>({currentIndex:0,isFinished:!1,iterations:0,comparisons:0,accessedIndices:new Set,...g(m,e,u,t)})),b([])},softReset:()=>S(),factoryReset:()=>{let e=m.defaultInputs;d(e.target),p(e.pattern),S(m,e.pattern,e.target,!1)},nextStep:()=>{v(e=>{if(e.isFinished)return e;let t=m.nextStep(e,u,f,x);return b(t=>[...t,{...e,accessedIndices:new Set(e.accessedIndices)}]),t})},prevStep:()=>{if(y.length===0)return;let e=y.at(-1);b(e=>e.slice(0,-1)),v(e)},updateState:e=>{v(t=>{let n=typeof e==`function`?e(t):e,r={...t,...n};if(n.startNode||n.endNode){let e=g(m,f,u,r);r={...r,...e},r.isFinished=!1,r.iterations=0,r.phase=0,b([])}return r})},toggleWall:(e,t)=>{v(n=>{if(n.isFinished||n.phase!==0)return n;let r=n.walls||[],i=r.some(n=>n.r===e&&n.c===t)?r.filter(n=>!(n.r===e&&n.c===t)):[...r,{r:e,c:t}];return{...n,walls:i}})},onClearWalls:()=>{v(e=>({...e,walls:[]}))},rows:_.rows,cols:_.cols,onDimensionsChange:(e,t)=>{v(n=>{let r={...n,rows:e,cols:t},i=g(m,f,u,r);return{...r,...i,isFinished:!1,iterations:0,phase:0}}),b([])},history:y,preprocessing:x,canPrev:y.length>0,canNext:!_.isFinished,onBack:()=>{t(`home`),r(null)},gridTool:i,setGridTool:s,playbackSpeed:c,onSpeedChange:l},m.id)},`viz`)})]})}(0,ye.createRoot)(document.getElementById(`root`)).render((0,Z.jsx)(A.StrictMode,{children:(0,Z.jsx)(Ot,{})}));