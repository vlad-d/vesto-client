import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';

import { AuthContextProvider } from '@elrond-giants/erd-react-hooks';
import { Provider as ReduxProvider } from 'react-redux';

import Notifications from '../components/Notifications';
import store from '../redux/store';

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <AuthContextProvider env="devnet" projectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_ID}>
        <Component {...pageProps} />
        <Notifications />
      </AuthContextProvider>
    </ReduxProvider>
  );
}

export default MyApp;
