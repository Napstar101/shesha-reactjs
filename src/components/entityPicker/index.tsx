import React, { FC, useState } from 'react';
import { Modal, Input, Button } from 'antd';
import _ from 'lodash';
import IndexTable from '../indexTable';
import { IAnyObject } from '../../interfaces';
import DataTableProvider from '../../providers/dataTable';
import GlobalTableFilter from '../globalTableFilter';
import TablePager from '../tablePager';

interface IEntityPickerProps {
  tableId?: string;
  onChange?: (value: string, data: IAnyObject) => void;
  displayEntityKey?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const EntityPicker: FC<IEntityPickerProps> = ({
  tableId,
  displayEntityKey = 'displayName',
  onChange,
  disabled,
  loading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [selectedValue, setSelectedValue] = useState('');

  const toggleModalVisiblity = () => setShowModal(!showModal);

  const onDblClick = (row: IAnyObject) => {
    handleOnChange(row);

    setSelectedRow(row);
    toggleModalVisiblity();
  };

  const onSelectRow = (index: number, row: IAnyObject) => {
    handleOnChange(row);

    setSelectedRowIndex(index);

    setSelectedRow(row);
  };

  const handleOnChange = (row: IAnyObject) => {
    if (onChange && !_.isEmpty(row)) {
      onChange(row && (row.id || row.Id), row);
    }
  };

  const handleCancel = () => {
    clearAll();
    toggleModalVisiblity();
  };

  const clearAll = () => {
    setSelectedRowIndex(-1);
    setSelectedValue('');
  };

  const setSelectedRow = (row: IAnyObject) => {
    let value = '';
    if (row && Object.keys(row).length) {
      value = displayEntityKey
        ? (value = row[displayEntityKey])
        : row.displayName || row.DisplayName || row.name || row.Name;
    }

    setSelectedValue(value);
  };

  return (
    <div className="entity-picker-container">
      <div>
        <Input.Group compact className="picker-input-group">
          <Input
            allowClear
            className="picker-input-group-input"
            value={selectedValue}
            onChange={clearAll}
            disabled={disabled}
          />

          <Button
            onClick={toggleModalVisiblity}
            className="picker-input-group-ellipsis"
            disabled={disabled}
            loading={loading ?? false}
          >
            ...
          </Button>
        </Input.Group>
      </div>
      <Modal
        title="Entity Picker"
        className="entity-picker-modal"
        visible={showModal}
        onOk={toggleModalVisiblity}
        onCancel={handleCancel}
        width="60%"
        okText="Select"
        okButtonProps={{
          disabled: !selectedValue,
        }}
      >
        <DataTableProvider tableId={tableId} onDblClick={onDblClick}>
          <GlobalTableFilter
            searchProps={{ size: 'middle', autoFocus: true, placeholder: 'Search by Title, Type or Keyword...' }}
          />
          <div className="entity-picker-modal-pager-container">
            <TablePager />
          </div>
          <IndexTable onSelectRow={onSelectRow} selectedRowIndex={selectedRowIndex} />
        </DataTableProvider>
      </Modal>
    </div>
  );
};

export default EntityPicker;
