const _ = require("lodash");

module.exports = (req, resp, next) => {
    const bundles = resp.locals.bundle;

    if (bundles.errors) {
        const errors = parseErrors(bundles.errors);
        resp.status(500).json({ errors });
    } else {
        next();
    }
};

const parseErrors = nodeRestFulErrors => {
    const errors = [];
    _.forIn(nodeRestFulErrors, error => errors.push(error.message));
    return errors;
};