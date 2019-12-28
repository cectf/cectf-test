const testData = require('./test-data');
const utils = require('./utils');

describe('login', () => {

  describe('logging in as contestant', () => {

    utils.setupNightmare();
    utils.loginAsContestant();

    it('welcome message', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('#user-bar__welcome').innerText;
        })
        .then(message => {
          expect(message).toEqual('Welcome, user ' + testData.users.contestant.username + '!')
        });
    });

    it('nav tabs', () => {
      return nightmare
        .evaluate(() => {
          return Array.prototype.map.call(
            document.querySelectorAll('#nav-bar div'),
            element => { return element.innerText; }
          );
        })
        .then(elementContents => {
          expect(elementContents).toEqual(['About', 'CTF']);
        });
    });
  });


  describe('logging in as admin', () => {

    utils.setupNightmare();
    utils.loginAsAdmin();

    it('welcome message', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('#user-bar__welcome').innerText;
        })
        .then(message => {
          expect(message).toEqual('Welcome, user ' + testData.users.admin.username + '!')
        });
    });

    it('nav tabs', () => {
      return nightmare
        .evaluate(() => {
          return Array.prototype.map.call(
            document.querySelectorAll('#nav-bar div'),
            element => { return element.innerText; }
          );
        })
        .then(elementContents => {
          expect(elementContents).toEqual(['About', 'Admin']);
        });
    });
  });


  describe('logging in with bad credentials', () => {

    utils.setupNightmare();
    beforeAll(() => {
      return nightmare
        .wait('#username')
        .insert('#username', 'username')
        .insert('#password', 'password')
        .click('#login')
    });

    it('error popup', async () => {
      await utils.waitForPopup('error', 'Username/password not found');
    });

    it('not logged in', () => {
      return nightmare
        .wait(2000)
        .wait('#user-bar[data-logged-in="false"]');
    });
  });
});