import feathers from '@feathersjs/feathers';
import { setField } from 'feathers-authentication-hooks';

const app = feathers();

app.use('/dummy', {
  async get(id: string) {
    return { id };
  }
});

app.service('dummy').hooks({
  before: setField({
    from: 'params.user.id',
    as: 'params.query.userId'
  })
});
