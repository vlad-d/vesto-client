import {FungibleESDT, Token} from "../common/types";
import axios from "axios";

export const getTokenData = async (token: string): Promise<FungibleESDT> => {
    const {data} = await axios.get("/api/esdt", {
        params: {
            token
        }
    });

    return data;
};

export const getWalletTokens = async (address: string) => {
    const {data} = await axios.get(
        `${process.env.NEXT_PUBLIC_NETWORK_API_ADDRESS}/accounts/${address}/tokens`
    );

    console.log(data);
};