import { ArrowsAltOutlined } from '@ant-design/icons';
import { Space, SpaceProps } from 'antd';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../formDesignerUtils';
import { IConfigurableFormComponent, IToolboxComponent } from '../../../../interfaces/formDesigner';
import { FormMarkup } from '../../../../providers/form/models';
import ComponentsContainer from '../../componentsContainer';
import settingsFormJson from './settingsForm.json';

export interface ISpaceProps extends IConfigurableFormComponent {
  align?: 'start' | 'end' | 'center' | 'baseline';
  direction?: 'vertical' | 'horizontal';
  size?: 'small' | 'middle' | 'large'; // number
  sizeNumber?: number;
  wrap?: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const SpaceComponent: IToolboxComponent<ISpaceProps> = {
  type: 'space',
  name: 'Space',
  icon: <ArrowsAltOutlined />,
  factory: (model: ISpaceProps) => {
    const props: SpaceProps = {
      align: model?.align,
      direction: model?.direction,
      size: model?.size || model?.sizeNumber,
      wrap: model?.wrap,
    };

    return (
      <Space {...props}>
        <ComponentsContainer containerId={model.id} />
      </Space>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => ({
    direction: 'horizontal',
    size: 'small',
    wrap: false,
    ...model,
  }),
};

export default SpaceComponent;
