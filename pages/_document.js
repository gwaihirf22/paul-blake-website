import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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

        {/* Cloudflare Web Analytics */}
        {/* Privacy-first analytics with no cookies or fingerprinting */}
        {/* Automatically tracks page views including SPA navigation */}
        {process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token: process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN
            })}
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
