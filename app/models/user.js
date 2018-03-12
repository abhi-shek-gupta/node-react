const mongoose = require('mongoose'),
    path = require('path'),
    config = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    crypto = require('crypto'),
    uniqueValidator = require('mongoose-unique-validator'),
    schema = mongoose.Schema;


var userSchema = new schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: "Username is required.",
        unique: "This username is already exists."
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: "Email address is required.",
        unique: "This email address is already exists."
    },
    image: Object,
    password: String,
    mobile: String,
    loginCount: {   // to count no. of logins
        type: Number,
        default: 0
    },
    auth: String,
    status: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });


userSchema.pre('save', function (next) {
    // this.auth = crypto.randomBytes(16).toString('hex');
    this.password = this.encryptPassword(this.password);
    next();
});

/* encrypt password by using crypto and mongoose methods*/
userSchema.methods.encryptPassword = function (password) {
    // console.log(crypto.createHmac('sha512', config.secret).update(password).digest('base64'));
    return crypto.createHmac('sha512', config.secret).update(password).digest('base64');
};


/* match password by using crypto and mongoose methods*/
userSchema.methods.matchPassword = function (password) {
    // console.log("sent",this.encryptPassword(password));
    // console.log("saved ",this.password)
    return this.password === this.encryptPassword(password);
};

/* encrypt password by using crypto and mongoose methods*/
userSchema.statics.hashPassword = function (password) {
    // console.log(crypto.createHmac('sha512', config.secret).update(password).digest('base64'));
    return crypto.createHmac('sha512', config.secret).update(password).digest('base64');
};

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);