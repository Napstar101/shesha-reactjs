import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import appConfiguratorReducer from './reducer';
import {
  DEFAULT_ACCESS_TOKEN_NAME,
  SheshaApplicationActionsContext,
  SheshaApplicationStateContext,
  SHESHA_APPLICATION_CONTEXT_INITIAL_STATE,
} from './contexts';
import { RestfulProvider } from 'restful-react';
import AuthProvider from '../auth';
import AuthorizationSettingsProvider from '../authorizationSettings';
import IRequestHeaders from '../../interfaces/requestHeaders';
import { setBackendUrlAction, setHeadersAction } from './actions';
import ShaRoutingProvider from '../shaRouting';
import { Router } from 'next/router';
import { AppConfiguratorProvider } from '../appConfigurator';
import { DynamicModalProvider } from '../dynamicModal';
import { UiProvider } from '../ui';
import { MetadataDispatcherProvider } from '..';

export interface IShaApplicationProviderProps {
  backendUrl: string;
  applicationName?: string;
  accessTokenName?: string;
  router?: Router; // todo: replace with IRouter
  unauthorizedRedirectUrl?: string;
  whitelistUrls?: string[];
}

const SheshaApplicationProvider: FC<PropsWithChildren<IShaApplicationProviderProps>> = ({
  children,
  backendUrl,
  applicationName,
  accessTokenName,
  router,
  unauthorizedRedirectUrl,
  whitelistUrls,
}) => {
  const [state, dispatch] = useReducer(appConfiguratorReducer, {
    ...SHESHA_APPLICATION_CONTEXT_INITIAL_STATE,
    backendUrl,
    applicationName,
  });

  const onSetRequestHeaders = (headers: IRequestHeaders) => {
    dispatch(setHeadersAction(headers));
  };

  const changeBackendUrl = (backendUrl: string) => {
    dispatch(setBackendUrlAction(backendUrl));
  };

  return (
    <SheshaApplicationStateContext.Provider value={state}>
      <SheshaApplicationActionsContext.Provider
        value={{
          changeBackendUrl,
        }}
      >
        <RestfulProvider
          base={state.backendUrl}
          requestOptions={{
            headers: state.httpHeaders,
          }}
        >
          <UiProvider>
            <ShaRoutingProvider router={router}>
              <AuthProvider
                tokenName={accessTokenName || DEFAULT_ACCESS_TOKEN_NAME}
                onSetRequestHeaders={onSetRequestHeaders}
                unauthorizedRedirectUrl={unauthorizedRedirectUrl}
                whitelistUrls={whitelistUrls}
              >
                <AuthorizationSettingsProvider>
                  <AppConfiguratorProvider>
                    <MetadataDispatcherProvider>
                      <DynamicModalProvider>
                        {children}
                      </DynamicModalProvider>
                    </MetadataDispatcherProvider>
                  </AppConfiguratorProvider>
                </AuthorizationSettingsProvider>
              </AuthProvider>
            </ShaRoutingProvider>
          </UiProvider>
        </RestfulProvider>
      </SheshaApplicationActionsContext.Provider>
    </SheshaApplicationStateContext.Provider>
  );
};

function useSheshaApplication() {
  const context = useContext(SheshaApplicationStateContext);

  if (context === undefined) {
    throw new Error('useSheshaApplication must be used within a SheshaApplicationStateContext');
  }

  return context;
}

export { SheshaApplicationProvider as ShaApplicationProvider, useSheshaApplication };