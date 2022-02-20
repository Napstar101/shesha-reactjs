import { FileTextOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../formDesignerUtils';
import { IConfigurableFormComponent, IToolboxComponent } from '../../../../../interfaces/formDesigner';
import { FormMarkup } from '../../../../../providers/form/models';
import settingsFormJson from './settingsForm.json';

const { Text } = Typography;

export interface ITextProps extends IConfigurableFormComponent {
  content: string;
  contentType: 'secondary' | 'success' | 'warning' | 'danger';
  code?: boolean;
  keyboard?: boolean;
  copyable?: boolean;
  delete?: boolean;
  ellipsis?: boolean;
  mark?: boolean;
  strong?: boolean;
  underline?: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const TextComponent: IToolboxComponent<ITextProps> = {
  type: 'text',
  name: 'Text',
  icon: <FileTextOutlined />,
  factory: (model: ITextProps) => {
    const props: TextProps = {
      code: model?.code,
      copyable: model?.copyable,
      delete: model?.delete,
      ellipsis: model?.ellipsis,
      mark: model?.mark,
      underline: model?.underline,
      keyboard: model?.keyboard,
      strong: model?.strong,
      type: model?.contentType,
    };

    return <Text {...props}>{model?.content}</Text>;
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => ({
    code: false,
    copyable: false,
    delete: false,
    disabled: false,
    ellipsis: false,
    mark: false,
    italic: false,
    underline: false,
    keyboard: false,
    strong: false,
    ...model,
  }),
};

export default TextComponent;
