import { writeFileSync } from "fs";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { layanan } = req.body;

  writeFileSync("/tmp/layanan.json", JSON.stringify({ layanan }));

  res.status(200).json({ success: true });
}
