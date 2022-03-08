import { LineOutlined } from '@ant-design/icons';
import { Divider, DividerProps } from 'antd';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../formDesignerUtils';
import { IConfigurableFormComponent, IToolboxComponent } from '../../../../interfaces/formDesigner';
import { FormMarkup } from '../../../../providers/form/models';
import ComponentsContainer from '../../componentsContainer';
import settingsFormJson from './settingsForm.json';

export interface IDividerProps extends IConfigurableFormComponent {
  container?: boolean;
  dividerType?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  orientationMargin?: string | number;
  dashed?: boolean;
  plain?: boolean;
}

const settingsForm = settingsFormJson as FormMarkup;

const DividerComponent: IToolboxComponent<IDividerProps> = {
  type: 'divider',
  name: 'Divider',
  icon: <LineOutlined />,
  factory: (model: IDividerProps) => {
    const props: DividerProps = {
      type: model?.dividerType,
      orientation: model?.orientation,
      orientationMargin: model?.orientationMargin,
      dashed: model?.dashed,
      plain: model?.plain,
    };

    return model?.container ? (
      <Divider {...props}>
        <ComponentsContainer containerId={model.id} />
      </Divider>
    ) : (
      <Divider {...props} />
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
  initModel: model => ({
    dividerType: 'horizontal',
    orientation: 'center',
    dashed: false,
    plain: true,
    ...model,
  }),
};

export default DividerComponent;
