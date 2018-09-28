import UsersHelpers from './helpers';
import UserSchema from './schema';

const Users = Meteor.users;
Users.helpers(UsersHelpers);
Users.attachSchema(UserSchema);

export default Users;
