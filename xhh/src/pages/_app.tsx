import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <div className="">
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
      <div id="fb-root"></div>
      <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0" nonce="HckQImP6"></script>
  </div>
}

export default appWithTranslation(App);
