import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { EllipsisOutlined } from '@ant-design/icons';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { EntityPicker } from '../../..';
import { Alert } from 'antd';
import { useForm } from '../../../../providers';
import { DataTypes } from '../../../../interfaces/dataTypes';
import QuickView from '../../../quickView';
import EntityFooter from './entityFooter';

export interface IEntityPickerComponentProps extends IConfigurableFormComponent {
  placeholder?: string;
  hideBorder?: boolean;
  disabled?: boolean;
  tableId: string;
  title?: string;
  allowNewRecord?: boolean;
  modalFormId?: string;
  modalTitle?: string;
  showModalFooter?: boolean;
  onSuccessRedirectUrl?: string;
  submitHttpVerb?: 'POST' | 'PUT';

  // Quickview properties
  quickViewEnabled?: boolean;
  displayFormPath?: string;
  displayPropertyName?: string;
  getDetailsUrl?: string;
}

const settingsForm = settingsFormJson as FormMarkup;

const EntityPickerComponent: IToolboxComponent<IEntityPickerComponentProps> = {
  type: 'entityPicker',
  name: 'Entity Picker',
  icon: <EllipsisOutlined />,
  dataTypeSupported: ({ dataType }) => dataType === DataTypes.entityReference,
  factory: (model: IEntityPickerComponentProps) => {
    const { formMode } = useForm()

    if (formMode === 'designer' && !model?.tableId) {
      return <Alert message="Please make sure that you've specified the tableId property" />
    }

    return (
      <ConfigurableFormItem model={model} initialValue={model?.defaultValue}>
        {model.enableQuickview ? (
          <QuickView
            title={model.defaultValue}
            displayFormPath={model.displayFormPath}
            displayPropertyName={model.displayPropertyName}
            getDetailsUrl={model.getDetailsUrl}
            fetcher={null}>

            <EntityPicker disabled={model.disabled} tableId={model?.tableId} entityFooter={<EntityFooter {...model} />} />

          </QuickView>
        ) : (
          <EntityPicker disabled={model.disabled} tableId={model?.tableId} entityFooter={<EntityFooter {...model} />} />
        )}
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default EntityPickerComponent;
