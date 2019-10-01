# feathers-authentication-hooks

[![Greenkeeper badge](https://badges.greenkeeper.io/feathersjs-ecosystem/feathers-authentication-hooks.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/feathersjs-ecosystem/feathers-authentication-hooks.svg?branch=master)](https://travis-ci.org/feathersjs-ecosystem/feathers-authentication-hooks)
[![Dependency Status](https://img.shields.io/david/feathersjs-ecosystem/feathers-authentication-hooks.svg?style=flat-square)](https://david-dm.org/feathersjs-ecosystem/feathers-authentication-hooks)
[![Download Status](https://img.shields.io/npm/dm/feathers-authentication-hooks.svg?style=flat-square)](https://www.npmjs.com/package/feathers-authentication-hooks)

> A hook that helps limiting and associating user requests

```
$ npm install feathers-authentication-hooks --save
```

`feathers-authentication-hooks` contains a [Feathers hook](https://docs.feathersjs.com/api/hooks.html) that allows to set query or data properties based on other existing properties (like an authenticated user or organization id).

> **Note:** `feathers-authentication-hooks` v1.0.0 and later requires Feathers 4 or later.

## setField

The `setField` hook allows to set a field on the [hook context](https://docs.feathersjs.com/api/hooks.html#hook-context) based on the value of another field on the hook context.

### Options

- `from` *required* - The property on the hook context to use. Can be an array (e.g. `[ 'params', 'user', 'id' ]`) or a dot separated string (e.g. `'params.user.id'`).
- `as` *required* - The property on the hook context to set. Can be an array (e.g. `[ 'params', 'query', 'userId' ]`) or a dot separated string (e.g. `'params.query.userId'`).
- `allowUndefined` (default: `false`) - If set to `false`, an error will be thrown if the value of `from` is `undefined` in an external request (`params.provider` is set). On internal calls (or if set to true `true` for external calls) the hook will do nothing.

> __Important:__ This hook should be used after the [authenticate hook](https://docs.feathersjs.com/api/authentication/hook.html#authenticate-strategies) when accessing user fields (from `params.user`).

### Examples

Limit all external access of the `users` service to the authenticated user:

> __Note:__ For MongoDB, Mongoose and NeDB `params.user.id` needs to be changed to `params.user._id`. For any other custom id accordingly.

```js
const { authenticate } = require('@feathersjs/authentication');
const { setField } = require('feathers-authentication-hooks');

app.service('users').hooks({
  before: {
    all: [
      authenticate('jwt'),
      setField({
        from: 'params.user.id',
        as: 'params.query.id'
      })
    ]
  }
})
```

Only allow access to invoices for the users organization:

```js
const { authenticate } = require('@feathersjs/authentication');
const { setField } = require('feathers-authentication-hooks');

app.service('invoices').hooks({
  before: {
    all: [
      authenticate('jwt'),
      setField({
        from: 'params.user.organizationId',
        as: 'params.query.organizationId'
      })
    ]
  }
})
```

Set the current user id as `userId` when creating a message and only allow users to edit and remove their own messages:

```js
const { authenticate } = require('@feathersjs/authentication');
const { setField } = require('feathers-authentication-hooks');

const setUserId = setField({
  from: 'params.user.id',
  as: 'data.userId'
});
const limitToUser = setField({
  from: 'params.user.id',
  as: 'params.query.userId'
});

app.service('messages').hooks({
  before: {
    all: [
      authenticate('jwt')
    ],
    create: [
      setUserId
    ],
    patch: [
      limitToUser
    ],
    update: [
      limitToUser
    ]
    remove: [
      limitToUser
    ]
  }
})
```

## Migrating to v1.0.0

The previous versions of `feathers-authentication-hooks` contained several hooks that required more detailed configuration and knowledge about the application and authentication. Due to [improvements in the database adapters](https://docs.feathersjs.com/guides/migrating.html#querying-by-id) in Feathers 4 those hooks can now all be replaced with the `setField` hook and a more explicit configuration.

### queryWithCurrentUser

Before:

```js
const hooks = require('feathers-authentication-hooks');

app.service('messages').before({
  find: [
    hooks.queryWithCurrentUser({ idField: 'id', as: 'sentBy' })
  ]
});
```

Now:

```js
const { setField } = require('feathers-authentication-hooks');

app.service('messages').before({
  find: [
    setField({
      from: 'params.user.id',
      as: 'params.query.sentBy'
    })
  ]
});
```

Dot separated paths in queries (previously with the `expandPaths` option) are possible by passing an array as the field name (using [Lodash _.set](https://lodash.com/docs/4.17.15#set) internally):

```js
const { setField } = require('feathers-authentication-hooks');

app.service('messages').before({
  find: [
    setField({
      from: 'params.user.id',
      as: [ 'params', 'query', 'nested.document.sentBy' ]
    })
  ]
});
```

### restrictToOwner

Due to improvements in the Feathers 4 database adapters restricting to an owner works the exact same as a `queryWithCurrentUser`. It will now throw a `NotFound` instead of a `Forbidden` error which is also more secure since an unauthorized user does not get the information if the record exists and no longer make an additional request.

Before:

```js
const hooks = require('feathers-authentication-hooks');

app.service('messages').before({
  remove: [
    hooks.restrictToOwner({ idField: 'id', ownerField: 'sentBy' })
  ]
});
```

Now:

```js
const { setField } = require('feathers-authentication-hooks');

app.service('messages').before({
  remove: [
    setField({
      from: 'params.user.id',
      as: 'params.query.userId'
    })
  ]
});
```

### associateCurrentUser

The `associateCurrentUser` can also be replaced by `setField` by setting `data` instead of `params.query.*`

Before:

```js
const hooks = require('feathers-authentication-hooks');

app.service('messages').before({
  create: [
    hooks.associateCurrentUser({ idField: 'id', as: 'sentBy' })
  ]
});
```

Now:

```js
const { setField } = require('feathers-authentication-hooks');

app.service('messages').before({
  create: [
    setField({
      from: 'params.user.id',
      as: 'data.sentBy'
    })
  ]
});
```

## License

Copyright (c) 2019

Licensed under the [MIT license](LICENSE).
