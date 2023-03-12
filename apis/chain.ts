import {FungibleESDT, Token} from "../common/types";
import axios from "axios";
import {dummyTokens} from "../common/dummy";

export const getTokenData = async (token: string): Promise<FungibleESDT> => {
    const {data} = await axios.get("/api/esdt", {
        params: {
            token
        }
    });

    return data;
};

export const getWalletTokens = async (address: string) => {
    // We use these dummy tokens on devnet because
    // there is no metadata set for them on devnet

    return dummyTokens;
    

    const {data} = await axios.get(
        `${process.env.NEXT_PUBLIC_NETWORK_API_ADDRESS}/accounts/${address}/tokens`
    );

    return data;
};