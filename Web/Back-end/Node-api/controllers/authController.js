const { promisify } = require('util')
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id : id}, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly : true,
        secure : false
    }

    res.cookie('jwt',token,cookieOptions);

    res.status(statusCode).json({
        status : "success",
        token,
        data : {
            user 
        }
    }); 
}


exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        passwordConfirm : req.body.passwordConfirm,
        description : req.body.description
    });
    console.log('printed')
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password) {
        return next(new AppError('Please provide the email and password',400))
    }

    const user = await User.findOne({ email }).select('+password');
    //const correct= await User.correctPassword(password,user.password);

    if(!user || !(await user.correctPassword(password,user.password))) {
        return next(new AppError('Incorrect details, Please check your email and password!!!',401));
    }

    //console.log(email);
    //console.log(password);

    createSendToken(user, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {

    let token = '';
    console.log(req.body);
    if(req.headers.token || req.cookies.token){
        token = req.headers.token
    }
    if(req.body.token){
        token = req.body.token;
    }
    if(!token) {
        return next(new AppError('You are not logged in, Please Login to our website',401));
    }


    //verify the token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)

    //if user is no longer exist after issuing the token
    const currentUser = await User.findById(decoded.id);

    if(!currentUser) {
        return next(new AppError('The User belonging to this token no longer exist',401));
    }

    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError("The user has recently changed the password, please login again",401))
    }

    req.user = currentUser;
    console.log('applied');
    next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {

    const user = await User.findOne({ email : req.body.email });

    if(!user){
        return next(new AppError('The user not found with this email address',404));
    }
    //creates a reset token and sends it to the mail provided by the user
    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave : false });
});