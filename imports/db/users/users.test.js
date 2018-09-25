/* eslint func-names: "off" */
/* eslint consistent-return: "off" */

// Tests for the behavior of the users collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import faker from 'faker';
import Users from './users';

Factory.define('user', Users, {
  username: faker.name.findName(),
  createdAt: new Date(),
  emails: [{ address: faker.internet.email(), verified: false }],
});

if (Meteor.isServer) {
  describe('users collection', () => {
    let user = null;

    before(() => {
      user = Factory.build('user');
    });

    it('builds correctly from factory', () => {
      assert.typeOf(user, 'object');
      assert.typeOf(user.createdAt, 'date');
      assert.typeOf(user.emails, 'array');
      assert.equal(user.emails.length, 1);
    });
    it('inserts correctly', () => {
      const userId = Users.insert(user);

      const added = Users.find({ _id: userId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'users');
      assert.equal(count, 1);
    });
  });
}
