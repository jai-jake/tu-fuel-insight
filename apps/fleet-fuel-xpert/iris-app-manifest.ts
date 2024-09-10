import { IrisAppManifest } from '@trackunit/iris-app-api';
import fuelXpert from "@idc-workspace/fuel-xpert";

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
    name: 'Fleet Fuel Xpert',
    description: 'Fleet Fuel Xpert is a cutting-edge fuel management solution designed to optimize fuel efficiency and reduce operational costs for fleet operators. Whether you manage a small business fleet or a large commercial operation, Fleet Fuel Xpert delivers actionable insights into your fleet\'s fuel consumption, helping you make informed decisions that drive performance and savings.',
    fullDescriptionPath: 'description.md',
    tags: [],
    categories: [],
  },
  extensions: [fuelXpert],
};

export default irisAppManifest;
