const Nightmare = require('nightmare');

jest.setTimeout(60000);

global.nightmare = null;

setupNightmare = function (before, after) {
    beforeAll(() => {
        console.log("BeforeAll!");
        nightmare = new Nightmare({ show: false });
        console.log("nightmare'd. sp00ky");
        nightmare.goto('http://ctf-staging.chiquito.us/');
        console.log("goto san");
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