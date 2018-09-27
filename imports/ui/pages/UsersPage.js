import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {
  Container, Header, Segment, Table,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Users from '../../db/users/users';

const UsersPage = (props) => {
  const { users, loading } = props;
  return (
    <Container>
      <Header as="h1">Users</Header>
      <Segment padded loading={loading}>
        <Table basic striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Roles</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users
              && users.map(user => (
                <Table.Row key={user._id}>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.emails[0].address}</Table.Cell>
                  <Table.Cell>{user.roles['default-group'][0]}</Table.Cell>
                  <Table.Cell>{user.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Segment>
    </Container>
  );
};

UsersPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array,
};

UsersPage.defaultProps = {
  users: [],
};

export default withTracker(() => {
  const handleUsers = Meteor.subscribe('users-list');
  return {
    loading: !handleUsers.ready(),
    users: (handleUsers.ready() && Users.find({}).fetch()) || [],
  };
})(UsersPage);
