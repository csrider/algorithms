const functionalTest = require('../functionalTest')

/** Determine how many place-values (digits) are in the provided number.
* Mathematical Formula:  floor(log(|x|)) + 1
* @param {Number} num - The numerical value to count number of place-values for.
* @return {Number} The number of place-values (digits) in the provided number.
*/
function getNumberOfPlaces(num) {
  if(num === undefined) return 0;
  if(num < 0) num = Math.abs(num);  //We only want to work with positive numbers
  return Math.floor(Math.log10(num)) + 1;
}

/** Convert Byte to Binary String.
 * Originally conceived to accept data from Uint8Array buffer.
 */
function toBinString(bytes) {
  const fnReduce = (str, byte) => {
    return str + byte.toString(2).padStart(8, '0');
  };

  bytes.reduce(fnReduce, '');
}

/** Generate All Unique Permutations of a Binary String (as character array).
 * Iterative approach, converts integer to binary string and pads as needed.
 * WARNING: This will have VERY HIGH time complexity with large n-values!
 * TC: O((2^N)*2), SC: O(N)
 * @param {number} n - Number of binary digits to generate.
 * @param {array} results - Reference of array to save generated data to.
 */
function genBinPerms_asCharArrays(n, result) {   //[ ['0','0','0','0','1'], ... ]
  const numPerms = Math.pow(2, n);
  const arrPerm = new Array(n).fill(0);
  for (let i = 0; i < numPerms; i++) {
    // Convert each i into its binary representation.
    // This not only guarantees uniqueness, but also gives us strings in order.
    const strPerm = i.toString(2);
    


    const arrPerm = new Array(n-strPerm.length).fill('0');
    arrPerm.push(...strPerm.split(''));
    result.push(arrPerm);
  }
}

/** Find the next binary number of a decimal and return its decimal version.
 * Ex. Next of 4 (100) is 8 (1000)
 */
function findNextBinNum_forDec_getDecInt(x) {
  //const numBinDigits = Math.log(x) / Math.log(2);
  //console.log(`Finding next binary number for decimal input of x = ${x}`);
  //console.log(`Binary of input: ${x.toString(2).padStart(numBinDigits+2,'0')} (${x})`);
  const smallest = (x & -x);
  const ripple = x + smallest;
  const newSmallest = (ripple & -ripple);
  const ones = ((newSmallest/smallest) >> 1) - 1;
  //console.log(`         RETURN: ${(ripple|ones).toString(2)} (${ripple | ones})`);
  return ripple | ones;
}
/** Find the next binary number of a decimal and return its binary string.
 * Ex. Next of 4 (100) is 1000 (8)
 */
 function findNextBinNum_forDec_getBinStr(x, numCharsToPadDesired) {
  let numBinDigits = (Math.log(x) / Math.log(2)) + 2; //answer will add 1 digit
  if (numBinDigits <= numCharsToPadDesired)
    numBinDigits = numBinDigits + (numCharsToPadDesired - numBinDigits);
  else
    //NOTE: Only works for first level doubling!
    numBinDigits = numBinDigits+(numCharsToPadDesired-(numBinDigits-numCharsToPadDesired));
  console.log(`Finding next binary number for decimal input of x = ${x}`);
  console.log(`Binary of input: ${x.toString(2).padStart(numBinDigits,' ')} (${x})`);
  const smallest = (x & -x);
  const ripple = x + smallest;
  const newSmallest = (ripple & -ripple);
  const ones = ((newSmallest/smallest) >> 1) - 1;
  console.log(`         RETURN: ${(ripple|ones).toString(2).padStart(numBinDigits,'0')} (${ripple | ones})`);
  return (ripple|ones).toString(2).padStart(numBinDigits,'0');
}
console.log(findNextBinNum_forDec_getBinStr(32768, 8));

/* doesn't work yet for anything other than 3 digits 
function genBins(numOfDigits) {
  let [N, n1, n2, n3] = [0, 1, 9, 89];

  //let [res, max] = [Array(Array(3).fill(N)), Math.pow(2, 3)];
  let [res, max] = [Array(Array(numOfDigits).fill(N)), Math.pow(2, numOfDigits)];

  for (let i = 1, curr; i < max; i++) {
    if ([1,3,5,7].some(n => n === i)) 
      N += n1;
    if ([2,6].some(n => n === i))
      N += n2;
    if (i === max / 2)
      N += n3;

    curr = Array.from(String(N), n => +n);

    if (N < 100) {
    //if (N <)
      //while (curr.length < 3) curr.unshift(n1 - 1);
      while (curr.length < numOfDigits) curr.unshift(n1 - 1);
    }

    res.push(curr);
  }

  console.log(res);
}
genBins(3);
*/

function genBinPerms_1b(n, result) {  //[ ['0','0','0','0','1'], ... ]
  const numPerms = Math.pow(2, n);
  for (let i = 1; i < numPerms; i++) {
    const arrPerm = i.toString(2).split('');
    const arrPermFinal = new Array(n-arrPerm.length).fill('0');
    arrPermFinal.push(...arrPerm);
    result.push(arrPerm);
  }
}
function genBinPerms_1c(n, result) {  //[ '00001', ... ]
  const numPerms = Math.pow(2, n);
  for (let i = 1; i < numPerms; i++) {
    const strPerm = i.toString(2).padStart(n,'0');
    result.push(strPerm);
  }
}
function genBinPerms_1z(n, strOffMask) {
  if (!strOffMask) strOffMask = '0'.padStart(n,'0');
  const numPerms = Math.pow(2, n);
  const uniquePerms = new Set();
  const arrPerm = new Array(numPerms).fill(0);
  uniquePerms.add(arrPerm.toString());
  let l = 0, r = numPerms;
  while (l < r) {
    if (arrSeed[l] )
    l++, r--;
  }
}
function genBinPerms_2(n, arr, i, result) { //[ [0,0,0,0,1], ... ]
  if (i === n) {
    result.push([...arr]);
    return;
  }
  arr[i] = 0; genBinPerms_2(n, arr, i+1, result);
  arr[i] = 1; genBinPerms_2(n, arr, i+1, result);
}
function genBinPerms_2b(n, strOffMask) {
  const result = [];
  const arr = new Array(n).fill(0)
  recurse(n, arr, 0);
  function recurse(n, arr, i) {
    // Once we go outside range of array (essentially null), end recursion
    if (i === n) {
      result.push([...arr]);  //[ [0,0,0,0,1], ... ]
      return;
    }

    // First, assign 0 at i-th position, then try all other perms for remaining positions
    arr[i] = 0; recurse(n, arr, i+1);
    
    // And then, assign 1 at i-th position, then try all other perms for remaining positions
    // (but only if strOffMask indicates 1 is allowed for this i-th position)
    if (strOffMask[i] != '1') {
      arr[i] = 1;
      recurse(n, arr, i+1);
    } else return;
  }
  return result;
}
function genBinPerms_3(n, arr) {
  const numPerms = Math.pow(2, n);
  //const arr = new Array(n).fill(0)
  for (let i = 1; i <= numPerms; i++)
    arr[i-1] = i.toString(2).padStart(n, '0');
}