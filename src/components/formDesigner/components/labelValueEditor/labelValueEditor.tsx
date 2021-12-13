import React, { FC, useEffect, useRef, useContext, useState } from 'react';
import {
  DragDropContext,
  DropResult,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { ILabelValueEditorPropsBase } from './models';

import { IItemProps } from './models';
import { Table, Popconfirm, Button, Form, Input } from 'antd';
import { DeleteOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid/non-secure';

export interface IProps extends ILabelValueEditorPropsBase {
  value?: object;
  onChange?: any;
}

const EditableContext = React.createContext(null);
const DragHandleContext = React.createContext(null);
const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        // style={{
        //   paddingRight: 24,
        // }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const getItemStyle = (draggableStyle: any, isDragging: boolean): {} => ({
  padding: '2px',
  userSelect: 'none',
  background: isDragging ? 'white' : 'inherit',
  border: isDragging ? '1px dashed #000' : 'none',
  ...draggableStyle,
});

const DraggableBodyRowInner = ({ items, className, style, ...restProps }) => {
  const [form] = Form.useForm();

  // function findIndex base on Table rowKey props and should always be a right array index
  const rowKey = restProps['data-row-key'];
  if (!rowKey) return null;

  const index = items.findIndex(x => x.id === restProps['data-row-key']);
  return (
    <Draggable key={rowKey} draggableId={rowKey} index={index}>
      {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
        <Form form={form} component={false}>
          <DragHandleContext.Provider value={{ ...providedDraggable.dragHandleProps }}>
            <EditableContext.Provider value={form}>
              <tr
                className="editable-row"
                ref={providedDraggable.innerRef}
                {...providedDraggable.draggableProps}
                style={getItemStyle(providedDraggable.draggableProps.style, snapshotDraggable.isDragging)}
                {...restProps}
              ></tr>
            </EditableContext.Provider>
          </DragHandleContext.Provider>
        </Form>
      )}
    </Draggable>
  );
};

export const LabelValueEditor: FC<IProps> = ({ value, onChange, labelTitle, labelName, valueTitle, valueName }) => {
  const items = (value as IItemProps[]) || [];

  const DragHandle = props => <MenuOutlined style={{ color: '#999' }} {...props} />;

  const handleDeleteRow = (id: string) => {
    const newRows = items.filter(row => row.id !== id);
    onChange(newRows);
  };

  const handleAddRow = () => {
    const newRow = {
      id: nanoid(),
      [labelName]: `new ${labelTitle}`,
      [valueName]: `new ${valueTitle}`,
    };
    const newRows = [...items, newRow];
    onChange(newRows);
  };

  const handleSaveCell = row => {
    const newData = [...items];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });

    onChange(newData);
  };

  const cols = [
    {
      title: '',
      dataIndex: 'sort',
      width: '30px',
      render: (_text, _record, _index) => {
        const dragHandleProps = useContext(DragHandleContext);
        return <DragHandle {...dragHandleProps} />;
      },
    },
    {
      title: labelTitle,
      dataIndex: labelName,
      editable: true,
      width: '30%',
    },
    {
      title: valueTitle,
      dataIndex: valueName,
      width: '30%',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operations',
      width: '30px',
      render: (_, record) =>
        items.length >= 1 ? (
          <Popconfirm title="Are you sure want to delete this item?" onConfirm={() => handleDeleteRow(record.id)}>
            <DeleteOutlined />
          </Popconfirm>
        ) : null,
    },
  ];
  const columns = cols.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSaveCell,
      }),
    };
  });

  const getListStyle = (_isDraggingOver: boolean) => ({
    //background: isDraggingOver ? "lightgrey" : "inherit",
    //overflow: "scroll" as "scroll",
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId == source.droppableId && source.index == destination.index) return;

    const reorder = (list: IItemProps[], startIndex: number, endIndex: number): IItemProps[] => {
      const result = [...list];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    if (source.droppableId === destination.droppableId) {
      let newTabs = reorder(items, source.index, destination.index);

      onChange(newTabs);
    }
  };

  return (
    <div className="sha-labelvalueeditor">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'keyValueItems'}>
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
              <Table
                scroll={{ x: 'mex-content' }}
                bordered
                pagination={false}
                dataSource={items}
                columns={columns}
                rowKey={r => r.id}
                components={{
                  body: {
                    row: ({ className, style, ...restProps }) => (
                      <DraggableBodyRowInner
                        items={items}
                        className={className}
                        style={style}
                        {...restProps}
                      ></DraggableBodyRowInner>
                    ),
                    cell: EditableCell,
                  },
                }}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="sha-labelvalueeditor-buttons">
        <Button type="default" onClick={handleAddRow} icon={<PlusOutlined />}>
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default LabelValueEditor;
