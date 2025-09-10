import webpush from "web-push";
import { promises as fs } from "fs";
import path from "path";

const file = path.join("/tmp", "subs.json");

webpush.setVapidDetails(
  "mailto:you@example.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  try {
    const data = await fs.readFile(file, "utf8");
    const subs = JSON.parse(data);

    const payload = JSON.stringify({
      title: "Vercel Push 🚀",
      body: "This is a background notification!"
    });

    await Promise.all(
      subs.map(sub =>
        webpush.sendNotification(sub, payload).catch(err => console.error(err))
      )
    );

    res.json({ message: "Notifications sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
