import React, { Component } from 'react';
import { Icon, Card, Table, Row, Col, Button, List } from 'antd';
import styles from './styles';
import dataSource from './datasource';
import columns from './columns';

import SendNotificationModal from './components/SendNotificationModal';
import CreateFSRModal from './components/CreateFSRModal';
import CreateAnnouncementModal from './components/CreateAnnouncementModal';
import SettingsModal from './components/SettingsModal';

import { SEND_NOTIFICATION } from './duck';
import { CREATE_FSR } from './duck';
import { CREATE_ANNOUNCEMENT } from './duck';
import { SETTINGS } from './duck';

import { GET_ANNOUCEMENTS, GET_NOTIFICATIONS } from './duck';

const { Item: ListItem } = List;

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAnnouncements();
    this.props.getNotifications();
    this.props.getUsers({ limit: 99999 });
  }

  render() {
    const {
      isSendNotificationModalOpen,
      isCreateFSRModalOpen,
      isCreateAnnouncementModalOpen,
      isSettingsModalOpen,

      searchedUsers,
      users,

      addNotification,
      addAnnouncement,
      announcements,
      notifications,

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
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(SEND_NOTIFICATION)}
              >
                <Icon type="bell" style={styles.icons} />
                <p style={styles.description}>Send Notification</p>
              </Button>

              <CreateFSRModal
                isCreateFSRModalOpen={isCreateFSRModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
                users={users}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(CREATE_FSR)}
              >
                <Icon type="file-add" style={styles.icons} />
                <p style={styles.description}>Create FSR</p>
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
                <Icon type="notification" style={styles.icons} />
                <p style={styles.description}>Create Announcement</p>
              </Button>
              <SettingsModal
                isSettingsModalOpen={isSettingsModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(SETTINGS)}
              >
                <Icon type="setting" style={styles.icons} />
                <p style={styles.description}>Settings</p>
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
                actions={[
                  <Icon
                    type="plus-circle-o"
                    style={styles.iconsAnnouncement}
                    onClick={() => toggleModal(CREATE_ANNOUNCEMENT)}
                  />,
                ]}
              >
                <List
                  bordered
                  size="large"
                  locale={{ emptyText: 'No announcements found' }}
                  dataSource={announcements}
                  itemLayout="horizontal"
                  renderItem={item => (
                    <ListItem
                      style={styles.listItems}
                      actions={[
                        <Icon style={styles.listItems} type="close-circle" />,
                      ]}
                    >
                      <Row type="flex" style={styles.listItems}>
                        {item.body}
                      </Row>
                    </ListItem>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={styles.announcement}
                title="Notifications"
                actions={[
                  <Icon
                    type="plus-circle-o"
                    style={styles.iconsAnnouncement}
                    onClick={() => toggleModal(SEND_NOTIFICATION)}
                  />,
                ]}
              >
                <List
                  bordered
                  size="large"
                  locale={{ emptyText: 'No notifications found' }}
                  dataSource={notifications}
                  itemLayout="horizontal"
                  renderItem={item => (
                    <ListItem
                      style={styles.listItems}
                      actions={[
                        <Icon style={styles.listItems} type="close-circle" />,
                      ]}
                    >
                      <Row type="flex" style={styles.listItems}>
                        {item.message}
                      </Row>
                    </ListItem>
                  )}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={12} type="flex">
            <Col span={24}>
              <Card title="Logs">
                <Table
                  columns={columns}
                  dataSource={dataSource}
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
