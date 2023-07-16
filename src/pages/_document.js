import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src='/script.js' type='text/javascript'></script>
      </body>
    </Html>
  )
}
