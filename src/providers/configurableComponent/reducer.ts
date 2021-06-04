import {
  IConfigurableComponentStateContext,
  IComponentLoadPayload,
  IComponentLoadErrorPayload,
  IComponentLoadSuccessPayload,
} from './contexts';
import { ConfigurableComponentActionEnums } from './actions';
import { handleActions, ReduxCompatibleReducer } from 'redux-actions';

const reducerFactory = <TSettings extends any>(initialState: IConfigurableComponentStateContext<TSettings>): ReduxCompatibleReducer<IConfigurableComponentStateContext<TSettings>, any> => 
  handleActions<IConfigurableComponentStateContext<TSettings>, any>(
  {
    [ConfigurableComponentActionEnums.LoadRequest]: (state: IConfigurableComponentStateContext<TSettings>, action: ReduxActions.Action<IComponentLoadPayload>) => {
      const { payload } = action;

      return {
        ...state,
        id: payload.id,
        isInProgress: { ...state.isInProgress, loading: true }
      };
    },

    [ConfigurableComponentActionEnums.LoadSuccess]: (state: IConfigurableComponentStateContext<TSettings>, action: ReduxActions.Action<IComponentLoadSuccessPayload>) => {
      const { payload } = action;

      const settings = payload.settings
        ? JSON.parse(payload.settings) as TSettings
        : null;
      const typedPayload = { ...payload, settings: settings };

      return {
        ...state,
        ...typedPayload,
        isInProgress: { ...state.isInProgress, loading: false },
        error: { ...state.error, loading: null },
      };
    },

    [ConfigurableComponentActionEnums.LoadError]: (state: IConfigurableComponentStateContext<TSettings>, action: ReduxActions.Action<IComponentLoadErrorPayload>) => {
      const { payload } = action;

      return {
        ...state,
        formMode: payload,
        isInProgress: { ...state.isInProgress, loading: false },
        error: { ...state.error, loading: payload.error },
      };
    },
  },
  initialState
);

export default reducerFactory;