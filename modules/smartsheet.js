var client = require('smartsheet');
var constants = require('../constants/constants');

const smartsheet = () => {
    const createClient = () => {
        return client.createClient({
            accessToken: constants.smartsheetToken
        });
    }
    return {
        getClient: async () => {
            return createClient();
        },
        getSheets: async () => {
            return await createClient().sheets.listSheets({ 
                queryParameters: {
                    includeAll: true
                }
            });
        },
        getWebhooks: async () => {
            return await createClient().webhooks.listWebhooks({});
        },
        getWebhook: async (id) => {
            return await createClient().webhooks.getWebhook({
                webhookId: id
            });
        },
        createWebhook: async (body) => {
            return await createClient().webhooks.createWebhook({
                body
            });
        },
        updateWebhook: async (webhookId, body) => {
            return await createClient().webhooks.updateWebhook({
                webhookId,
                body
            });
        },
        getRow: async (sheetId, rowId) => {
            return await createClient().sheets.getRow({
                sheetId,
                rowId
            });
        },
        getSheet: async (id, columnId) => {
            return await createClient().sheets.getSheet(
                {
                    id,
                    queryParameters : {
                        columnIds: columnId,
                    }
                }
            );
        },
        getColumns: async (sheetId, columnId) => {
            return await createClient().sheets.getColumns({
                sheetId,
                columnId
            });
        },
        updateColumn: async (sheetId, columnId, body) => {
            return await createClient().sheets.updateColumn({
                sheetId,
                columnId,
                body
            });
        }
    }
};

module.exports = smartsheet();