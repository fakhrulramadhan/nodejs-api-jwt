const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

//buat model data user pakai schema (dari mongoose)
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {    
        type: String,
        required: true,
        unique: true //tidak boleh ada email yang sama
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date, //tipe data
        default: Date.now(),
    },
});

//set schema convert dari model ke Json, serta hapus semua datanya
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id,
        delete returnedObject._v,
        delete returnedObject.password
    }
});

//set schema ketika user memasukkan email yang sama
userSchema.plugin(uniqueValidator, {message: "Email already in Use"});

//buat variabel model User, isi dengan mongoose.model
const User = mongoose.model("user", userSchema);

//lempan data user (modelnya)
module.exports = User;