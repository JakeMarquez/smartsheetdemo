const express = require('express'),
  router = express.Router(),
  asyncHandler = require('express-async-handler'),
  // https://zellwk.com/blog/async-await-express/
  smartsheet = require('../modules/smartsheet'),
  computers = require('./../constants/computers'),
  rentals = require('./../constants/rentals'),
  logging = require('./../modules/logging'),
  bodyParser = require('body-parser').json();

router.use((req, res, next) => {
    if (req.headers['smartsheet-hook-challenge']) {
        res.setHeader('smartsheet-hook-response', req.headers['smartsheet-hook-challenge']);
        res.send({
            smartsheetHookResponse: req.headers['smartsheet-hook-challenge']
        });
    } else {
        next();
    }
});

router.post('/', bodyParser, asyncHandler(async(req, res) => {
    const { rows } = await smartsheet.getSheet(computers.id, computers.friendlyName);
    const options = rows.map(x => x.cells.length ? x.cells[0].displayValue : false);
    await smartsheet.updateColumn(rentals.id, rentals.computer, {
        index: 0,
        type: 'PICKLIST',
        options
    });
    res.sendStatus(200);
}));

router.use((error, req, res, next) => {
    if (error) {
        logging.err(error);
        res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
});

module.exports = router;