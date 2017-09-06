declare namespace feathersAuthenticationHooks {
  interface Hook {
    <T>(hook: HookProps<T>): Promise<any> | void;
  }

  interface HookProps<T> {
    method?: string;
    type: 'before' | 'after' | 'error';
    params?: any;
    data?: T;
    result?: T;
    app?: feathers.Application;
  }

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

  function queryWithCurrentUser<T>(options: associationOptions): Hook;

  function restrictToOwner(options: associationOptions): Hook;

  function restrictToAuthenticated(options: {entity?: string}): Hook;

  function associateCurrentUser(options: associationOptions): Hook;

  function restrictToRoles(options: roleOptions): Hook;

  function hasRoleOrRestrict(options: restrictOptions): Hook;
}

export = feathersAuthenticationHooks;
