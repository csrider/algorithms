function printintegerArray(array) {
    var size = array.length;
    var res = '';
    res += '[';
    var i = 0;
    for (i = 0; i < size; i++) {
        if (i !== 0) {
            res += ', ';
        }
        res += array[i];
    }
    res += ']';
    return res;
}

var test_case_number = 1;

function check(expected, output) {
    var expected_size = expected.length;
    var output_size = output.length;
    var result = true;
    if (expected_size != output_size) {
        result = false;
    }
    for (var i = 0; i < Math.min(expected_size, output_size); i++) {
        result &= (output[i] == expected[i]);
    }
    var rightTick = "\u2713";
    var wrongTick = "\u2717";
    if (result) {
        var out = rightTick + ' Test #' + test_case_number;
        console.log(out);
    }
    else {
        var out = '';
        out += wrongTick + ' Test #' + test_case_number + ': Expected ';
        out += printintegerArray(expected);
        out += ' Your output: ';
        out += printintegerArray(output);
        console.log(out);
    }
    test_case_number++;
}

module.exports = { printintegerArray, check };