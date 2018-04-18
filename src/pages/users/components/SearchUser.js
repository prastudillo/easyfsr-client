import React, { Component } from 'react';
import { Form, Input, Select, Button, Icon } from 'antd';

import styles from '../styles';
import { getFieldValues } from '../../../utils';

const { Group: InputGroup } = Input;
const { Option } = Select;

class SearchUser extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.getUsers({ ...this.props.query, ...getFieldValues(values) });
        this.props.changeQuery({
          ...this.props.query,
          ...getFieldValues(values),
        });
      }
    });
  };

  handleClear = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        this.props.form.resetFields();
        this.props.getUsers();
      }
    });
  };

  render() {
    const {
      query,

      form,
    } = this.props;

    return (
      <Form style={styles.searchForm} onSubmit={this.handleFormSubmit}>
        <InputGroup size="large" compact style={styles.searchGrid}>
          {form.getFieldDecorator('firstName@@facultySearch')(
            <Input style={styles.inputSearch} placeholder="First Name" />,
          )}
          {form.getFieldDecorator('lastName@@facultySearch')(
            <Input style={styles.inputSearch} placeholder="Last Name" />,
          )}
          {form.getFieldDecorator('sortBy@@facultySearch', {
            initialValue: 'ASC',
          })(
            <Select size="large" style={styles.sort}>
              <Option value="ASC">Ascending</Option>
              <Option value="DESC">Descending</Option>
            </Select>,
          )}
          <Button size="large" onClick={this.handleClear}>
            <Icon type="close" />
          </Button>
          <Button size="large" htmlType="submit" type="primary">
            <Icon type="search" />
          </Button>
        </InputGroup>
      </Form>
    );
  }
}

export default Form.create()(SearchUser);
