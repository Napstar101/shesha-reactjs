import React, { FC, useEffect, useState } from 'react';
import {
  Query,
  Builder,
  Utils as QbUtils,
  ImmutableTree,
  Config,
  BuilderProps,
  JsonLogicResult,
  FieldSettings,
  Widgets,
} from 'react-awesome-query-builder';
import classNames from 'classnames';

// For AntDesign widgets only:
import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
import { ITableColumn } from '../../interfaces';
import { IProperty } from '../../providers/queryBuilder/models';
import EntityAutocompleteWidget from './widgets/entityAutocomplete';
import RefListDropdownWidget from './widgets/refListDropDown';
import EntityReferenceType from './types/entityReference';
import RefListType from './types/refList';

// import 'react-awesome-query-builder/lib/css/styles.css';
// import 'react-awesome-query-builder/lib/css/compact_styles.css'; //optional, for more compact styles

const InitialConfig = AntdConfig;

export interface IQueryBuilderColumn extends ITableColumn {
  fieldSettings?: FieldSettings;
  preferWidgets?: Widgets[];
}

interface IQueryBuilderProps {
  value?: object;
  onChange?: (result: JsonLogicResult) => void;
  columns?: IQueryBuilderColumn[];
  fields: IProperty[];
  showActionBtnOnHover?: boolean;
}

export const QueryBuilder: FC<IQueryBuilderProps> = ({ showActionBtnOnHover = true, onChange, value, fields }) => {
  const [tree, setTree] = useState<ImmutableTree>();
  const [config, setConfig] = useState<Config>();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    const operators = {
      ...InitialConfig.operators,
      starts_with: {
        ...InitialConfig.operators.starts_with,
        jsonLogic: 'startsWith',
      },
      ends_with: {
        ...InitialConfig.operators.ends_with,
        jsonLogic: 'endsWith',
      },
    };

    const widgets = {
      ...InitialConfig.widgets,
      entityAutocomplete: EntityAutocompleteWidget,
      refListDropdown: RefListDropdownWidget,
    };

    const types = {
      ...InitialConfig.types,
      entityReference: EntityReferenceType,
      refList: RefListType,
    };

    const conf: Config = {
      ...InitialConfig,
      fields: {},
      // @ts-ignore
      types: types,
      operators: operators,
      widgets: widgets,
    };

    fields?.forEach(({ dataType, visible, propertyName, label, fieldSettings, preferWidgets }) => {
      let type: string = dataType;
      let defaultPreferWidgets = [];
      if (visible) {
        switch (dataType) {
          case 'string':
            type = 'text';
            break;
          case 'entityReference':
            type = 'entityReference';
            defaultPreferWidgets = ['entityAutocomplete'];
            break;
          case 'refList':
            type = 'refList';
            defaultPreferWidgets = ['refListDropdown'];
            break;
          case 'multiValueRefList':
            type = 'multiselect';
            break;
          case '!struct':
            type = dataType;
            break;

          default:
            break;
        }

        conf.fields[propertyName] = {
          label,
          type,
          valueSources: ['value'],
          // @ts-ignore note: types are wrong in the library, they doesn't allow to extend
          fieldSettings,
          preferWidgets: preferWidgets || defaultPreferWidgets,
        };
      }
    });

    console.log({ fields: conf.fields });

    const loadedTree = value
      ? QbUtils.loadFromJsonLogic(value, conf)
      : QbUtils.loadTree({ id: QbUtils.uuid(), type: 'group' });

    const checkedTree = QbUtils.checkTree(loadedTree, conf);
    setTree(checkedTree);

    setConfig(conf);
  };

  const renderBuilder = (props: BuilderProps) => (
    <div className="query-builder-container">
      <div className={classNames('query-builder', { 'qb-lite': showActionBtnOnHover })}>
        <Builder {...props} />
      </div>
    </div>
  );

  const handleChange = (_tree: ImmutableTree, _config: Config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    setTree(_tree);
    setConfig(_config);

    if (onChange) {
      onChange(QbUtils.jsonLogicFormat(_tree, _config));
    }
  };

  return (
    <div className="sha-query-builder">
      {tree && config && <Query {...config} value={tree} onChange={handleChange} renderBuilder={renderBuilder} />}
    </div>
  );
};

export default QueryBuilder;
