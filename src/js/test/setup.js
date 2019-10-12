const Nightmare = require('nightmare');

jest.setTimeout(10000);

global.nightmare = null;

var setupNightmare = function (before, after) {
    beforeAll(() => {
        nightmare = new Nightmare({ show: false });
        nightmare.goto(CECTF_URL + '/api/test/reset');
        nightmare.goto(CECTF_URL);
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

var loginAsUser = function(before, after) {
    return setupNightmare(before,(nightmare) => {

        after(nightmare);
    });
}

module.exports = { nightmare: setupNightmare };