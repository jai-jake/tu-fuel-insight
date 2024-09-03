import { IrisAppManifest } from '@trackunit/iris-app-api';
import reportTest from "@idc-workspace/report-test";

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
    name: 'IDC',
    description: 'IDC POC',
    fullDescriptionPath: 'description.md',
    tags: [],
    categories: [],
  },
  extensions: [reportTest],
};

export default irisAppManifest;
