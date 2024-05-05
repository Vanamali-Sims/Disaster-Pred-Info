const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const app = require('./index')

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
}).then(() => {
    console.log('Database connected successfully')
});

/*const tourSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'A tour must have a name']
    },
    rating : {
        type : Number,
        default : 4.5
    },
    price : {
        type : Number,
        required : [true,'A tour must have a price']
    }
})

const Tour = mongoose.model('Tour',tourSchema);

const testTour = new Tour({
    name : 'The Lone Wolf',
    rating : 5,
    price : 500
})

testTour.save().then((doc) => {
    console.log(doc)
}).catch((err)=>{
    console.log("Error");
})*/

const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log(`Listening to the server at port ${port}`);
})
