const Joi = require('joi');
const fs = require('fs');
const Blog = require('../models/blog');
const {BACKEND_SERVER_PATH} = require('../config/index');
const BlogDTO = require('../dto/blog');


const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const blogController = {
    async create(req, res, next){

        //1. validate req body
        //2. handle photo storage, naming
        //3. add to db
        //4. return response

        //Photo came from client side in a base64 encoded string ->decode->decode->save 
        //photos path in db.....
        const createBlogSchema = Joi.object({
            title: Joi.string().required(),
            aurthor: Joi.string(mongodbIdPattern).regex.required(),
            content: Joi.string().required(),
            photo: Joi.string().required()
        });
        const {error} = createBlogSchema.validate(req.body);

        if(error){
            return next(error);
        }

        const {title, aurthor, content, photo} = req.body;

        //handling photo
        //read as a nuffer
        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/,''), 'base64');
        
        //alot a random name
        const imagePath = `${Date.now()}-${aurthor}.png`;
        //save locally

        try{
            fs.writeFileSync(`storage/${imagePath}`, buffer)
        }
        catch(error){
            return next(error);
        }

        //save blog in DB
        let newBlog;
        try {
            newBlog = new Blog({
                title,
                aurthor,
                content,
                photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`
            });

            await newBlog.save();

        } catch (error) {
            return next(error);
        }

        const blogDto = new
        res.status(201).json({blog});
    },
    
    
    
    
    async getAll(req, res, next){},
    async getById(req, res, next){},
    async update(req, res, next){},
    async delete(req, res, next){}


}

module.exports = blogController;