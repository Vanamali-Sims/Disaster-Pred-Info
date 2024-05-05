const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const reviewRouter = require("./routes/reviewRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: true, // Reflect the request origin, as we're allowing all origins
    credentials: true, // Allow cookies to be sent with the request
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] // Allow these methods
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    //console.log(req.cookies);
    next();
})

app.options('*', cors(corsOptions));


app.use('/reviews',reviewRouter)
app.use('/users',userRouter);



app.get('/',(req, res) => {
    const data = {
        message : "Hello"
    }
    res.json(data);
})

app.all('*',(req, res, next) => {
    next(new AppError(`Cannot find the ${req.originalUrl} on this server!`, 404));
})

//Global Error handling middleware
app.use(globalErrorHandler);

module.exports = app;