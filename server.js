const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

// Credenciais do Twilio (você vai colocar no Render depois como variáveis de ambiente)
const accountSid = process.env.TWILIO_SID; 
const authToken = process.env.TWILIO_AUTH;
const client = twilio(accountSid, authToken);

// Número de destino (quem vai receber a mensagem)
// Formato internacional: whatsapp:+55DDDNUMERO
const destino = "whatsapp:+5511991557050"; // TROQUE PELO NÚMERO DE QUEM RECEBE
const twilioNumber = "whatsapp:+14155238886"; // número sandbox do Twilio

app.post("/enviar-whatsapp", async (req, res) => {
  const { mensagem } = req.body;

  try {
    const msg = await client.messages.create({
      from: twilioNumber,
      to: destino,
      body: mensagem
    });
    res.json({ ok: true, sid: msg.sid });
  } catch (err) {
    res.status(500).json({ ok: false, erro: err.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando 🚀"));
