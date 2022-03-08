type FilterType = 'hql' | 'queryBuilder';

export interface ITableViewProps {
  id: string;
  name: string;
  useExpression?: boolean;
  tooltip?: string;
  sortOrder: number;
  filterType: FilterType;
  visibility?: string;
  permissions?: string;
}
