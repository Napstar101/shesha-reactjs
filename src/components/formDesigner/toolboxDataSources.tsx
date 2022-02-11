import React, { FC, useMemo } from 'react';
import { Collapse, Empty } from 'antd';
import { useLocalStorage } from '../../hooks';
import { useForm, useMetadata } from '../../providers';
import { IDataSource } from '../../providers/formDesigner/models';
import SearchBox from './toolboxSearchBox';
import DataSourceTree from './dataSourceTree';

const { Panel } = Collapse;

export interface IToolboxDataSourcesProps {

}

export const ToolboxDataSources: FC<IToolboxDataSourcesProps> = () => {
  const [openedKeys, setOpenedKeys] = useLocalStorage('shaDesigner.toolbox.datasources.openedKeys', ['']);
  const [searchText, setSearchText] = useLocalStorage('shaDesigner.toolbox.datasources.search', '');

  const currentMeta = useMetadata(false);
  const currentDataSource: IDataSource = Boolean(currentMeta?.metadata?.properties)
    ? {
      id: currentMeta.id,
      name: currentMeta.metadata?.name,
      containerType: currentMeta.metadata?.type,
      items: currentMeta.metadata?.properties
    }
    : null;

  const { dataSources: formDs, activeDataSourceId } = useForm();

  const allDataSources = useMemo<IDataSource[]>(() => {
    const dataSources = [...formDs];
    if (currentDataSource)
      dataSources.push(currentDataSource);

    return dataSources;
  }, [formDs, currentDataSource]);

  const filteredGroups = useMemo<IDataSource[]>(() => {
    if (!Boolean(searchText))
      return [...allDataSources];

    const result: IDataSource[] = [];

    const loweredSearchText = searchText.toLowerCase();

    allDataSources.forEach((ds) => {
      const filteredItems = ds.items.filter(c => c.path.toLowerCase().includes(loweredSearchText) || c.label?.toLowerCase().includes(loweredSearchText))
      if (filteredItems.length > 0)
        result.push({ ...ds, items: filteredItems });
    });

    return result;
  }, [allDataSources, searchText]);

  if (allDataSources.length === 0)
    return null;

  const onCollapseChange = (key: string | string[]) => {
    setOpenedKeys(Array.isArray(key) ? key : [key]);
  };
  return (
    <>
      <div className='sidebar-subheader'>
        Data
      </div>
      <SearchBox value={searchText} onChange={setSearchText} placeholder='Search data properties' />
      {filteredGroups.length > 0 && (
        <Collapse activeKey={openedKeys} onChange={onCollapseChange}>
          {filteredGroups.map((ds, dsIndex) => {
            const visibleItems = ds.items.filter(c => c.isVisible === true && !c.isFrameworkRelated);

            let classes = ['sha-toolbox-panel'];
            if (ds.id === activeDataSourceId) classes.push('active');
            
            return visibleItems.length === 0 ? null : (
              <Panel header={ds.name} key={dsIndex.toString()} className={classes.reduce((a, c) => a + ' ' + c)}>
                <DataSourceTree items={visibleItems}></DataSourceTree>
              </Panel>
            );
          })}
        </Collapse>
      )}
      {filteredGroups.length === 0 && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Properties not found" />
      )}
    </>
  );
}

export default ToolboxDataSources;