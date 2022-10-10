import { AppProps } from 'next/app';
import '../../styles/globals.scss';
import { ReturnAuthContextProvider } from '../context/auth_context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReturnAuthContextProvider>
      <Component {...pageProps} />
    </ReturnAuthContextProvider>
  )
}

export default MyApp;
