const { readFileSync, writeFileSync, statSync } = require('fs')
const { pipe, prop, __, divide, concat, toString } = require('ramda')

const [INPUT_FILE, OUTPUT_FILE] = process.argv.slice(2);

const getFileSize = pipe(
    statSync,
    prop("size"),
    divide(__, 1024),
    Math.round,
    toString,
    concat(__, 'KB')
);

try {
    const fileSize = getFileSize(INPUT_FILE);

    const file = readFileSync(INPUT_FILE, 'utf8')

    writeFileSync(OUTPUT_FILE, file);

    console.log(`Copied ${fileSize} from ${INPUT_FILE} to ${OUTPUT_FILE}`);

} catch (e) {
    console.error(e.message);

    process.exit(1);
}

