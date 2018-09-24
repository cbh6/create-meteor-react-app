import Security from '../../security';
import RepoUsers from '../../../db/users/repository';

Meteor.methods({
  getEmailFromToken(token) {
    /* Get user email */
    check(token, String);
    const user = Meteor.users.findOne({
      'services.password.reset.token': token,
    });
    const userEmail = user.emails[0].address;

    return userEmail;
  },
  createNewUser(data) {
    check(data, Object);
    const id = Accounts.createUser({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    Roles.addUsersToRoles(id, 'user', 'default-group');
    return true;
  },
  getUserData() {
    Security.checkLoggedIn();
    return RepoUsers.findOne(Meteor.userId());
  },
  updateUserData(userId, options) {
    check(userId, String);
    check(options, Object);
    Security.checkLoggedIn();
    Security.checkLoggedUser(userId);
    RepoUsers.updateById(userId, options);
  },
  changeUserPassword(userId, password) {
    check(userId, String);
    check(password, String);
    Security.checkLoggedIn();
    Security.checkLoggedUser(userId);
    Accounts.setPassword(userId, password);
  },
});
