const Router = (routes = {}) => ({
    get: (urlOrHandler, handler) => {
        return Router(routes).register('GET', urlOrHandler, handler);
    },
    post: (urlOrHandler, handler) => {
        return Router(routes).register('POST', urlOrHandler, handler);
    },
    put: (urlOrHandler, handler) => {
        return Router(routes).register('PUT', urlOrHandler, handler);
    },
    patch: (urlOrHandler, handler) => {
        return Router(routes).register('PATCH', urlOrHandler, handler);
    },
    delete: (urlOrHandler, handler) => {
        return Router(routes).register('DELETE', urlOrHandler, handler);
    },
    head: (urlOrHandler, handler) => {
        return Router(routes).register('HEAD', urlOrHandler, handler);
    },
    options: (urlOrHandler, handler) => {
        return Router(routes).register('GET', urlOrHandler, handler);
    },
    register: (method, urlOrHandler, handler) => {
        if (!routes[method]) {
            routes[method] = {};
        }
        if (typeof urlOrHandler != 'string') {
            handler = urlOrHandler;
            urlOrHandler = '.*';
        }

        routes[method][urlOrHandler] = handler;

        return Router(routes);
    },
    serve: (req, res) => {
        const { method, url } = req;

        const matchingUrl = Object.keys(routes[method]).find(
            (key) => new RegExp(key).test(url)
        )

        routes[method][matchingUrl](req, res);
    }

})


module.exports = {
    Router
}