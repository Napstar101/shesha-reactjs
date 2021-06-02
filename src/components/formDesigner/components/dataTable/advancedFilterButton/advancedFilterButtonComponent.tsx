import { FC } from 'react';
import { IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../../providers/form/models';
import { FilterOutlined } from '@ant-design/icons';
import { Alert, Button } from 'antd';
import { useForm } from '../../../../../providers/form';
import settingsFormJson from './settingsForm.json';
import { useDataTableStore } from '../../../../../providers';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../providers/form/utils';

export interface IPagerComponentProps extends IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const AdvancedFilterButtonComponent: IToolboxComponent<IPagerComponentProps> = {
  type: 'datatable.advancedFilterButton',
  name: 'Table Advanced Filter Button',
  icon: <FilterOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const { formMode, visibleComponentIds } = useForm();
    const customProps = model as IPagerComponentProps;

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return <AdvancedFilterButton {...customProps}></AdvancedFilterButton>;
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

export const AdvancedFilterButton: FC<IPagerComponentProps> = ({}) => {
  const { formMode } = useForm();
  const isDesignMode = formMode === 'designer';

  try {
    const {
      tableId,
      isInProgress: { isFiltering },
      setIsInProgressFlag,
    } = useDataTableStore();

    if (!tableId && isDesignMode) return <NotConfiguredWarning></NotConfiguredWarning>;

    const startFilteringColumns = () => setIsInProgressFlag({ isFiltering: true, isSelectingColumns: false });

    return (
      <Button
        type="link"
        disabled={!!isFiltering}
        onClick={startFilteringColumns}
        className="extra-btn filter"
        icon={<FilterOutlined />}
        size="small"
      />
    );
  } catch (error) {
    return <NotConfiguredWarning></NotConfiguredWarning>;
  }
};

export default AdvancedFilterButtonComponent;
