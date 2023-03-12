import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from "next";
import {dummyTokens} from "../../common/dummy";


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { token } = req.query;

  let tokenData = dummyTokens.find((e) => e.identifier === token);

  if (tokenData) {
    return res.status(200).json(tokenData);
  }

  const { data } = await axios.get(`https://elrond-api-devnet.public.blastapi.io/tokens/${token}`);

  return res.status(200).json(data);
}
