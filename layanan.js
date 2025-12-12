import { readFileSync, existsSync } from "fs";

export default function handler(req, res) {
  const path = "/tmp/layanan.json";

  if (existsSync(path)) {
    const raw = readFileSync(path, "utf8");
    return res.status(200).json(JSON.parse(raw));
  }

  return res.status(200).json({
    layanan: [
      "Cuci AC",
      "Service Ringan",
      "Isi Freon",
      "Tambal Kebocoran",
      "Service Besar",
      "Perbaikan Total"
    ]
  });
}
