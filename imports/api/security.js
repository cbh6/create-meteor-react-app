export default class Security {
  static isAdmin() {
    return Roles.userIsInRole(Meteor.userId(), ['admin'], 'default-group');
  }
}
