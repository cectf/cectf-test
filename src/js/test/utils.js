const testData = require('./test-data');
const Nightmare = require('nightmare');

jest.setTimeout(20000);

var setupNightmare = function () {
    beforeAll(() => {
        nightmare = new Nightmare({ show: CECTF_SHOW_TEST_WINDOW });
        nightmare.goto(CECTF_URL + '/api/test/reset');
        nightmare.goto(CECTF_URL);
        nightmare.wait('#app-content')
        return nightmare;
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

module.exports = {
    setupNightmare,
    loginAs,
    loginAsContestant,
    loginAsAdmin,
    openAboutTab,
    openCTFTab,
    openAdminTab
};