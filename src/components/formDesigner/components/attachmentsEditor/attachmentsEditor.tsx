import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { FolderAddOutlined } from '@ant-design/icons';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import StoredFilesProvider from '../../../../providers/storedFiles';
import { CustomFile } from '../../../';
import { useForm, useSheshaApplication } from '../../../../providers';
import { evaluateValue, validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export interface IAttachmentsEditorProps extends IConfigurableFormComponent {
  ownerId: string;
  ownerType: string;
  filesCategory?: number;

  allowAdd: boolean;
  allowDelete: boolean;
  allowReplace: boolean;
  allowRename: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const AttachmentsEditor: IToolboxComponent<IAttachmentsEditorProps> = {
  type: 'attachmentsEditor',
  name: 'Attachments editor',
  icon: <FolderAddOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as IAttachmentsEditorProps;
    const { backendUrl } = useSheshaApplication();

    const { formData } = useForm();
    const ownerId = evaluateValue(customProps.ownerId, { data: formData });

    return (
      <FormItem model={model}>
        <StoredFilesProvider
          ownerId={ownerId}
          ownerType={customProps.ownerType}
          filesCategory={customProps.filesCategory}
          baseUrl={backendUrl}
        >
          <CustomFile
          // allowAdd={!customProps.disabled && customProps.allowAdd}
          // allowDelete={!customProps.disabled && customProps.allowDelete}
          // allowReplace={!customProps.disabled && customProps.allowReplace}
          // allowRename={!customProps.disabled && customProps.allowRename}
          />
        </StoredFilesProvider>
      </FormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => {
    const customModel: IAttachmentsEditorProps = {
      ...model,
      allowAdd: true,
      allowDelete: true,
      allowReplace: true,
      allowRename: true,
      ownerId: '{data.id}',
      ownerType: '',
    };
    return customModel;
  },
};

export default AttachmentsEditor;
