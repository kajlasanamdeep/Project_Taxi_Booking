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
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
connection.connect();

app.get('/',(req,res)=>{
    res.send("home page");
})
app.use('/user',UserRoutes);
app.use('/cab',CabRoutes);
app.use('/booking',BookingRoutes);
server.listen(PORT,console.log(`App is running`))