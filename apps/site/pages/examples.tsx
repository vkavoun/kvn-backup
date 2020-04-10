import { BasePage } from '@kvn/ui';
import React from 'react';

function ExamplesPage({ isServer }) {
  return (
    <BasePage title={ExamplesPage.title}>
      <p>
        This is another page of the SSR example, you accessed it{' '}
        <strong>{isServer ? 'server' : 'client'}</strong>.
      </p>
      <p>testtstsd</p>
    </BasePage>
  );
}

ExamplesPage.title = 'Examples';
ExamplesPage.getInitialProps = async ({ req }) => {
  const isServer = !!req;
  return { isServer };
};

export default ExamplesPage;
