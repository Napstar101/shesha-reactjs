import React, { FC } from 'react';
import { ConfigurableComponent } from '../appConfigurator/configurableComponent';
import { ErrorBoundary } from '..';

export const ConfigurableLogo: FC = () => {
  return (
    <ConfigurableComponent>
      {(componentState, BlockOverlay) => (
          <ErrorBoundary>
            <div className={`logo ${componentState.wrapperClassName}`}>
              <BlockOverlay></BlockOverlay>
              <a href="/">
                <img src="/images/app-logo.png" />
              </a>
            </div>
          </ErrorBoundary>
        )}
    </ConfigurableComponent>
  );
};

export default ConfigurableLogo;
