const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passwordPattern = /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const authController = {
    async register (req, res, next) {
        //Validate User Input
        const userRegisterSchema = Joi.object({
            username : Joi.string().min(5).max(30).required(),
            name : Joi.string().max(30).required(),
            email : Joi.string().email().required(),
            password : Joi.string().required(),
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
                    message : 'Email Already registered, Use Another Email'
                }
                return next(error);
            }  
            //check if User-Name registered
            if(usernameInUse){
                const error = {
                    status : 409,
                    message : 'username Already registered, Use Another userName'
                }
                return next(error);
            }

        } catch (error) {
            return next(error);
        }
        //Password Hash 
        const hashedPawword = await bcrypt.hash(password, 10);

        //store User-data in DB
        const userToRegister = new User({
            username,
            email,
            name,
            password : hashedPawword
        });

        const user = await userToRegister.save();

        //response send
        return res.status(201).json({user});
    },

    
    
    
    async login() {},
}
module.exports = authController;
  