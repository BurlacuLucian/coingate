import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await axios.get(
    `https://api.coingate.com/v2/rates/merchant/${req.query.payCurrency}/${req.query.buyCurrency}`
    );
  res.send(data);
}
