const get = require('lodash.get');
const set = require('lodash.set');

const defaults = {
  idField: '_id',
  as: 'userId'
};

module.exports = function (options = {}) {
  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error(`The 'associateCurrentUser' hook should only be used as a 'before' hook.`);
    }

    if (!hook.params.user) {
      if (!hook.params.provider) {
        return hook;
      }

      throw new Error('There is no current user to associate.');
    }

    options = Object.assign({}, defaults, hook.app.get('authentication'), options);

    const id = get(hook.params.user, options.idField);

    if (id === undefined) {
      throw new Error(`Current user is missing '${options.idField}' field.`);
    }

    function setId (obj) {
      set(obj, options.as, id);
    }

    // Handle arrays.
    if (Array.isArray(hook.data)) {
      hook.data.forEach(setId);

    // Handle single objects.
    } else {
      setId(hook.data);
    }
  };
};
