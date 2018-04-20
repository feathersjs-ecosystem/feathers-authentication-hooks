const errors = require('@feathersjs/errors');
const get = require('lodash.get');

module.exports = function (options = { entity: 'user' }) {
  console.error('The restrictToAuthenticated hook is deprecated. The latest feathers-authentication authenticate hook handles this already.');

  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error(`The 'restrictToAuthenticated' hook should only be used as a 'before' hook.`);
    }

    if (hook.params.provider && get(hook.params, options.entity) === undefined) {
      throw new errors.NotAuthenticated('You are not authenticated.');
      // TODO (EK): Add debug log to check to see if the user is populated, if the token was verified and warn appropriately
    }
  };
};
