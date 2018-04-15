import React, { Component, Fragment } from 'react';
import { Icon, Modal, Button } from 'antd';

import { PageLoader, Schedule, DataLoader } from '../../global';
import ProfileIcon from './components/ProfileIcon';
import ProfileInfo from './components/ProfileInfo';

import { SCHEDULE_MODAL } from './duck';
import styles from './styles';

class Profile extends Component {
  componentDidMount() {
    const { userID } = this.props.match.params;

    this.props.getUserProfile(userID);
    this.props.getAdminWork(userID);
    this.props.getUserExtensionAndCommService(userID);
  }

  componentWillUnmount() {
    this.props.resetPage();
  }

  toggleScheduleModal = () => {
    this.props.toggleModal(SCHEDULE_MODAL);
  };

  render() {
    const {
      user,
      adminWork,
      service,

      isGettingUser,
      isUploadingIcon,
      isLoadingCards,
      isSchedModalOpen,

      uploadIcon,
      toggleModal,
    } = this.props;

    return (
      <div>
        {isGettingUser ? (
          <PageLoader />
        ) : (
          <Fragment>
            <Modal
              title="Schedule"
              visible={isSchedModalOpen}
              width={811 + 48}
              onOk={this.toggleScheduleModal}
              onCancel={this.toggleScheduleModal}
            >
              <Schedule data={[]} />
            </Modal>
            <div className="center" style={styles.header}>
              <ProfileIcon
                user={user}
                isUploadingIcon={isUploadingIcon}
                uploadIcon={uploadIcon}
              />
              <h1 className="center text white" style={styles.profileName}>
                {user.firstName} {user.middleName} {user.lastName}
              </h1>
              <div style={styles.info}>
                <div>
                  <Icon type="user" style={styles.iconPad} />
                  {user.employeeID}
                </div>
                <div>
                  <Icon type="environment-o" style={styles.iconPad} />
                  {user.officeNumber}
                </div>
                <div>
                  <Icon type="idcard" style={styles.iconPad} />
                  {user.contractType} Employee
                </div>
                <div>
                  <Icon type="mail" style={styles.iconPad} />
                  {user.emailAddress}
                </div>
              </div>
              <div style={styles.actions}>
                <Button ghost onClick={this.toggleScheduleModal}>
                  View Schedule
                  <Icon type="right" />
                </Button>
              </div>
            </div>
            {Object.values(isLoadingCards).every(e => e) ? (
              <DataLoader isLoading opaque />
            ) : (
              <ProfileInfo
                adminWork={adminWork}
                service={service}
                isLoadingCards={isLoadingCards}
              />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Profile;
