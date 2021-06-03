import React, { FC } from 'react';
import { ConfigurableComponent } from '../appConfigurator/configurableComponent';
import { ErrorBoundary } from '..';

export const ConfigurableLogo: FC = () => {
  return (
    <ConfigurableComponentProvider>
      <ConfigurableComponent>
        {(componentState, BlockOverlay) => (
            <ErrorBoundary>
              <div className={`logo ${componentState.wrapperClassName}`}>
                <BlockOverlay></BlockOverlay>
                <h3> Sidebar </h3>
              </div>
            </ErrorBoundary>
          )}
      </ConfigurableComponent>
    </ConfigurableComponentProvider>
  );
};

export default ConfigurableLogo;
