import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CodeSandboxOutlined } from '@ant-design/icons';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { ICodeEditorProps, CodeEditor } from './codeEditor';

const settingsForm = settingsFormJson as FormMarkup;

export interface ICodeEditorComponentProps extends IConfigurableFormComponent {

}

const CodeEditorComponent: IToolboxComponent<ICodeEditorComponentProps> = {
  type: 'codeEditor',
  name: 'Code Editor',
  icon: <CodeSandboxOutlined />,
  factory: (model: IConfigurableFormComponent) => {
    const customProps = model as ICodeEditorComponentProps;
    const editorProps: ICodeEditorProps = {
      ...customProps
    };

    return (
      <ConfigurableFormItem model={model}>
        <CodeEditor {...editorProps} />
      </ConfigurableFormItem>
    );
  },
  initModel: model => {
    const textAreaModel: ICodeEditorComponentProps = {
      ...model,
      label: 'Code Editor',
    };

    return textAreaModel;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default CodeEditorComponent;
