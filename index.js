const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

const cors = require('cors');

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({
    message: 'Funcionando!'
}));
router.get('/restaurantes/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM RESTAURANTES' + filter, res);
});
router.delete('/restaurantes/:id', (req, res) => {
    execSQLQuery('DELETE FROM RESTAURANTES WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/restaurantes', (req, res) => {
    const nome = req.body.nome || '';
    const localizacao = req.body.localizacao || '';
    const valorKilo = req.body.valorKilo || 0;
    const horarioAtendimento = req.body.horarioAtendimento || '';
    const logo = req.body.logo || '';
    execSQLQuery(`INSERT INTO RESTAURANTES(NOME, LOCALIZACAO, CORDENADAS, VALOR_KILO, HORARIO_ATENDIMENTO, LOGO) VALUES('${nome}','${localizacao}',${valorKilo},'${horarioAtendimento}','${logo}')`, res);
});
router.patch('/restaurantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome || '';
    const localizacao = req.body.localizacao || '';
    const valorKilo = req.body.valorKilo || 0;
    const horarioAtendimento = req.body.horarioAtendimento || '';
    const logo = req.body.logo || '';
    execSQLQuery(`UPDATE RESTAURANTES SET Nome='${nome}', LOCALIZACAO='${localizacao}', LOGO='${logo}' WHERE ID=${id}`, res);
});
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'mysql762.umbler.com',
        port: 41890,
        user: 'comerbem',
        password: '19667507a',
        database: 'comerbemdb'
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}