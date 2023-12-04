import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Atomic AI</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>My HomePage</span>
    </>
  );
}