import React, { FC, useReducer, useContext, PropsWithChildren } from 'react';
import QueryBuilderReducer from './reducer';
import { QueryBuilderActionsContext, QueryBuilderStateContext, QUERY_BUILDER_CONTEXT_INITIAL_STATE } from './contexts';
import {
  setFieldsAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { IProperty } from './models';

export interface IQueryBuilderProviderProps {
  fields?: IProperty[];
}

const QueryBuilderProvider: FC<PropsWithChildren<IQueryBuilderProviderProps>> = ({ children, fields }) => {
  const [state, dispatch] = useReducer(QueryBuilderReducer, {
    ...QUERY_BUILDER_CONTEXT_INITIAL_STATE,
    fields: fields || [],
  });

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  const setFields = (fields: IProperty[]) => {
    dispatch(setFieldsAction(fields));
  };

  return (
    <QueryBuilderStateContext.Provider value={state}>
      <QueryBuilderActionsContext.Provider
        value={{
          setFields,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </QueryBuilderActionsContext.Provider>
    </QueryBuilderStateContext.Provider>
  );
};

function useQueryBuilderState(requireBuilder: boolean = true) {
  const context = useContext(QueryBuilderStateContext);

  if (context === undefined && requireBuilder) {
    throw new Error('useQueryBuilderState must be used within a QueryBuilderProvider');
  }

  return context;
}

function useQueryBuilderActions(requireBuilder: boolean = true) {
  const context = useContext(QueryBuilderActionsContext);

  if (context === undefined && requireBuilder) {
    throw new Error('useQueryBuilderActions must be used within a QueryBuilderProvider');
  }

  return context;
}

function useQueryBuilder(requireBuilder: boolean = true) {
  return { ...useQueryBuilderState(requireBuilder), ...useQueryBuilderActions(requireBuilder) };
}

export { QueryBuilderProvider, useQueryBuilderState, useQueryBuilderActions, useQueryBuilder };
