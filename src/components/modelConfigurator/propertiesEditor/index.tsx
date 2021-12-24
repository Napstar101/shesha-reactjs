import React, { FC } from 'react';
import { PropertiesEditorRenderer } from './renderer';
import { PropertiesEditorProvider } from './provider';
import { IModelItem } from '../../../interfaces/modelConfigurator';
import { Form } from 'antd';

export interface IPropertiesEditorComponentProps {
}
export const PropertiesEditorComponent: FC<IPropertiesEditorComponentProps> = () => {
 return (
    <Form.Item
        name="properties"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
    >
        <PropertiesEditor></PropertiesEditor>
    </Form.Item>
 );   
}

export interface IPropertiesEditorProps extends IPropertiesEditorComponentProps {
    value?: IModelItem[];
    onChange?: (value: IModelItem[]) => void;    
}

export const PropertiesEditor: FC<IPropertiesEditorProps> = (props) => {
    return (
        <PropertiesEditorProvider items={props.value} onChange={props.onChange}>
            <PropertiesEditorRenderer></PropertiesEditorRenderer>
        </PropertiesEditorProvider>
    );
}

/*
    <Form.Item
      className={classNames(className, { 'form-item-hidden': model.hideLabel })}
      // className={`${model.hideLabel ? 'form-item-hidden' : ''}`}
      name={getFieldNameFromExpression(model.name)}
      label={model.hideLabel ? null : model.label}
      labelAlign={model.labelAlign}
      hidden={isHidden}
      valuePropName={valuePropName}
      // initialValue={initialValue}
      initialValue={model.defaultValue || initialValue}
      tooltip={model.description}
      rules={isHidden ? [] : getValidationRules(model)}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      {children}
    </Form.Item>
*/
