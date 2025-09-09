const express = require("express");
const twilio = require("twilio");
const cors = require('cors'); // Importe o pacote cors

const app = express();
app.use(express.json());
app.use(cors()); // Use o middleware para permitir requisições de outras origens

// Credenciais do Twilio
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = twilio(accountSid, authToken);

const myNumber = "whatsapp:+5511991557050"; // seu número (ex.: +5511999999999)
const twilioNumber = "whatsapp:+14155238886"; // número sandbox do Twilio

app.post("/enviar-whatsapp", async (req, res) => {
  const { mensagem } = req.body;

  try {
    const msg = await client.messages.create({
      from: twilioNumber,
      to: myNumber,
      body: mensagem
    });
    res.json({ ok: true, sid: msg.sid });
  } catch (err) {
    res.status(500).json({ ok: false, erro: err.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando 🚀"));
