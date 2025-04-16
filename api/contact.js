import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jesusveloz76@gmail.com',
      pass: 'atik oycj afzq ygjm',
    },
  });

  const mailOptions = {
    from: 'jesusveloz76@gmail.com',
    to: 'jesusveloz76@gmail.com',
    subject: `Mensaje de ${name}`,
    text: `Nombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
