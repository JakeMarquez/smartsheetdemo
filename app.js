
const express = require('express'),
    sheets = require('./routes/sheets'),
    webhooks = require('./routes/webhooks'),
    columns = require('./routes/columns'),
    constants = require('./constants/constants'),
    app = express(),
    port = process.env.PORT || 3000;

if (constants.local) {
    app.use('/webhooks', webhooks);
    app.use('/sheets', sheets);
}

app.use('/columns', columns);

app.listen(port, () => { });

module.exports = app;