import React, { FC } from 'react';
import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import { FilledIconTypes } from '../iconPicker/iconNamesFilled';
import { OutlinedIconTypes } from '../iconPicker/iconNamesOutlined';
import { TwoToneIconTypes } from '../iconPicker/iconNamesTwoTone';

export type IconType = FilledIconTypes | OutlinedIconTypes | TwoToneIconTypes;

export interface IIconPickerProps extends IconBaseProps {
  iconName: IconType;
}

const ShaIcon: FC<IIconPickerProps> = ({ iconName = 'WarningFilled', ...props }) => {
  const icons = require('@ant-design/icons');

  const IconComponent = icons[iconName];

  return <IconComponent {...props} />;
};

export default ShaIcon;
