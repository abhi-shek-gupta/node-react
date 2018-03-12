
const crypto                = require('crypto'),
      path                  = require('path'),
      mongoose              = require('mongoose'),
      jwt                   = require('jsonwebtoken'),
      env                   = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),     
      secret                = env.secret,
      async                 = require("async"),
      Admin                 = require(path.resolve('./app/models/admin')),
      WrapData              = require(path.resolve("./app/config/libs/wrapData")),
      shared                = require("../../config/libs/shared"),
      _moment               = require(path.resolve(`./app/config/libs/date`)),
      Mailer                = require(path.resolve('./app/config/libs/mailer')),
      ERROR                 = require(path.resolve(`./app/config/libs/error`)),
      ObjectId              = mongoose.Types.ObjectId;




class AdminController  {

    /**Add new Admin */
    addAdmin(req, res) {
        /**to randomly generate a password */
        let randomString = function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        let randomPassword = randomString(5, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
            + randomString(1, "0123456789") + randomString(1, "!@#$%^&*") + randomString(1, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

            
        let obj = Object.assign({}, req.body);
        let message,
            match = {};
        /**to encrypte password for new admin */
        if (!obj._id) {
            // to set random  password foe new user
            // console.log("i am new user")
            obj.password = crypto.createHmac('sha512', env.secret).update(randomPassword).digest('base64');
            message = "User has been added. Login credentials have been sent to the entered email id"
        }

        /**Edit a User/Admin */
        if (obj._id) {
            match = { _id: obj._id };
            message ="User Updated Succesfully"
        }

        // console.log("obj",obj);
        Admin.findOneAndUpdate(match, obj, { upsert: true, new: true, runValidators: true, context :"query"},
            (err, result) => {
                if (err) return res.status(412).json({ type: "error", message: "We couldn't proceed with this request.", error: ERROR.pull(err)});

                /**send email to new admin */
                if (result && !obj._id) {
                    let loginLink = env.base_url + "login";
                    // console.log("default password in", randomPassword);
                    Mailer.Email(obj.email, 'newAdmin', 'app/views/', { body: { name: result.firstname, loginLink: loginLink, userName: result.username, password: randomPassword }, subject: "Welcome to - Steward" });
                }

                return res.json({ type: "success", message: message, data: []});
            }
        )

    }


    
    /**to check if admins exist  */
    asyncCheck(req, res) {
        let obj = req.query, key = "username",
            match = {};
            
        if (obj.blurredField === "username" && obj.username ) {
            match = { username: obj.username }
        }

        if (obj.blurredField === "email" && obj.email) {
            key = 'email';
            match = { email: obj.email }
        }

        Admin.count(match)
            .then(result => {
                if (result) res.json({ type: "success", message: key+" already exists!", data: true, key: key })
                else res.json({ type: "success", message: "Not Exists", data: false })
            })
            .catch(err => res.status(412).json({ type: "error", message: "Oops something went wrong!", error: err }))
    }

    /**delete an admin */
    deleteAAdmin(req, res) {

        Admin.findOne({ _id: req.body._id }).remove((err, result) => {
            if (err) res.status(412).json({ type: "error", message: "We couldn't proceed with this request." });
            return res.json({ type: "success", message: "Admin has been deleted.", data: result });
        })
    }


    /**
     * method : POST
     * endpoint: /admin_api/login
     * @param {username} req 
     * @param {password} req
     */
    login(req, res) {
        let obj = req.body;
        let match = { $or: [{ username: obj.username }, { email: obj.email }] };
        let projection = {
            mobile: 1, username: 1, firstname: 1, lastname: 1, email: 1, password: 1, type: 1, image: 1, status: 1, bio: 1, role: 1, loginCount: 1
        }
        Admin.findOne(match, projection, (err, user) => {
            if (err) return res.json({ type: "error", message: "Invalid Username or Password.", errors: ['Invalid Username or Password.'] });
            if (!user || !user.matchPassword(obj.password)) {
                return res.status(412).json({ type: "error", message: "Invalid Username or Password.", errors: ['Invalid Username or Password.'] });
            } else if (!user.status) {
                return res.status(412).json({ type: "error", message: 'Your account is not active yet.', errors: ['Your account is not active yet.'] });
            } else {
                user = {
                    mobile: user.mobile,
                    status: user.status,
                    type: user.type,
                    email: user.email,
                    bio: user.bio,
                    username: user.username,
                    lastname: user.lastname,
                    firstname: user.firstname,
                    _id: user._id,
                    role: user.role
                };
                let token = jwt.sign(user, secret, { expiresIn: "14 days" });
                return res.json(WrapData.success({ success: true, message: "You've been authenticated successfully.", data: user, token: token, }));
            }
        });
    }


    forgotPassword(req, res) {
        let reqData = req.body, 
        hash = shared.random(4, true),//randomly generated otp
        crietiera = { email: reqData.email },
        resestQuery = shared.random(10);//randomly generated querylink
        Admin.findOne(crietiera, (err, admin) => {
            if (err) {
                res.json({
                    success: false,
                    message: err
                });
            } else {

                if (admin && admin.email) {
                    Admin.update({ email: admin.email }, { $set: { otp: hash, resetKey: resestQuery, otpValidity: _moment.futureDate(new Date(), "x", 120, "m") } }, (err, result) => {
                        if (result.nModified) {
                            let resetLink = env.base_url + "reset-password/" + resestQuery;
                            Mailer.Email(admin.email, 'forgotPassword', 'app/views/', { body: { otp: hash, resetLink: resetLink }, subject: "Forgot Your Password - Admin " });
                            return res.json({ type: "success", message: `OTP has been sent to your email address.` });
                        } else {
                            return res.json({ type: "error", message: "We couldn't send yo OTP. Please try again later." });
                        } 
                    });
                } else {
                    return res.status(412).json({ type: "error", message: "We couldn't find your account.", errors: [] });
                }
            }
        });
    }


    resetPassword(req, res) {
        let obj = req.body,
         match = {$and: [{ otp: obj.otp }, { resetKey: obj.resetQuery }]},
         projection = { otp: 1,otpValidity: 1}
        Admin.findOne(match, projection , (err, admin) => {
                if (err) return res.status(500).json({ type: "error", message: err.message });
                let hashpassword = Admin.hashPassword(obj.newPassword);
                if (admin) {
                    /*if OTP used within 2 hrs expired*/
                    if (admin.otpValidity >= _moment.timestamp()) {
                        /*if we found the user within 2 hrs of otp sent (to update password)*/
                        Admin.findOneAndUpdate({
                            _id: mongoose.Types.ObjectId(admin._id)
                        },
                            {
                                password: hashpassword,
                                $unset: {
                                    otp: 1,
                                    resetKey: 1
                                }
                            }, (err, result) => {
                                if (result) {
                                    return res.json({ type: "success", message: "Your password has been changed." });
                                } else {
                                    return res.status(412).json({ type: "success", message: "We couldn't perform this action. Please try again later." });
                                }
                            })
                    }
                    else {
                        return res.status(412).json({ type: "error", message: "Your OTP and reset link has been expired" });
                    }

                } else {
                    /*account not found - invalid OTP*/
                    return res.status(412).json({ type: "error", message: "Your OTP is Invalid." });
                }

            });
    }

    
    /**get admins list */
    getAdmins(req, res) {
        /**match  */
        let obj = req.query;
        let match = {},
            projection = {firstname: 1,lastname: 1, email: 1,created_at: 1,status: 1,mobile: 1,username: 1,type: 1,role: 1};
        
        /**Search */
        if (obj.searchQuery) {
            match = {
                $or: [{ email: new RegExp(obj.searchQuery, 'i') },
                { firstname: new RegExp(obj.searchQuery, 'i') },
                { mobile: new RegExp(obj.searchQuery, 'i') },
                { lastname: new RegExp(obj.searchQuery, 'i') }]
            }
        }
        /** filter dropdown */
        if (obj.filter == 1) {
            match.status = true
        }
        else if (obj.filter == 0) {
            match.status = false
        }

        async.parallel({
            adminCount: (_callback) => {
                Admin.count(match)
                .then(response => _callback(null, response ))
                .catch(err => _callback(err ));
            },
            admins: (_callback) => {

                //pagination
                var limit = obj.limit ? parseInt(obj.limit) : env.listing.limit;//results per page
                var page = (obj.page) ? parseInt(obj.page) : 1;//offset
                var offset = (page - 1) * limit;

                Admin.aggregate([
                    {
                        $sort: { created_at: -1 }
                    },
                    {
                        $match: match
                    },
                    {
                        $project:projection
                    },
                    {
                        $skip: offset
                    },
                    {
                        $limit: limit
                    }
                ]).then(response => _callback(null, response))
                    .catch(err => _callback(err));
            }
        }, (err, results) => {
            if (err) res.status(412).json({ type: "error", message: "Oops something went wrong!", error: err });
            return res.json({ type: "success", message: "Admins list ", data: results });
        });
    }

    /**get details of a single admin */
    getAAdmin(req, res) {
        let adminID = (req.query.id || null);
        if (!ObjectId.isValid(adminID)) return res.status(412).json({ type: "error", message: "Invalid Admin Id", errors: ["invalid Admin id"] });

        let match = {_id: ObjectId(adminID)},
            message = "we got admin",
            projection = { firstname: 1,lastname: 1,email: 1,status: 1,role: 1, mobile: 1,username: 1};

        Admin.findOne(match, projection, (err, admin) => {
            if (err) res.json({ type: "error", message: err.message });
            if (admin) {
                res.json({ type: "success", message: message, data: admin });
            } else {
                res.json({ type: "error", message: "No such admin found", data: [] });
            }
        });
    }
}

module.exports = AdminController;