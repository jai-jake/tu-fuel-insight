import { validateIrisApp } from '@trackunit/react-core-contexts-test';
import * as IrisApp from './index';

describe('Validate Iris App', () => {
  it('Should validate', async () => {
    const result = await validateIrisApp(IrisApp);
    expect(result).toBeNull();
  });
});
