import { ReactNode, MutableRefObject } from 'react';
import { IConfigurableFormComponent, IFormComponentContainer, FormMarkup } from '../providers/form/models';
import { FormInstance } from 'antd';
import { InternalNamePath } from 'rc-field-form/lib/interface';

export interface ISettingsFormFactoryArgs<TModel = IConfigurableFormComponent> {
  model: TModel;
  onSave: (values: TModel) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: TModel) => void;
}

export type ISettingsFormFactory = (props: ISettingsFormFactoryArgs) => ReactNode;

export interface IToolboxComponentBase {
  type: string;
  name: string;
  icon: ReactNode;
  isHidden?: boolean;
  factory: (model: IConfigurableFormComponent, componentRef: MutableRefObject<any>, form: FormInstance<any>) => ReactNode;
  initModel?: (model: IConfigurableFormComponent) => IConfigurableFormComponent;
  getContainers?: (model: IConfigurableFormComponent) => IFormComponentContainer[];
  customContainerNames?: string[];
  settingsFormFactory?: ISettingsFormFactory;
  settingsFormMarkup?: FormMarkup;
  validateSettings?: (model: IConfigurableFormComponent) => Promise<any>;
}

export interface IToolboxComponent<T extends IConfigurableFormComponent> extends IToolboxComponentBase {
  test?: (model: T) => ReactNode;
}

export interface IToolboxComponentGroup {
  name: string;
  components: IToolboxComponentBase[];
}

export interface IToolboxComponents {
  [key: string]: IToolboxComponentBase;
}

export { IConfigurableFormComponent, IFormComponentContainer }

export interface IFieldValidationErrors {
  name: InternalNamePath;
  errors: string[];
};

export { ValidateErrorEntity } from 'rc-field-form/lib/interface';

export interface IAsyncValidationError {
  field: string;
  message: string;
}

export interface IFormValidationErrors {

}