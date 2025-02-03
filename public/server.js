const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors());

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'harmonia913!',
    database: 'abaixo_assinado'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados!');
    }
});

// Rota para salvar assinaturas
app.post('/api/assinar', (req, res) => {
    const { nome, whatsapp, uf, cidade } = req.body;

    db.query('INSERT INTO assinaturas (nome, whatsapp, uf, cidade) VALUES (?, ?, ?, ?)',
        [nome, whatsapp, uf, cidade],
        (err, result) => {
            if (err) {
                console.error('Erro ao inserir assinatura:', err);
                res.status(500).json({ erro: 'Erro ao salvar assinatura' });
            } else {
                res.json({ mensagem: 'Assinatura registrada com sucesso!' });
            }
        }
    );
});

// Iniciar servidor
app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor rodando em http://0.0.0.0:3000');
});

