import fetch from 'isomorphic-unfetch';
import React from 'react';

const Tester = ({ userAgent }) => <main>Your user agent: {userAgent}</main>;

export async function getServerSideProps() {
  const response = await fetch('http://localhost:4200/api/support');
  const cookie = response.headers.get('set-cookie');

  return { props: { cookie } };
}

export default Tester;
