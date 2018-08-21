const { get, set } = require('lodash');

const defaults = {
  idField: '_id',
  as: 'userId',
  expandPaths: true
};

module.exports = function (options = {}) {
  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error(`The 'queryWithCurrentUser' hook should only be used as a 'before' hook.`);
    }

    options = Object.assign({}, defaults, hook.app.get('authentication'), options);
    const userEntity = hook.params[options.entity || 'user'];

    if (!userEntity) {
      if (!hook.params.provider) {
        return hook;
      }

      throw new Error('There is no current user to associate.');
    }

    const id = get(userEntity, options.idField);

    if (id === undefined) {
      throw new Error(`Current user is missing '${options.idField}' field.`);
    }

    if (options.expandPaths) {
      set(hook.params, `query.${options.as}`, id);
    } else {
      hook.params.query[options.as] = id;
    }
  };
};
