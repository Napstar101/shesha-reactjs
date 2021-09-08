import React, { FC, useState } from 'react';
import { Modal, Input, Button } from 'antd';
import IndexTable from '../indexTable';
import { IAnyObject } from '../../interfaces';
import DataTableProvider from '../../providers/dataTable';
import GlobalTableFilter from '../globalTableFilter';
import TablePager from '../tablePager';
import _ from 'lodash';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { EllipsisOutlined } from '@ant-design/icons';

export interface IEntityPickerProps {
  tableId?: string;
  onChange?: (value: string, data: IAnyObject) => void;
  value?: any;
  displayEntityKey?: string;
  disabled?: boolean;
  loading?: boolean;
  name?: string;
  size?: SizeType;
  title?: string;
}

export interface IEntityPickerState {
  showModal?: boolean;
  selectedRowIndex?: number;
  selectedValue?: string;
}

export const EntityPicker: FC<IEntityPickerProps> = ({
  tableId,
  displayEntityKey = 'displayName',
  onChange,
  disabled,
  loading,
  value,
  name,
  size,
  title = "Select Item"
}) => {
  const [state, setState] = useState<IEntityPickerState>({
    showModal: false,
    selectedRowIndex: -1,
    selectedValue: ''
  });

  // console.log('EntityPicker state: ', state);
  
    
  const toggleModalVisibility = () => setState((current) => ({...current, showModal: !current?.showModal }));

  const onDblClick = (row: IAnyObject) => {
    handleOnChange(row);

    setSelectedRow(row);
    toggleModalVisibility();
  };

  const onSelectRow = (index: number, row: IAnyObject) => {
    handleOnChange(row);

    setSelectedRow(row, index);
  };

  const handleOnChange = (row: IAnyObject) => {
    if (onChange && !_.isEmpty(row)) {
      onChange(row && (row.id || row.Id), row);
    }
  };

  const handleCancel = () => {
    clearAll();
    toggleModalVisibility();
  };

  const clearAll = () => {
    setState({...state, selectedRowIndex: -1, selectedValue: '' });

    if (onChange) {
      onChange(null, null);
    }
  };

  const setSelectedRow = (row: IAnyObject, selectedRowIndex?: number) => {
    let selectedValue = value;

    if (row && Object.keys(row).length) {
      selectedValue = displayEntityKey
        ? row[displayEntityKey]
        : row?.displayName || row?.DisplayName || row?.name || row?.Name;
    }

    setState({
      ...state,
      selectedValue,
      selectedRowIndex: selectedRowIndex === null ? state?.selectedRowIndex: selectedRowIndex
    });
  };

  return (
    <div className="entity-picker-container">
      <div>
        <Input.Group compact className="picker-input-group">
          <Input
            allowClear
            className="picker-input-group-input"
            value={state?.selectedValue || value}
            onChange={clearAll}
            disabled={disabled}
            name={name}
            size={size}
          />

          <Button
            onClick={toggleModalVisibility}
            className="picker-input-group-ellipsis"
            disabled={disabled}
            loading={loading ?? false}
            size={size}
            icon={<EllipsisOutlined />}
          />
        </Input.Group>
      </div>

      <Modal
        title={title || 'Select Item'}
        className="entity-picker-modal"
        visible={state?.showModal}
        onOk={toggleModalVisibility}
        onCancel={handleCancel}
        width="60%"
        okText="Select"
        okButtonProps={{
          disabled: !state?.selectedValue,
        }}
      >
        <DataTableProvider tableId={tableId} onDblClick={onDblClick}>
          <GlobalTableFilter
            searchProps={{ size: 'middle', autoFocus: true, placeholder: 'Search by Title, Type or Keyword...' }}
          />

          <div className="entity-picker-modal-pager-container">
            <TablePager />
          </div>

          <IndexTable
            onSelectRow={onSelectRow}
            onDblClick={onDblClick}
            selectedRowIndex={state?.selectedRowIndex}
          />
        </DataTableProvider>
      </Modal>
    </div>
  );
};

export default EntityPicker;
