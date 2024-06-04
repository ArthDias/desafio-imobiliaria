const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_FILE = './usuarios-db.json';

app.use(cors());
app.use(bodyParser.json());

// Registro de usuário
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    jsonfile.readFile(DB_FILE, (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o banco de dados.');

        const userExists = data.users.find(user => user.username === username);
        if (userExists) return res.status(400).send('Usuário já existe.');

        const hashedPassword = bcrypt.hashSync(password, 8);
        data.users.push({ username, password: hashedPassword });

        jsonfile.writeFile(DB_FILE, data, err => {
            if (err) return res.status(500).send('Erro ao salvar o usuário.');
            res.status(201).json('Usuário registrado com sucesso.');
        });
    });
});

// Login de usuário
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  jsonfile.readFile(DB_FILE, (err, data) => {
      if (err) return res.status(500).send('Erro ao ler o banco de dados.');

      const user = data.users.find(user => user.username === username);
      if (!user) return res.status(400).send('Usuário não encontrado.');

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) return res.status(401).send('Senha incorreta.');

      res.status(200).json({message: 'Login bem-sucedido.', token: 'poiwqefhn', expiresIn: ''});
  });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
