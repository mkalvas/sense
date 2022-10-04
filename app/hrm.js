import { me } from 'appbit';
import { BodyPresenceSensor } from 'body-presence';
import { display } from 'display';
import { HeartRateSensor } from 'heart-rate';
import { user } from 'user-profile';

const OFF_STATE = { bpm: '--', zone: 'out-of-range' };

const permitted = () =>
  HeartRateSensor &&
  me.permissions.granted('access_heart_rate') &&
  me.permissions.granted('access_user_profile');

export const initialize = (render) => {
  if (!permitted()) {
    console.log('Denied Heart Rate or User Profile permissions');
    render(OFF_STATE);
    return;
  }

  const hrm = new HeartRateSensor({ frequency: 1 });
  const body = new BodyPresenceSensor();

  body.addEventListener('reading', () => {
    if (body.present) {
      hrm.start();
    } else {
      hrm.stop();
      render(OFF_STATE);
    }
  });

  display.addEventListener('change', () => {
    if (display.on) {
      hrm.start();
      body.start();
    } else {
      hrm.stop();
      body.stop();
      render(OFF_STATE);
    }
  });

  body.start();
  hrm.addEventListener('reading', () => {
    render({
      bpm: hrm.heartRate || '--',
      zone: user.heartRateZone(hrm.heartRate || 0),
    });
  });
};
