'use strict';

module.exports = function (fallens) {

    fallens.SearchFallen = (value, cb) => {
        (async () => {
            try {
                const fallen = await fallens.find({ where: { name: { regexp: `/${value}/` } } });
                cb(null, fallen);
            } catch (err) {
                console.log(err);
                cb(err, null);
            }
        })();
    }

    fallens.remoteMethod('SearchFallen', {
        description: "Search For Fallen",
        accepts: [{ arg: "value", type: "string", required: true }],
        returns: { type: "array", root: true },
        http: { path: "/SearchFallen", verb: "post" }
    });
}