import { IAsyncValidationError } from '../../interfaces';
import { IFormSettings } from './contexts';

export const ROOT_COMPONENT_KEY: string = 'root'; // root key of the flat components structure
export const TOOLBOX_DROPPABLE_KEY: string = 'toolbox';

export type FormMode = 'designer' | 'edit' | 'readonly';

export type LabelAlign = 'left' | 'right';

/**
 * Component container
 */
export interface IFormComponentContainer {
  /** Unique Id of the component */
  id: string;
  /** Id of the parent component */
  parentId?: string;
}

export interface IComponentValidationRules {
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
}

/**
 * Base model of the configurable component
 */
export interface IConfigurableFormComponent extends IFormComponentContainer {
  /** component name */
  name: string;
  /** The label for this field that will appear next to it. */
  label?: string;
  /** Type of the component */
  type: string;
  /** Description of the field, is used for tooltips */
  description?: string;

  /** Validation rules */
  validate?: IComponentValidationRules;

  /** Hidden field is still a part of the form but not visible on it */
  hidden?: boolean;
  /** Hide label of the field */
  hideLabel?: boolean;
  /** Position of the label */
  labelAlign?: LabelAlign;
  disabled?: boolean; // todo: move to the model level

  /** Custom visibility code */
  customVisibility?: string;

  /** Default value of the field */
  defaultValue?: any;

  //#region runtime properties
  visibilityFunc?: (data: any) => boolean;
  /**/
  settingsValidationErrors?: IAsyncValidationError[];
  //#endregion
}

export interface IComponentsContainer {
  id: string;
  components: IConfigurableFormComponent[];
}

export interface IComponentsDictionary {
  [index: string]: IConfigurableFormComponent;
}

export interface IFlatComponentsStructure {
  allComponents: IComponentsDictionary;
  componentRelations: { [index: string]: string[] };
  visibleComponentIds?: string[];
}

export interface IFormProps extends IFlatComponentsStructure {
  id?: string;
  path?: string;
  name?: string;
  description?: string;
  components: IConfigurableFormComponent[];
  formSettings: IFormSettings;
}

export declare type StoreValue = any;
export interface Store {
  [name: string]: StoreValue;
}

export type FormMarkupWithSettings = {
  formSettings: IFormSettings;
  components: IConfigurableFormComponent[];
};
export type FormMarkup = IConfigurableFormComponent[] | FormMarkupWithSettings;

export interface IConfigurableFormBaseProps {
  id?: string;
  markup?: FormMarkup;
  path?: string;
}

export type FormAction = (values?: any, parameters?: any) => void;

export interface IFormActionDesc {
  url: string;
  params: any;
}

export interface IFormActions {
  [key: string]: FormAction;
}

/** Form action available in the designer */
export interface IFormAction {
  /** Action owner (id of the owner component or null - form) */
  owner?: string;
  /** Action name */
  name: string;
  /** Action body */
  body: (values?: any, parameters?: any) => void;
}
