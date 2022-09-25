const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/db');

connection
    .authenticate()
    .then(()=> {
        console.log('Connection Success!');
    })
    .catch((msgErro)=> {
        console.log(msgErro);
    });

const app = express();

PORT = 8080;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/question', (req,res) => {
    res.render('question');
});

app.post('/submit', (req,res) => {

    let title = req.body.title;
    let description = req.body.description;

    res.send(`Title: ${title} \n Description: ${description}`);
});

app.listen(PORT, () => {
    console.log('Servidor iniciado com suacesso!');
});