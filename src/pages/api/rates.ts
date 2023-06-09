import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const { data } = await axios.get('https://api.coingate.com/v2/rates/merchant');
  res.send(data);
}
