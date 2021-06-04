import { createAction } from 'redux-actions';
import { IComponentLoadErrorPayload, IComponentLoadPayload, IComponentLoadSuccessPayload } from './contexts';

export enum ConfigurableComponentActionEnums {
  SaveRequest = 'SAVE_REQUEST',
  SaveSuccess = 'SAVE_SUCCESS',
  SaveError = 'SAVE_ERROR',

  LoadRequest = 'LOAD_REQUEST',
  LoadSuccess = 'LOAD_SUCCESS',
  LoadError = 'LOAD_ERROR',
  
  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const loadRequestAction = createAction<IComponentLoadPayload, IComponentLoadPayload>(ConfigurableComponentActionEnums.LoadRequest, p => p);
export const loadSuccessAction = createAction<IComponentLoadSuccessPayload, IComponentLoadSuccessPayload>(ConfigurableComponentActionEnums.LoadSuccess, p => p);
export const loadErrorAction = createAction<IComponentLoadErrorPayload, IComponentLoadErrorPayload>(ConfigurableComponentActionEnums.LoadError, p => p);

export const saveRequestAction = createAction(ConfigurableComponentActionEnums.SaveRequest, () => ({}));
export const saveSuccessAction = createAction(ConfigurableComponentActionEnums.SaveSuccess, () => ({}));
export const saveErrorAction = createAction(ConfigurableComponentActionEnums.SaveError, () => ({}));

/* NEW_ACTION_GOES_HERE */
