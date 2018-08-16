const { get, set } = require('lodash');

const defaults = {
  idField: '_id',
  as: 'userId'
};

module.exports = function (options = {}) {
  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error(`The 'associateCurrentUser' hook should only be used as a 'before' hook.`);
    }

    options = Object.assign({}, defaults, hook.app.get('authentication'), options);

    if (!hook.params[options.entity]) {
      if (!hook.params.provider) {
        return hook;
      }

      throw new Error('There is no current user to associate.');
    }

    const id = get(hook.params[options.entity], options.idField);

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
