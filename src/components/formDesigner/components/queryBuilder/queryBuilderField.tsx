import { FC, useState } from 'react';
import { JsonLogicResult } from 'react-awesome-query-builder';
import { Modal, Button, Input } from 'antd';
import { IProperty } from '../../../../providers/queryBuilder/models';
import React from 'react';
import QueryBuilder from '../../../queryBuilder';

export interface IQueryBuilderFieldProps {
  fields: IProperty[];
  value?: object;
  onChange?: (value: any) => void;
}

export const QueryBuilderField: FC<IQueryBuilderFieldProps> = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [jsonLogicResult, setJsonLogicResult] = useState<JsonLogicResult>(undefined);

  const onOkClick = () => {
    if (jsonLogicResult) {
      if (jsonLogicResult && jsonLogicResult.errors && jsonLogicResult.errors.length > 0) {
        console.log(jsonLogicResult);
        // show errors
        return;
      }

      if (props.onChange) {
        props.onChange(jsonLogicResult?.logic);
      }
    }
    setModalVisible(false);
  };

  const onChange = (result: JsonLogicResult) => {
    setJsonLogicResult(result);
  };

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Query Builder
      </Button>
      <Input.TextArea
        disabled={true}
        value={props.value ? JSON.stringify(props.value, null, 2) : null}
        rows={5}
        size="small"
      ></Input.TextArea>
      <Modal
        visible={modalVisible}
        width="60%"
        title="Quick Filter Query Builder"
        onCancel={() => setModalVisible(false)}
        onOk={onOkClick}
      >
        <h4>Here you can create your own table filters using the query builder below</h4>
        <QueryBuilder value={props.value} onChange={onChange} fields={props.fields}></QueryBuilder>
      </Modal>
    </>
  );
};

export default QueryBuilderField;
