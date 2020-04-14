'use strict';

module.exports = function (fallens) {

    fallens.SearchFallen = (value, cb) => {
        if (value.length > 100) return cb(null, null)
        let valueArr = value.split("'")
            let newValue = ""
            for (let i = 0; i < valueArr.length; i++) {
                newValue += valueArr[i] + ((valueArr.length - 1) === i ? '' : "\\'")
            }
        fallens.dataSource.connector.query(`select *
            from fallens
            where match(fallens.name) against ('"${newValue}"')
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