const associateCurrentUser = require('./associate-current-user');
const queryWithCurrentUser = require('./query-with-current-user');
const restrictToOwner = require('./restrict-to-owner');

module.exports = {
  associateCurrentUser,
  queryWithCurrentUser,
  restrictToOwner
};
