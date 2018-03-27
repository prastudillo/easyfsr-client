import React, { Component } from 'react';
import { Button, Icon, Input, Table, Row, List, Col } from 'antd';
import styles from './styles';
import facultyData from './faculty-data';
const { Item } = List;
const Search = Input.Search;
class FacultySearch extends Component {
  render() {
    return (
      <div>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          style={{ width: 700 }}
        />

        <List
          size="large"
          style={{ top: 25 }}
          header={
            <Item>
              <Col span={8}>
                <div>Name</div>
              </Col>

              <Col span={8}>
                <div>ID</div>
              </Col>

              <Col span={8}>
                <div>Contract Type</div>
              </Col>
            </Item>
          }
          //footer={<div></div>}
          bordered
          dataSource={facultyData}
          renderItem={item => (
            <Item>
              <Col span={8}>
                <div>{item.name}</div>
              </Col>

              <Col span={8}>
                <div>{item.employeeID}</div>
              </Col>

              <Col span={8}>
                <div>{item.contracttype}</div>
              </Col>
            </Item>
          )}
        />
      </div>
    );
  }
}

export default FacultySearch;
