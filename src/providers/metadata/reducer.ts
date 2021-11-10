import {
  METADATA_CONTEXT_INITIAL_STATE,
  IMetadataStateContext,
  ILoadMetadataPayload,
  ILoadMetadataSuccessPayload,
  ILoadMetadataErrorPayload,
} from './contexts';
import { MetadataActionEnums } from './actions';
import { handleActions } from 'redux-actions';

const reducer = handleActions<IMetadataStateContext, any>(
  {
    [MetadataActionEnums.LoadMetadata]: (state: IMetadataStateContext, action: ReduxActions.Action<ILoadMetadataPayload>) => {
      const { payload } = action;

      return {
        ...state,
        inProgress: [...state.inProgress, payload.modelType]
      };
    },

    [MetadataActionEnums.LoadMetadataError]: (state: IMetadataStateContext, action: ReduxActions.Action<ILoadMetadataSuccessPayload>) => {
      const { payload } = action;
      
      const inProgress = state.inProgress.filter(i => i !== payload.metadata.type);

      return {
        ...state,
        models: { ...state.models, [payload.metadata.type]: payload.metadata },
        inProgress: [...inProgress]
      };
    },

    [MetadataActionEnums.LoadMetadataSuccess]: (state: IMetadataStateContext, action: ReduxActions.Action<ILoadMetadataErrorPayload>) => {
      const { payload } = action;

      return {
        ...state,
        failed: [...state.failed, payload.modelType]
      };
    },
  },

  METADATA_CONTEXT_INITIAL_STATE
);

export default reducer;
