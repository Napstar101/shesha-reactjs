import {
  METADATA_DISPATCHER_CONTEXT_INITIAL_STATE,
  IMetadataDispatcherStateContext,
  ILoadMetadataPayload,
  ILoadMetadataSuccessPayload,
  ILoadMetadataErrorPayload,
  IRegisterProviderPayload,
  IMetadataProviderRegistration,
} from './contexts';
import { MetadataDispatcherActionEnums } from './actions';
import { handleActions } from 'redux-actions';

const reducer = handleActions<IMetadataDispatcherStateContext, any>(
  {
    [MetadataDispatcherActionEnums.LoadMetadata]: (state: IMetadataDispatcherStateContext, action: ReduxActions.Action<ILoadMetadataPayload>) => {
      const { payload } = action;

      return {
        ...state,
        inProgress: [...state.inProgress, payload.modelType]
      };
    },

    [MetadataDispatcherActionEnums.LoadMetadataError]: (state: IMetadataDispatcherStateContext, action: ReduxActions.Action<ILoadMetadataSuccessPayload>) => {
      const { payload } = action;
      
      const inProgress = state.inProgress.filter(i => i !== payload.metadata.type);

      return {
        ...state,
        models: { ...state.models, [payload.metadata.type]: payload.metadata },
        inProgress: [...inProgress]
      };
    },

    [MetadataDispatcherActionEnums.LoadMetadataSuccess]: (state: IMetadataDispatcherStateContext, action: ReduxActions.Action<ILoadMetadataErrorPayload>) => {
      const { payload } = action;

      return {
        ...state,
        failed: [...state.failed, payload.modelType]
      };
    },

    [MetadataDispatcherActionEnums.RegisterProvider]: (state: IMetadataDispatcherStateContext, action: ReduxActions.Action<IRegisterProviderPayload>) => {
      const { payload: { id, modelType, publicRef } } = action;

      const registration: IMetadataProviderRegistration = {
        id: id,
        modelType: modelType,
        publicRef: publicRef,
      };
      return {
        ...state,
        providers: [...state.providers, registration]
      };
    },

    [MetadataDispatcherActionEnums.UnregisterProvider]: (state: IMetadataDispatcherStateContext, action: ReduxActions.Action<string>) => {
      const { payload } = action;

      const newProviders = state.providers.filter(p => p.id !== payload);
      return {
        ...state,
        providers: [...newProviders],
        activeProvider: state.activeProvider === payload ? null : state.activeProvider,
      };
    },

    [MetadataDispatcherActionEnums.ActivateProvider]: (state: IMetadataDispatcherStateContext, action: ReduxActions.Action<string>) => {
      const { payload } = action;

      return {
        ...state,
        activeProvider: payload,
      };
    },
  },

  METADATA_DISPATCHER_CONTEXT_INITIAL_STATE
);

export default reducer;
