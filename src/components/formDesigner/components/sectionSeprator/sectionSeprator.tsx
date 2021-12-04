import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { LineOutlined } from '@ant-design/icons';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { useForm } from '../../../../providers';
import SectionSeparator from '../../../sectionSeparator';

export interface ISectionSeparatorProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const SectionSeparatorComponent: IToolboxComponent<ISectionSeparatorProps> = {
  type: 'sectionSeparator',
  name: 'Section Separator',
  icon: <LineOutlined />,
  factory: (model: ISectionSeparatorProps) => {
    const { formMode, visibleComponentIds } = useForm();

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return <SectionSeparator sectionName={model.label}></SectionSeparator>;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    return {
      ...model,
      label: 'Section',
    };
  },
};

export default SectionSeparatorComponent;
