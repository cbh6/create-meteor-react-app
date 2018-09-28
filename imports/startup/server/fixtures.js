// Fill the DB with example data on startup

/* The number of days from when a user logs in until their token expires and
they are logged out. Defaults to 90. Set to null to disable login expiration. */
Accounts.config({ loginExpirationInDays: null });

Meteor.startup(() => {
  // If there are no users (first time running the app)
  if (Meteor.users.find().count() === 0) {
    const id = Accounts.createUser({
      username: 'Administrator',
      email: 'admin@admin.com',
      password: 'admin123',
      profile: {
        first_name: 'fname',
        last_name: 'lname',
        company: 'company',
      },
    });

    // Set admin role
    Roles.addUsersToRoles(id, ['admin'], 'default-group');
  }
});
