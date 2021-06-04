import {
  CONFIGURABLE_COMPONENT_CONTEXT_INITIAL_STATE,
  IConfigurableComponentStateContext,
  IComponentLoadPayload,
  IComponentLoadErrorPayload,
  IComponentLoadSuccessPayload,
} from './contexts';
import { ConfigurableComponentActionEnums } from './actions';
import { handleActions } from 'redux-actions';

const reducer = handleActions<IConfigurableComponentStateContext, any>(
  {
    [ConfigurableComponentActionEnums.LoadRequest]: (state: IConfigurableComponentStateContext, action: ReduxActions.Action<IComponentLoadPayload>) => {
      const { payload } = action;

      return {
        ...state,
        id: payload.id,
        isInProgress: { ...state.isInProgress, loading: true }
      };
    },

    [ConfigurableComponentActionEnums.LoadSuccess]: (state: IConfigurableComponentStateContext, action: ReduxActions.Action<IComponentLoadSuccessPayload>) => {
      const { payload } = action;

      return {
        ...state,
        ...payload,
        isInProgress: { ...state.isInProgress, loading: false },
        error: { ...state.error, loading: null },
      };
    },

    [ConfigurableComponentActionEnums.LoadError]: (state: IConfigurableComponentStateContext, action: ReduxActions.Action<IComponentLoadErrorPayload>) => {
      const { payload } = action;

      return {
        ...state,
        formMode: payload,
        isInProgress: { ...state.isInProgress, loading: false },
        error: { ...state.error, loading: payload.error },
      };
    },
  },

  CONFIGURABLE_COMPONENT_CONTEXT_INITIAL_STATE
);

export default reducer;
