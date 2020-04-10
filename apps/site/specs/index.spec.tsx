import { render } from '@testing-library/react';
import React from 'react';
import Index from '../pages/index';


describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index userAgent={} />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<Index userAgent={} />);
    expect(getByText('Welcome to site! [DEV]')).toBeTruthy();
  });
});
