const fs = require('fs');
const path = require('path');
const knex = require('../Config/database');

const getModelFiles = (dir) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if(err) reject(err);

            const filteredFiles = files
                .filter(file => (file.indexOf('.') !== 0) && file !== 'index.js' && file !== 'base.js')
                .map(file => path.join(dir, file));

            resolve(filteredFiles);
        });
    });
}

async function init(){
    const files = await getModelFiles(__dirname);

    return files.reduce((modelsObj, filename) => {
        const initModel = require(filename);
        const model = initModel(knex);

        if(model) modelsObj[model.name] = model;

        return modelsObj;
    }, {})
}

module.exports = init();
