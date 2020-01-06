# cectf-test

[![Build Status](https://travis-ci.com/cectf/cectf-test.svg?branch=master)](https://travis-ci.com/cectf/cectf-test)

End to end tests for the cectf project.

These tests are run against the [staging environment](https://ctf-staging.chiquito.us), which is an almost identical deployment to the [production environment](https://ctf.chiquito.us). This project is managed on [Travis CI](https://travis-ci.com/cectf/cectf-test), which triggers a test run every night to ensure nothing has crashed. Test runs are also triggered whenever a commit is pushed to the `master` branch, and can also be triggered manually in Travis CI whenever desired.

These tests are built with [Nightmare JS](http://www.nightmarejs.org/), a lightweight, headless browser automation library that runs on Electron. I also considered Selenium, but setting up all the required selenium dependencies, chromedriver, and getting XVFB working on [Travis CI](https://travis-ci.com/cectf/cectf-test) is a substantial amount of work. If the project grows substantially I may migrate it.

## Installation

Installation should be as simple as running `npm install`. It's possible that you may also need to run `sudo apt-get install -y libgconf-2-4`. 

## Running Tests

To run the test suite against the staging environment, use `npm test`.

To run the test suite against a development environment, use `npm run test-dev`. This script will use the `jest.dev.config.js` jest configuration file instead of the default `jest.config.js`. You can edit this file to make debugging tests easier: set `CECTF_SHOW_TEST_WINDOW` to `true` to show the test window so you can see what is happening, and set `CECTF_SHOW_DEVTOOLS` to `true` to automatically open chromium devtools so you can inspect the DOM and run commands in the console.
