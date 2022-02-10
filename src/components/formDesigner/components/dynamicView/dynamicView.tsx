import React, { FC, useMemo } from 'react';
import { IConfigurableFormComponent } from '../../../../interfaces/formDesigner';
import { IPropertyMetadata } from '../../../../interfaces/metadata';
import { useForm } from '../../../../providers/form';
import { camelize } from '../../../../providers/form/utils';
import { useMetadata } from '../../../../providers/metadata';

export interface DynamicViewProps {

}

export const DynamicView: FC<DynamicViewProps> = () => {
    /*
    1. get metadata
    2. if metadata is not available - return null
    3. get all existing form fields
    4. filter out all fields that are already added to the form manually   
    5. decide how to sort properties
    6. how to render two dynamic view components?
    7. add a flag to mark framework properties (id, CreationTime etc...)
    */
    /*
    filter components which are not linked to the model
    */

    const currentMeta = useMetadata(false)?.metadata;

    const { allComponents } = useForm();

    const staticComponents = useMemo<IConfigurableFormComponent[]>(() => {
        const result: IConfigurableFormComponent[] = [];
        for (const componentId in allComponents) {
            result.push(allComponents[componentId]);
        }
        return result;
    }, [allComponents]);

    const staticComponentBindings = useMemo(() => {
        const names = staticComponents.filter(c => Boolean(c.name)).map(component => camelize(component.name));
        return names;
    }, [staticComponents]);

    const propsToRender = useMemo<IPropertyMetadata[]>(() => {
        if (!currentMeta)
            return [];
        const propertiesToMap = currentMeta.properties.filter(property => property.isVisible && !property.isFrameworkRelated && !staticComponentBindings.includes(camelize(property.path)))
        return propertiesToMap;
    }, [staticComponents, currentMeta]);

    return (
        <div>
            {false && (
                <div>
                    <h4>All Components ({staticComponents.length}):</h4>
                    <ul>
                        {staticComponents.map(component => (
                            <li key={component.id}>
                                {component.name}
                            </li>
                        ))}
                    </ul>
                </div>

            )}
            <div>
                <h4>Props to render (props: {propsToRender.length})</h4>
                <ul>
                    {propsToRender.map(prop => (
                        <li key={prop.path}>
                            {prop.path}
                        </li>
                    ))}
                </ul>
            </div>
            {
                false && Boolean(currentMeta) && (
                    <div>
                        <h4>Metadata available (props: {currentMeta.properties.length})</h4>
                        <ul>
                            {currentMeta.properties.map(prop => (
                                <li key={prop.path}>
                                    {prop.path}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>
    );
}

export default DynamicView;