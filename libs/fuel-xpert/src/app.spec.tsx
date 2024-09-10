import { screen } from '@testing-library/react';
import { trackunitProviders } from '@trackunit/react-core-contexts-test';
import { App } from './app';

describe('App', () => {
  it('Should render', async () => {
    await trackunitProviders().render(<App />);
    expect(screen.getByTestId('app')).toBeDefined();
  });
});
