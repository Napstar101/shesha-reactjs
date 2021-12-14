import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { HomeOutlined } from '@ant-design/icons';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { EditableTagGroup } from '../../..';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export interface ITagsOutlinedComponentProps extends IConfigurableFormComponent {
  value?: string[];
  defaultValue?: string;
  onChange?: (values?: string[]) => void;
}

const settingsForm = settingsFormJson as FormMarkup;

const EditableTagGroupComponent: IToolboxComponent<ITagsOutlinedComponentProps> = {
  type: 'editableTagGroup',
  name: 'TagsOutlined',
  icon: <HomeOutlined />,
  factory: (model: ITagsOutlinedComponentProps) => {
    return (
      <ConfigurableFormItem model={model}>
        <EditableTagGroup value={model?.value} defaultValue={model?.defaultValue} onChange={model?.onChange} />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default EditableTagGroupComponent;
