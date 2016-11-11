# feathers-legacy-authentication-hooks

[![Build Status](https://travis-ci.org/feathersjs/feathers-legacy-authentication-hooks.png?branch=master)](https://travis-ci.org/feathersjs/feathers-legacy-authentication-hooks)
[![Code Climate](https://codeclimate.com/github/feathersjs/feathers-legacy-authentication-hooks/badges/gpa.svg)](https://codeclimate.com/github/feathersjs/feathers-legacy-authentication-hooks)
[![Test Coverage](https://codeclimate.com/github/feathersjs/feathers-legacy-authentication-hooks/badges/coverage.svg)](https://codeclimate.com/github/feathersjs/feathers-legacy-authentication-hooks/coverage)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-legacy-authentication-hooks.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-legacy-authentication-hooks)
[![Download Status](https://img.shields.io/npm/dm/feathers-legacy-authentication-hooks.svg?style=flat-square)](https://www.npmjs.com/package/feathers-legacy-authentication-hooks)

> Hooks from feathers-authentication@0.7.x

## Installation

```
npm install feathers-legacy-authentication-hooks --save
```

## Documentation

The following hooks are included in this module:

- associateCurrentUser
- hashPassword
- populateUser
- queryWithCurrentUser
- restrictToAuthenticated
- restrictToOwner
- restrictToRoles
- verifyToken
- verifyOrRestrict
- populateOrRestrict
- hasRoleOrRestrict

These hooks were previously bundled with the feathers-authentication module, but have been deprecated in favor of the [feathers-permissions hooks](https://github.com/feathersjs/feathers-permissions).

Please refer to the [feathers-legacy-authentication-hooks documentation](http://docs.feathersjs.com/) for more details.

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
