var express = require('express')
var router = express.Router()
var smartsheet = require('../modules/smartsheet');

router.get('/', async (req, res) => {
  const sheets = await smartsheet.getSheets();
  res.send(sheets);
});

router.get('/search/:id', async (req, res) => {
  const sheets = await smartsheet.getSheets();
  res.send(sheets.data.filter(x =>
      x.name.includes(req.params.id)
  ));
});

router.get('/columns/:id', async (req, res) => {
  const sheet = await smartsheet.getSheet(req.params.id);
  res.send(sheet.columns.map(x => { return  { id: x.id, title: x.title } }));
});

router.get('/:id', async (req, res) => {
  const sheet = await smartsheet.getSheet(req.params.id);
  res.send(sheet);
});

module.exports = router 