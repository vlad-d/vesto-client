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

export type VestingSchedule = {
    id: number;
    owner: string;
    token_identifier: string;
    deposit: number;
    decimals: number;
    tx_hash: string;
    items?: VestingScheduleItem[];
};
export type VestingScheduleItem = {
    stream_id: number;
    vesting_schedule_id: number;
    address: string;
    created_at: string;
    amount: number;
    tx_hash: string;
}
