import { WidgetExtensionManifest } from '@trackunit/iris-app-api';

const widgetExtensionManifest: WidgetExtensionManifest = {
  id: 'fuel-insight-fuel-insight',
  type: 'WIDGET_EXTENSION',
  sourceRoot: 'libs/fuel-insight/fuel-insight/src',

  header: {
    name: 'fuel-insight-fuel-insight',
    icon: 'QuestionMarkCircle',
  },
  gridOptions: {
    minW: 1,
    minH: 2,
    maxW: 4,
    maxH: 4,
  },
  supportedLocations: ['MY_HOME'],
};

export default widgetExtensionManifest;
