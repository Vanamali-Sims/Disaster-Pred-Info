const User = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });

    return newObj;
}

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});



exports.updateUser = catchAsync(async (req, res ,next) => {

    const filteredBody = filterObj(req.body, 'name', 'email', 'description')

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody , {
        new : true,
        runValidators : true
    })

    console.log('updated');
    res.status(200).json({
        status : 'success',
        data : {
            user : updatedUser
        }
    })
});

exports.deleteUser = catchAsync(async (req, res, next) => {

    await User.findByIdAndDelete(req.user.id);

    res.status(204).json({
        status : 'success',
        data : null
    })
});