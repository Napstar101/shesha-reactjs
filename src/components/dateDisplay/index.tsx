import React, { FC } from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import { tolocalIsoDate } from '../../utils/date';

interface IDateDisplayProps {
  date: string;
}

export const DateDisplay: FC<IDateDisplayProps> = ({ date }) => {
  const dateString = tolocalIsoDate(date);
  
  return (
    <Tooltip placement="top" title={moment(dateString).format('lll')}>
      <span>{moment(dateString).fromNow()}</span>
    </Tooltip>
  );
};

export default DateDisplay;
