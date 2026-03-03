import { NgxApiMimicMockData } from './mock-data';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
}

interface UserList {
  items: User[];
  totalCount: number;
}

export class ExampleMock extends NgxApiMimicMockData<UserList> {
  constructor() {
    super('users', {
      type: 'object',
      items: {
        items: {
          type: 'array',
          itemCount: 100,
          item: {
            type: 'object',
            items: {
              id: {
                type: 'string'
              },
              firstName: {
                type: 'firstName'
              },
              lastName: {
                type: 'lastName'
              },
              email: {
                type: 'email'
              },
              age: {
                type: 'number',
                min: 18,
                max: 100,
                precision: 0,
                round: true
              },
              password: {
                type: 'password'
              }
            }
          }
        },
        totalCount: {
          type: "static",
          value: 100
        }
      }
    }, true);
  }
}
