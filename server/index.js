const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection/connect');
const Routes = require('./routes');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: './server/config/.env' })
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 8000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connection.connect();

app.use('/static', express.static(path.join(__dirname, '../server/uploads')));
app.use('/public', express.static(path.join(__dirname, '../server/public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../server/views'));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/service', (req, res) => {
    res.render('service');
});
app.get('/news', (req, res) => {
    res.render('news');
});
app.get('/dash', (req, res) => {
    res.render('userProfile');
});
app.use('/', Routes.Register);
app.use('/', Routes.Login);
app.use('/user', Routes.User);
app.use('/driver', Routes.Driver);
server.listen(PORT, console.log(`App is running`))