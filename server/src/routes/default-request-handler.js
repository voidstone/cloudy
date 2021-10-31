const defaultRequestHandler = (_, res) => {
    res.statusCode = 400;
    res.end();
}

module.exports = {
    defaultRequestHandler
}