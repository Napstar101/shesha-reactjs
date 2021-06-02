import { FC } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../../providers/form/models';
import { SearchOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { useForm } from '../../../../../providers/form';
import settingsFormJson from './settingsForm.json';
import { GlobalTableFilter } from '../../../../../';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../providers/form/utils';
import { useDataTableStore } from '../../../../../providers';

export interface IQuickSearchComponentProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const QuickSearchComponent: IToolboxComponent<IQuickSearchComponentProps> = {
  type: 'datatable.quickSearch',
  name: 'Quick Search',
  icon: <SearchOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as IQuickSearchComponentProps;

    return <QuickSearch {...customProps}></QuickSearch>;
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

const NotConfiguredWarning: FC = () => {
  return <Alert className="sha-designer-warning" message="Pager is not configured properly" type="warning" />;
};

export const QuickSearch: FC<IQuickSearchComponentProps> = ({}) => {
  const { formMode } = useForm();
  const isDesignMode = formMode === 'designer';

  try {
    const { tableId } = useDataTableStore();

    if (!tableId && isDesignMode) return <NotConfiguredWarning></NotConfiguredWarning>;

    return <GlobalTableFilter />;
  } catch (error) {
    return <NotConfiguredWarning></NotConfiguredWarning>;
  }
};

export default QuickSearchComponent;
