import React from 'react';

function Index(props) {
  const { userAgent } = props;

  return <main>Your user agent: {userAgent}</main>;
}

export default Index;
