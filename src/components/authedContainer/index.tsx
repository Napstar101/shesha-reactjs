import { Alert, Button, Form, Input, Modal } from 'antd';
import React, { FC, Fragment } from 'react';
import { useState } from 'react';
import { ShaRoutingProvider, useAuth } from '../../providers';
import { SidebarMenuProvider } from '../../providers/sidebarMenu';
import SectionSeparator from '../sectionSeparator';
import './index.less';

export const ACCESS_TOKEN_NAME = 'xDFcxiooPQxazdndDsdRSerWQPlincytLDCarcxVxv';

const { Item } = Form;

interface ILoginForm {
  baseUrl: string;
  userNameOrEmailAddress: string;
  password: string;
}

interface IAuthContainerProps {
  layout?: boolean;
}

const AuthContainer: FC<IAuthContainerProps> = ({ children, layout = false }) => {
  const [isSignInModalVisible, setSignInModalVisibility] = useState(false);

  const { loginUser, logoutUser, isInProgress, loginInfo } = useAuth();
  const isLoggedIn = Boolean(loginInfo?.userName);

  const [loginForm] = Form.useForm();

  const showSignInModal = () => setSignInModalVisibility(true);
  const hideSignInModal = () => setSignInModalVisibility(false);

  const login = ({ baseUrl, ...payload }: ILoginForm) => {
    loginUser({
      password: payload.password,
      userNameOrEmailAddress: payload.userNameOrEmailAddress,
    });
  };

  const logout = () => {
    logoutUser();
  };

  return (
    <>
      <div className="sha-storybook-authenticated-container">
        {!layout && (
          <Fragment>
            <div className="sha-storybook-authenticated-action-btn">
              {isLoggedIn ? (
                <Button type="primary" onClick={logout} danger>
                  Logout
                </Button>
              ) : (
                <Button type="primary" onClick={showSignInModal}>
                  Authorize
                </Button>
              )}
            </div>

            <SectionSeparator sectionName="" />
          </Fragment>
        )}

        {isLoggedIn ? (
          <ShaRoutingProvider>
            <SidebarMenuProvider items={[]}>
              <div>{children}</div>
            </SidebarMenuProvider>
          </ShaRoutingProvider>
        ) : (
          <Alert
            message="Not authorized"
            description="Please make sure you are authorized before accessing this content"
            showIcon
            type="warning"
          />
        )}

        <Modal
          title="Login"
          visible={isSignInModalVisible}
          onCancel={hideSignInModal}
          onOk={() => loginForm?.submit()}
          okButtonProps={{ loading: isInProgress?.loginUser || false }}
        >
          <Form form={loginForm} onFinish={login}>
            <Item name="userNameOrEmailAddress" rules={[{ required: true }]}>
              <Input placeholder="username" />
            </Item>

            <Item name="password" rules={[{ required: true }]}>
              <Input.Password placeholder="password" />
            </Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AuthContainer;
