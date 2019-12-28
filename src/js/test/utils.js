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

var getPopups = function () {
    return nightmare.evaluate(() => {
        var elements = document.querySelectorAll('#popups > div');
        var popups = [];
        for (var i = 0; i < elements.length; i++) {
            popups.push({
                text: elements[i].innerHTML,
                level: elements[i].attributes['data-level'].value
            });
        }
        return popups;
    }).catch(error => {
        console.log("EMERGENCY");
        console.log(error);
        return [];
    });
}

var waitForPopup = function (level, text) {
    return new Promise(async resolve => {
        var popups = await getPopups();
        if (popups.length > 0) {
            var matchingPopups = popups.filter(popup => {
                return popup.level === level && popup.text === text;
            });
            if (matchingPopups.length > 0) {
                return resolve();
            }
        }
        setTimeout(() => waitForPopup(level, text)
            .then(() => {
                resolve();
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
    getPopups,
    waitForPopup
};