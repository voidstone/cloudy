const { createWriteStream } = require('fs');
const { join } = require('path')


const uploadFileHandler = (req, res) => {
    const path = req.headers['file-path'];
    if (!path) {
        res.statusCode = 400;
        res.end();
        return;
    }

    const outputFilePath = join(__dirname, '../../../files', path);
    const writeStream = createWriteStream(outputFilePath);

    req.pipe(writeStream).on('finish', () => res.end())
}

module.exports = {
    uploadFileHandler
}