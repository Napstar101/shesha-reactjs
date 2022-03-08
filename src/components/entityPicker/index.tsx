import React, { FC, Fragment, ReactNode, useState } from 'react';
import { Modal, Input, Button, ButtonProps } from 'antd';
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
  onSelect?: (data: IAnyObject) => void;
  value?: any;
  displayEntityKey?: string;
  disabled?: boolean;
  loading?: boolean;
  name?: string;
  size?: SizeType;
  title?: string;
  useButtonPicker?: boolean;
  pickerButtonProps?: ButtonProps;
  parentEntityId?: string;
  defaultValue?: string;
  entityFooter?: ReactNode;
}

export interface IEntityPickerState {
  showModal?: boolean;
  selectedRowIndex?: number;
  selectedValue?: string;
  selectedRow?: IAnyObject;
}

const INITIAL_STATE: IEntityPickerState = {
  selectedRowIndex: -1,
  selectedValue: '',
  selectedRow: null,
};

export const EntityPicker: FC<IEntityPickerProps> = ({
  tableId,
  displayEntityKey = 'displayName',
  onChange,
  disabled,
  loading,
  value,
  name,
  size,
  useButtonPicker,
  pickerButtonProps,
  onSelect,
  parentEntityId,
  defaultValue,
  title = 'Select Item',
  entityFooter,
}) => {
  const [state, setState] = useState<IEntityPickerState>({
    showModal: false,
    ...INITIAL_STATE,
  });

  const toggleModalVisibility = () =>
    setState(current => ({
      ...current,
      ...INITIAL_STATE,
      showModal: !current?.showModal,
      selectedValue: current?.selectedValue,
    }));

  const onDblClick = (row: IAnyObject) => {
    if (onSelect) {
      onSelect(row);
    } else {
      handleOnChange(row);
      setSelectedRow(row);
    }

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

  const onModalOk = () => {
    if (onSelect && state?.selectedRow) {
      onSelect(state?.selectedRow);
    }

    toggleModalVisibility();
  };

  const handleCancel = () => {
    clearAll();
    toggleModalVisibility();
  };

  const clearAll = () => {
    setState({ ...state, selectedRowIndex: -1, selectedValue: '' });

    if (onChange) {
      onChange(null, null);
    }
  };

  const setSelectedRow = (selectedRow: IAnyObject, selectedRowIndex?: number) => {
    let selectedValue = value;

    if (selectedRow && Object.keys(selectedRow).length) {
      selectedValue = displayEntityKey
        ? selectedRow[displayEntityKey]
        : selectedRow?.displayName || selectedRow?.DisplayName || selectedRow?.name || selectedRow?.Name;
    }

    setState({
      ...state,
      selectedValue,
      selectedRow,
      selectedRowIndex: selectedRowIndex === null ? state?.selectedRowIndex : selectedRowIndex,
    });
  };

  const handleButtonPickerClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event?.stopPropagation();
    setState({ ...state, showModal: true });
  };

  const footer = (
    <Fragment>
      {entityFooter}
      <Button onClick={handleCancel}>Close</Button>
    </Fragment>
  );

  return (
    <div className="entity-picker-container">
      <div>
        {useButtonPicker ? (
          <Button onClick={handleButtonPickerClick} size={size} {...(pickerButtonProps || {})}>
            {title}
          </Button>
        ) : (
          <Input.Group compact className="picker-input-group">
            <Input
              allowClear
              className="picker-input-group-input"
              value={state?.selectedValue || value}
              onChange={clearAll}
              disabled={disabled}
              name={name}
              size={size}
              defaultValue={defaultValue}
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
        )}
      </div>

      <Modal
        title={title || 'Select Item'}
        className="entity-picker-modal"
        visible={state?.showModal}
        onOk={onModalOk}
        onCancel={handleCancel}
        width="60%"
        okText="Select"
        footer={footer}
      >
        <DataTableProvider tableId={tableId} onDblClick={onDblClick} parentEntityId={parentEntityId}>
          <GlobalTableFilter
            searchProps={{ size: 'middle', autoFocus: true, placeholder: 'Search by Title, Type or Keyword...' }}
          />

          <div className="entity-picker-modal-pager-container">
            <TablePager />
          </div>

          <IndexTable onSelectRow={onSelectRow} onDblClick={onDblClick} selectedRowIndex={state?.selectedRowIndex} />
        </DataTableProvider>
      </Modal>
    </div>
  );
};

export default EntityPicker;
