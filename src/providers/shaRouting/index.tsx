import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import { shaRoutingReducer } from './reducer';
import { ShaRoutingActionsContext, ShaRoutingStateContext, SHA_ROUTING_CONTEXT_INITIAL_STATE } from './contexts';
import { getFlagSetters } from '../utils/flagsSetters';
import { Router } from 'next/router';

export interface IRoutingProviderProvider {
  router: Router;
}

const ShaRoutingProvider: FC<PropsWithChildren<any>> = ({ children, router }) => {
  const [state, dispatch] = useReducer(shaRoutingReducer, { ...SHA_ROUTING_CONTEXT_INITIAL_STATE, router });

  /* NEW_ACTION_DECLARATION_GOES_HERE */
  const goingToRoute = (route: string) => {
    state?.router?.push(route);
  };

  return (
    <ShaRoutingStateContext.Provider value={state}>
      <ShaRoutingActionsContext.Provider
        value={{
          ...getFlagSetters(dispatch),
          goingToRoute,
        }}
      >
        {children}
      </ShaRoutingActionsContext.Provider>
    </ShaRoutingStateContext.Provider>
  );
};

function useShaRoutingState(require: boolean = true) {
  const context = useContext(ShaRoutingStateContext);

  if (require && context === undefined) {
    throw new Error('useShaRoutingState must be used within a ShaRoutingProvider');
  }

  return context;
}

function useShaRoutingActions(require: boolean = true) {
  const context = useContext(ShaRoutingActionsContext);

  if (require && context === undefined) {
    throw new Error('useShaRoutingActions must be used within a ShaRoutingProvider');
  }

  return context;
}

function useShaRouting(require: boolean = true) {
  return { ...useShaRoutingState(require), ...useShaRoutingActions(require) };
}

export default ShaRoutingProvider;

export { ShaRoutingProvider, useShaRoutingState, useShaRoutingActions, useShaRouting };
