declare namespace feathersAuthenticationHooks {
  type associationOptions = {
    idField?: string;
    as?: string;
  };

  type roleOptions = {
    roles: string[];
    fieldName?: string;
    idField?: string;
    ownerField?: string;
    owner?: boolean;
  };

  type restrictOptions = {
    roles: string[];
    fieldName?: string;
    restrict?: any;
  };

  function queryWithCurrentUser(options: associationOptions): void;
  function restrictToOwner(options: associationOptions): void;
  function restrictToAuthenticated(options: {entity: string}): void;
  function associateCurrentUser(options: associationOptions): void;
  function restrictToRoles(options: roleOptions): void;
  function hasRoleOrRestrict(options: restrictOptions): void;
}

export = feathersAuthenticationHooks;
