const express = require('express'),
  router = express.Router(),
  smartsheet = require('../modules/smartsheet'),
  bodyParser = require('body-parser').json();

router.get('/', async (req, res, next) => {
  const data = await smartsheet.getWebhooks();
  res.send(data);
});

router.get('/:id', async (req, res) => {
  try {
    const data = await smartsheet.getWebhook(req.params.id);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

/**
 * Example of request body
 * {
 *   "name": "myWebhook",
 *   "callbackUrl": "https://smartsheetdemo.df.r.appspot.com/columns",
 *   "scope": "sheet",
 *   "scopeObjectId": 8831471046682500, // this is the id of the sheet
 *   "subscope": { // add this to filter down changes on the sheet to a specific column(s)
 *     "columnIds": [
 *       3162797054945156
 *     ]
 *   },
 *   "events": ["*.*"],
 *   "version": 1
 * }
 */
router.post('/', bodyParser, async (req, res) => {
  const data = await smartsheet.createWebhook(req.body);
  res.send(data);
});

/**
 * Example of request body
 * {
 *   "enabled": true,
 * }
 */
router.post('/:id', bodyParser, async (req, res) => {
  const data = await smartsheet.updateWebhook(req.params.id, req.body);
  res.send(data);
});

module.exports = router;