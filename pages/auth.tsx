import { useAuth } from '@elrond-giants/erd-react-hooks';
import { AuthProviderType } from '@elrond-giants/erdjs-auth/dist/types';
import { useRouter } from 'next/router';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

import Logo from '../components/Logo';
import WalletConnectLoginPopup from '../components/WalletConnectLoginPopup';
import * as config from '../config';

import type { NextPage } from "next";
const Auth: NextPage = () => {
  const { authenticated, login, getLedgerAccounts } = useAuth();
  const router = useRouter();
  const [maiarAuthUri, setMaiarAuthUri] = useState("");
  const [authQrCode, setAuthQrCode] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [ledgerAccounts, setLedgerAccounts] = useState<string[]>([]);

  useEffect(() => {
    setShowPopup(!!(authQrCode && isPopupOpen));
  }, [authQrCode, isPopupOpen]);

  useEffect(() => {
    if (!authenticated) {
      return;
    }

    (async () => {
      await router.back();
    })();
  }, [router, authenticated]);

  const maiarClickHandler = async () => {
    const uri = await login(AuthProviderType.WALLET_CONNECT);
    const qrCode = await QRCode.toString(uri, { type: "svg" });
    const authUri = `${config.walletConnectDeepLink}?wallet-connect=${encodeURIComponent(uri)}`;
    setAuthQrCode(qrCode);
    setMaiarAuthUri(authUri);
    setIsPopupOpen(true);
  };

  const webClickHandler = async () => {
    await login(AuthProviderType.WEBWALLET);
  };

  const extensionClickHandler = async () => {
    await login(AuthProviderType.EXTENSION);
  };

  const ledgerClickHandler = async () => {
    const accounts = await getLedgerAccounts();
    setLedgerAccounts(accounts);
  };

  const loginWithLedger = async (accountIndex: number) => {
    await login(AuthProviderType.LEDGER, { ledgerAccountIndex: accountIndex });
  };

  return (
    <>
      <div className="flex sm:h-screen">
        <div
          className="flex-1 hidden sm:block bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
          <div className="absolute top-0 left-0 w-full h-full z-10 p-20 flex flex-col items-start justify-between">
            <Logo fill="#fff" className="h-16" />

            <p className="text-white font-bold text-5xl max-w-xl leading-tight">
              Why wait one month to get your salary when you can{" "}
              <span className="text-light-blue">get paid each second</span> with ?
            </p>
          </div>
        </div>
        <div className="flex-1 bg-white flex items-center justify-center h-screen">
          <div className="max-w-lg">
            <Logo fill="#fff" className="h-16 mx-auto mb-8 sm:hidden" />
            <h1 className="text-3xl sm:text-4xl text-secondary font-semibold mb-4 text-center">Connect your wallet</h1>
            <p className="text-gray-500 mb-10 text-center">Pick a login method & let&apos;s build together!</p>
            <div className="flex flex-col max-w-xs mx-auto space-y-3 mb-24">
              <button type="button" className="auth-button" onClick={maiarClickHandler}>
                xPortal
              </button>
              <button type="button" className="auth-button" onClick={webClickHandler}>
                Web Wallet
              </button>
              <button type="button" className="auth-button" onClick={extensionClickHandler}>
                Extension
              </button>
              <p className="text-xs text-gray-400 text-center">* To use Ledger, please select Web Wallet.</p>
            </div>

            <div>
              <p className="text-xl font-semibold text-secondary text-center">New to Elrond Blockchain?</p>
              <p className="text-gray-600 text-sm text-center">
                Easily create your own MultiversX wallet using{" "}
                <a href="https://maiar.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  Maiar
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <WalletConnectLoginPopup qrCode={authQrCode} uri={maiarAuthUri} open={showPopup} setOpen={setIsPopupOpen} />
    </>
  );
};

export default Auth;
