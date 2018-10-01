// Tests for the users publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import faker from 'faker';
import { Random } from 'meteor/random';
import Users from '../../../db/users/users';
import './publications.js';

Factory.define('user', Meteor.users, {
  username: () => faker.lorem.word(),
  profile: {
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
  },
  emails() {
    return [
      {
        address: faker.internet.email(),
        verified: false,
      },
    ];
  },
  createdAt: new Date(),
});

describe('users publications', () => {
  const user = Factory.build('user');
  const admin = Factory.build('user', {
    roles: {
      'default-group': ['admin'],
    },
  });

  beforeEach(() => {
    Users.remove({});
    Users.insert(user);
    Users.insert(admin);
  });

  describe('users-list', () => {
    it('should not publish users being a user', (done) => {
      const collector = new PublicationCollector({ userId: Random.id() });
      collector.collect('users-list', (collections) => {
        assert.equal(collections.users, undefined);
        done();
      });
    });
    it('should publish users being an admin', (done) => {
      const collector = new PublicationCollector({ userId: admin._id });
      collector.collect('users-list', (collections) => {
        assert.equal(collections.users.length, 2);
        done();
      });
    });
  });
});
