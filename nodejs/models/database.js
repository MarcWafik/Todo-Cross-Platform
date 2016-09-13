/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mysql = require("mysql");

var DataBase = function() {};

DataBase._Instance = null;
/**
 * connect to database if connection not set
 * @returns {mysql connection}Data base instance
 */
DataBase.getInstance = function() {
    if (DataBase._Instance === null) {

        DataBase._Instance = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'todo',
            multipleStatements: true,
            port: 3306
        });

        DataBase._Instance.connect();
    }
    return DataBase._Instance;
};

module.exports = DataBase;