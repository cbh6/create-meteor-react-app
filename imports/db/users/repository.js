import Users from './users';

function findOne(id) {
  const user = Users.findOne({ _id: id });
  if (!user) {
    throw new Meteor.Error('usersQueries.userNotExist', 'User not found');
  }
  return user;
}

function updateById(id, options) {
  Users.update(id, { $set: options });
}

export default {
  findOne,
  updateById,
};
