export type VestingType = {
    token: string,
    supply: number;
    owner: string;
    streams: VestingStream[];
}

export type VestingStream = {
    recipient: string;
    qty: number;
    amount: number;
    start_date: number;
    end_date: number;
};

export type Token = {
    identifier: string;
    name: string;
    owner: string;
    decimals: number;
    balance: string;
    image: string;
};