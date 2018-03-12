"use strict";
const DS            = "/",
      PORT          = 8000,
    __DB            = "name of  DB",
      base_url      = "http://localhost:"+PORT+DS ;

module.exports = {
    db: {
        name: __DB,
        URL: "mongodb://localhost/" + __DB,
        options: {
            user: '',
            pass: ''
        }
    },
    base_url: base_url,
    DS: DS,
    debug_mongo:true,
    admin_base_url: base_url + "manager/",
    API: {
        site: '/api/',
        admin: '/admin_api/'
    },
    secret: new Buffer("SecretKEy").toString('base64'),
    server: {
        PORT: PORT
    },
    MasterPassword :"123456",

    ADMIN: {
        username: "__superadmin",
        email: 'superadmin@yopmail.com',
        password: '000000',
        role: "superAdmin",
        lastname: "lastname",
        firstname: "superAdmin",
        status: true
    },
    /*for sending emails*/
    sendgrid: {
        key: "Sandgridkey",
        username: "username",
        password: "pswd"
    },
    mail: {
        from: "Admin",
        email: "no-reply@admin.com"
    },
    listing: {
        limit: 10
    },

}     