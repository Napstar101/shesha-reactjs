import { FC } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../../providers/form/models';
import { ControlOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { useForm } from '../../../../../providers/form';
import settingsFormJson from './settingsForm.json';
import { TablePager } from '../../../../../';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../providers/form/utils';
import { useDataTableStore } from '../../../../../providers';

export interface IPagerComponentProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const PagerComponent: IToolboxComponent<IPagerComponentProps> = {
  type: 'datatable.pager',
  name: 'Table Pager',
  icon: <ControlOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const { formMode, visibleComponentIds } = useForm();
    const customProps = model as IPagerComponentProps;
    
    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return <TableContext {...customProps}></TableContext>;
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

export const TableContext: FC<IPagerComponentProps> = ({}) => {
  const { formMode } = useForm();
  const isDesignMode = formMode === 'designer';

  try {
    const { tableId } = useDataTableStore();

    if (!tableId && isDesignMode) return <NotConfiguredWarning></NotConfiguredWarning>;

    return <TablePager />;
  } catch (error) {
    return <NotConfiguredWarning></NotConfiguredWarning>;
  }
};

export default PagerComponent;
