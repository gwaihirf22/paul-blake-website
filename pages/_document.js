import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon configuration - Use ICO for all browsers */}
        <link rel="icon" href="/favicon.ico?v=16" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=16" />
        <link rel="apple-touch-icon" href="/favicon.ico?v=16" />
        <meta name="theme-color" content="#1e3a8a" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
