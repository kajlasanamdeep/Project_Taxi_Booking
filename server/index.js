const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection/connect');
const CabRoutes = require('./routes/CabRoutes');
const UserRoutes = require('./routes/UserRoutes');
const BookingRoutes = require('./routes/BookingRoutes');
const dotenv = require('dotenv');
dotenv.config({path:'./config/.env'})
const app = express();
const server = require('http').createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
connection.connect();

app.use('/user',UserRoutes);
app.use('/cab',CabRoutes);
app.use('/booking',BookingRoutes);
server.listen(process.env.Port || 8000,console.log(`App is running`))