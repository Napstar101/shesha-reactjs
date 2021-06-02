import React, { FC, useState } from 'react';
import { AutoCompletePlaces } from '../';
import { EditOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';

type IPropType = 'default' | 'edit' | 'autocomplete';
interface IProps extends FormItemProps {
  readonly mode?: IPropType;
  readonly value?: string;
  readonly onValueChange?: (value?: string) => void;
  readonly onControlSave?: () => void;
}

export const DisplayFormItem: FC<IProps> = ({
  children,
  className,
  mode = 'default',
  value,
  onValueChange,
  onControlSave,
  ...rest
}) => {
  const [state, setState] = useState({ isEdit: false });

  const onSave = () => {
    if (!!value?.trim()) {
      setState({ ...state, isEdit: false });
    }

    if (onControlSave) onControlSave();
  };

  const renderChildren = () => {
    try {
      if (!!children) return children;
      return 'N/A';
    } catch (error) {
      return 'Invalid';
    }
  };

  return (
    <FormItem
      className={`display-form-item ${mode === 'autocomplete' ? 'autocomplete-form-item' : ''} ${
        className ? className : ''
      }`}
      {...rest}
    >
      {!state.isEdit && renderChildren()}
      {state.isEdit && (
        <>
          {mode === 'edit' && <Input value={value} onChange={({ target: { value: val } }) => onValueChange(val)} />}
          {mode === 'autocomplete' && (
            <AutoCompletePlaces
              value={value}
              onChange={onValueChange}
              //extra={<Extra onExtraChange={() => {}} />}
            />
          )}
        </>
      )}
      {(mode === 'edit' || mode === 'autocomplete') && (
        <>
          {!state.isEdit && (
            <Button
              className="ant-blend-btn"
              icon={<EditOutlined />}
              type="ghost"
              onClick={() => setState({ ...state, isEdit: true })}
            />
          )}
          {state.isEdit && (
            <Button className="ant-save-btn" type="primary" onClick={onSave} size="small">
              Save
            </Button>
          )}
        </>
      )}
    </FormItem>
  );
};

export default DisplayFormItem;
