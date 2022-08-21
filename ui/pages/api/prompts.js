import { v6 } from "uuid-with-v6";
import { db } from "../../src/db.js";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).send("Bad Request");
  }
  const { input, ...config } = JSON.parse(req.body);
  console.log({ input, config });
  const response = await fetch(process.env.MODEL_ENDPOINT, {
    method: "POST",
    body: req.body,
  });
  const output = await response.text();

  const obj = {
    input,
    output,
    config,
    date: new Date().toISOString(),
    id: v6(),
  };

  if (response.status === 200) {
    const data = db.read();
    data[obj.id] = obj;
    db.write(data);
  }
  res.send(obj);
}
