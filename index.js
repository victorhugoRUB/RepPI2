import express from 'express';
import path from 'path';

const port = 3003
const host = 'localhost'
const app = express();

var listaUsu = [];

app.use(express.static(path.join(process.cwd(),'public')));

app.use('/cadastrarUsu', (req, res) => {
    
    const nome = req.query.nome;
    const sobrenome = req.query.sobrenome;
    const usuario = req.query.usuario;
    const cidade = req.query.cidade;
    const cep = req.query.cep;

    listaUsu.push({nome: nome, sobrenome: sobrenome, usuario: usuario, cidade: cidade, cep: cep});
    res.write(`
    <html>
    <head>
        <title>Usuário cadastrado</title>
    </head>
    <body>
        <h1>Usuario cadastrado</h1>
        <ul>
            <li>Nome: ${nome}</li>
            <li>Sobrenome: ${sobrenome}</li>
            <li>Usuario: ${usuario}</li>
            <li>Cidade: ${cidade}</li>
            <li>CEP: ${cep}</li>
        </ul>
        <a href="/index.html">Voltar</a>
        <a href="/listarUsu">Listar Usuarios</a>
    <body>
    <html>
    `)

    res.end()
})

app.use('/listarUsu', (req, res) => {
    res.write(`
    <html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <title>Lista de Usuarios</title>
    </head>
    <body>
        <h1>Lista de Usuarios</h1>
        <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Sobrenome</th>
                <th scope="col">Usuario</th>
                <th scope="col">Cidade</th>
                <th scope="col">CEP</th>
            </tr>
        </thead>
        <tbody>
            ${listaUsu.map((item, index) => {
                return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.nome}</td>
                    <td>${item.sobrenome}</td>
                    <td>${item.usuario}</td>
                    <td>${item.cidade}</td>
                    <td>${item.cep}</td>
                </tr>
                `
            })}
        </tbody>
        </table>
        <a href="/index.html">Voltar</a>
        <a href="./cadastroUsu.html">Cadastrar</a>
    </body>
    </html>
    `)
    res.end()
})

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})