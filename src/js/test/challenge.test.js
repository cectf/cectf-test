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
          .wait('#challenges [data-id="1"]')
          .evaluate(() => {
            return document.querySelector('#challenges [data-id="1"] [data-id="title"]').innerText;
          })
          .then(title => {
            expect(title).toEqual(testData.challenges[0].title);
          });
      });

      it('category', () => {
        return nightmare
          .wait('#challenges [data-id="1"]')
          .evaluate(() => {
            return document.querySelector('#challenges [data-id="1"] [data-id="category"]').innerText;
          })
          .then(category => {
            expect(category).toEqual(testData.challenges[0].category);
          });
      });

      it('not solved', () => {
        return nightmare
          .wait('#challenges [data-id="1"]')
          .evaluate(() => {
            return document.querySelector('#challenges [data-id="1"]').attributes['data-solved'].value;
          })
          .then(solved => {
            expect(solved).toEqual('false');
          });
      });

      it('no popup', () => {
        return utils.getPopup(utils.popupLocations.challengeTile, 1)
          .then(popup => {
            expect(popup).toEqual({
              level: '',
              text: ''
            });
          });
      });
    });

    describe('second challenge', () => {

      it('title', () => {
        return nightmare
          .wait('#challenges [data-id="2"]')
          .evaluate(() => {
            return document.querySelector('#challenges [data-id="2"] [data-id="title"]').innerText;
          })
          .then(solution => {
            expect(solution).toEqual(testData.challenges[1].title);
          });
      });

      it('category', () => {
        return nightmare
          .wait('#challenges [data-id="2"]')
          .evaluate(() => {
            return document.querySelector('#challenges [data-id="2"] [data-id="category"]').innerText;
          })
          .then(solution => {
            expect(solution).toEqual(testData.challenges[1].category);
          });
      });

      it('not solved', () => {
        return nightmare
          .wait('#challenges [data-id="2"]')
          .evaluate(() => {
            return document.querySelector('#challenges [data-id="2"]').attributes['data-solved'].value;
          })
          .then(solved => {
            expect(solved).toEqual('false');
          });
      });

      it('no popup', () => {
        return utils.getPopup(utils.popupLocations.challengeTile, 2)
          .then(popup => {
            expect(popup).toEqual({
              level: '',
              text: ''
            });
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
        .wait('#challenges [data-id="1"]')
        .click('#challenges [data-id="1"]')
        .insert('#challenges [data-id="1"] [data-id="flag"]', testData.challenges[0].solution)
        .click('#challenges [data-id="1"] [data-id="submit"]')
        .wait('#challenges > [data-id="1"][data-solved="true"]');
    });

    it('challenge solved', () => {
      return nightmare
        .wait('#challenges [data-id="1"]')
        .evaluate(() => {
          return document.querySelector('#challenges [data-id="1"]').attributes['data-solved'].value;
        })
        .then(solved => {
          expect(solved).toEqual('true');
        });
    });

    it('success popup', () => {
      return utils.waitForPopup('info', 'You did it!', utils.popupLocations.challengeTile, 1);
    });
  });

  describe('solving second challenge', () => {

    utils.setupNightmare();
    utils.loginAsContestant();
    utils.openCTFTab();
    beforeAll(() => {
      nightmare
        .wait('#challenges [data-id="2"]')
        .click('#challenges [data-id="2"]')
        .insert('#challenges [data-id="2"] [data-id="flag"]', testData.challenges[1].solution)
        .click('#challenges [data-id="2"] [data-id="submit"]')
        .wait('#challenges [data-id="2"][data-solved="true"]');
    });

    it('challenge solved', () => {
      return nightmare
        .wait('#challenges [data-id="2"]')
        .evaluate(() => {
          return document.querySelector('#challenges [data-id="2"]').attributes['data-solved'].value;
        })
        .then(solved => {
          expect(solved).toEqual('true');
        });
    });

    it('success popup', () => {
      return utils.waitForPopup('info', 'You did it!', utils.popupLocations.challengeTile, 2);
    });

    it('next challenge present', () => {
      return nightmare
        .wait('#challenges [data-id="3"]')
        .evaluate(() => {
          return document.querySelector('#challenges [data-id="3"] [data-id="title"]').innerText;
        })
        .then(solution => {
          expect(solution).toEqual(testData.challenges[2].title);
        });
    });

    it('next challenge not solved', () => {
      return nightmare
        .wait('#challenges [data-id="3"]')
        .evaluate(() => {
          return document.querySelector('#challenges [data-id="3"]').attributes['data-solved'].value;
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
        .wait('#challenges [data-id="1"]')
        .click('#challenges [data-id="1"]')
        .insert('#challenges [data-id="1"] [data-id="submit"]', testData.challenges[0].solution + '!!!!!!!!')
        .click('#challenges [data-id="1"] [data-id="submit"]')
        .wait(2000);
    });

    it('failure popup', () => {
      return utils.waitForPopup('error', 'That ain\'t right. n00b.', utils.popupLocations.challengeTile, 1);
    });

    it('challenge not solved', () => {
      return nightmare
        .wait('#challenges [data-id="1"]')
        .evaluate(() => {
          return document.querySelector('#challenges [data-id="1"]').attributes['data-solved'].value;
        })
        .then(solved => {
          expect(solved).toEqual('false');
        });
    });

  });
});