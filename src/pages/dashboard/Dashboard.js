import React, { Component } from 'react';
import { Icon, Card, Table, Row, Col, Button, List } from 'antd';
import styles from './styles';
import columns from './columns';
import moment from 'moment';

import SendNotificationModal from './components/SendNotificationModal';
import CreateFSRModal from './components/CreateFSRModal';
import CreateAnnouncementModal from './components/CreateAnnouncementModal';
import SettingsModal from './components/SettingsModal';

import { SEND_NOTIFICATION } from './duck';
import { CREATE_FSR } from './duck';
import { CREATE_ANNOUNCEMENT } from './duck';
import { SETTINGS } from './duck';

const { Item: ListItem } = List;

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAnnouncements();
    this.props.getNotifications({ isResolved: 0 });
    this.props.getLog();
  }

  handleDeleteAnnouncement = announcementID => {
    this.props.deleteAnnouncement(announcementID);
  };

  handleDeleteNotification = notificationID => {
    this.props.deleteNotification(notificationID);
  };

  render() {
    const {
      isSendNotificationModalOpen,
      isCreateFSRModalOpen,
      isCreateAnnouncementModalOpen,
      isSettingsModalOpen,
      isGettingNotifications,
      isGettingAnnouncements,
      isDeletingAnnouncement,
      isDeletingNotification,

      searchedUsers,

      addNotification,
      addAnnouncement,
      addMetaData,

      announcements,
      notifications,
      log,

      toggleModal,
      searchUser,
    } = this.props;
    return (
      <div>
        <Row type="flex">
          <Col span={24}>
            <Button.Group style={styles.menu}>
              <SendNotificationModal
                isSendNotificationModalOpen={isSendNotificationModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
                searchedUsers={searchedUsers}
                searchUser={searchUser}
                addNotification={addNotification}
                notifications={notifications}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(SEND_NOTIFICATION)}
              >
                <Icon
                  type="bell"
                  className="text normal"
                  style={styles.icons}
                />
                <p className="text normal" style={styles.description}>
                  Send Notification
                </p>
              </Button>

              <CreateFSRModal
                isCreateFSRModalOpen={isCreateFSRModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(CREATE_FSR)}
              >
                <Icon
                  type="file-add"
                  className="text normal"
                  style={styles.icons}
                />
                <p className="text normal" style={styles.description}>
                  Create FSR
                </p>
              </Button>

              <CreateAnnouncementModal
                isCreateAnnouncementModalOpen={isCreateAnnouncementModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
                addAnnouncement={addAnnouncement}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(CREATE_ANNOUNCEMENT)}
              >
                <Icon
                  type="notification"
                  className="text normal"
                  style={styles.icons}
                />
                <p className="text normal" style={styles.description}>
                  Create Announcement
                </p>
              </Button>
              <SettingsModal
                isSettingsModalOpen={isSettingsModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
                addMetaData={addMetaData}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(SETTINGS)}
              >
                <Icon
                  type="setting"
                  className="text normal"
                  style={styles.icons}
                />
                <p className="text normal" style={styles.description}>
                  Settings
                </p>
              </Button>
            </Button.Group>
          </Col>
        </Row>
        <div>
          <Row gutter={12} type="flex">
            <Col span={12}>
              <Card
                style={styles.announcement}
                title="Announcements"
                loading={isGettingAnnouncements}
                actions={[
                  <Icon
                    type="plus-circle-o"
                    style={styles.iconsAnnouncement}
                    onClick={() => toggleModal(CREATE_ANNOUNCEMENT)}
                  />,
                ]}
              >
                <div style={{ maxHeight: 500, overflowY: 'auto' }}>
                  <List
                    bordered
                    size="large"
                    locale={{ emptyText: 'No current announcements' }}
                    dataSource={announcements}
                    itemLayout="horizontal"
                    renderItem={announcement => (
                      <ListItem
                        style={styles.listItems}
                        actions={[
                          <Icon
                            style={styles.listItems}
                            type={
                              isDeletingAnnouncement
                                ? 'loading'
                                : 'close-circle'
                            }
                            spin={isDeletingAnnouncement}
                            onClick={() =>
                              this.handleDeleteAnnouncement(
                                announcement.announcementID,
                              )
                            }
                          />,
                        ]}
                      >
                        <Row style={styles.listItems}>
                          <h3 className="text primary">{announcement.title}</h3>
                          <p className="text normal">{announcement.body}</p>
                        </Row>
                      </ListItem>
                    )}
                  />
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={styles.announcement}
                title="Notifications"
                loading={isGettingNotifications}
                actions={[
                  <Icon
                    type="plus-circle-o"
                    style={styles.iconsAnnouncement}
                    onClick={() => toggleModal(SEND_NOTIFICATION)}
                  />,
                ]}
              >
                <div style={{ maxHeight: 500, overflowY: 'auto' }}>
                  <List
                    bordered
                    size="large"
                    locale={{ emptyText: 'No notifications found' }}
                    dataSource={notifications}
                    itemLayout="horizontal"
                    renderItem={notification => (
                      <ListItem
                        style={styles.listItems}
                        actions={[
                          <Icon
                            style={styles.listItems}
                            type="close-circle"
                            spin={isDeletingNotification}
                            onClick={() =>
                              this.handleDeleteNotification(
                                notification.notificationID,
                              )
                            }
                          />,
                        ]}
                      >
                        <Row type="flex" style={styles.listItems}>
                          <dl>
                            <dt>Sender</dt>
                            <dd>{notification.senderID}</dd>
                          </dl>
                          <dl>
                            <dt>Receiver</dt>
                            <dd>{notification.receiverID}</dd>
                          </dl>
                          <dl>
                            <dt>Message</dt>
                            <dd>{notification.message}</dd>
                          </dl>
                          <dl>
                            <dt>Time</dt>
                            <dd>
                              {moment(notification.timestamp).format(
                                'MMMM DD, YYYY hh:MM',
                              )}
                            </dd>
                          </dl>
                        </Row>
                      </ListItem>
                    )}
                  />
                </div>
              </Card>
            </Col>
          </Row>
          <Row gutter={12} type="flex">
            <Col span={24}>
              <Card title="Logs">
                <Table
                  columns={columns}
                  dataSource={log.map(row => ({
                    ...row,
                    timestamp: moment(row.timestamp).format(
                      'MMM DD YYYY hh:mm:ss A',
                    ),
                  }))}
                  style={styles.facultyTable}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;
