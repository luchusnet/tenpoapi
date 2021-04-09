/* eslint-disable no-unused-expressions */
'use strict';
const chai = require('chai');
const expect = require('chai').expect;
const spies = require('chai-spies');
const app = require('../../../server/server');
chai.use(spies);
const sandbox = chai.spy.sandbox();

describe('/services/user-service', () => {
  describe('UserService functions', () => {
    beforeEach((done) => {
      done();
    });

    afterEach((done) => {
      sandbox.restore();
      done();
    });

    describe('loginUser()', () => {
      let aUser = {
        username: 'luchus',
        password: 'luchus',
      };

      it('login success', (done) => {
        app.models.User.login(aUser, function(error) {
          expect(error).to.be.null;
          done();
        });
      });
    });
  });
});
