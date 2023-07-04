//require = utk import nama package atau file (const nama variabelnya)
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const unless = require("express-unless");

const app = express(); //inisiasi package express

//inisiasi mongoose db, global berarti bisa diakses di file manapun
mongoose.Promise = global.Promise;

//konekin mongo db, cek apakah konek atau tidak
mongoose.connect(dbConfig.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        () => {
            console.log("Database Success Connect");
        },
        (error) => {
            console.log("Database can't be connected" + error);
        }
    );

    
auth.authenticateToken.unless = unless; //cek apakah tokennya ada

//melakukan routing ketika tokennya ada (cek di middleware)
//melakukan pengecekan ketika user login dan daftar
app.use(
    auth.authenticateToken.unless({
        path: [
            {url: "/users/login", methods: ["POST"]},
            {url: "/users/register", methods: ["POST"]},
        ]
    })
);

app.use(express.json());

app.use("/users", require('./routes/users.routes'));

app.use(errors.errorHandler);

//set portnya ke 4000, maka servernya bisa jalan
//testingnya pakai localhost:4000/users/nama_route (lihat di routes.js)
app.listen(process.env.port || 4000, function (params) {
   console.log("Siap digunakan"); //print siap digunakan 
});