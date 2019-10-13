const testData = require('./test-data');
const utils = require('./utils');

describe('register', () => {

  describe('register as new user', () => {

    utils.setupNightmare();
    beforeAll(() => {
      nightmare
        .click('#register__link')
        .insert('#register-modal__email', 'email@email.com')
        .insert('#register-modal__username', 'registerAsNewUser')
        .insert('#register-modal__password', 'registerAsNewUser')
        .click('#register-modal__submit')
        .wait('#user-bar[data-logged-in="true"]');
    });

    it('welcome message', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('#user-bar__welcome').innerText;
        })
        .then(message => {
          expect(message).toEqual('Welcome, user registerAsNewUser!')
        });
    });

  });

  describe('login as new user', () => {

    utils.setupNightmare();
    beforeAll(() => {
      nightmare
        .click('#register__link')
        .insert('#register-modal__email', 'email@email.com')
        .insert('#register-modal__username', 'loginAsNewUser')
        .insert('#register-modal__password', 'loginAsNewUser')
        .click('#register-modal__submit')
        .wait('#user-bar[data-logged-in="true"]')
        .click('#logout')
        .wait('#user-bar[data-logged-in="false"]');
    });
    utils.loginAs({ username: 'loginAsNewUser', password: 'loginAsNewUser' });

    it('welcome message', () => {
      return nightmare
        .wait(500)
        .evaluate(() => {
          return document.querySelector('#user-bar__welcome').innerText;
        })
        .then(message => {
          expect(message).toEqual('Welcome, user loginAsNewUser!')
        });
    });

  });

});