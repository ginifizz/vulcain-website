import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { pageview } from '../src/gtag';

Router.events.on('routeChangeComplete', (url) => pageview(url));

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Vulcain.rocks: Use HTTP/2 Server Push to create fast and idiomatic client-driven REST APIs</title>
          <link href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,700&display=swap" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800,900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="Vulcain is a brand new protocol using HTTP/2 Server Push to create fast and idiomatic client-driven REST APIs."
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
