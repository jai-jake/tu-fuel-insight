import { IrisAppManifest } from '@trackunit/iris-app-api';

const nxPackageJson = require('../../package.json');
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
    name: 'fuel-insight',
    description: 'The fuel-insight app is used for <YOUR SUMMARY HERE>.',
    fullDescriptionPath: 'description.md',
    tags: [],
    categories: [],
  },
  extensions: [],
};

export default irisAppManifest;
