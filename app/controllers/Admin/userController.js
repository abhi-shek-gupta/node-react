const crypto                = require('crypto'),
      path                  = require('path'),
      mongoose              = require('mongoose'),
      jwt                   = require('jsonwebtoken'),
      env                   = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),     
      secret                = env.secret,
      User                 = require(path.resolve('./app/models/user'));

class userController  {


adduser(req,res){
      req.body.password='123456'
      let user= new User(req.body)
      user.save(function(err,_user){
        if(err){
          console.log(err)
          res.status(412).json({ type: "error", message: "Invalid Username or Password.", errors: [err] });
        }else{
          res.json({ success: true, message: "User created successfully.", data: _user });
        }
      })
    }

    viewuser(req,res){
      console.log(req.params.id)
    }

}

module.exports = userController;