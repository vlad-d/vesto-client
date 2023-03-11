import type {NextPage} from 'next'
import RequiresAuth from "../components/RequiresAuth";
import {useAuth} from "@elrond-giants/erd-react-hooks";
import {egldLabel} from "../config";
import {useState} from "react";
import {useTransaction} from "../hooks/useTransaction";
import {webWalletTxReturnPath} from "../utils/routes";


const Home: NextPage = () => {
    const {address, logout, env, balance, nonce} = useAuth();
    const [receiverAddress, setReceiverAddress] = useState('');
    const [txData, setTxData] = useState('');
    const {makeTransaction} = useTransaction();

    const sendTransaction = async () => {
        const txResult = await makeTransaction({
            receiver: receiverAddress,
            data: txData,
            value: 0.01,
            webReturnUrl: window.location.toString() + webWalletTxReturnPath,
        });
        setTxData('');
        setReceiverAddress('');

        console.log(txResult);

    };

    return (
        <></>
    );
};

export default Home;

