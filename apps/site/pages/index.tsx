import React from 'react';

const Index = ({ userAgent }) => <main>Your user agent: {userAgent}</main>;

Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default Index;
