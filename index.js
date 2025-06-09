const { create } = require('venom-bot');
const express = require('express');
const app = express();
app.use(express.json());

create({
  session: 'nds-render',
  multidevice: true
}).then((client) => {
  console.log('✅ Bot conectado');
  app.post('/send', async (req, res) => {
    const { numero, mensagem } = req.body;
    if (!numero || !mensagem) return res.status(400).send('Número e mensagem obrigatórios');

    try {
      await client.sendText(`${numero}@c.us`, mensagem);
      res.send('✅ Mensagem enviada');
    } catch (err) {
      res.status(500).send('Erro ao enviar: ' + err.message);
    }
  });

  app.get('/', (req, res) => res.send('Bot ativo'));
  app.listen(process.env.PORT || 3000, () => console.log('🚀 API rodando'));
});
