import { Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import React, { FC, useMemo, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { IPropertyMetadata } from '../../../interfaces/metadata';
import { TOOLBOX_DATA_ITEM_DROPPABLE_KEY } from '../../../providers/form/models';
import { getIconByDataType } from '../../../utils/metadata';
import ShaIcon from '../../shaIcon';

export interface IProps {
    items: IPropertyMetadata[];
    defaultExpandAll: boolean;
}

const getTreeData = (prop: IPropertyMetadata, onAddItem: (prop: IPropertyMetadata) => void): DataNodeWithMeta => {
    const node: DataNodeWithMeta = {
        key: prop.path,
        title: prop.label ?? prop.path,
        isLeaf: prop.properties.length === 0,
        selectable: false,
        meta: prop,
    };
    node.children = prop.properties.map<DataNodeWithMeta>(childProp => getTreeData(childProp, onAddItem));

    onAddItem(prop);

    return node;
}

interface DataNodeWithMeta extends DataNode {
    meta: IPropertyMetadata;
}

interface NodesWithExpanded {
    nodes: DataNodeWithMeta[],
    expandedKeys: string[],
}

const DataSourceTree: FC<IProps> = ({ items, defaultExpandAll }) => {
    const [manuallyExpanded, setManuallyExpanded] = useState<string[]>(null);
    const treeData = useMemo<NodesWithExpanded>(() => {
        const expanded: string[] = [];
        const nodes = items.map(item => getTreeData(item, (item) => {
            expanded.push(item.path);
        }));
        //setManuallyExpanded(null);
        return {
            nodes: nodes,
            expandedKeys: expanded,
        };
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

    const onExpand = (expandedKeys) => {
        setManuallyExpanded(expandedKeys);
    };

    return (
        <Tree<DataNodeWithMeta>
            className='sha-datasource-tree'
            showIcon
            treeData={treeData.nodes}
            expandedKeys={ defaultExpandAll && !Boolean(manuallyExpanded) ? treeData.expandedKeys : manuallyExpanded }
            onExpand={onExpand}
            draggable={false}
            selectable={false}
            titleRender={renderTitle}
        />
    );
};

export default DataSourceTree;
