import {VestingStream, VestingType} from "../common/types";
import {Address, SmartContract} from "@multiversx/sdk-core/out";

export const buildVestingTx = (vesting: VestingType) => {
    const contract = new SmartContract(
        {address: new Address("")}
    );
}