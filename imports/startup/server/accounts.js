/* ACCOUNTS CONFIGURATIONS
---------------------------------- */

Accounts.onLogin((user) => {
  console.log(user.user.username, 'logged in');
});

Accounts.onLogout((user) => {
  if (user && user.user) console.log(user.user.username, 'logged out');
});

/* Email templating --------------------------------------------------------------------- */
Accounts.urls.resetPassword = token => Meteor.absoluteUrl(`new-password/${token}`);
Accounts.urls.verifyEmail = token => Meteor.absoluteUrl(`verify-email/${token}`);

SSR.compileTemplate('passwordResetTemplate', Assets.getText('reset-pass-template.html'));

Accounts.emailTemplates.resetPassword = {
  from: () => 'no-reply@meteorapp.com',
  subject: () => 'Reset Your Account Password',
  html: (user, url) => SSR.render('passwordResetTemplate', { url }),
};

// Note: MAIL_URL with an email service api key should be set as environment variable
