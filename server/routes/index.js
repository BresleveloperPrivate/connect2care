const promisify = require('util').promisify;
const fs = require('fs');
const readFile = promisify(fs.readFile);
const path = require('path')

module.exports = function (app) {

    ///////// GETS THE FORM/TABLE DATA WITH RELATIONS ////////
    app.get('/api/meta/:type/:model', function (req, res) {
        const modelMeta = fs.readFileSync('common/models/' + req.params.model + ".json", 'utf-8');
        const modelMetaJson = JSON.parse(modelMeta).crud;
        const modelRelations = JSON.parse(modelMeta).options.relations;
        const modelInfo = { fields: modelMetaJson.fields, relations: modelRelations};
        const modelFilter = req.body.where;
        let params = JSON.parse(modelMeta).name;
        let Model = app.models[params];

        if (req.params.type === "form") {
            res.send(JSON.stringify(modelInfo));
        } else if (req.params.type === "table") {
            let fields = {};
            let relations =[];

            Object.keys(modelMetaJson.fields).map(e => (fields[e] = true));
            Object.keys(modelRelations).map(r => (relations.push(r)));

            Model.find({ fields: fields, include: relations, where: modelFilter }, function (err, tableData) {

                if (err) console.log(err)
                else {
                    let table = {
                        data: tableData,
                        fields: modelMetaJson.fields,
                        relations: modelRelations,
                        tableActions: modelMetaJson.tableActions ? modelMetaJson.tableActions: null
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(table));
                }
            });
        } else res.send("ERROR: You can only get table data or form data. change params accordinly")
    });

}
