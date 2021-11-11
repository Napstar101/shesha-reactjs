import {
  METADATA_CONTEXT_INITIAL_STATE,
  IMetadataStateContext,
} from './contexts';
//import { MetadataActionEnums } from './actions';
import { handleActions } from 'redux-actions';

const reducer = handleActions<IMetadataStateContext, any>(
  {
    // [MetadataActionEnums.LoadMetadataSuccess]: (state: IMetadataStateContext, action: ReduxActions.Action<ILoadMetadataErrorPayload>) => {
    //   const { payload } = action;

    //   return {
    //     ...state,
    //     failed: [...state.failed, payload.modelType]
    //   };
    // },
  },

  METADATA_CONTEXT_INITIAL_STATE
);

export default reducer;
