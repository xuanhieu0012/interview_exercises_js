// Permissive line ending
const CRLF = /\r?\n/;

function parse(content, options) {

}

function parseRecords(content, options) {
    const internal = parse(content, options);
}

module.exports = {
    parse,
    parseRecords
}