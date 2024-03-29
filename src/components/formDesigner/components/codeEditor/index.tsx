import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { CodeSandboxOutlined } from '@ant-design/icons';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { ICodeEditorProps, CodeEditor } from './codeEditor';
import { DataTypes, StringFormats } from '../../../../interfaces/dataTypes';

const settingsForm = settingsFormJson as FormMarkup;

export interface ICodeEditorComponentProps extends IConfigurableFormComponent {
  mode: 'dialog' | 'inline';
}

const CodeEditorComponent: IToolboxComponent<ICodeEditorComponentProps> = {
  type: 'codeEditor',
  name: 'Code Editor',
  icon: <CodeSandboxOutlined />,
  dataTypeSupported: ({ dataType, dataFormat }) =>
    dataType === DataTypes.string && (dataFormat === StringFormats.javascript || dataFormat === StringFormats.json),
  factory: ({ ...model }: ICodeEditorComponentProps) => {
    const editorProps: ICodeEditorProps = {
      ...model,
    };

    return (
      <>
        <ConfigurableFormItem model={model}>
          <CodeEditor
            {...editorProps}
            mode="dialog"
            setOptions={{ minLines: 20, maxLines: 500, fixedWidthGutter: true }}
          />
        </ConfigurableFormItem>
      </>
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
