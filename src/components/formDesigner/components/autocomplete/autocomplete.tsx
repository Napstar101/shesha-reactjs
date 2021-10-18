import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { FileSearchOutlined } from '@ant-design/icons';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { Autocomplete, AutocompleteDataSourceType } from '../../../autocomplete';
import { useForm } from '../../../../providers/form';
import { replaceTags, validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export interface IAutocompleteProps extends IConfigurableFormComponent {
  entityTypeShortAlias?: string;
  hideBorder?: boolean;
  dataSourceUrl?: string;
  dataSourceType: AutocompleteDataSourceType;
  mode?: 'tags' | 'multiple';
}

const settingsForm = settingsFormJson as FormMarkup;

const TextField: IToolboxComponent<IAutocompleteProps> = {
  type: 'autocomplete',
  name: 'Autocomplete',
  icon: <FileSearchOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as IAutocompleteProps;

    const { formData } = useForm();
    const dataSourceUrl = customProps.dataSourceUrl
      ? replaceTags(customProps.dataSourceUrl, { data: formData })
      : customProps.dataSourceUrl;

    // console.log();

    // todo: implement other types of datasources!
    return (
      <FormItem model={model}>
        <Autocomplete
          typeShortAlias={customProps.entityTypeShortAlias}
          allowInherited={true} /*hardcoded for now*/
          disabled={model.disabled}
          bordered={!customProps.hideBorder}
          dataSourceUrl={dataSourceUrl}
          dataSourceType={customProps.dataSourceType}
          mode={customProps?.mode}
        />
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customProps: IAutocompleteProps = {
      ...model,
      dataSourceType: 'entitiesList',
    };
    return customProps;
  },
};

// TextField.settingsFormMarkup = new FormConfig()
//   .AddName({
//     name: 'sectionSeparator',
//     validateFunc
//   })
// AddDropdownParam({

// })
// .ToJSON()



  // RegisterCustomFormElements

export default TextField;
