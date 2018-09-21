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
});
