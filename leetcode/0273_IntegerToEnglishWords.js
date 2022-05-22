/* 273. Integer to English Words
Hard
Convert a non-negative integer num to its English words representation.

Example 1:
Input: num = 123
Output: "One Hundred Twenty Three"

Example 2:
Input: num = 12345
Output: "Twelve Thousand Three Hundred Forty Five"

Example 3:
Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

Constraints:
0 <= num <= 231 - 1
*/

/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function (num) {
    // Input validation
    if (num === undefined || num === null) return undefined;
    if (num < 0) return undefined;

    // Edge cases
    if (num === 0) return "Zero";

    // Define a few basics for readability
    const TEN = 10;
    const TWENTY = 20;
    const HUNDRED = 100;
    const THOUSAND = 1000;
    const MILLION = 1000000;
    const BILLION = 1000000000;
    
    // Define a map with more detailed basics
    const wordMap = new Map();
    wordMap.set(1, "One");
    wordMap.set(2, "Two");
    wordMap.set(3, "Three");
    wordMap.set(4, "Four");
    wordMap.set(5, "Five");
    wordMap.set(6, "Six");
    wordMap.set(7, "Seven");
    wordMap.set(8, "Eight");
    wordMap.set(9, "Nine");
    wordMap.set(10, "Ten");
    wordMap.set(11, "Eleven");
    wordMap.set(12, "Twelve");
    wordMap.set(13, "Thirteen");
    wordMap.set(14, "Fourteen");
    wordMap.set(15, "Fifteen");
    wordMap.set(16, "Sixteen");
    wordMap.set(17, "Seventeen");
    wordMap.set(18, "Eighteen");
    wordMap.set(19, "Nineteen");
    wordMap.set(20, "Twenty");
    wordMap.set(30, "Thirty");
    wordMap.set(40, "Forty");
    wordMap.set(50, "Fifty");
    wordMap.set(60, "Sixty");
    wordMap.set(70, "Seventy");
    wordMap.set(80, "Eighty");
    wordMap.set(90, "Ninety");
    
    // Recursive function to assemble the output phrase
    function makePhrase(num) {
        console.log(`Running makePhrase(${num})`)
        let numThisPlace, remaining, phrase;

        if (num >= BILLION) {
            numThisPlace = Math.floor(num / BILLION);
            remaining = num % BILLION;
            phrase = makePhrase(numThisPlace) + " Billion";         //recurse for this place
            if (remaining > 0) phrase += ' '+ makePhrase(remaining);//recurse for remaining
            return phrase;
        }

        if (num >= MILLION) {
            numThisPlace = Math.floor(num / MILLION);
            remaining = num % MILLION;
            phrase = makePhrase(numThisPlace) + " Million";         //recurse for this place
            if (remaining > 0) phrase += ' '+ makePhrase(remaining);//recurse for remaining
            return phrase;
        }

        if (num >= THOUSAND) {
            numThisPlace = Math.floor(num / THOUSAND);
            remaining = num % THOUSAND;
            phrase = makePhrase(numThisPlace) + " Thousand";        //recurse for this place
            if (remaining > 0) phrase += ' '+ makePhrase(remaining);//recurse for remaining
            return phrase;
        }

        if (num >= HUNDRED) {
            numThisPlace = Math.floor(num / HUNDRED);
            remaining = num % HUNDRED;
            phrase = wordMap.get(numThisPlace) + " Hundred";        //get this place from map
            if (remaining > 0) phrase += ' '+ makePhrase(remaining);//recurse for remaining
            return phrase;
        }

        if (num >= TWENTY) {
            numThisPlace = Math.floor(num / TEN) * TEN;
            remaining = num % TEN;
            phrase = wordMap.get(numThisPlace);                     //get this place from map
            if (remaining > 0) phrase += ' '+ makePhrase(remaining);//recurse for remaining
            return phrase;
        }

        // Less than twenty or toward the end, just get from the map
        return wordMap.get(num);
    }
    
    return makePhrase(num);
};

let num;
num = 2;        console.log(`${num}: ${numberToWords(num)}\n`);
num = 12;       console.log(`${num}: ${numberToWords(num)}\n`);
num = 20;       console.log(`${num}: ${numberToWords(num)}\n`);
num = 23;       console.log(`${num}: ${numberToWords(num)}\n`);
num = 102;      console.log(`${num}: ${numberToWords(num)}\n`);
num = 1024;     console.log(`${num}: ${numberToWords(num)}\n`);
