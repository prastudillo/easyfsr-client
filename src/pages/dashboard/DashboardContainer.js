import { connect } from 'react-redux';
import Dashboard from './Dashboard';

import { toggleModal } from './duck';

const mapStateToProps = state => {
  const {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isDownloadFSRModalOpen,
    isEditFSRModalOpen,
    isViewFSRModalOpen,
  } = state.dashboard;

  return {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isDownloadFSRModalOpen,
    isEditFSRModalOpen,
    isViewFSRModalOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => {
      dispatch(toggleModal(modal));
    },
  };
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard,
);
export default DashboardContainer;