import { MutableRefObject } from 'react';
import { ColProps } from 'antd/lib/col';
import { FormInstance } from 'antd/lib/form';
import { FormLayout } from 'antd/lib/form/Form';
import { ConfigurableFormInstance } from '../../providers/form/contexts';
import { FormMode, Store, IConfigurableFormBaseProps, IFormActions } from '../../providers/form/models';
import { ValidateErrorEntity } from '../../interfaces';

export interface IConfigurableFormRendererProps<Values = any, FieldData = any> {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  layout?: FormLayout;

  initialValues?: Store;
  onValuesChange?: (changedValues: any, values: Values) => void;
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
  form?: FormInstance<any>;
  actions?: IFormActions;
  context?: any; // todo: make generic
  //onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
}

export interface IConfigurableFormProps<Values = any, FieldData = any>
  extends IConfigurableFormRendererProps<Values, FieldData>,
    IConfigurableFormBaseProps {
  mode: FormMode;
  formRef?: MutableRefObject<Partial<ConfigurableFormInstance> | null>;
}
