// TypeScript Version: 3.0
import { Hook } from '@feathersjs/feathers';

export interface HookOptions {
  from: string | string[];
  as: string | string[];
  allowUndefined?: boolean;
}

export const setField: ((options?: HookOptions) => Hook);
