const setup = require('./setup.js');

describe('challenge', () => {

  describe('no flags submitted', () => {

    setup.nightmare((nightmare) => {
      return nightmare
        .wait('#username')
        .insert('#username', 'a')
        .insert('#password', 'b')
        .click('#login')
        .wait('#user-bar[data-logged-in="true"]');
    });


  });

  describe('submitting a correct flag', () => {

    setup.nightmare((nightmare) => {
      return nightmare
        .wait('#username')
        .insert('#username', 'a')
        .insert('#password', 'b')
        .click('#login')
        .wait('#user-bar[data-logged-in="true"]');
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
});