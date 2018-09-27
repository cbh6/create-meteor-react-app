/* for publications eslint func-names and consistent-return rules should be disabled */
/* eslint func-names: "off" */
/* eslint consistent-return: "off" */

import RepoUsers from '../../../db/users/repository';
import Security from '../../security';

Meteor.publish('users-list', function () {
  if (Security.isAdmin(this.userId)) {
    return RepoUsers.findAll();
  }
  return this.ready();
});
