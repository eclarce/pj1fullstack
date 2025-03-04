require('dotenv').config();
const express = require('express');
const path = require('node:path')
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())

// Usando as rotas de autenticação
app.use('/auth', authRoutes);
app.use('/',express.static(path.join(__dirname, 'resources'),{ index: 'PaginaLogin.html'}))

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
