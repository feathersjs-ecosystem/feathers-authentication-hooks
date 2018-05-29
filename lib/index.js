const associateCurrentUser = require('./associate-current-user');
const queryWithCurrentUser = require('./query-with-current-user');
const restrictToAuthenticated = require('./restrict-to-authenticated');
const restrictToOwner = require('./restrict-to-owner');

module.exports = {
  associateCurrentUser,
  queryWithCurrentUser,
  restrictToAuthenticated,
  restrictToOwner
};
