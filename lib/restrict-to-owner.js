const errors = require('@feathersjs/errors');
const { get, isPlainObject } = require('lodash');
const queryWithCurrentUser = require('./query-with-current-user');

const defaults = {
  idField: '_id',
  ownerField: 'userId',
  expandPaths: true
};

module.exports = function (options = {}) {
  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error(`The 'restrictToOwner' hook should only be used as a 'before' hook.`);
    }

    options = Object.assign({}, defaults, hook.app.get('authentication'), options);

    const userEntity = hook.params[options.entity || 'user'];

    // If it was an internal call then skip this hook
    if (!hook.params.provider) {
      return hook;
    }

    if (hook.method === 'find' || hook.id === null) {
      return queryWithCurrentUser({
        idField: options.idField,
        as: options.ownerField,
        expandPaths: options.expandPaths
      })(hook);
    }

    // Check hook is being called on an allowable method
    if (!(hook.method === 'get' || hook.method === 'update' || hook.method === 'patch' || hook.method === 'remove')) {
      throw new errors.MethodNotAllowed(`The 'restrictToOwner' hook should only be used on the 'get', 'update', 'patch' and 'remove' service methods.`);
    }

    if (!userEntity) {
      // TODO (EK): Add a debugger call to remind the dev to check their hook chain
      // as they probably don't have the right hooks in the right order.
      throw new errors.NotAuthenticated(`The current user is missing. You must not be authenticated.`);
    }

    const id = get(userEntity, options.idField);

    if (id === undefined) {
      throw new Error(`'${options.idField} is missing from current user.'`);
    }

    // look up the document and throw a Forbidden error if the user is not an owner
    // Set provider as undefined so we avoid an infinite loop if this hook is
    // set on the resource we are requesting.
    const params = Object.assign({}, hook.params, { provider: undefined });

    return hook.service.get(hook.id, params).then(data => {
      if (data.toJSON) {
        data = data.toJSON();
      } else if (data.toObject) {
        data = data.toObject();
      }

      let field = get(data, options.ownerField);

      // Handle nested Sequelize or Mongoose models
      if (isPlainObject(field)) {
        field = field[options.idField];
      }

      if (Array.isArray(field)) {
        const fieldArray = field.map(idValue => idValue.toString());
        if (fieldArray.length === 0 || fieldArray.indexOf(id.toString()) < 0) {
          throw new errors.Forbidden('You do not have the permissions to access this.');
        }
      } else if (field === undefined || field.toString() !== id.toString()) {
        throw new errors.Forbidden('You do not have the permissions to access this.');
      }

      return hook;
    });
  };
};
