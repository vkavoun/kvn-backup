import React from 'react';

function Index(props) {
  const { userAgent } = props;

  return <main>Your user agent: {userAgent}</main>;
}

export async function getServerSideProps({ req }) {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { props: { userAgent, isServer: !!req } };
}

export default Index;
