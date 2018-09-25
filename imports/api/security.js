export default class Security {
  static isAdmin() {
    return Roles.userIsInRole(Meteor.userId(), ['admin'], 'default-group');
  }

  static isUser() {
    return Roles.userIsInRole(Meteor.userId(), ['user'], 'default-group');
  }

  static checkLoggedIn() {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You are not logged in');
    }
  }

  static checkLoggedUser(userId) {
    if (userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You are not authorized');
    }
  }
}
