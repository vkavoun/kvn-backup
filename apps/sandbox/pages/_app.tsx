import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { EnhancedAppHeader } from '@kvn/ui';
import * as routes from '../routes';
import { AppProvider } from '../context';
import { useAppDispatch } from '../context';
import * as parser from 'ua-parser-js';

import './_app.scss';

function Layout(props: { payload: object; children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  return (
    <div ref={() => dispatch({ type: 'set', payload: props.payload })}>
      {props.children}
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const { userAgent } = pageProps;
  const ua = new parser.UAParser(userAgent);
  const uaData = JSON.parse(JSON.stringify(ua));
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppProvider>
        <Layout payload={uaData}>
          <EnhancedAppHeader {...routes} deviceInfo={uaData} />
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}

export default MyApp;
