import { connect } from 'react-redux';
import Dashboard from './Dashboard';

import {
  toggleModal,
  searchUser,
  getUsers,
  addNotification,
  addAnnouncement,
  getAnnouncements,
  getNotifications,
  changeSelectedUsers,
} from './duck';

const mapStateToProps = state => {
  const {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isCreateAnnouncementModalOpen,
    isSettingsModalOpen,

    isAddingNotification,
    isAddingAnnouncement,

    user,
    users,
    searchedUsers,
    selectedUsers,
    announcements,
    notifications,
  } = state.dashboard;

  return {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isCreateAnnouncementModalOpen,
    isSettingsModalOpen,

    isAddingNotification,
    isAddingAnnouncement,

    user,
    users,
    searchedUsers,
    selectedUsers,
    announcements,
    notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => {
      dispatch(toggleModal(modal));
    },
    searchUser: query => {
      dispatch(searchUser(query));
    },
    addNotification: values => {
      dispatch(addNotification(values));
    },
    addAnnouncement: values => {
      dispatch(addAnnouncement(values));
    },
    getAnnouncements: () => {
      dispatch(getAnnouncements());
    },
    getNotifications: () => {
      dispatch(getNotifications());
    },
    getUsers: query => {
      dispatch(getUsers(query));
    },
    changeSelectedUsers: user => {
      dispatch(changeSelectedUsers(user));
    },
  };
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard,
);
export default DashboardContainer;
