const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection/connect');
const CabRoutes = require('./routes/CabRoutes');
const UserRoutes = require('./routes/UserRoutes');
const BookingRoutes = require('./routes/BookingRoutes');
const dotenv = require('dotenv');
dotenv.config({path:'./server/config/.env'})
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 8000;
const cors = require('cors');
app.use(cors());
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