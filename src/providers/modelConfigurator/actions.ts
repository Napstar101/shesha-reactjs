import { createAction } from 'redux-actions';
import { ModelConfigurationDto, ErrorInfo } from '../../apis/modelConfigurations';

export enum ModelActionEnums {
  LoadRequest = 'LOAD_REQUEST',
  LoadSuccess = 'LOAD_SUCCESS',
  LoadError = 'LOAD_ERROR',
  
  SaveRequest = 'SAVE_REQUEST',
  SaveSuccess = 'SAVE_SUCCESS',
  SaveError = 'SAVE_ERROR',

  SetModelSettings = 'SET_MODEL_SETTINGS',

  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const loadRequestAction = createAction(ModelActionEnums.LoadRequest);
export const loadSuccessAction = createAction<ModelConfigurationDto, ModelConfigurationDto>(ModelActionEnums.LoadSuccess, p => p);
export const loadErrorAction = createAction<ErrorInfo, ErrorInfo>(ModelActionEnums.LoadError, p => p);

export const saveRequestAction = createAction(ModelActionEnums.SaveRequest);
export const saveSuccessAction = createAction(ModelActionEnums.SaveSuccess);
export const saveErrorAction = createAction<ErrorInfo, ErrorInfo>(ModelActionEnums.SaveError, p => p);

/* NEW_ACTION_GOES_HERE */
