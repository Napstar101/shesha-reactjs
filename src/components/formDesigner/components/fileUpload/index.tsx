import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { FileAddOutlined } from '@ant-design/icons';
import FormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { FileUpload, StoredFilesRenderer } from '../../..';
import { StoredFileProvider, StoredFilesProvider, useSheshaApplication } from '../../../../providers';
import { useForm } from '../../../../providers/form';
import { evaluateValue, validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import React from 'react';

export interface IFileUploadProps extends IConfigurableFormComponent {
  ownerId: string;
  ownerType: string;
  propertyName: string;
  allowUpload?: boolean;
  allowReplace?: boolean;
  allowDelete?: boolean;
  list?: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const FileUploadComponent: IToolboxComponent<IFileUploadProps> = {
  type: 'fileUpload',
  name: 'File Upload',
  icon: <FileAddOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as IFileUploadProps;

    const { backendUrl } = useSheshaApplication();

    // todo: refactor and implement a generic way for values evaluation
    const { formData } = useForm();
    const ownerId = evaluateValue(customProps.ownerId, { data: formData });

    return (
      <FormItem model={model}>
        {customProps?.list ? (
          <StoredFilesProvider ownerId={ownerId} ownerType={customProps.ownerType}>
            <StoredFilesRenderer
              isDragger={false}
              uploadBtnProps={{ icon: null, type: 'link' }}
              disabled={customProps?.disabled}
              noFilesCaption={null}
            />
          </StoredFilesProvider>
        ) : (
          <StoredFileProvider
            baseUrl={backendUrl}
            ownerId={ownerId}
            ownerType={customProps.ownerType}
            propertyName={customProps.propertyName}
            uploadMode={ownerId ? 'async' : 'sync'}
          >
            <FileUpload
              allowUpload={!customProps.disabled && customProps.allowUpload}
              allowDelete={!customProps.disabled && customProps.allowDelete}
              allowReplace={!customProps.disabled && customProps.allowReplace}
            />
          </StoredFileProvider>
        )}
      </FormItem>
    );
  },
  initModel: model => {
    const customModel: IFileUploadProps = {
      ...model,
      allowReplace: true,
      allowDelete: true,
      allowUpload: true,
      ownerId: '{data.id}',
      ownerType: '',
      propertyName: '',
    };
    return customModel;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default FileUploadComponent;
