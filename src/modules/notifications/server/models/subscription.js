'use strict';
const eachOfSeries = require('async/eachOfSeries');

const to = (promise) => {
    return promise.then(data => {
        return [null, data];
    }).catch(err => {
        console.log("hello to the err", err);
        return [err, null]
    });
}

module.exports = function (Subscriptions) {

    Subscriptions.saveSubscription = async (payload, cb) => {
        // let [atErr, atRes] = await to(Subscriptions.app.models.AccessToken.findOne({where:{id:payload.accessToken}}));
        // if(atErr) return cb(null, []);
        // userId = atRes.userId;
        let data = {
            subscription: JSON.stringify(payload.subscription),
            userId: payload.userId,
            uniqueId: payload.uniqueId,
            isFcm: payload.isFcm ? payload.isFcm : false,
            created: Date.now()
        };
        if (!payload.uniqueId) {
            const endpointData = payload.subscription.endpoint.split('/');
            data.uniqueId = endpointData[endpointData.length - 1];
        }

        Subscriptions.findOne({ where: { and: [{ userId: data.userId }, { uniqueId: data.uniqueId }] } }, (findErr, findRes) => {
            if (findErr) return cb(null, []);
            if (findRes) data.id = findRes.id;
            Subscriptions.upsert(data, (saveErr, saveRes) => {
                if (saveRes) {
                    return Subscriptions.deleteOtherSubs(data.userId, data.uniqueId, saveRes, cb)
                    // return cb(null, saveRes)
                }
                else {
                    console.log(`Error storing subscription [${payload.subscription}] in database`, saveErr);
                    return cb(null, []);
                }
            })
        });


    }

    Subscriptions.deleteOtherSubs = (userId, uniqueId, resultData, cb) => {
        Subscriptions.find({ where: { and: [{ userId: { neq: userId } }, { uniqueId: uniqueId }] } }, (findAErr, findARes) => {
            if (findAErr) return cb(null, []);
            if (findARes) {
                let deleteIds = findARes.map(sub => sub.id)
                eachOfSeries(deleteIds, (id, index, callback) => {
                    Subscriptions.destroyById(id, (deleteErr, deleteRes) => {
                        if (deleteErr) {
                            return cb(null, deleteErr)
                        }
                        else {
                            return callback()
                        }
                    })
                }, function (error) {
                    if (error) {
                        console.log("err", error);
                        return cb(null, [])
                    }
                    else {
                        return cb(null, resultData)
                    }
                })

            }
        })
    }

    Subscriptions.getSubscriptionsByUserId = (usersIds, cb) => {
        Subscriptions.find({ where: { userId: { inq: [...usersIds] } } }).then(function (res, err) {
            if (err) {
                // console.log("err sub", err)
                return cb([])
            }
            const subscriptions = res.map(subsc => {
                return { subscription: subsc.subscription, isFcm: subsc.isFcm }
            });
            return cb(subscriptions)
        });
    }


    Subscriptions.deleteSubscription = async (payload, cb) => {
        let [err, res] = await to(Subscriptions.findOne({ where: { and: [{ subscription: JSON.stringify(payload.subscription) }, { userId: payload.userId }] } }));
        if (err) { return cb({}, null); }
        let [deleteErr, deleteRes] = await to(Subscriptions.destroyById(res.id));
        if (deleteErr) return cb([], null)
        return cb(deleteRes, null)
    }

}
