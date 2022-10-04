import clock from 'clock';
import { preferences } from 'user-settings';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const zeroPad = (i) => {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
};

const getHours = (tick) => {
  let hours = tick.getHours();
  if (preferences.clockDisplay === '12h') {
    hours = hours % 12 || 12;
  } else {
    hours = zeroPad(hours);
  }
  return hours;
};

export const initialize = (render) => {
  clock.granularity = 'minutes';
  clock.addEventListener('tick', (evt) => {
    const tick = evt.date;
    const day = days[tick.getDay()];
    const month = months[tick.getMonth()];
    const date = `${day} ${month} ${zeroPad(tick.getDate())}`;
    const time = `${getHours(tick)}:${zeroPad(tick.getMinutes())}`;
    // initialize at correct angle, then animation takes over sweeping motion
    const seconds = new Date().getSeconds();
    render({ date, time, seconds });
  });
};
