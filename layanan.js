import { promises as fs } from 'fs';
import path from 'path';

const PUBLIC_FILE = path.join(process.cwd(), 'public', 'layanan.json');
const TMP_FILE = '/layanan.json';

export default async function handler(req, res) {
  if(req.method === 'GET'){
    try{
      // prefer /tmp if exists (updated), otherwise read public
      try{
        const tmp = await fs.readFile(TMP_FILE, 'utf8');
        return res.status(200).json(JSON.parse(tmp));
      }catch(err){
        const data = await fs.readFile(PUBLIC_FILE, 'utf8');
        return res.status(200).json(JSON.parse(data));
      }
    }catch(err){
      return res.status(500).json({ success:false, message: err.message });
    }
  }else if(req.method === 'POST'){
    const adminPass = req.headers['x-admin-pass'] || '';
    if(!process.env.ADMIN_PASS || adminPass !== process.env.ADMIN_PASS){
      return res.status(401).json({ success:false, message: 'Unauthorized' });
    }
    const body = req.body || {};
    const layanan = body.layanan || [];
    try{
      await fs.writeFile(TMP_FILE, JSON.stringify({ layanan }, null, 2), 'utf8');
      return res.status(200).json({ success:true });
    }catch(err){
      return res.status(500).json({ success:false, message: err.message });
    }
  }else{
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
