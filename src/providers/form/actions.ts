import { createAction } from 'redux-actions';
import { IFormValidationErrors } from '../../interfaces';
import {
  IComponentAddPayload,
  IComponentDeletePayload,
  IComponentUpdatePayload,
  IFormLoadPayload,
  ISetVisibleComponentsPayload,
  IUpdateChildComponentsPayload,
  ISetFormDataPayload,
  IRegisterActionsPayload,
  IFormSettings,
  ISetSelectedComponentPayload,
  IComponentUpdateSettingsValidationPayload,
} from './contexts';
import { IFormProps, IFlatComponentsStructure, FormMode } from './models';

export enum FormActionEnums {
  /*
  component: add delete update move
  */
  ComponentAdd = 'COMPONENT_ADD',
  ComponentDelete = 'COMPONENT_DELETE',
  ComponentUpdate = 'COMPONENT_UPDATE',
  ComponentUpdateSettingsValidation = 'COMPONENT_UPDATE_SETTINGS_VALIDATION',

  SaveRequest = 'SAVE_REQUEST',
  SaveSuccess = 'SAVE_SUCCESS',
  SaveError = 'SAVE_ERROR',

  LoadRequest = 'LOAD_REQUEST',
  LoadSuccess = 'LOAD_SUCCESS',
  LoadError = 'LOAD_ERROR',
  ChangeMarkup = 'CHANGE_MARKUP',

  SetFormMode = 'SET_FORM_MODE',
  SetDebugMode = 'SET_DEBUG_MODE',
  SetDragging = 'SET_DRAGGING',
  StartDragging = 'START_DRAGGING',
  EndDragging = 'END_DRAGGING',
  SetVisibleComponents = 'SET_VISIBLE_COMPONENTS',
  UpdateChildComponents = 'UPDATE_CHILD_COMPONENTS',
  SetFormData = 'SET_FORM_DATA',
  SetValidationErrors = 'SET_VALIDATION_ERRORS',
  SetSelectedComponent = 'SET_SELECTED_COMPONENT',
  RegisterActions = 'REGISTER_ACTIONS',
  UpdateFormSettings = 'UPDATE_FORM_SETTINGS',

  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const componentAddAction = createAction<IComponentAddPayload, IComponentAddPayload>(
  FormActionEnums.ComponentAdd,
  p => p
);

export const componentDeleteAction = createAction<IComponentDeletePayload, IComponentDeletePayload>(
  FormActionEnums.ComponentDelete,
  p => p
);

export const componentUpdateAction = createAction<IComponentUpdatePayload, IComponentUpdatePayload>(
  FormActionEnums.ComponentUpdate,
  p => p
);

export const componentUpdateSettingsValidationAction = createAction<IComponentUpdateSettingsValidationPayload, IComponentUpdateSettingsValidationPayload>(
  FormActionEnums.ComponentUpdateSettingsValidation,
  p => p
);

export const loadRequestAction = createAction<IFormLoadPayload, IFormLoadPayload>(FormActionEnums.LoadRequest, p => p);
export const loadSuccessAction = createAction<IFormProps, IFormProps>(FormActionEnums.LoadSuccess, p => p);
export const loadErrorAction = createAction(FormActionEnums.LoadError, () => ({}));
export const changeMarkupAction = createAction<IFlatComponentsStructure, IFlatComponentsStructure>(
  FormActionEnums.ChangeMarkup,
  p => p
);

export const saveRequestAction = createAction(FormActionEnums.SaveRequest, () => ({}));
export const saveSuccessAction = createAction(FormActionEnums.SaveSuccess, () => ({}));

export const saveErrorAction = createAction(FormActionEnums.SaveError, () => ({}));
export const setFormModeAction = createAction<FormMode, FormMode>(FormActionEnums.SetFormMode, p => p);
export const setDebugModeAction = createAction<boolean, boolean>(FormActionEnums.SetDebugMode, p => p);
export const startDraggingAction = createAction(FormActionEnums.StartDragging);
export const endDraggingAction = createAction(FormActionEnums.EndDragging);

export const setVisibleComponentsAction = createAction<ISetVisibleComponentsPayload, ISetVisibleComponentsPayload>(
  FormActionEnums.SetVisibleComponents,
  p => p
);

export const setFormDataAction = createAction<ISetFormDataPayload, ISetFormDataPayload>(
  FormActionEnums.SetFormData,
  p => p
);

export const setValidationErrorsAction = createAction<IFormValidationErrors, IFormValidationErrors>(
  FormActionEnums.SetValidationErrors,
  p => p
);

export const updateChildComponentsAction = createAction<IUpdateChildComponentsPayload, IUpdateChildComponentsPayload>(
  FormActionEnums.UpdateChildComponents,
  p => p
);

export const setSelectedComponentAction = createAction<ISetSelectedComponentPayload, ISetSelectedComponentPayload>(
  FormActionEnums.SetSelectedComponent,
  p => p
);

export const registerComponentActionsAction = createAction<IRegisterActionsPayload, IRegisterActionsPayload>(
  FormActionEnums.RegisterActions,
  p => p
);

export const updateFormSettingsAction = createAction<IFormSettings, IFormSettings>(
  FormActionEnums.UpdateFormSettings,
  p => p
);

/* NEW_ACTION_GOES_HERE */
