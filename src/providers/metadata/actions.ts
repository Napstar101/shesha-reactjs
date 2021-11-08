import { createAction } from 'redux-actions';
import {
  ILoadPropertiesPayload, ILoadPropertiesSuccessPayload,
} from './contexts';

export enum MetadataActionEnums {
  /*
  component: add delete update move
  */
  LoadProperties = 'LOAD_PROPERTIES',
  LoadPropertiesSuccess = 'LOAD_PROPERTIES_SUCCESS',

  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const loadPropertiesAction = createAction<ILoadPropertiesPayload, ILoadPropertiesPayload>(
  MetadataActionEnums.LoadProperties,
  p => p
);
export const loadPropertiesSuccessAction = createAction<ILoadPropertiesSuccessPayload, ILoadPropertiesSuccessPayload>(
  MetadataActionEnums.LoadPropertiesSuccess,
  p => p
);

/* NEW_ACTION_GOES_HERE */
