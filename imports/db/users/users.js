import UsersHelpers from './helpers';

const Users = Meteor.users;
Users.helpers(UsersHelpers);

export default Users;
