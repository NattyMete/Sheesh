import mongoose from "mongoose";
const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        firstName:{
            type:String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        location: {
            type:String,
        },
        description: {
            type: String,
            max: 500
        },
        picturePath: {
            type: String,
            default: ""
        },
        userPicturePath: {
            type: String,
            default: ""
        },
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: []
        }
    }, {timestamps: true}
);
const validatePost = function (req) {
    const schema = Joi.object({
        userId: Joi.string().required(),
        description: Joi.string().max(500),
        picturePath: Joi.string()
    })
    return schema.validate(req);
}
const Post = mongoose.model("Post", postSchema);
export {Post, validatePost};