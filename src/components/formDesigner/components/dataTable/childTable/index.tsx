import { TableOutlined } from '@ant-design/icons';
import { Alert, Space } from 'antd';
import React, { Fragment, MutableRefObject, useEffect } from 'react';
import { CollapsiblePanel, GlobalTableFilter, Show } from '../../../..';
import { useDataTable, useForm } from '../../../../..';
import { validateConfigurableComponentSettings } from '../../../../../formDesignerUtils';
import { IConfigurableFormComponent, IToolboxComponent } from '../../../../../interfaces';
import { FormMarkup } from '../../../../../providers/form/models';
import ComponentsContainer from '../../../componentsContainer';
import { ToolbarWithProvider } from '../toolbar/toolbarComponent';
import { IChildTableSettingsProps } from './models';
import ChildDataTableSettings from './settings';
import settingsFormJson from './settingsForm.json';
import './styles/index.less';
import { evaluateDynamicFilters, hasDynamicFilter } from '../../../../../providers/dataTable/utils';

export interface IChildTableComponentProps extends IChildTableSettingsProps, IConfigurableFormComponent {}

const settingsForm = settingsFormJson as FormMarkup;

const ChildTableComponent: IToolboxComponent<IChildTableComponentProps> = {
  type: 'childTable',
  name: 'Child Table',
  icon: <TableOutlined />,
  factory: (model: IChildTableComponentProps, componentRef: MutableRefObject<any>) => {
    const { formData } = useForm();
    const { columns, getDataSourceType, setPredefinedFilters } = useDataTable();

    const dataSourceType = getDataSourceType();

    componentRef.current = {
      columns,
      dataSourceType,
    };

    const hasFilters = model?.filters?.length > 0;

    const foundDynamicFilter = hasDynamicFilter(model?.filters);

    const hasManyFiltersButNoSelected = hasFilters && !model?.defaultSelectedFilterId;

    const hasFormData = Boolean(formData);

    useEffect(() => {
      const evaluatedFilters = evaluateDynamicFilters(model?.filters, formData);

      const parsedFilters = evaluatedFilters?.map(filter => {
        let _filter = { ...filter };

        if (_filter.id === model?.defaultSelectedFilterId) {
          _filter.defaultSelected = true;
          _filter.selected = true;
        }

        return _filter;
      });

      if (formData) {
        setPredefinedFilters(parsedFilters);
      }
    }, [model?.filters, formData]);

    return (
      <Fragment>
        <Show when={!formData}>
          <Alert
            type="warning"
            message="Please note that the table will not be filtered if there is no state provided"
          />
        </Show>

        <CollapsiblePanel
          key={undefined}
          header={model?.title}
          extra={
            <div>
              <Space size="middle">
                <Show when={model?.allowQuickSearch}>
                  <GlobalTableFilter />
                </Show>

                <ToolbarWithProvider items={model?.toolbarItems || []} name={''} type={''} id={model.id} />
              </Space>
            </div>
          }
          noContentPadding
          className="sha-form-designer-child-table"
        >
          <ComponentsContainer containerId={model.id} />
        </CollapsiblePanel>
      </Fragment>
    );
  },
  // settingsFormMarkup: settingsForm,
  settingsFormFactory: ({ model, onSave, onCancel, onValuesChange }) => {
    return (
      <ChildDataTableSettings
        model={(model as unknown) as IChildTableSettingsProps}
        onSave={onSave as any}
        onCancel={onCancel}
        onValuesChange={onValuesChange as any}
      />
    );
  },
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => ({
    ...model,
  }),
};

export default ChildTableComponent;
