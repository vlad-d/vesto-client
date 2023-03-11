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
    tx_hash: string;
    token_metadata: FungibleESDT,
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

export interface FungibleESDT {
    type: "FungibleESDT";
    identifier: string;
    name?: string;
    ticker: string;
    owner: string;
    minted: string;
    burnt: string;
    initialMinted: string;
    decimals: number;
    isPaused: boolean;
    assets?: {
        website: string;
        description: string;
        status: string;
        pngUrl: string;
        svgUrl: string;
        lockedAccounts: Record<string, string>;
        social?: {
            email?: string;
            blog?: string;
            twitter?: string;
            discord?: string;
            whitepaper?: string;
            instagram?: string;
        };
    };
    transactions: number;
    accounts: number;
    canUpgrade: boolean;
    canMint: boolean;
    canBurn: boolean;
    canChangeOwner: boolean;
    canAddSpecialRoles: boolean;
    canPause: boolean;
    canFreeze: boolean;
    canWipe: boolean;
    supply: string;
    circulatingSupply: string;
}
