const jwt = require ('jsonwebtoken');
const {ACCESS_TOKEN_SECRET, REFERSH_TOKEN_SECRET} = require ('../config/index');
const RefershToken = require('../models/token');


class JWTService{
    //sign Access Token
    static signAccessToken(payload, expiryTime){
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn : expiryTime});
    }

    //sign Refersh Token
    static signRefershToken(payload, expiryTime){
        return jwt.sign(payload, REFERSH_TOKEN_SECRET, {expiresIn : expiryTime});
    }

    //verify Access Token
    static verifyAccessToken(token){
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    }

    //verify Refersh Token
    static verifyRefershToken(token){
        return jwt.verify(token, REFERSH_TOKEN_SECRET);
    }

    //Store refersh token
    static async storeRefershToken(token, userId){
        try{
            const newToken = new RefershToken({
                token : token,
                userId : userId
            });

            //store in db
            await newToken.save();
        }
        catch(error){
            console.log(error);
        }
    }
}
module.exports = JWTService;