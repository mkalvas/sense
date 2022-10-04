import { battery, charger } from 'power';

const handler = (render) => () =>
  render({
    charging: battery.charging,
    connected: charger.connected,
    charge: battery.chargeLevel,
    powerIsGood: charger.powerIsGood,
  });

export const initialize = (render) => {
  battery.addEventListener('change', handler(render));
  charger.addEventListener('change', handler(render));
};
