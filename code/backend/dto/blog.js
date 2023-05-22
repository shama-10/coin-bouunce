class BlogDTO{

    constructor(blog){
        this.aurthor = blog.aurthor;
        this.content = blog.content;
        this.title = blog.title;
        this.photo = blog.photoPath;
    }

}

module.exports = BlogDTO;