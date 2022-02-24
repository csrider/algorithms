const functionalTest = require('../functionalTest')

/** Function to determine if a target exists in a sorted array.
 * Returns array index of the target. If not found, returns -1.
 * 
 * @param {array} arrSortedNums Array of sorted numbers to search within.
 * @param {number} numTarget Number to try to find in the array.
 */
function main(arrSortedNums, numTarget) {
    //return binarySearch_iterative(arrSortedNums, numTarget);
    return binarySearch_recursive(arrSortedNums, numTarget);
}

function binarySearch_iterative(arrSortedNums, numTarget) {
    // Define the search space
    let leftBound = 0;
    let rightBound = arrSortedNums.length - 1;

    // Loop until the search space is exhausted
    while (leftBound <= rightBound) {
        // Find the mid-value in the search space
        let mid = Math.floor((leftBound + rightBound) / 2);

        // Check if target is found and return it if so
        if (numTarget == arrSortedNums[mid]) return mid;

        // Adjust our bounds to define the new search space
        if (numTarget < arrSortedNums[mid]) rightBound = mid - 1;
        if (numTarget >= arrSortedNums[mid]) leftBound = mid + 1;
    }

    return -1;
}

function binarySearch_recursive(arrSortedNums, numTarget, leftBound, rightBound) {
    if (!leftBound) leftBound = 0;
    if (!rightBound) rightBound = arrSortedNums.length - 1;

    // Base condition: (search space is exhausted)
    if (leftBound > rightBound) return -1;

    // Find the mid-value in the search space
    let mid = Math.floor((leftBound + rightBound) / 2);

    // Base condition: (a target is found)
    if (numTarget == arrSortedNums[mid]) return mid;

    // Adjust our bounds to define the new search space
    if (numTarget < arrSortedNums[mid])
        return binarySearch_recursive(arrSortedNums, numTarget, leftBound, mid - 1);
    if (numTarget >= arrSortedNums[mid])
        return binarySearch_recursive(arrSortedNums, numTarget, mid + 1, rightBound);
}

/********************************************************************/
// These are the tests we use to determine if the solution is correct.

var arr = [1, 2, 3, 4, 5];
var target = 3
var expected = 2;
var output = main(arr, target);
functionalTest.check(expected, output);

var arr = [1, 2, 3, 4, 5];
var target = 1
var expected = 0;
var output = main(arr, target);
functionalTest.check(expected, output);

var arr = [1, 2, 3, 4, 5];
var target = 5
var expected = 4;
var output = main(arr, target);
functionalTest.check(expected, output);

var arr = [1, 2, 3, 4, 5];
var target = 6
var expected = -1;
var output = main(arr, target);
functionalTest.check(expected, output);

var arr = [2, 5, 6, 8, 9, 10];
var target = 5
var expected = 1;
var output = main(arr, target);
functionalTest.check(expected, output);

var arr = Array.from(Array(999999).keys());
var target = 986
var expected = target - 1;
var output = binarySearch(arr, target);
functionalTest.check(expected, output);
