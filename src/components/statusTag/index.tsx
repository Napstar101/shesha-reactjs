import React, { FC, useMemo } from 'react';
import { Tag } from 'antd';

interface IStatusMap {
  code?: number;
  text: string;
  color: string;
  override?: string;
}

interface IStatusMappings {
  mapping?: IStatusMap[];
  default?: IStatusMap;
}

const mappings: IStatusMappings = {
  mapping: [
    { code: 1, text: 'Completed', color: 'green' },
    { code: 2, text: 'In Progress', color: '#4DA6FF', override: 'Still Busy!' },
    { code: 3, text: 'Overdue', color: 'red' },
  ],
  default: { override: 'NOT RECOGNISED', text: 'NOT RECOGNISED', color: 'red' },
};

export interface IStatusTagProps {
  override?: string;
  value: number | string;
  color: string;
}

export const StatusTag: FC<IStatusTagProps> = ({ override, value, color }) => {
  const { color: displayColor, text: displayText } = useMemo(() => {
    let result = mappings?.mapping?.find(item => {
      const { code, text } = item;
      if (typeof value === 'number') {
        if (value === code) {
          return item;
        }
      } else if (value) {
        if (value.match(text)) {
          return item;
        }
      }
    });

    if (!result) {
      result = mappings?.default;
    }

    if (override) {
      result.text = override;
    }

    return result;
  }, [override, value, color]);

  return (
    <Tag className="sha-status-tag" color={displayColor}>
      {displayText}
    </Tag>
  );
};

export default StatusTag;
