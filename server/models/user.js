import mongoose from "mongoose"
import Joi from "joi"
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024
        },
        profilePicture: {
            type: String,
            default: ""
        },
        friends: {
            type: Array,
            default: []
        },
        location: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            default: ""
        },
        occupation: {
            type: String,
            default: ""
        },
        viewedProfile: {
            type: Number,
            default: 0
        },
        impressions: {
            type: Number,
            default: 0
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)
function validateUser(user){
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
        picture: Joi.any(),
        profilePicture: Joi.string(),
    })
    return schema.validate(user);
}
const User = mongoose.model("Users", UserSchema)

export { User, validateUser };
