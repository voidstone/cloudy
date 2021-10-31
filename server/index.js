const { createServer } = require('http');
const { uploadFileHandler } = require('./src/routes/upload-file');
const { getFileHandler } = require('./src/routes/get-file')
const { defaultRequestHandler } = require('./src/routes/default-request-handler')
const { Router } = require('./src/router')


const { C_PORT } = process.env;

const router = Router()
    .post('/upload', uploadFileHandler)
    .post(defaultRequestHandler)
    .get(getFileHandler)
    .get(defaultRequestHandler)
    .put(defaultRequestHandler)
    .patch(defaultRequestHandler)
    .delete(defaultRequestHandler)
    .head(defaultRequestHandler)
    .options(defaultRequestHandler);

const server = createServer(router.serve);


server.listen(C_PORT);

console.log(`server listening on port ${C_PORT}`);