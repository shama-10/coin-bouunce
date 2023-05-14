const Joi = require('joi');
const passwordPattern = /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;;
const authController = {
    async register(req, res, next) {
        //Validate User Input
        const userRegisterSchema = Joi.object({
            username : Joi.string().min(5).max(30).required(),
            name : Joi.string().max(30).required(),
            email : Joi.string().email().required(),
            password : Joi.string().pattern(passwordPattern).required(),
            confirmPassword : (Joi.ref('password')).required()
        });
        const {error} = Joi.validate(req.body);
        //if error in Validation ->return error via middleware
        if(error){
        
        }
    },
    async login() {},
}
module.exports = authController;