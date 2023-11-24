const http = require('http');
const formidable = require('formidable');
const express = require('express');
const mysql = require('mysql');
const app = express();

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

const form = formidable({ multiples: true });

app.set("port, port");

app.get("/", function(req, res){
    res.json({"message":"Hello World!"});
});

app.post("/post", function(req,res){
    res.json({"message":"Hello my friend!"});
    form.parse(req, (err, fields, files) => {        
        if (err) reject({ err });
        console.log('fields:', fields);
        console.log('files:', files);

        let isEmpty = Object.entries(fields).length === 0 && fields.constructor === Object;
        console.log(isEmpty);
        
        // Split incoming object-data into an array
        if (!isEmpty) {
            dataSplit(fields)}
        else {
            res.json({"message":"Leeren Datensatz erhalten. Verbindung zum Server getrennt."});
            res.end;
        };
    });
});

function dataSplit(dataobject) {
    let arr = [];
    let index = 0;

    Object.keys(dataobject).forEach(key => {
        console.log("-----")
        console.log(key, dataobject[key], dataobject[key].length);

        // if object properties are an array
        if (Array.isArray(dataobject[key])) {
            console.log("isArray");
            arr[index] = dataobject[key][0];
            dataobject[key] = dataobject[key].slice(1);
            index++;
        } else {
            console.log("noArray");
            arr[index] = dataobject[key];
            index++;
        }
    });
    try {
        writeToDatabase(arr[0], arr[1], arr[2], arr[3]);
        //console.log("Datenbankdummy: " + arr[0] + ", " + arr[1] + ", " + arr[2] + ", " + arr[3]);
    }
    catch (e) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.json({'message': e.message});
        res.end();
    };

    if ((Array.isArray(dataobject["firstname"]) && (dataobject["firstname"].length > 0)) && (Array.isArray(dataobject["lastname"]) && (dataobject["lastname"].length > 0)) && (Array.isArray(dataobject["nextday"]) && (dataobject["nextday"].length > 0)) && (Array.isArray(dataobject["recommendation"]) && (dataobject["recommendation"].length > 0))) {
        dataSplit(dataobject);
    } else {
        console.log("Alle Daten geschrieben.");
        res.json({"message":"Danke, Deine Daten wurden gespeichert."});
        res.end();
    };
};

function writeToDatabase(firstname, lastname, nextday, recommendation) {
    //connection to mysql database
    var pool = mysql.createPool({
        host: '139.162.186.93',
        port: '3306',
        user: 'kaninche_hutmacher',
        password: 'jsK$GceIy3m2',
        database: 'kaninche_userdb'
    });

    pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!

        // Use the connection
        var sql_guest = "INSERT INTO guest (firstname, lastname, nextday) VALUES ('" + firstname + "','" + lastname + "','" + nextday + "')";

        connection.query(sql_guest, function (error, results, fields) {

            // When done with the connection, release it.
            connection.release();

            // Handle error after the release.
            if (error) throw error;

            // Don't use the connection here, it has been returned to the pool.
        });
    });
    pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!

        // Use the connection
        var sql_music = "INSERT INTO music_request (music_req) VALUES ('" + recommendation + "')";

        connection.query(sql_music, function (error, results, fields) {

            // When done with the connection, release it.
            connection.release();

            // Handle error after the release.
            if (error) throw error;

            // Don't use the connection here, it has been returned to the pool.
        });
    });
};

const server = http.createServer(app);
// Activates this server, listening on port 8081. 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
