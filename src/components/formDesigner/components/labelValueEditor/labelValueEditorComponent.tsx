import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { OneToOneOutlined } from '@ant-design/icons';
import { LabelValueEditor } from './labelValueEditor';
import ConfigurableFormItem from '../formItem';
import { ILabelValueEditorPropsBase } from './models';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useForm } from '../../../../providers';

export interface ILabelValueEditorProps extends IConfigurableFormComponent, ILabelValueEditorPropsBase {}

const settingsForm = settingsFormJson as FormMarkup;

const LabelValueEditorComponent: IToolboxComponent<ILabelValueEditorProps> = {
  type: 'labelValueEditor',
  name: 'Label Value editor',
  icon: <OneToOneOutlined />,
  factory: model => {
    const { formMode, visibleComponentIds } = useForm();
    const customProps = model as ILabelValueEditorProps;

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return (
      <ConfigurableFormItem model={model}>
        <LabelValueEditor {...customProps} />
      </ConfigurableFormItem>
    );
  },
  initModel: model => {
    const customModel: ILabelValueEditorProps = {
      ...model,
      label: 'Items',
      labelTitle: 'Label',
      labelName: 'label',
      valueTitle: 'Value',
      valueName: 'value',
    };

    return customModel;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default LabelValueEditorComponent;
