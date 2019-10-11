const setupNightmare = require('./setup');

describe('login', () => {

  it('dummy test', () => {
    return;
  });

  describe('logging in as contestant', () => {

    setupNightmare((nightmare) => {
      console.log('called contestant login setup');
      return nightmare
        .wait('#username')
        .insert('#username', 'a')
        .insert('#password', 'b')
        .click('#login')
        .wait('#user-bar[data-logged-in="true"]');
    });

    it('welcome message', () => {
      console.log('started welcome message test');
      return nightmare
        .evaluate(() => {
          console.log('evaluatin');
          return document.querySelector('#user-bar__welcome').innerText;
        })
        .then(message => {
          console.log('assertin', message);
          expect(message).toEqual('Welcome, user a!')
        });
    });

    it('nav tabs', () => {
      return nightmare
        .evaluate(() => {
          return Array.prototype.map.call(
            document.getElementsByClassName('nav-tab'),
            element => { return element.innerText; }
          );
        })
        .then(elementContents => {
          expect(elementContents).toEqual(['About', 'CTF']);
        });
    });
  });


  describe('logging in as admin', () => {

    setupNightmare((nightmare) => {
      return nightmare
        .wait('#username')
        .insert('#username', 'abc')
        .insert('#password', '123')
        .click('#login')
        .wait('#user-bar[data-logged-in="true"]');
    });

    it('welcome message', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('#user-bar__welcome').innerText;
        })
        .then(message => {
          expect(message).toEqual('Welcome, user abc!')
        });
    });

    it('nav tabs', () => {
      return nightmare
        .evaluate(() => {
          return Array.prototype.map.call(
            document.getElementsByClassName('nav-tab'),
            element => { return element.innerText; }
          );
        })
        .then(elementContents => {
          expect(elementContents).toEqual(['About', 'Admin']);
        });
    });
  });


  describe('logging in with bad credentials', () => {

    setupNightmare((nightmare) => {
      return nightmare
        .wait('#username')
        .insert('#username', 'username')
        .insert('#password', 'password')
        .click('#login')
    });

    it('logged in', () => {
      return nightmare
        .wait(2000)
        .wait('#user-bar[data-logged-in="false"]');
    });
  });
});