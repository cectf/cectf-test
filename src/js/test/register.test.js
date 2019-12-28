const testData = require('./test-data');
const utils = require('./utils');

const email = 'email@email.com';
const username = 'newUser';
const password = 'newUser';

const bad_email = 'emailemailcom';
const short_username = 'aa';
const short_password = 'abcde';
const bad_password = 'password';

describe('register', () => {

  describe('register with incomplete info', () => {
    utils.setupNightmare();
    beforeAll(() => {
      nightmare.click('#register__link');
    });

    it('bad email', async () => {
      nightmare
        .insert('#register-modal__email', bad_email)
        .insert('#register-modal__username', username)
        .insert('#register-modal__password', password)
        .click('#register-modal__submit');
      await utils.waitForPopup('error', 'Email is formatted incorectly');
    });

    it('short username', async () => {
      nightmare
        .insert('#register-modal__email')
        .insert('#register-modal__email', email)
        .insert('#register-modal__username')
        .insert('#register-modal__username', short_username)
        .insert('#register-modal__password')
        .insert('#register-modal__password', password)
        .click('#register-modal__submit');
      await utils.waitForPopup('error', 'Username must have 3 or more characters');
    });

    it('short password', async () => {
      nightmare
        .insert('#register-modal__email')
        .insert('#register-modal__email', email)
        .insert('#register-modal__username')
        .insert('#register-modal__username', username)
        .insert('#register-modal__password')
        .insert('#register-modal__password', short_password)
        .click('#register-modal__submit');
      await utils.waitForPopup('error', 'Password must have 6 or more characters');
    });

    it('bad password', async () => {
      nightmare
        .insert('#register-modal__email')
        .insert('#register-modal__email', email)
        .insert('#register-modal__username')
        .insert('#register-modal__username', username)
        .insert('#register-modal__password')
        .insert('#register-modal__password', bad_password)
        .click('#register-modal__submit');
      await utils.waitForPopup('error', 'good god why would you choose that password');
    });
  });

  describe('register as new user', () => {

    utils.setupNightmare();
    beforeAll(() => {
      nightmare
        .click('#register__link')
        .insert('#register-modal__email', email)
        .insert('#register-modal__username', username)
        .insert('#register-modal__password', password)
        .click('#register-modal__submit')
        .wait('#user-bar[data-logged-in="true"]');
    });

    it('welcome message', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('#user-bar__welcome').innerText;
        })
        .then(message => {
          expect(message).toEqual('Welcome, user ' + username + '!')
        });
    });

  });

  describe('login as new user', () => {

    utils.setupNightmare();
    beforeAll(() => {
      nightmare
        .click('#register__link')
        .insert('#register-modal__email', email)
        .insert('#register-modal__username', username)
        .insert('#register-modal__password', password)
        .click('#register-modal__submit')
        .wait('#user-bar[data-logged-in="true"]')
        .click('#logout')
        .wait('#user-bar[data-logged-in="false"]');
    });
    utils.loginAs({ username: username, password: password });

    it('welcome message', () => {
      return nightmare
        .wait(500)
        .evaluate(() => {
          return document.querySelector('#user-bar__welcome').innerText;
        })
        .then(message => {
          expect(message).toEqual('Welcome, user ' + username + '!')
        });
    });

  });

});