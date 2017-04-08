import associateCurrentUser from './associate-current-user';
import queryWithCurrentUser from './query-with-current-user';
import restrictToAuthenticated from './restrict-to-authenticated';
import restrictToOwner from './restrict-to-owner';
import restrictToRoles from './restrict-to-roles';
import hasRoleOrRestrict from './has-role-or-restrict';

let hooks = {
  associateCurrentUser,
  queryWithCurrentUser,
  restrictToAuthenticated,
  restrictToOwner,
  restrictToRoles,
  hasRoleOrRestrict
};

export default hooks;
