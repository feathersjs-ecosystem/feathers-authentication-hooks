import { expect } from 'chai';
import hooks from '../src/index';
import 'babel-polyfill';

describe('Auth hooks', () => {
  it('is CommonJS compatible', () => {
    expect(typeof require('../lib/index')).to.equal('object');
  });

  it('is ES6 compatible', () => {
    expect(typeof hooks).to.equal('object');
  });

  it('exposes associateCurrentUser hook', () => {
    expect(typeof hooks.associateCurrentUser).to.equal('function');
  });

  it('exposes queryWithCurrentUser hook', () => {
    expect(typeof hooks.queryWithCurrentUser).to.equal('function');
  });

  it('exposes restrictToAuthenticated hook', () => {
    expect(typeof hooks.restrictToAuthenticated).to.equal('function');
  });

  it('exposes restrictToRoles hook', () => {
    expect(typeof hooks.restrictToRoles).to.equal('function');
  });

  it('exposes restrictToOwner hook', () => {
    expect(typeof hooks.restrictToOwner).to.equal('function');
  });

  it('exposes hasRoleOrRestrict hook', () => {
    expect(typeof hooks.hasRoleOrRestrict).to.equal('function');
  });
});
