module.exports = class DbManager {

    constructor(app) {
        this.app = app;
    }

    saveToDatabase(payload, res) {

        this.app.models.Subscriptions.saveSubscription(payload, function (err, response) {
            //sendNotification(subscription, "you have subscribed successfully!!")
            if (response) res.json({ message: "success saving" });
            else res.json({ message: "error saving" });
        });
    };

    deleteFromDatabase(payload, res) {
        this.app.models.Subscriptions.deleteSubscription(payload, function (response, err) {
            if (res) {
                if (response) res.json({ message: "success delete sub" });
                else res.json({ message: "error deleting" });
            }
        });
    };
}