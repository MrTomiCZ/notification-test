import { promises as fs } from "fs";
import path from "path";

const file = path.join("/tmp", "subs.json"); // temp storage (resets when redeployed)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const sub = JSON.parse(req.body);

    let subs = [];
    try {
      const data = await fs.readFile(file, "utf8");
      subs = JSON.parse(data);
    } catch {}

    subs.push(sub);
    await fs.writeFile(file, JSON.stringify(subs));

    res.status(201).json({ ok: true });
  } else {
    res.status(405).end();
  }
}
