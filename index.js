const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const multer = require('multer');

const router = require('./routes/route');
const config = require('./config')

// application set-up
const application = express()
    // multipart
    .use(multer({ dest: path.join(__dirname, config.uploadTemp) }).single('photo'))
    // view engine
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // static
    .use(express.static(path.join(__dirname, 'public')))
    // request router
    .all('*', function (req, res, next) {
        res.locals.req = req;
        res.locals.res = res;
        next();
    })
    .use('/', router);

// server start-up
http.createServer(application)
    .on('listening', function(){
        let addr = this.address();
        let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    })
    .on('error', function(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        let bind = (typeof config.port === 'string') ? 'Pipe ' + config.port : 'Port ' + config.port;

        // handle specific listen errors
        switch(error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .listen(config.port);