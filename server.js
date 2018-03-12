
'use strict';

require('dotenv').config({ silent: true });
const express           = require('express'),
    http                = require('http'),
    morgan              = require('morgan'),
    path                = require('path'),
    bodyParser          = require('body-parser'),
    router              = express.Router(),
    routes              = require('./app/config/routes'),
    database            = require(path.resolve("./app/config/libs/mongoose")),
    admin               = require(path.resolve('./app/controllers/Admin/index')),
    helmet              = require('helmet'),
    cors                = require('cors'),
    env                 = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`));

class Server {

    constructor() {
        /*defining PORT for application*/
        this.port = env.server.PORT || 3000;

        /*init express app*/
        this.app = express();

        /*init a sever*/
        this.server = http.createServer(this.app);

        /*init helmets for securing http headers*/
        this.helmet = helmet();

        /*init cors for multiple origin requests*/
        this.cors = cors();

        /*init admin class to create a user on Very first time use*/
        this.admin = new admin();


        /* express router */
        this.router = router;

        /*routes created */
        this.routes;
    }

    appConfig() {
        /*allow application to read and send data in body*/
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb' , extended: true }));
    }

    connectoToDB() {
        /* object of databse is creted its method
           "dbConnect() is called"*/
        new database().dbConnect();
    }


    enablingCors() {
        /*enable application CORS*/
        this.app.use(this.cors);
    }

    initRoutes() {
        /* routes are intialised and "this.app" &
           "this.router" are passed in constructor */
        this.routes = new routes(this.app, this.router).init();
    }

    morgon() {
        this.app.use(morgan('dev'));
    }

    setStaticPaths() {
        this.app.use(express.static(path.resolve('./admin')));
        this.app.use('/assets',express.static(path.resolve('./assets')));
    }

    setAPIRoutes() {
        /*routin admin_api */
        this.app.use("/admin_api", this.routes);
    }

    allowToServe() {
        /*rendering file on routes*/
        this.app.get(/^((?!\/(api|admin_api)).)*$/, (req, res) => {
            res.sendFile(path.resolve('./admin/index.html'));
            
        });
    }


    listen() {
        this.server.listen(this.port, () => {
            /**to create an admin if not exist*/
            this.admin.checkAdminAccount();
            console.log('listening on', this.server.address().port);
        });
    }

    init() {

        this.appConfig();
        this.connectoToDB();
        this.morgon();
        this.initRoutes();
        this.enablingCors();
        this.setStaticPaths();
        this.setAPIRoutes();
        this.allowToServe();
        this.listen();
    }

}


let application = new Server();

application.init();
