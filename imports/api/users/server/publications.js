import RepoUsers from '../../../db/users/repository';

Meteor.publish('users-list', () => RepoUsers.findAll());
