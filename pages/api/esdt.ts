import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from "next";
const dummyData = [
  {
    type: "FungibleESDT",
    identifier: "TBH-67f97f",
    name: "TestTBH",
    ticker: "TBH",
    owner: "erd1va8dq2gxhkgpfznuvuw2pc64kkxdlnrs6sfalc9sf583dphw7wjq2qnz83",
    minted: "0",
    burnt: "0",
    initialMinted: "500000000000000000000000000",
    decimals: 18,
    isPaused: false,
    assets: {
      website: "https://elrondgiants.com",
      description: "Giants Gold is the utility token of the entire Giants ecosystem.",
      status: "active",
      pngUrl: "https://media.elrond.com/tokens/asset/GIANT-761d27/logo.png",
      svgUrl: "https://media.elrond.com/tokens/asset/GIANT-761d27/logo.svg",
      lockedAccounts: {
        erd1kvs7mt88m2jjdm2e6s6drch7slshckkzgwtppuwgj5jxs6atx0kqlkvvxu: "Reserve",
      },
      social: {
        email: "contact@elrondgiants.com",
        blog: "https://blog.elrondgiants.com",
        twitter: "https://twitter.com/ElrondGiants",
        discord: "https://discord.gg/v23VU2Pw6h",
        whitepaper: "https://elrondgiants.com/token",
        instagram: "https://www.instagram.com/ElrondGiants",
      },
    },
    transactions: 21604,
    accounts: 4057,
    canUpgrade: true,
    canMint: false,
    canBurn: true,
    canChangeOwner: true,
    canAddSpecialRoles: true,
    canPause: true,
    canFreeze: true,
    canWipe: true,
    supply: "500000000",
    circulatingSupply: "138955846",
  },
  {
    type: "FungibleESDT",
    identifier: "USDC-67f97f",
    name: "USDC",
    ticker: "USDC",
    owner: "erd1va8dq2gxhkgpfznuvuw2pc64kkxdlnrs6sfalc9sf583dphw7wjq2qnz83",
    minted: "0",
    burnt: "0",
    initialMinted: "500000000000000000000000000",
    decimals: 18,
    isPaused: false,
    assets: {
      website: "https://elrondgiants.com",
      description: "USDC stablecoin originating on Ethereum, bridged as an ESDT token on MultiversX.",
      status: "active",
      pngUrl: "https://media.elrond.com/tokens/asset/USDC-c76f1f/logo.png",
      svgUrl: "https://media.elrond.com/tokens/asset/USDC-c76f1f/logo.svg",
      lockedAccounts: {
        erd1kvs7mt88m2jjdm2e6s6drch7slshckkzgwtppuwgj5jxs6atx0kqlkvvxu: "Reserve",
      },
      social: {
        email: "contact@elrondgiants.com",
        blog: "https://blog.elrondgiants.com",
        twitter: "https://twitter.com/ElrondGiants",
        discord: "https://discord.gg/v23VU2Pw6h",
        whitepaper: "https://elrondgiants.com/token",
        instagram: "https://www.instagram.com/ElrondGiants",
      },
    },
    transactions: 21604,
    accounts: 4057,
    canUpgrade: true,
    canMint: false,
    canBurn: true,
    canChangeOwner: true,
    canAddSpecialRoles: true,
    canPause: true,
    canFreeze: true,
    canWipe: true,
    supply: "500000000",
    circulatingSupply: "138955846",
  },
  {
    type: "FungibleESDT",
    identifier: "UTK-67f97f",
    name: "Utrust",
    ticker: "UTK",
    owner: "erd1va8dq2gxhkgpfznuvuw2pc64kkxdlnrs6sfalc9sf583dphw7wjq2qnz83",
    minted: "0",
    burnt: "0",
    initialMinted: "500000000000000000000000000",
    decimals: 18,
    isPaused: false,
    assets: {
      website: "https://elrondgiants.com",
      description: "Web3 L1 Payments Technology",
      status: "active",
      pngUrl: "https://media.elrond.com/tokens/asset/UTK-2f80e9/logo.png",
      svgUrl: "https://media.elrond.com/tokens/asset/UTK-2f80e9/logo.svg",
      lockedAccounts: {
        erd1kvs7mt88m2jjdm2e6s6drch7slshckkzgwtppuwgj5jxs6atx0kqlkvvxu: "Reserve",
      },
      social: {
        email: "contact@elrondgiants.com",
        blog: "https://blog.elrondgiants.com",
        twitter: "https://twitter.com/ElrondGiants",
        discord: "https://discord.gg/v23VU2Pw6h",
        whitepaper: "https://elrondgiants.com/token",
        instagram: "https://www.instagram.com/ElrondGiants",
      },
    },
    transactions: 21604,
    accounts: 4057,
    canUpgrade: true,
    canMint: false,
    canBurn: true,
    canChangeOwner: true,
    canAddSpecialRoles: true,
    canPause: true,
    canFreeze: true,
    canWipe: true,
    supply: "500000000",
    circulatingSupply: "138955846",
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { token } = req.query;

  let tokenData = dummyData.find((e) => e.identifier === token);

  if (tokenData) {
    return res.status(200).json(tokenData);
  }

  const { data } = await axios.get(`https://elrond-api-devnet.public.blastapi.io/tokens/${token}`);

  return res.status(200).json(data);
}
