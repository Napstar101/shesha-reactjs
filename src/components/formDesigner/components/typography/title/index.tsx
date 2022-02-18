import { LineHeightOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../formDesignerUtils';
import { IConfigurableFormComponent, IToolboxComponent } from '../../../../../interfaces/formDesigner';
import { FormMarkup } from '../../../../../providers/form/models';
import settingsFormJson from './settingsForm.json';

const { Title } = Typography;

export interface ITitleProps extends IConfigurableFormComponent {
  content: string;
  textType: 'secondary' | 'success' | 'warning' | 'danger';
  code?: boolean;
  copyable?: boolean;
  delete?: boolean;
  ellipsis?: boolean;
  mark?: boolean;
  underline?: boolean;
  level?: 1 | 2 | 3 | 4 | 5;
}

const settingsForm = settingsFormJson as FormMarkup;

const TitleComponent: IToolboxComponent<ITitleProps> = {
  type: 'title',
  name: 'Title',
  icon: <LineHeightOutlined />,
  factory: (model: ITitleProps) => {
    const props: TitleProps = {
      code: model?.code,
      copyable: model?.copyable,
      delete: model?.delete,
      ellipsis: model?.ellipsis,
      mark: model?.mark,
      underline: model?.underline,
      level: model?.level,
      type: model?.textType,
    };

    return <Title {...props}>{model?.content}</Title>;
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
    ...model,
  }),
};

export default TitleComponent;
