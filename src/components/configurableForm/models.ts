import { MutableRefObject } from 'react';
import { ColProps } from 'antd/lib/col';
import { FormInstance, FormProps } from 'antd/lib/form';
import { FormLayout } from 'antd/lib/form/Form';
import { ConfigurableFormInstance } from '../../providers/form/contexts';
import { FormMode, Store, IConfigurableFormBaseProps, IFormActions, IFormSections } from '../../providers/form/models';
import { ValidateErrorEntity } from '../../interfaces';
//import { SizeType } from 'antd/lib/config-provider/SizeContext';

type BaseFormProps = Pick<FormProps, 'size'>;

export interface IConfigurableFormRendererProps<Values = any, FieldData = any> extends BaseFormProps {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  layout?: FormLayout;
  //size?: SizeType;

  initialValues?: Store;
  onValuesChange?: (changedValues: any, values: Values) => void;
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
  fields?: FieldData[];

  /**
   * Returns the form data and the response data as well, only if an API was made and came back successful
   *
   * @param values form data before being submitted
   * @param response response data
   */
  onFinish?: (values: Values, response?: any) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
  form?: FormInstance<any>;
  actions?: IFormActions;
  sections?: IFormSections;
  context?: any; // todo: make generic

  httpVerb?: 'POST' | 'PUT' | 'DELETE';
  /**
   * Pass this if you do not want an API call to be made on your behalf when you submit the form
   */
  skipPostOnFinish?: boolean;

  //onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
}

export interface IConfigurableFormProps<Values = any, FieldData = any>
  extends IConfigurableFormRendererProps<Values, FieldData>,
    IConfigurableFormBaseProps {
  mode: FormMode;
  formRef?: MutableRefObject<Partial<ConfigurableFormInstance> | null>;
  switchToReadOnlyOnSuccess?: boolean;
  className?: string;
}
