const { Logging } = require('@google-cloud/logging');
const constants = require('../constants/constants');
const logging = new Logging({ projectId: constants.gcpProject });

const gLog = async (msg, isError) => {
    const log = logging.log(constants.gcpProject);
    const metadata = {
        resource: {type: 'global'},
        severity: isError ? 'ERROR' : 'INFO',
    };

    const entry = log.entry(metadata, msg);
    await log.write(entry);
}

const log = (msg) => constants.local ? console.log(msg) : gLog(msg);

const err = (msg) => constants.local ? console.error(msg) : gLog(msg, true);

module.exports = { log, err };