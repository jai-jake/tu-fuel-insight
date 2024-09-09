import { FleetExtensionManifest } from '@trackunit/iris-app-api';

const fleetExtensionManifest: FleetExtensionManifest = {
  id: 'fuel-xpert',
  type: 'FLEET_EXTENSION',
  sourceRoot: 'libs/fuel-xpert/src',

  menuItem: {
    name: 'Fuel Xpert',
    icon: 'ChartBar',
  },
};

export default fleetExtensionManifest;
