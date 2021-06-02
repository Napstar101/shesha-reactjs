import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { IConfigurableFormComponent } from '../../../../providers/form/models';
import { SplitCellsOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import ColumnsSettings from './columnsSettings';
import ComponentsContainer from '../../componentsContainer';
import { v4 as uuid } from 'uuid';
import { useForm } from '../../../../providers';

export interface IColumnProps {
  id: string;
  flex: number;
  offset: number;
  push: number;
  pull: number;
  components: IConfigurableFormComponent[];
}

export interface IColumnsComponentProps extends IConfigurableFormComponent {
  columns: IColumnProps[];
}

const ColumnsComponent: IToolboxComponent<IColumnsComponentProps> = {
  type: 'columns',
  name: 'Columns',
  icon: <SplitCellsOutlined />,
  factory: model => {
    const { formMode, visibleComponentIds } = useForm();
    const { columns } = model as IColumnsComponentProps;

    const hiddenByCondition = visibleComponentIds && !visibleComponentIds.includes(model.id);
    const isHidden = formMode !== 'designer' && (model.hidden || hiddenByCondition);
    if (isHidden) return null;

    return (
      <Row>
        {columns &&
          columns.map((col, index) => (
            <Col
              key={index}
              md={col.flex}
              offset={col.offset}
              pull={col.pull}
              push={col.push}
              className="sha-designer-column"
            >
              <ComponentsContainer containerId={col.id}></ComponentsContainer>
            </Col>
          ))}
      </Row>
    );
  },
  initModel: model => {
    let tabsModel: IColumnsComponentProps = {
      ...model,
      name: 'custom Name',
      columns: [
        { id: uuid(), flex: 12, offset: 0, push: 0, pull: 0, components: [] },
        { id: uuid(), flex: 12, offset: 0, push: 0, pull: 0, components: [] },
      ],
    };
    return tabsModel;
  },
  settingsFormFactory: ({ model, onSave, onCancel, onValuesChange, form }) => {
    return (
      <ColumnsSettings
        model={model as IColumnsComponentProps}
        onSave={onSave}
        onCancel={onCancel}
        onValuesChange={onValuesChange}
        form={form}
      />
    );
  },
  customContainerNames: ['columns'],
};

export default ColumnsComponent;
