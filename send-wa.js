export default async function handler(req, res) {
  const token = process.env.WA_TOKEN;
  const phoneId = process.env.WA_PHONE_ID;
  const adminNumber = "62851833317766";

  const { nama, hp, alamat, layanan } = req.body;

  const msg = `
Booking Baru — NSixCool
=====================
Nama: ${nama}
HP: ${hp}
Alamat: ${alamat}
Layanan: ${layanan}
  `;

  const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: adminNumber,
    type: "text",
    text: { body: msg }
  };

  const wa = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const out = await wa.json();

  res.status(200).json({ success: true, wa_response: out });
}
