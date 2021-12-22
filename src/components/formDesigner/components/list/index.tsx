import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { OrderedListOutlined } from '@ant-design/icons';
import settingsFormJson from './settingsForm.json';
import ComponentsContainer from '../../componentsContainer';
import { ExpandIconPosition } from 'antd/lib/collapse/Collapse';
import { useForm } from '../../../../providers/form';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';

export interface IListProps extends IConfigurableFormComponent {
  expandIconPosition?: ExpandIconPosition;
  display?: 'inline' | 'inline-block' | 'block';
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
}

const settingsForm = settingsFormJson as FormMarkup;

const ListComponent: IToolboxComponent<IListProps> = {
  type: 'list',
  name: 'List',
  icon: <OrderedListOutlined />,
  factory: (model: IListProps) => {
    const { formMode, visibleComponentIds } = useForm();
    // const { label, expandIconPosition } = model;

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return (
      <div className="sha-designer-list-component" style={{ display: model?.display }}>
        <ComponentsContainer containerId={model.id} />
      </div>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default ListComponent;
