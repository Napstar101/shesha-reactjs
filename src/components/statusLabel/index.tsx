import React, { FC } from 'react';
import { Tag } from 'antd';
import invertColor from 'invert-color';

const COLORS = {
  red: '#FF0000',
  pink: '#FFC0CB',
  purple: '#800080',
  SkyBlue: '#00bfff',
  indigo: '#4B0082',
  blue: '#0000ff',
  lightblue: '#add8e6',
  cyan: '#00ffff',
  teal: '#008080',
  green: '#008000',
  lightgreen: '#00ff00',
  lime: '#00ff00',
  yellow: '#ffff00',
  amber: '#ffbf00',
  orange: '#ffa500',
  deeporange: '#ffa500',
  brown: '#a52a2a',
  grey: '#808080',
  bluegrey: '#6699cc',
  aeroblue: '#BFE6D7',
};

type StatusLabelColor =
  | 'red'
  | 'pink'
  | 'purple'
  | 'indigo'
  | 'blue'
  | 'lightblue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'lightgreen'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'deeporange'
  | 'brown'
  | 'grey'
  | 'bluegrey'
  | 'aeroblue';

export interface IStatusLabelProps {
  text: string;
  color?: StatusLabelColor;
  customColor?: string;
  code?: StatusCodes;
}

enum StatusCodes {
  Completed = 1,
  InProgress = 2,
  Overdue = 3,
}

// let initial

export const StatusLabel: FC<IStatusLabelProps> = ({ code }) => {
  // const hexColor = (COLORS as any)[color];

  let text: string;
  let color: string;

  switch (code) {
    case StatusCodes.Completed:
      text = 'Completed';
      color = 'green';
      break;

    default:
      break;
  }

  return (
    <Tag className="sha-status-label" color={color}>
      {text}
    </Tag>
  );
};

export default StatusLabel;
