require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./src/config/db');
const pingRoute = require('./src/routes/ping');
const authRoute = require('./src/routes/authRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const transactionRoutes = require('./src/routes/transactionRoutes.js')

/* console.log('Type of pingRoute:', typeof pingRoute);
console.log('Type of errorHandler:', typeof errorHandler); */

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));
app.use(express.json());


const PORT = process.env.PORT || 5000;

//routes
app.use('/api/ping',pingRoute);
app.use('/api/auth',authRoute);
app.use('/api/transactions', transactionRoutes);


//errorHandling
app.use(errorHandler);

const startServer = async () => {

    try{
        await connectDB();
        app.listen(PORT,() => {
        console.log(`Server is running on ${PORT}`);
    });
    }catch(error){
    console.error('Failed to start server due to database connection error',error);
    process.exit(1);
  }
};

startServer();