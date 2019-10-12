const Nightmare = require('nightmare');

jest.setTimeout(10000);

global.nightmare = null;

setupNightmare = function (before, after) {
    beforeAll(() => {
        nightmare = new Nightmare({ show: false });
        nightmare.goto('http://ctf-staging.chiquito.us');
        if (before) {
            return before(nightmare);
        }
        return nightmare;
    });
    afterAll(() => {
        var promise = nightmare.end();
        if (after) {
            return after(promise);
        }
        return promise;
    })
}

module.exports = setupNightmare;