import React, { Component } from 'react';
import { Button, Row, Col, Pagination, Input } from 'antd';
import { DataLoader } from '../../global';

import User from './components/User';
import EditModal from './components/EditModal';
import AddModal from './components/AddModal';
import DeleteModal from './components/DeleteModal';

import styles from './styles';

const { Search } = Input;

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  componentWillUnmount() {
    this.props.resetPage();
  }

  render() {
    const gridConfig = { xxl: 6, xl: 8, sm: 12, xs: 24 };
    const {
      isEditModalOpen,
      isAddModalOpen,
      isDeleteModalOpen,

      isGettingUsers,
      isAddingUser,
      isEditingUser,

      toggleEditModal,
      toggleAddModal,
      toggleDeleteModal,
      changeSelectedUser,

      addUser,
      editUser,

      users,
      user,
    } = this.props;

    return (
      <div>
        <div style={styles.search}>
          <Search
            placeholder="Search user..."
            enterButton="Search"
            size="large"
            style={styles.searchBar}
          />
          <Button
            size="large"
            icon="plus-circle-o"
            ghost
            onClick={toggleAddModal}
          >
            Add User
          </Button>
        </div>
        <DataLoader
          isLoading={isGettingUsers}
          content={
            <Row type="flex" gutter={16}>
              {users.map((user, i) => (
                <Col key={i} {...gridConfig}>
                  <User
                    user={user}
                    title={`${user.lastName}, ${user.firstName}`}
                    description={user.acctType}
                    toggleEditModal={toggleEditModal}
                    toggleDeleteModal={toggleDeleteModal}
                    changeSelectedUser={changeSelectedUser}
                  />
                </Col>
              ))}
            </Row>
          }
        />
        <EditModal
          user={user}
          isEditModalOpen={isEditModalOpen}
          toggleEditModal={toggleEditModal}
          editUser={editUser}
          isEditingUser={isEditingUser}
          changeSelectedUser={changeSelectedUser}
        />
        <AddModal
          isAddModalOpen={isAddModalOpen}
          toggleAddModal={toggleAddModal}
          addUser={addUser}
          isAddingUser={isAddingUser}
        />
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          toggleDeleteModal={toggleDeleteModal}
          changeSelectedUser={changeSelectedUser}
        />
        <div style={styles.pagination}>
          <Pagination defaultCurrent={1} total={50} size="small" />
        </div>
      </div>
    );
  }
}

export default Users;
