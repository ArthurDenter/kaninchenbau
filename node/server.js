
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
    var pool = mysql.createPool({
        host: '139.162.186.93',
        port: '3306',
        user: 'kaninche_hutmacher',
        password: 'jsK$GceIy3m2',
        database: 'kaninche_userdb'
    });

    // const connection = mysql.createConnection({
    //     host: '139.162.186.93',
    //     port: '3306',
    //     user: 'kaninche_hutmacher',
    //     password: 'jsK$GceIy3m2',
    //     database: 'kaninche_userdb'
    // });

   function writeToDatabase(firstname, lastname, nextday, recommendation) {
        pool.getConnection(function(err, connection) {
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
          pool.getConnection(function(err, connection) {
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
    //     //drop data into mysql database
    //     connection.connect(function (err) {
    //         if (err) {
    //             console.error("error connecting: " + err.stack);
    //             return;
    //         }
    //         console.log("connected as id: " + connection - threadId);
    //         var sql_guest = "INSERT INTO guest (firstname, lastname, nextday) VALUES ('" + firstname + "','" + lastname + "','" + nextday + "')";
    //         var sql_music = "INSERT INTO music_request (music_req) VALUES ('" + recommendation + "')";

    //         //write userdata to database
    //         connection.query(sql_guest, function (err, result) {
    //             if (err) throw err;
    //             console.log("1 record inserted");
    //         });
    //         //write music recommendation to database
    //         connection.query(sql_music, function (err, result) {
    //             if (err) throw err;
    //             console.log("1 record inserted");
    //         });
    //     });
    //     connection.end();
    // };

    //parse incoming data
    form.parse(req, (err, fields, files) => {

        if (err) reject({ err });
        console.log('fields:', fields);
        console.log('files:', files);

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
            try{
            writeToDatabase(arr[0], arr[1], arr[2], arr[3]);
            //console.log("Datenbankdummy: " + arr[0] + ", " + arr[1] + ", " + arr[2] + ", " + arr[3]);
            }
            catch (e) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(e);
                res.end();
            };

            if ((Array.isArray(dataobject["firstname"]) && (dataobject["firstname"].length > 0)) && (Array.isArray(dataobject["lastname"]) && (dataobject["lastname"].length > 0)) && (Array.isArray(dataobject["nextday"]) && (dataobject["nextday"].length > 0)) && (Array.isArray(dataobject["recommendation"]) && (dataobject["recommendation"].length > 0))) {
                dataSplit(dataobject);
            } else {
                console.log("Alle Daten geschrieben.");
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('Danke, Deine Daten wurden gespeichert.');
                res.end();
            };
        };
        dataSplit(fields);
    });



    

}).listen(8081); // Activates this server, listening on port 8081.