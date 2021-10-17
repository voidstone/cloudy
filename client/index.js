const { createReadStream, createWriteStream } = require('fs')
const { createGzip } = require('zlib')

const [INPUT_FILE, OUTPUT_FILE] = process.argv.slice(2);

const readStream = createReadStream(INPUT_FILE);
const writeStream = createWriteStream(OUTPUT_FILE);
const compressStream = createGzip();

readStream.pipe(compressStream)
    .on('data', (chunk) => {
        writeStream.write(chunk);
    })
    .on('end', () => {
        if (process.argv.includes('-v')) {
            console.log(` ${INPUT_FILE} -> ${OUTPUT_FILE}`);
        }
        writeStream.end()
    })
    .on('error', (e) => {
        console.error(e.message);

        process.exit(1);
    });
