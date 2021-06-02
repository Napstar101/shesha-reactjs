import { Checkbox, Col, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useReferenceListGetItems } from '../../apis/referenceList';
import { ShaSpin } from '../../';
import React, { FC, useEffect } from 'react';

export interface IMultiCheckBoxRefListProps {
  readonly listName: string;
  readonly listNamespace: string;
  readonly onChange?: (e: CheckboxChangeEvent, itemValue: number) => void;
  readonly columns?: 1 | 2 | 3 | 4;
}

export const MultiCheckBoxRefList: FC<IMultiCheckBoxRefListProps> = ({
  listName,
  listNamespace,
  onChange,
  columns = 3,
}) => {
  const { data, refetch, loading } = useReferenceListGetItems({
    lazy: true,
  });

  useEffect(() => {
    if (listName && listNamespace) {
      refetch({ queryParams: { name: listName, namespace: listNamespace } });
    }
  }, [listName, listNamespace]);

  return (
    <ShaSpin spinning={loading}>
      <Row>
        {data?.result.map(({ item, itemValue }) => (
          <Col key={itemValue} span={24 / columns}>
            <Checkbox key={itemValue} onChange={e => onChange(e, itemValue)}>
              {item}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </ShaSpin>
  );
};

export default MultiCheckBoxRefList;
