import { Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import React, { FC, useMemo } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { IPropertyMetadata } from '../../../interfaces/metadata';
import { TOOLBOX_DATA_ITEM_DROPPABLE_KEY } from '../../../providers/form/models';
import { getIconByDataType } from '../../../utils/metadata';
import ShaIcon from '../../shaIcon';

export interface IProps {
    items: IPropertyMetadata[];
}

const getTreeData = (prop: IPropertyMetadata): DataNodeWithMeta => {
    const node: DataNodeWithMeta = {
        key: prop.path,
        title: prop.label ?? prop.path,
        isLeaf: prop.properties.length === 0,
        selectable: false,
        meta: prop,
    };
    node.children = prop.properties.map<DataNodeWithMeta>(childProp => getTreeData(childProp));

    return node;
}

interface DataNodeWithMeta extends DataNode {
    meta: IPropertyMetadata;
}

const DataSourceTree: FC<IProps> = ({ items }) => {

    const treeData = useMemo<DataNodeWithMeta[]>(() => {
        return items.map(item => getTreeData(item));
    }, [items]);

    const renderTitle = (node: DataNodeWithMeta): React.ReactNode => {
        const icon = getIconByDataType(node.meta.dataType);

        const sortableItem = {
            id: node.meta.path,
            parent_id: null,
            type: TOOLBOX_DATA_ITEM_DROPPABLE_KEY,
            metadata: node.meta,
        };

        return (
            <ReactSortable
                list={[sortableItem]}
                setList={() => { }}
                group={{
                    name: 'shared',
                    pull: 'clone',
                    put: false,
                }}
                sort={false}
                draggable=".sha-toolbox-component"
                ghostClass="sha-component-ghost"
            >
                <div className='sha-toolbox-component'>
                    {icon && <ShaIcon iconName={icon}></ShaIcon>}
                    <span className='sha-component-title'>{node.title}</span>
                </div>
            </ReactSortable>
        );
    }

    return (
        <Tree<DataNodeWithMeta>
            className='sha-datasource-tree'
            showIcon
            treeData={treeData}
            draggable={false}
            selectable={false}
            titleRender={renderTitle}
        />
    );
};

export default DataSourceTree;
