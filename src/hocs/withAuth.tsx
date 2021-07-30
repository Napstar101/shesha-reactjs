import React, { FC, useEffect, ComponentType } from 'react';
import { useAuth, useShaRouting } from '../providers';
import { IdleTimerRenderer, OverlayLoader } from '../components';

/**
 * Ensures that a particular page cannot be accessed if you're not authenticated
 */
export const withAuth = <P extends object>(
  Component: ComponentType<P>,
  unauthorizedRedirectUrl = '/login',
  landingPage = '/'
): FC<P> => (...props) => {
  const { isCheckingAuth, loginInfo, checkAuth, getAccessToken } = useAuth();

  const { goingToRoute, router } = useShaRouting();

  const handleGoingToRoute = (shouldRedirect = false) => {
    const asPath = router?.asPath;

    let redirectUrl = '';
    let nextRoute = '';

    if (asPath !== landingPage && !asPath.includes(unauthorizedRedirectUrl)) {
      redirectUrl = `/?redirectUrl=${asPath}`;
      nextRoute = asPath;
    }

    if (shouldRedirect) {
      router?.push(`${unauthorizedRedirectUrl}${redirectUrl}`);
    }

    goingToRoute(nextRoute);
  };

  useEffect(() => {
    const token = getAccessToken();

    if (!loginInfo) {
      if (token) {
        handleGoingToRoute();

        checkAuth();
      } else {
        handleGoingToRoute(true);
      }
    }
  }, [isCheckingAuth]);

  const _props = Array.isArray(props) ? props[0] : props;

  return isCheckingAuth || !loginInfo ? (
    <OverlayLoader loading={true} loadingText="Initializing..." />
  ) : (
    <IdleTimerRenderer>
      <Component {..._props} id={router?.query?.id} />
    </IdleTimerRenderer>
  );
};
