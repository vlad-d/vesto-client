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