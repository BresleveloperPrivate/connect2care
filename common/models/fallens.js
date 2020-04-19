'use strict';

module.exports = function (fallens) {

    const to = (promise) => {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
    }

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

    fallens.getFallen = (id, cb) => {
        (async () => {
            //(`/api/fallens/${fallen.id}?filter={ "include":{"relation":"meetings", "scope":{"include":"meetingOwner"}} }`);
            let [err, res] = await to(fallens.findOne({ where: { id: id, include: { relation: "meetings", scope: { include: "meetingOwner" } } } }))
            if (err) {
                console.log(err)
                cb(err, {})
            }
            else {
                cb(null, res)
            }
        })()
    }

    fallens.remoteMethod('getFallen', {
        http: { verb: 'post' },
        accepts: [{ arg: 'id', type: 'number', required: true }],
        returns: { type: "object", root: true }
    });
}