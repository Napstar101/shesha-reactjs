import { FC } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../../providers/form/models';
import { SlidersOutlined } from '@ant-design/icons';
import { Alert, Button } from 'antd';
import { useForm } from '../../../../../providers/form';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../providers/form/utils';
import { useDataTableStore } from '../../../../../providers';

export interface IPagerComponentProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const SelectColumnsButtonComponent: IToolboxComponent<IPagerComponentProps> = {
  type: 'datatable.selectColumnsButton',
  name: 'Table Select Columns Button',
  icon: <SlidersOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as IPagerComponentProps;

    return <SelectColumnsButton {...customProps}></SelectColumnsButton>;
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

export const SelectColumnsButton: FC<IPagerComponentProps> = ({}) => {
  const { formMode } = useForm();
  const isDesignMode = formMode === 'designer';

  try {
    const {
      tableId,
      isInProgress: { isSelectingColumns },
      setIsInProgressFlag,
    } = useDataTableStore();

    if (!tableId && isDesignMode) return <NotConfiguredWarning></NotConfiguredWarning>;

    const startTogglingColumnVisibility = () => setIsInProgressFlag({ isSelectingColumns: true, isFiltering: false });

    return (
      <Button
        type="link"
        className="extra-btn column-visibility"
        icon={<SlidersOutlined rotate={90} />}
        disabled={!!isSelectingColumns}
        onClick={startTogglingColumnVisibility}
        size="small"
      />
    );
  } catch (error) {
    return <NotConfiguredWarning></NotConfiguredWarning>;
  }
};

export default SelectColumnsButtonComponent;
