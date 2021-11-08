import { createContext, MutableRefObject } from 'react';
import {
  IFlagsState,
  IFlagsSetters,
  IToolboxComponentGroup,
  IToolboxComponentBase,
  IAsyncValidationError,
  IFormValidationErrors,
} from '../../interfaces';
import defaultToolboxComponents from './defaults/toolboxComponents';
import {
  IFormProps,
  FormMode,
  IConfigurableFormComponent,
  ROOT_COMPONENT_KEY,
  IFormActions,
  IFormAction,
  FormAction,
  FormSection,
  IFormSection,
} from './models';
import { FormInstance } from 'antd';
import { StateWithHistory } from 'redux-undo';
import { FormLayout } from 'antd/lib/form/Form';
import { IDataSource } from '../formDesigner/models';

export type IFlagProgressFlags =
  | 'addComponent'
  | 'updateComponent'
  | 'deleteComponent'
  | 'moveComponent'
  | 'load'
  | 'save' /* NEW_IN_PROGRESS_FLAG_GOES_HERE */;
export type IFlagSucceededFlags =
  | 'addComponent'
  | 'updateComponent'
  | 'deleteComponent'
  | 'moveComponent'
  | 'load'
  | 'save' /* NEW_SUCCEEDED_FLAG_GOES_HERE */;
export type IFlagErrorFlags =
  | 'addComponent'
  | 'updateComponent'
  | 'deleteComponent'
  | 'moveComponent'
  | 'load'
  | 'save' /* NEW_ERROR_FLAG_GOES_HERE */;
export type IFlagActionedFlags = '__DEFAULT__' /* NEW_ACTIONED_FLAG_GOES_HERE */;

export interface ILayoutProps {
  span: number;
}

export interface IFormSettings {
  postUrl?: string;
  getUrl?: string;
  layout: FormLayout;
  colon: boolean;
  labelCol: ILayoutProps;
  wrapperCol: ILayoutProps;
}

export interface IFormDesignerStateContext extends StateWithHistory<IFormStateContext> {}

export interface IFormStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags>,
    IFormProps {
  id?: string;
  path?: string;
  formMode: FormMode;
  isDebug: boolean;
  form?: FormInstance<any>;
  actions: IFormAction[];
  sections: IFormSection[];
  context?: any; // todo: make generic
  formSettings: IFormSettings;

  // runtime props
  formData?: any;
  validationErrors?: IFormValidationErrors;

  selectedComponentId?: string; // todo: move to the designer level
  selectedComponentRef?: MutableRefObject<any>;
  isDragging: boolean;
  toolboxComponentGroups: IToolboxComponentGroup[];

  dataSources: IDataSource[]; // todo: move to the designer level
  activeDataSourceId: string; // todo: move to the designer level
}

export interface IComponentAddPayload {
  componentType: string;
  index: number;
  containerId: string;
}

export interface IUpdateChildComponentsPayload {
  containerId: string;
  componentIds: string[];
}

export interface IComponentDeletePayload {
  componentId: string;
}

export interface IComponentUpdatePayload {
  componentId: string;
  settings: IConfigurableFormComponent;
}

export interface IComponentUpdateSettingsValidationPayload {
  componentId: string;
  validationErrors: IAsyncValidationError[];
}

export interface ISetVisibleComponentsPayload {
  componentIds: string[];
}

export interface ISetFormDataPayload {
  /** form field values */
  values: any;

  /** if true, previous data will be merged with current values */
  mergeValues: boolean;
}

export interface ISetSelectedComponentPayload {
  id: string;
  componentRef?: MutableRefObject<any>;
  /** Id of the current source of metadata */
  dataSourceId: string;
}

export interface IFormLoadByIdPayload {
  id: string;
}

export interface IFormLoadByPathPayload {
  path: string;
}

export interface IRegisterActionsPayload {
  id: string /** component id */;
  actions: IFormActions /** component actions */;
}

export type IFormLoadPayload = IFormLoadByIdPayload | IFormLoadByPathPayload;

export interface IFormActionsContext
  extends IFlagsSetters<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  loadForm: () => void;
  saveForm: () => Promise<void>;
  setFormMode: (formMode: FormMode) => void;
  getChildComponents: (id: string) => IConfigurableFormComponent[];
  deleteComponent: (payload: IComponentDeletePayload) => void;
  updateComponent: (payload: IComponentUpdatePayload) => void;
  getComponentModel: (id: string) => IConfigurableFormComponent;
  //getComponentModelValidation: (id: string) => ;
  setVisibleComponents: (payload: ISetVisibleComponentsPayload) => void;

  setFormData: (payload: ISetFormDataPayload) => void;
  setValidationErrors: (payload: IFormValidationErrors) => void;

  addComponent: (payload: IComponentAddPayload) => void;
  updateChildComponents: (payload: IUpdateChildComponentsPayload) => void;
  setDebugMode: (isDebug: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
  setSelectedComponent: (id: string, dataSourceId: string, componentRef?: MutableRefObject<any>) => void;
  registerActions: (id: string, actions: IFormActions) => void;
  getAction: (id: string, name: string) => FormAction;
  getSection: (id: string, name: string) => FormSection;
  updateFormSettings: (settings: IFormSettings) => void;

  getToolboxComponent: (type: string) => IToolboxComponentBase;

  addDataSource: (dataSource: IDataSource) => void;
  removeDataSource: (id: string) => void;
  setActiveDataSource: (id: string) => void;
  getActiveDataSource: () => IDataSource | null;

  undo: () => void;
  redo: () => void;
}

/** Default form settings */
export const DEFAULT_FORM_SETTINGS: IFormSettings = {
  layout: 'horizontal',
  colon: true,
  labelCol: { span: 5 },
  wrapperCol: { span: 13 },
};

/** Form initial state */
export const FORM_CONTEXT_INITIAL_STATE: IFormStateContext = {
  isInProgress: {},
  succeeded: {},
  error: {},
  actioned: {},
  components: [],
  allComponents: {},
  visibleComponentIds: [],
  componentRelations: { [ROOT_COMPONENT_KEY]: [] },
  formMode: 'designer',
  isDragging: false,
  isDebug: false,
  actions: [],
  sections: [],
  context: null,
  formSettings: DEFAULT_FORM_SETTINGS,
  toolboxComponentGroups: defaultToolboxComponents,

  dataSources: [],
  activeDataSourceId: null,
};

export const UndoableFormStateContext = createContext<IFormDesignerStateContext>({
  past: [],
  present: FORM_CONTEXT_INITIAL_STATE,
  future: [],
});

export interface ConfigurableFormInstance extends IFormActionsContext, IFormStateContext {}

export const FormStateContext = createContext<IFormStateContext>(FORM_CONTEXT_INITIAL_STATE);

export const FormActionsContext = createContext<IFormActionsContext>(undefined);
