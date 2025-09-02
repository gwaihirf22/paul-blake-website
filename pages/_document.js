import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Mobile-optimized viewport for gaming */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        
        {/* iOS Web App Configuration */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Paul Blake Games" />
        
        {/* Mobile theme and display */}
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Prevent mobile browser UI interference */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Favicon configuration - Use ICO for all browsers */}
        <link rel="icon" href="/favicon.ico?v=16" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=16" />
        <link rel="apple-touch-icon" href="/favicon.ico?v=16" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
