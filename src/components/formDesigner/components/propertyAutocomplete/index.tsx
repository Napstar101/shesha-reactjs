import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { FileSearchOutlined } from '@ant-design/icons';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { PropertyAutocomplete } from './propertyAutocomplete';

export interface IPropertyAutocompleteComponentProps extends IConfigurableFormComponent {
}

const settingsForm = settingsFormJson as FormMarkup;

const PropertyAutocompleteComponent: IToolboxComponent<IPropertyAutocompleteComponentProps> = {
  type: 'propertyAutocomplete',
  name: 'Property Autocomplete',
  icon: <FileSearchOutlined />,
  factory: (model: IPropertyAutocompleteComponentProps) => {
    return (
      <FormItem model={model}>
        <PropertyAutocomplete id={model.id} />
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default PropertyAutocompleteComponent;
