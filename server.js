import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import fs from 'fs';
import open from 'open';

const app = express();
const PORT = 3000;

// Definindo __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para receber os dados do formulário
app.post('/cadastrar', (req, res) => {
  const {
    nome,
    sobrenome,
    cpf,
    nascimento,
    sexo,
    celular,
    email,
    rg,
    peso,
    altura,
    senha,
    nome_responsavel,
    sobrenome_responsavel,
    cpf_responsavel,
    nascimento_responsavel,
    email_responsavel,
    celular_responsavel
  } = req.body;

  // Salvando os dados em um arquivo texto
  const texto = `
    Nome: ${nome}
    Sobrenome: ${sobrenome}
    CPF: ${cpf}
    Data de Nascimento: ${nascimento}
    Sexo: ${sexo}
    Celular: ${celular}
    Email: ${email}
    RG: ${rg}
    Peso: ${peso}
    Altura: ${altura}
    Senha: ${senha}
    Responsável: ${nome_responsavel || 'N/A'}
    Sobrenome Responsável: ${sobrenome_responsavel || 'N/A'}
    CPF Responsável: ${cpf_responsavel || 'N/A'}
    Data de Nascimento Responsável: ${nascimento_responsavel || 'N/A'}
    Email Responsável: ${email_responsavel || 'N/A'}
    Celular Responsável: ${celular_responsavel || 'N/A'}
  `;

  fs.appendFile('cadastros.txt', texto + '\n\n', (err) => {
    if (err) {
      console.error('Erro ao salvar os dados:', err);
      return res.status(500).send('Erro ao salvar os dados.');
    }
    // Redirecionar para a página de login após cadastro
    res.redirect('loginIdoso.html');
  });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  open(`http://localhost:${PORT}/`);
});
