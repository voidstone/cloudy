const { createReadStream } = require('fs')


const { C_LOGIN, C_PASS, C_PORT } = process.env;
const unifiedCredentials = `${C_LOGIN}:${C_PASS}`;
const base64Credentials = Buffer.from(unifiedCredentials).toString('base64');
const expectedAuthHeader = `Basic ${base64Credentials}`;

const getFileHandler = (req, res, next) => {
    const filePath = join(__dirname, '../../../files', req.url);

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
}

module.exports = {
    getFileHandler
}