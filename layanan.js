let layananData = [
  "Cuci AC",
  "Service Ringan",
  "Isi Freon",
  "Service Besar",
  "Tambal Bocor",
  "Maintenance AC Bulanan"
];

export default function handler(req, res) {
  res.status(200).json({ layanan: layananData });
}
