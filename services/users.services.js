const User = require("../models/users.model");
const bcrypt = require('bcryptjs');
const auth = require("../middlewares/auth");
const { response } = require("express");

//bikin fungsi login services
async function login(username, password, callback) {
    const user = await User.findOne({username});

    //jika data usernya ada
    if (user != null) {
        //jika di encrypt password sama dengan data password yang 
        //sudah di hash, maka tokennya kesimpan
        if (bcrypt.compareSync(password, user.password)) {
            //bikin token utk usernya
            const token = auth.generateAccessToken(username);

            //kasih response callback dan masukkan data user
            //serta tokennya
            return callback(null, {...user.toJSON(), token})
        } else {
            //jika tidak sesuai maka invalid
            return callback({
                message: "Invalid Username / password"
               });
        }
    } else {
        return callback({
           message: "No Account Was Found" 
        });
    }
}

//bikin fungsi register
async function register(params, callback) {
    //jika usernamenya kosong, muncul pesan username dibutuhkan
    if (params.username == undefined) {
        
        //berupa message harus pakai {}
        return callback({
            message: "Username required"
        });
    }

    //panggil inisiasi model user
    const user = new User(params);
    //simpan data user
    user.save().then((response) => {
        return callback(
            null, response //tampilkan response data
        );
        //lihat lagi ke controller kalau error
    })
    .catch((error) => {
        return callback(error);
    })
    ;
}

//lempar data hasil login dan register
module.exports = {login, register};