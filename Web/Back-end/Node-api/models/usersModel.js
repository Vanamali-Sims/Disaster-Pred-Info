const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please provide the name']
    },
    email : {
        type : String,
        required : [true, 'Please provide the email'],
        unique : true,
        validate : [validator.isEmail, 'Please provide a valid email']
    },
    photo : String,
    description : {
        type : String,
        required : [true,'Provide description']
    },
    password : {
        type : String,
        required : [true, 'Please provide the password'],
        minlength : 8,
        select : false
    },
    passwordConfirm : {
        type : String,
        required : [true, 'Please confirm the password'],
        validate : {
            validator : function(el) {
                return el === this.password //custom validator always returns true or false based on the call back function.Here if the passwordConfirm is equals to the password then it returns true.
                //And also remember that this custom validator is only applicable to document.create and save methods.so for other methods like update ,etc it is not applicable.
            },
            message : 'Invalid,Please reconfirm the password'
        }
    },
    passwordChangedAt : Date,
    passwordResetToken : String,
    passwordResetExpires : Date,
    active : {
        type : Boolean,
        default : true,
        select : false
    },
},
{ 
    toJSON : { virtuals : true },
    toObject : { virtuals : true }
})

userSchema.pre('save',async function(next){
    //this is used to access current document
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12); //12 - process intensive count,more the count <=> more secured the passwd.
    //the bcrypt hash method returns a promise,so it is encoverd in async,await.
    this.passwordConfirm = undefined;
    next();
})

userSchema.virtual('reviews',{
    ref : 'Review',
    foreignField : 'user',
    localField : '_id'
});


userSchema.methods.correctPassword = async function( candidatePassword, userPassword ){
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000 , 10);
        return JWTTimestamp < changedTimeStamp;
    }
    return false
}

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log(resetToken,this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model('User',userSchema);

module.exports = User;