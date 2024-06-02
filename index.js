import express from 'express';
import path from 'path';

const port = 3003
const host = 'localhost'
const app = express();

var listaCli = [];

app.use(express.static(path.join(process.cwd(),'public')));

app.use('/cadastrarCli', (req, res) => {
    
    const nome = req.query.nome;
    const sobrenome = req.query.sobrenome;
    const email = req.query.email;
    const estado = req.query.estado;
    const cidade = req.query.cidade;
    const endereco = req.query.endereco;
    const numero = req.query.numero;
    const cep = req.query.cep;
    const telefone = req.query.telefone;

    listaCli.push({nome: nome, sobrenome: sobrenome, email: email, estado: estado, cidade: cidade, endereco: endereco, numero: numero, cep: cep, telefone: telefone});
    res.write(`
    <html>
    <head>
        <title>Cliente cadastrado</title>
    </head>
    <body>
        <h1>Cliente cadastrado</h1>
        <ul>
            <li>Nome: ${nome}</li>
            <li>Sobrenome: ${sobrenome}</li>
            <li>Email: ${email}</li>
            <li>Estado: ${estado}</li>
            <li>Cidade: ${cidade}</li>
            <li>Endereco: ${endereco}</li>
            <li>Numero: ${numero}</li>
            <li>CEP: ${cep}</li>
            <li>Telefone: ${telefone}</li>
        </ul>
        <a href="/index.html">Voltar</a>
        <a href="/listarCli">Listar Clientes</a>
    <body>
    <html>
    `)

    res.end()
})

app.use('/listarCli', (req, res) => {
    res.write(`
    <html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <title>Lista de Cliente</title>
    </head>
    <body>
        <h1>Lista de Cliente</h1>
        <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Sobrenome</th>
                <th scope="col">Email</th>
                <th scope="col">Estado</th>
                <th scope="col">Cidade</th>
                <th scope="col">Endereço</th>
                <th scope="col">Numero</th>
                <th scope="col">CEP</th>
                <th scope="col">Telefone</th>
            </tr>
        </thead>
        <tbody>
            ${listaCli.map((item, index) => {
                return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.nome}</td>
                    <td>${item.sobrenome}</td>
                    <td>${item.email}</td>
                    <td>${item.estado}</td>
                    <td>${item.cidade}</td>
                    <td>${item.endereco}</td>
                    <td>${item.numero}</td>
                    <td>${item.cep}</td>
                    <td>${item.telefone}</td>
                </tr>
                `
            })}
        </tbody>
        </table>
        <a href="/index.html">Voltar</a>
        <a href="./cadastroCli.html">Cadastrar</a>
    </body>
    </html>
    `)
    res.end()
})

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})