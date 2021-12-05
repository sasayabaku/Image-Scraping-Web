import React from 'react';

import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';

import '../styles/globals.css';

import Sidebar from '../components/Sidebar';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <div>
      <div className="flex w-screen h-screen overflow-y-hidden">
        <Sidebar />
        <div className="w-screen">
          <AnimatePresence exitBeforeEnter>
            <Component
              className="overscroll-none"
              {...pageProps}
              key={router.route}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyApp;
