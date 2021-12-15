import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { FileSearchOutlined } from '@ant-design/icons';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import Autocomplete, { AutocompleteDataSourceType } from '../../../autocomplete';
import { useForm } from '../../../../providers/form';
import { replaceTags, validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { DataTypes } from '../../../../interfaces/dataTypes';

export interface IAutocompleteProps extends IConfigurableFormComponent {
  entityTypeShortAlias?: string;
  hideBorder?: boolean;
  dataSourceUrl?: string;
  dataSourceType: AutocompleteDataSourceType;
  mode?: 'tags' | 'multiple';
  useRawValues: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const AutocompleteComponent: IToolboxComponent<IAutocompleteProps> = {
  type: 'autocomplete',
  name: 'Autocomplete',
  icon: <FileSearchOutlined />,
  dataTypes: [DataTypes.entityReference],
  factory: (model: IAutocompleteProps) => {
    const { formData } = useForm();
    const dataSourceUrl = model.dataSourceUrl
      ? replaceTags(model.dataSourceUrl, { data: formData })
      : model.dataSourceUrl;

    const autocompleteProps = {
      typeShortAlias: model?.entityTypeShortAlias,
      allowInherited: true /*hardcoded for now*/,
      disabled: model.disabled,
      bordered: !model.hideBorder,
      dataSourceUrl: dataSourceUrl,
      dataSourceType: model.dataSourceType,
      mode: model?.mode,
    };
    // todo: implement other types of datasources!
    return (
      <ConfigurableFormItem model={model}>
        {model.useRawValues ? (
          <Autocomplete.Raw {...autocompleteProps} />
        ) : (
          <Autocomplete.EntityDto {...autocompleteProps} />
        )}
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customProps: IAutocompleteProps = {
      ...model,
      dataSourceType: 'entitiesList',
      useRawValues: false,
    };
    return customProps;
  },
};

export default AutocompleteComponent;
