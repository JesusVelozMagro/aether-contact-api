import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Agregamos CORS headers manualmente
  const allowedOrigins = ['https://aetherdesign.cl', 'https://www.aetherdesign.cl', 'http://localhost:3000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Respondemos a preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Manejo de POST real
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jesusveloz76@gmail.com',
        pass: 'atik oycj afzq ygjm', // Usa App Password, no la clave de Gmail normal
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
      console.log('✅ Correo enviado con éxito');
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('❌ Error al enviar el correo:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // Método no permitido
  res.status(405).json({ error: 'Método no permitido' });
}
