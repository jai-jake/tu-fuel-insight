import { FleetExtensionManifest } from '@trackunit/iris-app-api';

const fleetExtensionManifest: FleetExtensionManifest = {
  id: 'fuel-insights-fuel-insight-fleet-ext',
  type: 'FLEET_EXTENSION',
  sourceRoot: 'libs/fuel-insights/fuel-insight-fleet-ext/src',

  menuItem: {
    name: 'Fuel Insights',
    icon: 'PresentationChartBar',
  },
};

export default fleetExtensionManifest;
