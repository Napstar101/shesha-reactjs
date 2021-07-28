import { IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../../providers/form/models';
import { SearchOutlined } from '@ant-design/icons';
import settingsFormJson from './settingsForm.json';
import { GlobalTableFilter } from '../../../../../';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../providers/form/utils';

export interface IQuickSearchComponentProps extends IConfigurableFormComponent { }

const settingsForm = settingsFormJson as FormMarkup;

const QuickSearchComponent: IToolboxComponent<IQuickSearchComponentProps> = {
  type: 'datatable.quickSearch',
  name: 'Quick Search',
  icon: <SearchOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    // @ts-ignore
    const customProps = model as IQuickSearchComponentProps;

    return <GlobalTableFilter></GlobalTableFilter>;
  },
  initModel: (model: IConfigurableFormComponent) => {
    return {
      ...model,
      items: [],
    };
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default QuickSearchComponent;
