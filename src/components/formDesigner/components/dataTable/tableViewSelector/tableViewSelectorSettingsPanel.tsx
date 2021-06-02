import React, { useState } from 'react';
import { Form, Button, FormInstance } from 'antd';
import { ITableViewSelectorProps } from './models';
import TableViewSelectorSettingsModal from './tableViewSelectorSettingsModal';
import { QueryBuilderProvider } from '../../../../../providers';
import { useForm } from '../../../../../providers/form';
import { ITableColumn } from '../../../../../';
import { IProperty } from '../../../../../providers/queryBuilder/models';

export interface IProps {
  model: ITableViewSelectorProps;
  onSave: (model: ITableViewSelectorProps) => void;
  onCancel: () => void;
  onValuesChange?: (changedValues: any, values: ITableViewSelectorProps) => void;
  form: FormInstance;
}

function ColumnsSettings(props: IProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm(props.form);
  const { selectedComponentRef } = useForm();

  const columns = (selectedComponentRef.current?.columns as ITableColumn[]) || [];
  const fields: IProperty[] = [];

  columns.forEach(column => {
    fields.push({
      label: column.header,
      propertyName: column.columnId,
      visible: column.isVisible,
      dataType: column.dataType,
      fieldSettings: {
        typeShortAlias: column.entityReferenceTypeShortAlias,
        referenceListName: column.referenceListName,
        referenceListNamespace: column.referenceListNamespace,
        allowInherited: column.allowInherited,
      },
      //tooltip: column.description
      //preferWidgets: ['']
    });
  });

  console.log({ columns, fields });

  /* NOTE: don't delete this code, it's not needed now but will be used in another part of the system
  // take all columns with dots, create a list of 
  columns.forEach(column => {
    let { propertyName } = column;
    let container = fields;
    let currentParent = container;
    if (propertyName.indexOf('.') > -1){
      const parts = propertyName.split('.');
      propertyName = parts.pop(); // remove name of the property

      parts.forEach(part => {
        let property = currentParent.find(f => f.propertyName === part);
        if (!property){
          property = {
            propertyName: part,
            dataType: '!struct',
            label: part,
            visible: true,
            childProperties: [],
          };
          currentParent.push(property);
        }
        if (property.childProperties)
        currentParent = property.childProperties;
      });      
    }
    
    currentParent.push({
      label: column.header,
      propertyName: propertyName,
      visible: column.isVisible,
      dataType: column.dataType,
    });
  });
  */
  return (
    <QueryBuilderProvider fields={fields}>
      <Form form={form} onFinish={props.onSave} onValuesChange={props.onValuesChange}>
        <Button onClick={() => setModalVisible(true)}>Customise Filters</Button>
        <Form.Item name="filters" initialValue={props.model.filters}>
          <TableViewSelectorSettingsModal
            visible={modalVisible}
            hideModal={() => {
              setModalVisible(false);
            }}
          ></TableViewSelectorSettingsModal>
        </Form.Item>
      </Form>
    </QueryBuilderProvider>
  );
}

export default ColumnsSettings;
