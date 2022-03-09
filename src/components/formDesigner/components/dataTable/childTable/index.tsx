import { TableOutlined } from '@ant-design/icons';
import { Alert, Space } from 'antd';
import React, { Fragment, MutableRefObject, useEffect } from 'react';
import { CollapsiblePanel, GlobalTableFilter, Show } from '../../../..';
import { evaluateString, useDataTable, useForm } from '../../../../..';
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
    const { formData, formMode, formSettings } = useForm();
    const { columns, getDataSourceType, setPredefinedFilters, refreshTable, setCrudConfig } = useDataTable();

    const { defaultSelectedFilterId, filters } = model;

    const dataSourceType = getDataSourceType();

    componentRef.current = {
      columns,
      dataSourceType,
    };

    const hasFilters = filters?.length > 0;

    const foundDynamicFilter = hasDynamicFilter(filters);

    const hasManyFiltersButNoSelected = hasFilters && !defaultSelectedFilterId;

    const hasFormData = Boolean(formData);

    useEffect(() => {
      if (formSettings) {
        const { postUrl, putUrl, deleteUrl, getUrl } = formSettings;

        setCrudConfig({ createUrl: postUrl, updateUrl: putUrl, deleteUrl, detailsUrl: getUrl });
      }
    }, [formSettings]);

    useEffect(() => {
      if (hasFilters) {
        const evaluatedFilters = evaluateDynamicFilters(filters, formData);

        let parsedFilters = evaluatedFilters;

        if (defaultSelectedFilterId) {
          parsedFilters = evaluatedFilters?.map(filter => {
            let _filter = { ...filter };

            if (_filter.id === defaultSelectedFilterId) {
              _filter.defaultSelected = true;
              _filter.selected = true;
            }

            return _filter;
          });
        } else {
          let firstElement = evaluatedFilters[0];

          firstElement.defaultSelected = true;
          firstElement.selected = true;

          evaluatedFilters[0] = firstElement;
        }

        if (hasFormData) {
          // Here we know we have evaluated our filters

          // TODO: Deal with the situation whereby the expression value evaluated to empty string because the action GetData will fail
          setPredefinedFilters(parsedFilters);
        } else if (!foundDynamicFilter) {
          // Here we do not need dynamic filters
          setPredefinedFilters(parsedFilters);
        }

        refreshTable();
      }
    }, [model?.filters, formData]);

    return (
      <Fragment>
        <Show when={formMode === 'designer'}>
          <Show when={!hasFormData && foundDynamicFilter}>
            <Alert
              style={{ marginBottom: 6 }}
              type="warning"
              message="Found dynamic filters but no state"
              description="Please note that you have dynamic filter(s) but there is no state to evaluate the filter. The table will not be filtered as a result."
            />
          </Show>

          <Show when={hasManyFiltersButNoSelected}>
            <Alert
              style={{ marginBottom: 6 }}
              type="warning"
              message="No selected filter"
              description="Please note you more than one filter and no one is selected. The first one will be used by default"
            />
          </Show>
        </Show>

        <CollapsiblePanel
          key={undefined}
          header={evaluateString(model?.title, formData)}
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
