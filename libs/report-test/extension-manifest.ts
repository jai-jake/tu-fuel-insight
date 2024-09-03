import { ReportExtensionManifest } from '@trackunit/iris-app-api';

const reportExtensionManifest: ReportExtensionManifest = {
  id: 'report-test',
  type: 'REPORT_EXTENSION',
  sourceRoot: 'libs/report-test/src',
  main: 'index.tsx',
  menuItem: {
    name: 'Fuel Insight',
    description: 'Fuel Insight Report',
    icon: 'QuestionMarkCircle',
  },
};

export default reportExtensionManifest;
