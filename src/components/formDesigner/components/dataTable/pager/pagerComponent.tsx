import { IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../../providers/form/models';
import { ControlOutlined } from '@ant-design/icons';
import { useForm } from '../../../../../providers/form';
import settingsFormJson from './settingsForm.json';
import { TablePager } from '../../../../../';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../providers/form/utils';

export interface IPagerComponentProps extends IConfigurableFormComponent { }

const settingsForm = settingsFormJson as FormMarkup;

const PagerComponent: IToolboxComponent<IPagerComponentProps> = {
  type: 'datatable.pager',
  name: 'Table Pager',
  icon: <ControlOutlined />,
  factory: (model: IPagerComponentProps) => {
    const { formMode, visibleComponentIds } = useForm();

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return <TablePager {...model}></TablePager>;
  },
  initModel: (model: IPagerComponentProps) => {
    return {
      ...model,
      items: [],
    };
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default PagerComponent;
