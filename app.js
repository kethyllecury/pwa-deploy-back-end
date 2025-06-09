const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const complaintsRoute = require('./routes/complaints');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 10000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso!');
    
    app.use('/api/complaints', complaintsRoute);
    
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar no MongoDB:', err);
  });
