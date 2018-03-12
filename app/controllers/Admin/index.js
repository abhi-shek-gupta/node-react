'use strict';

const mongoose           = require('mongoose'),
      path               = require('path'),
      env                = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
      Admin              = require(path.resolve('./app/models/admin'));


class Index {
    checkAdminAccount() {
        Admin.findOne({
            role: "superAdmin",
        }, (err, result) => {
            if (!result) {
                var user = new Admin(env.ADMIN);
                user.save((err, result) => {
                    /*User Create*/
                });
            }
        });
    }
}

module.exports = Index;