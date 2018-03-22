import React, { Component } from 'react';
import { Layout, Form, Input, Button } from 'antd';

import { handleFormSubmit } from './actions';
import styles from './styles';
import logo from './easyFSR.svg';

const { Header, Content } = Layout;
const { Group: InputGroup } = Input;

class Login extends Component {
  handleFormSubmit = handleFormSubmit.bind(this);

  render() {
    const { form, isLoggingIn } = this.props;

    return (
      <Layout className="fullpage background clear">
        <Header className="background clear" style={styles.header}>
          <img src={logo} alt="" style={styles.logo.top} />
        </Header>
        <Content>
          <div className="border" style={styles.pagecontainer}>
            <div style={styles.wrapper}>
              <div className="container border" style={styles.section}>
                Image
              </div>
              <div
                className="container border"
                style={{ ...styles.section, ...styles.login }}
              >
                <h1 className="super text primary">Lorem ipsum</h1>
                <p className="subtitle text meta border">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et consectetur
                  adipiscing elit.
                </p>
                <Form style={styles.form} onSubmit={this.handleFormSubmit}>
                  <InputGroup
                    compact
                    size="large"
                    style={{ ...styles.inputgroup, ...styles.margin }}
                  >
                    {form.getFieldDecorator('emailAddress@@login', {
                      rules: [{ required: true }],
                    })(<Input placeholder="Email" style={styles.input} />)}
                    {form.getFieldDecorator('password@@login', {
                      rules: [{ required: true }],
                    })(
                      <Input
                        placeholder="Password"
                        type="password"
                        style={styles.input}
                      />,
                    )}
                  </InputGroup>

                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={styles.margin}
                    loading={isLoggingIn}
                  >
                    Login
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Login);