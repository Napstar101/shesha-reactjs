import { FC, MutableRefObject } from 'react';
import { useForm } from '../../../providers/form';
import React from 'react';
import { useMetadata } from '../../../providers';
import { Tooltip } from 'antd';

interface IDragHandleProps {
    componentId: string;
    componentRef: MutableRefObject<any>;
}

export const DragHandle: FC<IDragHandleProps> = props => {
    const { selectedComponentId, setSelectedComponent, getComponentModel } = useForm();

    const metadata = useMetadata(false);
    const componentModel = getComponentModel(props.componentId);

    const tooltip = (
        <div>
            <div>
                <strong>Id:</strong> {componentModel.id}
            </div>
            <div>
                <strong>Type:</strong> {componentModel.type}
            </div>
            {Boolean(componentModel.name) && (
                <div>
                    <strong>Name:</strong> {componentModel.name}
                </div>
            )}
        </div>
    );

    const onClick = () => {
        setSelectedComponent(selectedComponentId === props.componentId ? null : props.componentId, metadata?.id, props.componentRef);
    };

    return (
        <Tooltip title={tooltip} placement="right">
            <div className="sha-component-drag-handle" onClick={onClick}></div>
        </Tooltip>
    );
};

export default DragHandle;