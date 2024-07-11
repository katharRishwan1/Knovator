const express = require('express');
const fs = require('fs');
const router = express.Router();

fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== '__index.js')
    .forEach((file) => {
            const routesFile = require(`${__dirname}/${file}`);
                router.use('/', routesFile);
    });
module.exports = router;
