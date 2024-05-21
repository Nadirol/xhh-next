import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  return <div className="">
    <Component {...pageProps} />
    <div id="fb-root"></div>
    <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0" nonce="HckQImP6"></script>
  </div>
}

export default appWithTranslation(App);
