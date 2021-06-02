import React, { FC, PropsWithChildren, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import { Modal, Progress } from 'antd';
import useInterval from '@use-it/interval';
import { useAuth } from '../../providers/auth';
import { useAuthorizationSettings } from '../../providers/authorizationSettings';

const SIXTY = 60;

interface IIdleTimerRendererProps {}

export const IdleTimerRenderer: FC<PropsWithChildren<IIdleTimerRendererProps>> = ({ children }) => {
  // const idleTimerRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [intervalDelay, setIntervalDelay] = useState(0);
  const [remainingTime, setRemainingTime] = useState(SIXTY);
  const [hasTimeElapsed, setHasTimeElapsed] = useState(false);
  const { settings } = useAuthorizationSettings();
  const [timerTimeout, setTimerTimeout] = useState(settings?.autoLogoffTimeout - SIXTY);

  const isTimeoutSet = settings?.autoLogoffTimeout > 0;

  const { logoutUser } = useAuth();

  const onAction = (_event: Event) => {
    // console.log('user did something', event);
    // console.log('onAction time remaining', idleTimerRef.current.getRemainingTime());
  };

  const onActive = (_event: Event) => {
    // console.log('user is active', event);
    // console.log('time remaining', idleTimerRef.current.getRemainingTime());
  };

  useInterval(() => {
    if (intervalDelay) {
      doCountdown();
    }
  }, intervalDelay);

  const onIdle = (_event: Event) => {
    if (!isTimeoutSet) return;

    if (!hasTimeElapsed) {
      setIsModalVisible(true);
      setHasTimeElapsed(true);
      setTimerTimeout(SIXTY);
      setIntervalDelay(1000);
    }
  };

  const doCountdown = () => {
    if (remainingTime === 0) {
      setIntervalDelay(0);
      logoutUser();
    } else {
      setRemainingTime(currentCount => currentCount - 1);
    }
  };

  const handleOk = () => {
    logoutUser();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setHasTimeElapsed(false);
    setIntervalDelay(0);
    setTimerTimeout(settings?.autoLogoffTimeout - SIXTY);
    setRemainingTime(SIXTY);
  };

  const getPercentage = () => (remainingTime / SIXTY) * 100;

  const getStatus = (): 'normal' | 'success' | 'exception' =>
    getPercentage() >= 75 ? 'success' : getPercentage() >= 45 ? 'normal' : 'exception';

  if (timerTimeout < 1 || !isTimeoutSet) {
    return <>{children}</>;
  }

  return (
    <div className="sha-idle-timer-renderer">
      <IdleTimer
        // ref={idleTimerRef}
        onAction={onAction}
        onActive={onActive}
        onIdle={onIdle}
        timeout={isTimeoutSet ? timerTimeout * 1000 : null}
      >
        {children}
        <Modal
          title="You have been idle"
          visible={isTimeoutSet && isModalVisible}
          cancelText="Keep me signed in"
          okText="Logoff"
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="idle-timer-content">
            <span className="idle-timer-content-top-hint">
              You have not been using the application for sometime. Please click on the
              <strong>Keep me signed in</strong> button, else you'll be automatically signed out in
            </span>
            <Progress
              type="circle"
              percent={getPercentage()}
              status={getStatus()}
              format={() => <>{remainingTime}</>}
            />
            <span className="idle-timer-content-bottom-hint">
              <strong>seconds</strong>
            </span>
          </div>
        </Modal>
      </IdleTimer>
    </div>
  );
};

export default IdleTimerRenderer;
