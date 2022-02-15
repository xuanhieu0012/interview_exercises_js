const assert = require('assert');
const csv = require('./csv');
describe('csv', function () {
    describe('parse', function () {
        it('should parse simple csv', function () {
            const str = slurp('basic.csv');
            const result = csv.parse(str);
            assert.deepEqual(
                result,
                [
                    ['Name', 'Lift Capacity', 'Retired'],
                    ['Falcon Heavy', '141000lb', ''],
                    ['Falcon 9', '6761kb', ''],
                    ['Saturn V', '271000lb', '1973']
                ]
            )
        });
        it('should parse "csv" with custom delimiter', function () {
            const str = slurp('basic_pipe.csv');
            const result = csv.parse(str, {delim: '|'});
            assert.deepEqual(
                result,
                [
                    ['Name', 'Lift Capacity', 'Retired'],
                    ['Falcon Heavy', '141000lb', ''],
                    ['Falcon 9', '6761kb', ''],
                    ['Saturn V', '271000lb', '1973']
                ]
            )
        });
        it('should reject csv with non-uniform row width', function () {
            const str = slurp('basic_ragged.csv');
            assert.throws(() => csv.parse(str));
        });
        it('should parse csv to records', function () {
            const str = slurp('basic_pipe.csv');
            const result = csv.parseRecords(str, {delim: '|'});
            assert.deepEqual(
                result,
                [
                    {'Name': 'Falcon Heavy', 'Lift Capacity': '141000lb', 'Retired': ''},
                    {'Name': 'Falcon 9', 'Lift Capacity': '6761kb', 'Retired': ''},
                    {'Name': 'Saturn V', 'Lift Capacity': '271000lb', 'Retired': '1973'},
                ]
            )
        });
        it('should parse quoted csv', function () {
            const str = slurp('basic_pipe.csv');
            const result = csv.parse(str, {delim: '|'});
            assert.deepEqual(
                result,
                [
                    ['Name', 'Lift Capacity', 'Retired'],
                    ['Falcon Heavy', '141,000lb', ''],
                    ['Falcon 9', '6,761kb', ''],
                    ['Saturn V', '271,000lb', '1973']
                ]
            )
        });
    });
});

// Squirelling these away near the bottom
const fs = require('fs');
const path = require('path');
function slurp(example) {
    return fs.readFileSync(path.join('example', example), { encoding: 'utf-8' });
}

