const { get, set, update } = require('lodash');

const defaults = {
  idField: '_id',
  as: 'userId',
  array: false
};

module.exports = function (options = {}) {
  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error(`The 'associateCurrentUser' hook should only be used as a 'before' hook.`);
    }

    options = Object.assign({}, defaults, hook.app && hook.app.get('authentication'), options);
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

    function setId (obj) {
      if (options.array) {
        update(
          obj,
          options.as,
          (val) => (Array.isArray(val) ? val : []).concat([id])
        );
      } else {
        set(obj, options.as, id);
      }
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
