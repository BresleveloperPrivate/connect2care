'use strict';

module.exports = function (fallens) {

    fallens.SearchFallen = (value, cb) => {
        if (value.length > 100) return cb(null, null)
        fallens.dataSource.connector.query(`select *
            from fallens
            where match(fallens.name) against ('"${value}"')
            order by fallens.falling_date desc
            limit 0, 20`, (err, res) => {
            if (err) {
                console.log(err)
                return cb(err)
            }
            if (res) return cb(null, res);
        })
    }

    fallens.remoteMethod('SearchFallen', {
        description: "Search For Fallen",
        accepts: [{ arg: "value", type: "string", required: true }],
        returns: { type: "array", root: true },
        http: { path: "/SearchFallen", verb: "post" }
    });
}