import { FC, MutableRefObject } from 'react';
import { useForm } from '../../../providers/form';
import React from 'react';
import { useMetadata } from '../../../providers';

interface IDragHandleProps {
    componentId: string;
    componentRef: MutableRefObject<any>;
}

export const DragHandle: FC<IDragHandleProps> = props => {
    const { selectedComponentId, setSelectedComponent } = useForm();

    const metadata = useMetadata(false);

    const onClick = () => {
        setSelectedComponent(selectedComponentId === props.componentId ? null : props.componentId, metadata?.id, props.componentRef);
    };

    return <div className="sha-component-drag-handle" style={{ border: '1px solid #ddd' }} onClick={onClick}></div>;
};

export default DragHandle;