import { UserAgent } from '@kvn/data';
import { EnhancedAppHeader } from '@kvn/ui';
import Head from 'next/head';
import React from 'react';
import { AppActionType, AppProvider, useAppDispatch } from '../context/AppContext';
import * as routes from '../routes';
import './_app.scss';

function Layout({ payload, children }) {
  const dispatch = useAppDispatch();
  return (
    <div ref={() => dispatch({ type: AppActionType.SET, payload })}>
      {children}
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  const { userAgent } = pageProps;
  const ua = JSON.parse(JSON.stringify(new UserAgent(userAgent)));
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppProvider>
        <Layout payload={ua}>
          <EnhancedAppHeader {...routes} deviceInfo={ua} />
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}

export default MyApp;
