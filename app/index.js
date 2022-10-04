import document from 'document';
import * as battery from './battery';
import * as clock from './clock';
import * as hrm from './hrm';

/* --------------------------------- CLOCK ---------------------------------- */
let date = document.getElementById('date');
let time = document.getElementById('time');
let seconds = document.getElementById('seconds');
let secondHand = document.getElementById('secondHand');
let stopwatch = document.getElementById('stopwatch');
let running = false;

clock.initialize((data) => {
  date.text = data.date;
  time.text = data.time;

  secondHand.groupTransform.rotate.angle = data.seconds * 6;
  seconds.animate('enable');

  stopwatch.onclick = () => {
    if (running) {
      stopwatch.animate('disable');
      running = false;
    } else {
      stopwatch.animate('enable');
      running = true;
    }
  };
});

/* -------------------------------- BATTERY --------------------------------- */
let outline = document.getElementById('battery-outline');
let percent = document.getElementById('battery-percent');
let connected = document.getElementById('battery-connected');
let batteryText = document.getElementById('battery-text');

battery.initialize((data) => {
  const { charge } = data;
  const offset = (22 / 100) * charge;
  const fill = charge > 66 ? 'fb-green' : charge > 33 ? 'fb-yellow' : 'fb-red';
  connected.style.display = data.connected ? 'inline' : 'none';
  connected.style.fill = data.charging
    ? data.powerIsGood
      ? 'fb-green'
      : 'fb-red'
    : 'fb-white';

  batteryText.text = `${charge}%`;
  batteryText.style.fill = fill;
  outline.style.fill = fill;
  percent.width = 22 - offset;
  percent.x = -36 + offset;
});

/* ---------------------------------- HRM ----------------------------------- */
let hrmText = document.getElementById('hrm-text');
let heartIcon = document.getElementById('heart-icon');
let heartBeat = document.getElementById('heart-beat');
let heartTime = document.getElementById('heart-time');

hrm.initialize((data) => {
  hrmText.text = `${data.bpm}`;
  if (data?.bpm === '--') {
    heartIcon.href = 'images/heart-open.png';
    heartBeat.animate('disable');
  } else {
    heartTime.dur = 60.0 / data.bpm;
    heartIcon.href = 'images/heart-solid.png';
    heartBeat.animate('enable');
  }
});
