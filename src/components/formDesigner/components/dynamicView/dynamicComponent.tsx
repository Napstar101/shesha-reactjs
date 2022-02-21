import React, { FC, useRef } from 'react';
import { ErrorBoundary } from '../../..';
import { IConfigurableFormComponent } from '../../../../interfaces';
import { useForm } from '../../../..';

export interface IConfigurableFormComponentProps {
    model: IConfigurableFormComponent;
}

const DynamicComponent: FC<IConfigurableFormComponentProps> = ({ model }) => {
    const { form, getToolboxComponent } = useForm();
    const componentRef = useRef();
    const toolboxComponent = getToolboxComponent(model.type);
    if (!toolboxComponent)
        return null;
    const renderComponent = () => {
        return (
            <ErrorBoundary>
                {toolboxComponent.factory(model, componentRef, form)}
            </ErrorBoundary>
        );
    };

    return renderComponent();
};

export default DynamicComponent;
