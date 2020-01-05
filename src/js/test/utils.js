const testData = require('./test-data');
const Nightmare = require('nightmare');
const fetch = require('node-fetch');

jest.setTimeout(20000);

var setupNightmare = function () {
    beforeAll(() => {
        var args = { show: CECTF_SHOW_TEST_WINDOW };
        if (CECTF_SHOW_DEVTOOLS) {
            args.openDevTools = {
                mode: 'detach'
            }
        }

        return fetch(CECTF_URL + '/api/test/reset')
            .then(() => {
                nightmare = new Nightmare(args);
                nightmare.viewport(1000, 800);
                nightmare.goto(CECTF_URL);
                nightmare.wait('#app-content');
                return;
            });
    });
    afterAll(() => {
        return nightmare.end();
    })
}

var loginAs = function (user) {
    beforeAll(() => {
        return nightmare
            .wait('#username')
            .insert('#username', user.username)
            .insert('#password', user.password)
            .click('#login')
            .wait('#user-bar[data-logged-in="true"]');
    });
}

var loginAsContestant = function () {
    loginAs(testData.users.contestant);
}

var loginAsAdmin = function () {
    loginAs(testData.users.admin);
}

var openTab = function (tabId, dataContent) {
    beforeAll(() => {
        return nightmare
            .wait('#nav-bar')
            .click('#' + tabId)
            .wait('#app-content[data-content="' + dataContent + '"]');
    });
}

var openAboutTab = function () {
    openTab('nav-about', 'ABOUT');
}

var openCTFTab = function () {
    openTab('nav-ctf', 'CTF');
}

var openAdminTab = function () {
    openTab('nav-admin', 'ADMIN');
}

var popupLocations = {
    topBar: "TOP_BAR",
    challengeTile: "CHALLENGE_TILE",
    signup: "SIGNUP"
}

var getPopup = function (location, locationKey) {
    var locator = (locationKey)
        ? '[data-location="' + location + '"][data-location-key="' + locationKey + '"]'
        : '[data-location="' + location + '"]';
    return nightmare.evaluate(locator => {
        var element = document.querySelector(locator);
        return {
            level: element.attributes['data-level'].value,
            text: element.innerHTML,
        }
    }, locator);
}

var waitForPopup = function (level, text, location, locationKey) {
    return new Promise(async resolve => {
        var popup = await getPopup(location, locationKey);
        if (popup.level === level && popup.text === text) {
            return resolve(popup);
        }
        setTimeout(() => waitForPopup(level, text, location, locationKey)
            .then(popup => {
                resolve(popup);
            }),
            1000);
    });
}

module.exports = {
    setupNightmare,
    loginAs,
    loginAsContestant,
    loginAsAdmin,
    openAboutTab,
    openCTFTab,
    openAdminTab,
    popupLocations,
    getPopup,
    waitForPopup
};