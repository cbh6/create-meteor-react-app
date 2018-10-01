export default class Security {
  static isAdmin(userId) {
    return Roles.userIsInRole(userId, ['admin'], 'default-group');
  }

  static isUser(userId) {
    return Roles.userIsInRole(userId, ['user'], 'default-group');
  }

  static checkLoggedIn(userId) {
    if (!userId) {
      throw new Meteor.Error('not-authorized', 'You are not logged in');
    }
  }

  static checkLoggedUser(userId) {
    if (userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You are not authorized');
    }
  }
}
