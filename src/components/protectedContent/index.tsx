import React, { FC, ReactNode } from 'react';
import { useAuth } from '../../providers';

interface IProps {
  permissionName: string;
  children?: ReactNode;
}

export const ProtectedContent: FC<IProps> = ({ permissionName, children }) => {
  const { anyOfPermissionsGranted } = useAuth();

  const hasRights = !permissionName || anyOfPermissionsGranted([permissionName]);

  return hasRights ? <React.Fragment>{children}</React.Fragment> : null;
};

export default ProtectedContent;
