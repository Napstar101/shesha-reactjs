import {
  METADATA_CONTEXT_INITIAL_STATE,
  IMetadataStateContext,
  ILoadPropertiesPayload,
  ILoadPropertiesSuccessPayload,
} from './contexts';
import { MetadataActionEnums } from './actions';
import { handleActions } from 'redux-actions';

const reducer = handleActions<IMetadataStateContext, any>(
  {
    [MetadataActionEnums.LoadProperties]: (state: IMetadataStateContext, action: ReduxActions.Action<ILoadPropertiesPayload>) => {
      // @ts-ignore
      const { payload } = action;

      return {
        ...state,
      };
    },
    [MetadataActionEnums.LoadPropertiesSuccess]: (state: IMetadataStateContext, action: ReduxActions.Action<ILoadPropertiesSuccessPayload>) => {
      const { payload } = action;

      return {
        ...state,
        properties: [...payload.properties]
      };
    },
  },

  METADATA_CONTEXT_INITIAL_STATE
);

export default reducer;
