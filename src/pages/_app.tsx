import { AppProps } from 'next/app';
import '../../styles/globals.scss';
import { AuthProvider } from '../context/AuthContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  )
}

export default MyApp;
