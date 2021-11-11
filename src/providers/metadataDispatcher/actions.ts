import { createAction } from 'redux-actions';
import {
  ILoadMetadataErrorPayload,
  ILoadMetadataPayload,
  ILoadMetadataSuccessPayload,
  IRegisterProviderPayload,
} from './contexts';

export enum MetadataDispatcherActionEnums {
  /*
  component: add delete update move
  */
  LoadMetadata = 'LOAD_METADATA',
  LoadMetadataSuccess = 'LOAD_METADATA_SUCCESS',
  LoadMetadataError = 'LOAD_METADATA_ERROR',
  RegisterProvider = 'REGISTER_PROVIDER',
  UnregisterProvider = 'UNREGISTER_PROVIDER',
  ActivateProvider = 'ACTIVATE_PROVIDER',

  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const loadMetadataAction = createAction<ILoadMetadataPayload, ILoadMetadataPayload>(
  MetadataDispatcherActionEnums.LoadMetadata,
  p => p
);

export const loadMetadataSuccessAction = createAction<ILoadMetadataSuccessPayload, ILoadMetadataSuccessPayload>(
  MetadataDispatcherActionEnums.LoadMetadataSuccess,
  p => p
);

export const loadMetadataErrorAction = createAction<ILoadMetadataErrorPayload, ILoadMetadataErrorPayload>(
  MetadataDispatcherActionEnums.LoadMetadataError,
  p => p
);

export const registerProviderAction = createAction<IRegisterProviderPayload, IRegisterProviderPayload>(
  MetadataDispatcherActionEnums.RegisterProvider,
  p => p
);

export const unregisterProviderAction = createAction<string, string>(
  MetadataDispatcherActionEnums.UnregisterProvider,
  p => p
);

export const activateProviderAction = createAction<string, string>(
  MetadataDispatcherActionEnums.ActivateProvider,
  p => p
);


/* NEW_ACTION_GOES_HERE */
