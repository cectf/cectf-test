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
          .then(title => {
            expect(title).toEqual(testData.challenges[0].title);
          });
      });

      it('category', () => {
        return nightmare
          .wait('#challenges > [data-id="1"]')
          .evaluate(() => {
            return document.querySelector('#challenges > [data-id="1"] > [data-id="category"]').innerText;
          })
          .then(category => {
            expect(category).toEqual(testData.challenges[0].category);
          });
      });

      it('not solved', () => {
        return nightmare
          .wait('#challenges > [data-id="1"]')
          .evaluate(() => {
            return document.querySelector('#challenges > [data-id="1"]').attributes['data-solved'].value;
          })
          .then(solved => {
            expect(solved).toEqual('false');
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

      it('not solved', () => {
        return nightmare
          .wait('#challenges > [data-id="2"]')
          .evaluate(() => {
            return document.querySelector('#challenges > [data-id="2"]').attributes['data-solved'].value;
          })
          .then(solved => {
            expect(solved).toEqual('false');
          });
      });

    });

  });

  describe('solving first challenge', () => {

    utils.setupNightmare();
    utils.loginAsContestant();
    utils.openCTFTab();
    beforeAll(() => {
      nightmare
        .wait('#challenges > [data-id="1"]')
        .click('#challenges > [data-id="1"]')
        .insert('#flag', testData.challenges[0].solution)
        .click('#submit')
        .wait('#challenges > [data-id="1"][data-solved="true"]');
    });

    it('challenge solved', () => {
      return nightmare
        .wait('#challenges > [data-id="1"]')
        .evaluate(() => {
          return document.querySelector('#challenges > [data-id="1"]').attributes['data-solved'].value;
        })
        .then(solved => {
          expect(solved).toEqual('true');
        });
    });
  });

  describe('solving second challenge', () => {

    utils.setupNightmare();
    utils.loginAsContestant();
    utils.openCTFTab();
    beforeAll(() => {
      nightmare
        .wait('#challenges > [data-id="2"]')
        .click('#challenges > [data-id="2"]')
        .insert('#flag', testData.challenges[1].solution)
        .click('#submit')
        .wait('#challenges > [data-id="2"][data-solved="true"]');
    });

    it('challenge solved', () => {
      return nightmare
        .wait('#challenges > [data-id="2"]')
        .evaluate(() => {
          return document.querySelector('#challenges > [data-id="2"]').attributes['data-solved'].value;
        })
        .then(solved => {
          expect(solved).toEqual('true');
        });
    });

    it('next challenge present', () => {
      return nightmare
        .wait('#challenges > [data-id="3"]')
        .evaluate(() => {
          return document.querySelector('#challenges > [data-id="3"] > [data-id="title"]').innerText;
        })
        .then(solution => {
          expect(solution).toEqual(testData.challenges[2].title);
        });
    });

    it('next challenge not solved', () => {
      return nightmare
        .wait('#challenges > [data-id="3"]')
        .evaluate(() => {
          return document.querySelector('#challenges > [data-id="3"]').attributes['data-solved'].value;
        })
        .then(solved => {
          expect(solved).toEqual('false');
        });
    });
  });

  describe('submitting an incorrect flag', () => {

    utils.setupNightmare();
    utils.loginAsContestant();
    utils.openCTFTab();
    beforeAll(() => {
      nightmare
        .wait('#challenges > [data-id="1"]')
        .click('#challenges > [data-id="1"]')
        .insert('#flag', testData.challenges[0].solution + '!!!!!!!!')
        .click('#submit')
        .wait(2000);
    });

    it('challenge not solved', () => {
      return nightmare
        .wait('#challenges > [data-id="1"]')
        .evaluate(() => {
          return document.querySelector('#challenges > [data-id="1"]').attributes['data-solved'].value;
        })
        .then(solved => {
          expect(solved).toEqual('false');
        });
    });

  });
});