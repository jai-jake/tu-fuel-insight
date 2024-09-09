/* eslint-disable */
export default {
  displayName: 'fuel-xpert',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/fuel-xpert',
  moduleNameMapper: {
    '@trackunit/css-core': 'jest-transform-stub',
    '@trackunit/ui-icons/icons-sprite-mini.svg': 'jest-transform-stub',
    '@trackunit/ui-icons/icons-sprite-outline.svg': 'jest-transform-stub',
    '@trackunit/ui-icons/icons-sprite-solid.svg': 'jest-transform-stub',
  },
};
