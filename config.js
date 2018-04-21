/**
 * Created by enixjin on 9/24/15.
 */
var config = {};

// config.frontPort = 5000;
config.servicePort = 5200;
config.httpJsonPort = 5000;
config.socketJsonPort = 5300;

config.output_directory = "fileStore";

config.db = "MySQL";//MySQL or PostgreSQL
config.loginType = "MySQL";

//db account
var db_server = "localhost";
var db_user = "root";
var db_password = "root";

config.distributedDBs = [
    {
        connectionLimit: 10,
        host: db_server,
        database: 'lams',
        user: db_user,
        password: db_password,
        commandPort: 5101,
        socketPort: 5100
    },
    {
        connectionLimit: 10,
        host: db_server,
        database: 'lams',
        user: db_user,
        password: db_password,
        commandPort: 5101,
        socketPort: 5100
    }
];

config.centralizedDB = {
    connectionLimit: 5,
    host: 'localhost',
    database: 'lams',
    user: db_user,
    password: db_password
};


config.timeDiff = 315936000000;

config.logLevel = 'debug';
config.logFile = 'log.txt';

config.jwtSecKey = 'enixjin';
config.jwtTimeout = '90d';

config.seqMax = 9999;
config.verifyTimeDiff = 300000; // five minutes
config.verifyTimeStamp = false; // should be true in production

config.imagePath = "/sandbox/temp";

module.exports = config;
