import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import { TrackunitProviders } from '@trackunit/react-core-contexts';
import '@trackunit/css-core';
import { App } from './app';

const RootComponent = () => (
  <TrackunitProviders>
    <App />
  </TrackunitProviders>
);

const lifeCycle = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: RootComponent,
  errorBoundary(err, info, props) {
    return <div>An error occurred in the fuel-xpert app!</div>;
  },
});

export const bootstrap = lifeCycle.bootstrap;
export const mount = lifeCycle.mount;
export const unmount = lifeCycle.unmount;
