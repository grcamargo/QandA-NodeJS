const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/db');
const Question = require('./db/Question');
const Answer = require('./db/Answer');

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
    Question.findAll({raw: true, order: [['id','DESC']]}).then(questions => {
        res.render('index', {
            questions: questions
        });
    });
});

app.get('/question', (req,res) => {
    res.render('question');
});

app.post('/submit', (req,res) => {

    let title = req.body.title;
    let description = req.body.description;

    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/');
    });
});

app.get('/pagequestion/:id', (req,res) => {
    let id = req.params.id;
    Question.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined){

            Answer.findAll({
                where: {questionId: question.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then( answers => {
                res.render('pagequestion',{
                    question: question,
                    answers: answers
                });
            });

        }else{
            res.redirect('/');
        }
    });
});

app.post('/submitAns', (req,res) => {
    let body = req.body.body;
    let questionId = req.body.question;
    Answer.create({
        body: body,
        questionId: questionId

    }).then(() => {
        res.redirect('/pagequestion/' + questionId);
    });
});

app.listen(PORT, () => {
    console.log('Servidor iniciado com suacesso!');
});