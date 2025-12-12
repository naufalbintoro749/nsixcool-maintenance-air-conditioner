export default function handler(req, res) {
  const { username, password } = req.body;

  if (
    username === "admin" &&
    password === "101004"
  ) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
}
