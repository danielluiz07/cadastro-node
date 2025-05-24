const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com MySQL
const connection = mysql.createConnection({
    host: 'nozomi.proxy.rlwy.net',
    user: 'root',
    password: 'zHrrYGMmdOTNZKnxDnHqADvmctONROkF', 
    database: 'railway',
    port: 46594
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});

// Rota POST
app.post('/cadastrar', (req, res) => {
    console.log('Dados recebidos:', req.body); 

    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).send('Nome e email são obrigatórios.');
    }

    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    connection.query(sql, [nome, email], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).send('Erro ao inserir dados');
        }
        res.send('Usuário cadastrado com sucesso');
    });
});

// Iniciar servidor
const PORT = 3000
app.listen(PORT, () => {
    console.log('Servidor rodando na porta 3000');
});

app.use(cors({
  origin: 'https://teste-dl.netlify.app'
}));