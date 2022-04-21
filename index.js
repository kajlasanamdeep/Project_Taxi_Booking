const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./server/connection/connect');
const CabRoutes = require('./server/routes/CabRoutes');
const UserRoutes = require('./server/routes/UserRoutes');
const BookingRoutes = require('./server/routes/BookingRoutes');
const dotenv = require('dotenv');
dotenv.config({path:'./server/config/.env'})
const app = express();
const server = require('http').createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
connection.connect();

app.get('/',(req,res)=>{
    res.send("hello");
})
app.use('/user',UserRoutes);
app.use('/cab',CabRoutes);
app.use('/booking',BookingRoutes);
server.listen(process.env.Port || 8000,console.log(`App is running`))