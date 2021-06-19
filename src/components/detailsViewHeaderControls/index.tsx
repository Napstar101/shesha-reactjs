import React, { FC, ReactNode } from 'react';
import CancelButton from '../cancelButton';
import { useShaRouting } from '../../providers';
import './styles/index.less';

export interface IControlItemData {
  readonly name: string;
  readonly value: ReactNode;
  readonly hide?: boolean;
}

interface IProps {
  items: IControlItemData[];
  backUrl?: string;
}

export const DetailsViewHeaderControls: FC<IProps> = ({ items, backUrl }) => {
  const { router } = useShaRouting();

  let i = 0;
  return (
    <div className="details-view-header-list">
      <span className="details-view-header-list-container">
        {items
          .filter(({ hide }) => !hide)
          .map(({ name, value }) => (
            <span key={i++} className="details-view-header-container">
              <span className="details-view-header-list-item">{name}</span>
              <span className="details-view-header-list-item">{value}</span>
            </span>
          ))}
      </span>
      <span className="details-view-header-list-cancel">
        <CancelButton onCancel={() => (router ? router?.push(backUrl) : null)} />
      </span>
    </div>
  );
};

export default DetailsViewHeaderControls;
