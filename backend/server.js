require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./src/config/db');
const pingRoute = require('./src/routes/ping');
const authRoute = require('./src/routes/authRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const transactionRoutes = require('./src/routes/transactionRoutes.js')

const app = express();

const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};
app.use(cors(corsOptions));
app.use(express.json());


const PORT = process.env.PORT || 5001;

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
