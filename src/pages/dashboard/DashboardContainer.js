import { connect } from 'react-redux';
import Dashboard from './Dashboard';

import {
  toggleModal,
  searchUser,
  addNotification,
  deleteNotification,
  deleteAnnouncement,
  addAnnouncement,
  getAnnouncements,
  getNotifications,
  getLog,
  addMetaData,
  resetPage,
} from './duck';

const mapStateToProps = state => {
  const {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isCreateAnnouncementModalOpen,
    isSettingsModalOpen,

    isAddingNotification,
    isAddingAnnouncement,
    isDeletingAnnouncement,
    isGettingAnnouncements,
    isGettingNotifications,
    isDeletingNotification,

    isGettingLogs,

    user,
    searchedUsers,
    announcements,
    notifications,
    log,
  } = state.dashboard;

  return {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isCreateAnnouncementModalOpen,
    isSettingsModalOpen,

    isAddingNotification,
    isAddingAnnouncement,
    isDeletingAnnouncement,
    isGettingAnnouncements,
    isGettingNotifications,
    isDeletingNotification,

    isGettingLogs,

    user,
    searchedUsers,
    announcements,
    notifications,
    log,
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
    deleteNotification: id => {
      dispatch(deleteNotification(id));
    },
    addAnnouncement: values => {
      dispatch(addAnnouncement(values));
    },
    deleteAnnouncement: id => {
      dispatch(deleteAnnouncement(id));
    },
    getAnnouncements: () => {
      dispatch(getAnnouncements());
    },
    getNotifications: query => {
      dispatch(getNotifications(query));
    },
    getLog: () => {
      dispatch(getLog());
    },
    addMetaData: values => {
      dispatch(addMetaData(values));
    },
    resetPage: () => {
      dispatch(resetPage());
    },
  };
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard,
);
export default DashboardContainer;
