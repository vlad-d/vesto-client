import {querySc} from "../apis/queries";
import {contractAddress} from "../config";

export const getTotalTokensLeft = async (): Promise<number> => {
    const {data: data} = await querySc(
        contractAddress as string,
        "getTotalTokensLeft",
        {outputType: "int"}
    );

    return parseInt(data, 10);
};

export function decimalToHex(d: number | string) {
    return ("0" + Number(d).toString(16)).slice(-2).toUpperCase();
}