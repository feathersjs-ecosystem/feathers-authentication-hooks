const associateCurrentUser = require('./associate-current-user');
const queryWithCurrentUser = require('./query-with-current-user');
const restrictToAuthenticated = require('./restrict-to-authenticated');
const restrictToOwner = require('./restrict-to-owner');
const restrictToRoles = require('./restrict-to-roles');
const hasRoleOrRestrict = require('./has-role-or-restrict');

let hooks = {
  associateCurrentUser,
  queryWithCurrentUser,
  restrictToAuthenticated,
  restrictToOwner,
  restrictToRoles,
  hasRoleOrRestrict
};

module.exports = hooks;
