export default function handler(req, res) {
  // Lokasi penyimpanan Vercel (runtime → /tmp)
  const path = "/tmp/layanan.json";

  // Jika sudah ada data dari admin
  if (existsSync(path)) {
    const raw = readFileSync(path, "utf8");
    const json = JSON.parse(raw);
    return res.status(200).json(json);
  }

  // Default layanan (kalau admin belum pernah edit)
  return res.status(200).json({
    layanan: [
      "Cuci AC",
      "Service Ringan",
      "Tambal Kebocoran",
      "Isi Freon",
      "Service Besar AC",
      "Perbaikan Total"
    ]
  });
}
