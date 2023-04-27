
const http = require('http');
const formidable = require('formidable');
const mysql = require('mysql');

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    const form = formidable({ multiples: true });
    const { threadId } = require('worker_threads');

    //connection to mysql database
    const connection = mysql.createConnection({
        host: '139.162.186.93',
        port: '3306',
        user: 'kaninche_hutmacher',
        password: 'jsK$GceIy3m2',
        database: 'kaninche_userdb'
    });

    //parse incoming data
    form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        console.log('fields:', fields);
        console.log('files:', files);

        console.log(Object.values(fields));

        //drop data into mysql database
        // connection.connect(function (err) {
        //     if (err) {
        //         console.error("error connecting: " + err.stack);
        //         return;
        //     }
        //     console.log("connected as id: " + connection - threadId);
        //     var sql = "INSERT INTO guest (firstname, lastname, nextday) VALUES ('" + incData.firstname + "','" + incData.lastname + "','" + true + "')";
        //     connection.query(sql, function (err, result) {
        //         if (err) throw err;
        //         console.log("1 record inserted");
        //     });
        //});
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Danke, Deine Daten wurden gespeichert.');
    res.end();
}).listen(8081); // Activates this server, listening on port 8081.