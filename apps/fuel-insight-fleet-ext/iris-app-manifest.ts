import { IrisAppManifest } from '@trackunit/iris-app-api';
import fuelInsightsFuelInsightFleetExt from "@idc-workspace/fuel-insights-fuel-insight-fleet-ext";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nxPackageJson = require('../../package.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

const irisAppManifest: IrisAppManifest = {
  specVersion: '1.1',
  moduleFederationName: packageJson.name,
  dependencies: nxPackageJson.dependencies || {},
  devDependencies: nxPackageJson.devDependencies || {},

  validDomains: [],

  installation: {
    policy: 'ON_DEMAND',
    accountIds: 'ALL_ACCOUNTS',
    pricingPlans: 'ALL_PLANS',
  },

  marketplace: {
    showInMarketplace: false,
    name: 'fuel-insight-fleet-ext',
    description:
      'The fuel-insight-fleet-ext app is used for <YOUR SUMMARY HERE>.',
    fullDescriptionPath: 'description.md',
    tags: [],
    categories: [],
  },
  extensions: [fuelInsightsFuelInsightFleetExt],
};

export default irisAppManifest;
