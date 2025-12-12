export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const WHATSAPP_TOKEN = process.env.WA_TOKEN;
  const PHONE_NUMBER_ID = process.env.WA_PHONE_ID;
  const ADMIN_NUMBER = process.env.ADMIN_NUMBER || '62851833317766';

  if(!WHATSAPP_TOKEN || !PHONE_NUMBER_ID){
    return res.status(500).json({ success:false, message:'WA_TOKEN or WA_PHONE_ID not set in environment variables' });
  }

  const { nama, hp, alamat, layanan } = req.body || {};
  if(!nama || !hp || !alamat) return res.status(400).json({ success:false, message:'Data tidak lengkap' });

  const message = `*Booking Baru — NSixCool*
-------------------------
Nama: ${nama}
HP: ${hp}
Alamat: ${alamat}
Layanan: ${layanan || '-'}
`;

  const url = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;
  const payload = {
    messaging_product: 'whatsapp',
    to: ADMIN_NUMBER,
    type: 'text',
    text: { body: message }
  };

  try{
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + WHATSAPP_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const json = await r.json();
    return res.status(200).json({ success:true, wa_response: json });
  }catch(err){
    return res.status(500).json({ success:false, message: err.message });
  }
}
