const testData = require('./test-data');
const utils = require('./utils');

describe('challenge', () => {

  describe('no flags submitted', () => {

    utils.setupNightmare();
    utils.loginAsContestant();
    utils.openCTFTab();

    describe('first challenge', () => {

      it('title', () => {
        return nightmare
          .wait('#challenges > [data-id="1"]')
          .evaluate(() => {
            return document.querySelector('#challenges > [data-id="1"] > [data-id="title"]').innerText;
          })
          .then(solution => {
            expect(solution).toEqual(testData.challenges[0].title);
          });
      });

      it('category', () => {
        return nightmare
          .wait('#challenges > [data-id="1"]')
          .evaluate(() => {
            return document.querySelector('#challenges > [data-id="1"] > [data-id="category"]').innerText;
          })
          .then(solution => {
            expect(solution).toEqual(testData.challenges[0].category);
          });
      });

      it('not hinted', () => {
        return nightmare
          .wait('#challenges > [data-id="1"]')
          .exists('#challenges > [data-id="1"] > [data-id="hint"]')
          .then(exists => {
            expect(exists).toEqual(false);
          });
      });

      it('not solved', () => {
        return nightmare
          .wait('#challenges > [data-id="1"]')
          .exists('#challenges > [data-id="1"] > [data-id="solution"]')
          .then(exists => {
            expect(exists).toEqual(false);
          });
      });

    });

    describe('second challenge', () => {

      it('title', () => {
        return nightmare
          .wait('#challenges > [data-id="2"]')
          .evaluate(() => {
            return document.querySelector('#challenges > [data-id="2"] > [data-id="title"]').innerText;
          })
          .then(solution => {
            expect(solution).toEqual(testData.challenges[1].title);
          });
      });

      it('category', () => {
        return nightmare
          .wait('#challenges > [data-id="2"]')
          .evaluate(() => {
            return document.querySelector('#challenges > [data-id="2"] > [data-id="category"]').innerText;
          })
          .then(solution => {
            expect(solution).toEqual(testData.challenges[1].category);
          });
      });

      it('not hinted', () => {
        return nightmare
          .wait('#challenges > [data-id="2"]')
          .exists('#challenges > [data-id="2"] > [data-id="hint"]')
          .then(exists => {
            expect(exists).toEqual(false);
          });
      });

      it('not solved', () => {
        return nightmare
          .wait('#challenges > [data-id="2"]')
          .exists('#challenges > [data-id="2"] > [data-id="solution"]')
          .then(exists => {
            expect(exists).toEqual(false);
          });
      });

    });

  });

  describe('submitting a correct flag', () => {

    utils.setupNightmare();
    utils.loginAsContestant();
    utils.openCTFTab();
    beforeAll(() => {
      nightmare
        .wait('#challenges > [data-id="1"]')
        .click('#challenges > [data-id="1"]')
        .insert('#flag', testData.challenges[0].solution)
        .click('#submit')
        .wait('#challenges > [data-id="1"] > [data-id="solution"]');
    });

    it('challenge solved', () => {
      return nightmare
        .exists('#challenges > [data-id="1"] > [data-id="solution"]')
        .then(exists => {
          expect(exists).toEqual(true);
        });
    });

    it('solution value', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('#challenges > [data-id="1"] > [data-id="solution"]').innerText;
        })
        .then(solution => {
          expect(solution).toEqual('Flag: ' + testData.challenges[0].solution);
        });
    });
  });

  describe('submitting an incorrect flag', () => {

    utils.setupNightmare();
    utils.loginAsContestant();
    utils.openCTFTab();
    beforeAll(() => {
      nightmare
        .wait('#challenges > [data-id="2"]')
        .click('#challenges > [data-id="2"]')
        .insert('#flag', testData.challenges[1].solution + '!!!!!!!!')
        .click('#submit')
        .wait(2000);
    });

    it('challenge solved', () => {
      return nightmare
        .exists('#challenges > [data-id="2"] > [data-id="solution"]')
        .then(exists => {
          expect(exists).toEqual(false);
        });
    });

  });
});