import { createAction } from 'redux-actions';
import {
  ILoadMetadataErrorPayload,
  ILoadMetadataPayload,
  ILoadMetadataSuccessPayload,
} from './contexts';

export enum MetadataActionEnums {
  /*
  component: add delete update move
  */
  LoadMetadata = 'LOAD_METADATA',
  LoadMetadataSuccess = 'LOAD_METADATA_SUCCESS',
  LoadMetadataError = 'LOAD_METADATA_ERROR',

  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const loadMetadataAction = createAction<ILoadMetadataPayload, ILoadMetadataPayload>(
  MetadataActionEnums.LoadMetadata,
  p => p
);

export const loadMetadataSuccessAction = createAction<ILoadMetadataSuccessPayload, ILoadMetadataSuccessPayload>(
  MetadataActionEnums.LoadMetadataSuccess,
  p => p
);

export const loadMetadataErrorAction = createAction<ILoadMetadataErrorPayload, ILoadMetadataErrorPayload>(
  MetadataActionEnums.LoadMetadataError,
  p => p
);

/* NEW_ACTION_GOES_HERE */
