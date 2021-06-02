import React, { FC } from 'react';

export interface ISectionSeparatorProps {
  /** Section name */
  sectionName: string;
}

/** A component for separating the content on the form */
export const SectionSeparator: FC<ISectionSeparatorProps> = ({ sectionName }) => {
  return (
    <div className="sha-section-separator">
      <span className="sha-section-separator-section-name">{sectionName}</span>
    </div>
  );
};

export default SectionSeparator;
