const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const UserDTO = require('../dto/user');
const JWTService = require('../services/JWTservice')
const RefershToken = require('../models/token');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {
    async register (req, res, next) {
        //Validate User Input
        const userRegisterSchema = Joi.object({
            username : Joi.string().min(5).max(30).required(),
            name : Joi.string().min(5).max(30).required(),
            email : Joi.string().email().required(),
            password : Joi.string().pattern(passwordPattern).required(),
            confirmPassword : Joi.ref('password')
        });

       const { error } = userRegisterSchema.validate(req.body);

      // return res.status(400).json({message:error});

        //if error in Validation ->return error via middleware
        if(error){
            return next(error);
        }
        //if Email or Username already registered -> return error
        const {username, name, email, password} = req.body;
        try {
            const emailInUse = await User.exists({email});
            const usernameInUse = await User.exists({username});


            //check if email registered
            if(emailInUse){
                const error = {
                    status : 409,
                    message : 'Email Already registered, Use Another Email!'
                }
                return next(error);
            }  


            //check if User-Name registered
            if(usernameInUse){
                const error = {
                    status : 409,
                    message : 'username Already registered, Use Another userName!'
                }
                return next(error);
                
            }

        } catch (error) {
            return next(error);
        }



        //Password Hash 
        const hashedPawword = await bcrypt.hash(password, 10);

        let accessToken;
        let refershToken;
        let user;
        try{
            //store User-data in DB
            const userToRegister = new User({
                username,
                email,
                name,
                password : hashedPawword
            });
    
            user = await userToRegister.save();
            //token generation
            accessToken = JWTService.signAccessToken({_id : user._id}, '30m');
            refershToken = JWTService.signRefershToken({_id : user._id}, '60m');
        }
        catch(error){
            return next(error);
        }
        
        
       //store refersh token in db
       await JWTService.storeRefershToken(refershToken, user._id);

       //send tokens in cookie
        res.cookie('accessToken', accessToken,{
            maxAge : 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        res.cookie('refershToken', refershToken,{
            maxAge : 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        //response send
        const userDto = new UserDTO(user);

        return res.status(201).json({user: userDto, auth : true});
    },
    async login(req, res, next) {
        //validate user input
        //if validation error ->return error
        //match user name and password
        //return response
        const userLoginSchema = Joi.object({
            username : Joi.string().min(5).max(30).required(),
            password : Joi.string().pattern(passwordPattern)
        });
        const { error } = userLoginSchema.validate(req.body);
        if(error){
            return next(error);
        }
        const {username, password} = req.body;
        //match user name and password
        let user;
        try{
            //match username
            user = await User.findOne({username: username});

            if(!user)
            {
                const error = {
                    status : 401,
                    message : 'Invalid Username'
                }
                return next(error);
            }
            //match password
            //req.body.password ->hash->match
            const match = await bcrypt.compare(password, user.password);
            if(!match)
            {
                const error = {
                    status : 401,
                    message : 'Invalid Pawword'
                }
                return next(error);
            }
        }
        catch(error){
            return next(error);
        }
        const accessToken = JWTService.signAccessToken({_id : user._id}, '30m');
        const refershToken =  JWTService.signRefershToken({_id : user._id}, '60m');

        //update refersh tokens in db
        try{
            await RefershToken.updateOne(
                {
                    _id : user._id
                },
                {token : refershToken},
                {upsert : true}
                )
        }
        catch(error){
            return next(error);
        }
        
        

        //send tokens in cookie
        res.cookie('accessToken', accessToken,{
            maxAge : 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        res.cookie('refershToken', refershToken,{
            maxAge : 1000 * 60 * 60 * 24,
            httpOnly: true
        });


        const userDto = new UserDTO(user);

        return res.status(200).json({user: userDto, auth : true});

    },
    
    async logout(req, res, next) {
        
        //delete refersh token from db
        const {refershToken} = req.cookies;
        try{
            await RefershToken.deleteOne({token : refershToken});
        }
        catch(error){
            return next(error);
        }

        //delete cookies

        res.clearCookie('accessToken');
        res.clearCookie('refershToken');


        //send response
        res.status(200).json({user : null, auth: false});
    },
    async refersh(req, res, next)
    {
        //1. get refershToken from cookies
        //2. Varify refershToken
        //3. generate new tokens
        //4. update db, return respose

        const orignalRefershToken = req.cookies.refershToken;
        
        let id;
        try{
           id = JWTService.verifyRefershToken(orignalRefershToken)._id;
        }
        
        catch(e){
            const error = {
                status: 401,
                message : 'Unauthorized1'
            }
            return next(error);
        }
        try{
            const match = RefershToken.findOne({_id: id, token: orignalRefershToken});
            if(!match){
                const error = {
                    status : 401,
                    message : 'Unauthorized2'
                }
                return next(error);
            }
        }
        catch(e){
            return next(e);
        }
        //3. generate new tokens
        try {
            
            const accessToken = JWTService.signAccessToken({_id : id}, '30m');
             const refershToken =  JWTService.signRefershToken({_id : id}, '60m');

             await RefershToken.updateOne({_id: id}, {token: refershToken});

              //send tokens in cookie
        res.cookie('accessToken', accessToken,{
            maxAge : 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        res.cookie('refershToken', refershToken,{
            maxAge : 1000 * 60 * 60 * 24,
            httpOnly: true
        });


        } catch (e) {
           return next(e); 
        }

        const user = await User.findOne({_id: id});
        
        const userDto = new UserDTO(user);

        return res.status(200).json({user: userDto, auth:true });
    }
}
module.exports = authController;