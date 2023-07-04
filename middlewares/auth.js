//untuk json web token dan error middleware (hak akses)

const jwt = require('jsonwebtoken');

//requset, response, next (selanjutnya mau kemana)
//fungsi pengecekan token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1]; //hilangkin spasinya

    if (token == null) return res.sendStatus(401); //status error
    
    //verifikasi json web token
    //harus diingat secretkeynya
    jwt.verify(token, "Snippet_secretKey", (err, user) => {
        if (err) return res.sendStatus(403); //statusnya berubah  403

        //data user disimpan di user
        req.user = user;
        next(); //selanjutnya mau kemana
    });

}

//fungsi membuat token
function generateAccessToken(username) {

    return jwt.sign({data: username}, "Snippet_secretKey", {
        //expire tokennya berlaku cuma sejam
        expireIn: "1h"
    });
}

//module.exports utk lempar nilai, sama seperti props di flutter_bloc
module.exports = {
    authenticateToken,
    generateAccessToken
};