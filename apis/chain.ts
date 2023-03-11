import {Token} from "../common/types";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NETWORK_API_ADDRESS!
});
export const getTokensData = async (tokens: string[]): Promise<Token[]> => {
    const {data} = await api.get("/tokens", {
        params: {
            identifiers: tokens.join(",")
        }
    });

    return data;
};