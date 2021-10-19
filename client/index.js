const { createReadStream } = require('fs');
const { request } = require('http');
const { createGzip } = require('zlib')

const [INPUT_FILE, OUTPUT_FILE, HOST] = process.argv.slice(2);

const readStream = createReadStream(INPUT_FILE);
const writeStream = request(HOST, {
    method: 'POST',
    headers: { 'file-path': OUTPUT_FILE }
})
const compressStream = createGzip();


readStream
    .on('end', () => {
        if (process.argv.includes('-v')) {
            console.log(` ${INPUT_FILE} -> ${OUTPUT_FILE}`);
        }
        // writeStream.end()
    })
    .pipe(compressStream)
    .pipe(writeStream)
    .on('error', (e) => {
        console.error(e.message);
        process.exit(1);
    });
