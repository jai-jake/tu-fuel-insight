import { ReportExtensionManifest } from '@trackunit/iris-app-api';

const reportExtensionManifest: ReportExtensionManifest = {
  id: 'report-test',
  type: 'REPORT_EXTENSION',
  sourceRoot: 'libs/report-test/src',
  main: '<ADD_YOUR_PATH_HERE>',
  menuItem: {
    name: 'Fuel Insight - Jai', // OR Translate!
    description: 'Test Description',
    icon: 'Calendar',
  },
};

export default reportExtensionManifest;
