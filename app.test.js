const request = require('supertest'),
    computers = require('./constants/computers'),
    rentals = require('./constants/rentals'),
    smartsheet = require('./modules/smartsheet'),
    app = require('./app');

describe('Smartsheets', () => {
    it ('Can create client', async () => {
        const client = await smartsheet.getClient();
        expect(client).toBeDefined();
    });
    it ('Can access the computers sheet', async () => {
        expect(computers.id).toBeDefined();
        const data = await smartsheet.getSheet(computers.id);
        expect(data).toBeTruthy();
    });
    it ('Can access the rentals sheet', async () => {
        expect(rentals.id).toBeDefined();
        const data = await smartsheet.getSheet(rentals.id);
        expect(data).toBeTruthy();
    });
    it ('Has friendly name column on computers sheet', async () => {
        expect(computers.id).toBeDefined();
        expect(computers.friendlyName).toBeDefined();
        const { columns } = await smartsheet.getSheet(computers.id, computers.friendlyName);
        expect(columns).toBeDefined();
        expect(columns).toHaveLength(1);
        expect(columns).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: parseFloat(computers.friendlyName),
                    type: 'TEXT_NUMBER'
                })
            ])
        );
    });
    it ('Has computer column on rentals sheet', async () => {
        expect(rentals.id).toBeDefined();
        expect(rentals.computer).toBeDefined();
        const { columns } = await smartsheet.getSheet(rentals.id, rentals.computer);
        expect(columns).toBeDefined();
        expect(columns).toHaveLength(1);
        expect(columns).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: parseFloat(rentals.computer),
                    type: 'PICKLIST'
                })
            ])
        );
    });
});

describe('Columns Webhook', () => {
    it ('Updates rentals sheet computer column', () => {
        return request(app)
            .post('/columns')
            .expect(200)
    });
});