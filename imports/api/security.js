export default class Security {
  static isAdmin(userId) {
    return Roles.userIsInRole(userId, ['admin'], 'default-group');
  }

  static isUser() {
    return Roles.userIsInRole(this.userId, ['user'], 'default-group');
  }

  static checkLoggedIn() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You are not logged in');
    }
  }

  static checkLoggedUser(userId) {
    if (userId !== this.userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized');
    }
  }
}
