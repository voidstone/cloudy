const { createServer } = require('http');
const { createReadStream, createWriteStream } = require('fs')
const { join } = require('path');

const { C_LOGIN, C_PASS, C_PORT } = process.env || { C_LOGIN = 'hello', C_PASS = 'pass', C_PORT =4000 };


const unifiedCredentials = `${C_LOGIN}:${C_PASS}`;
const base64Credentials = Buffer.from(unifiedCredentials).toString('base64');
const expectedAuthHeader = `Basic ${base64Credentials}`;

const server = createServer();

server.on('request', (req, res) => {

    if (req.method === 'POST' && req.url === '/upload') {

        const path = req.headers['file-path'];
        if (!path) {
            res.statusCode = 400;
            res.end();
            return;
        }

        const outputFilePath = join(__dirname, '../files', path);
        const writeStream = createWriteStream(outputFilePath);

        req.pipe(writeStream).on('finish', () => res.end())

    } else if (req.method === 'GET') {

        const filePath = join(__dirname, '../files', req.url);

        const readStream = createReadStream(filePath);

        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-encoding', 'gzip');
        res.setHeader('www-authenticate', 'Basic');

        console.log(req.headers.authorization);
        console.log(expectedAuthHeader);


        if (req.headers.authorization != expectedAuthHeader) {
            res.statusCode = 401;
            res.end();
            return;
        }

        readStream
            .on('error', (err) => {
                res.statusCode = 404;
                res.end();
            }
            )
            .pipe(res);
    } else {
        res.statusCode = 400;
        res.end();
    }
    // const readStream = createReadStream('./test.html');

    // readStream.pipe(res);
})


server.listen(C_PORT);

console.log(`server listening on port ${C_PORT}`);