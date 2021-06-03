import { Alert, Button, Form, Input, Modal } from 'antd';
import React, { FC, Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { RestfulProvider, useMutate } from 'restful-react';
import AuthProvider from '../../providers/auth';
import AuthorizationSettingsProvider from '../../providers/authorizationSettings';
import ShaRoutingProvider from '../../providers/shaRouting';
import SidebarMenuProvider from '../../providers/sidebarMenu';
import { getAccessToken, removeAccessToken, saveUserToken } from '../../utils/auth';
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
  const [baseUrl, setBaseUrl] = useState('http://localhost:21021');
  const [token, setToken] = useState<any>(null);
  const [loginForm] = Form.useForm();
  const { mutate: loginMutate, loading } = useMutate({
    base: baseUrl,
    verb: 'POST',
    path: '/api/TokenAuth/Authenticate',
  });

  useEffect(() => {
    setToken(getAccessToken(ACCESS_TOKEN_NAME));
  }, []);

  const showSignInModal = () => setSignInModalVisibility(true);
  const hideSignInModal = () => setSignInModalVisibility(false);

  const login = ({ baseUrl, ...payload }: ILoginForm) => {
    loginMutate(payload)
      .then(response => {
        const accessToken = response.result;

        saveUserToken(accessToken, ACCESS_TOKEN_NAME);
        setToken(accessToken);
        hideSignInModal();
      })
      .catch(() => {
        hideSignInModal();
      });
  };

  const logout = () => {
    setToken(null);
    removeAccessToken(ACCESS_TOKEN_NAME);
  };

  return (
    <RestfulProvider base={baseUrl}>
      <div className="sha-storybook-authenticated-container">
        {!layout && (
          <Fragment>
            <div className="sha-storybook-authenticated-action-btn">
              {token ? (
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

        {token ? (
          <ShaRoutingProvider>
            <AuthProvider tokenName={ACCESS_TOKEN_NAME}>
              <AuthorizationSettingsProvider>
                <SidebarMenuProvider items={[]}>
                  <div>{children}</div>
                </SidebarMenuProvider>
              </AuthorizationSettingsProvider>
            </AuthProvider>
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
          okButtonProps={{ loading }}
        >
          <Form form={loginForm} onFinish={login}>
            <Item name="baseUrl" rules={[{ required: true }]}>
              <Input onChange={event => setBaseUrl(event?.target?.value)} value={baseUrl} placeholder="Base Url" />
            </Item>

            <Item name="userNameOrEmailAddress" rules={[{ required: true }]}>
              <Input placeholder="username" />
            </Item>

            <Item name="password" rules={[{ required: true }]}>
              <Input.Password placeholder="password" />
            </Item>
          </Form>
        </Modal>
      </div>
    </RestfulProvider>
  );
};

export default AuthContainer;
