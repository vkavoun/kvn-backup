import React from 'react';
import { render } from '@testing-library/react';

import Graphics from './graphics';

describe(' Graphics', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Graphics />);
    expect(baseElement).toBeTruthy();
  });
});
