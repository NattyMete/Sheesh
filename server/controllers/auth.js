import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Joi from "joi";
// import {User, validateUser} from "../models/user.js"
import config from "config"
import lodash from "lodash"
// import express from "express"
// const router = express.Router();
// const {User, validateUser} = require('../models/user');
import {User, validateUser} from "../models/user.js"

export const register = async (req, res) => {
    // Validate user
    const {error} = validateUser(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);}
    // Check if user exists
    const user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('Email already exists.');
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            profilePicture,
            friends,
            location,
            bio,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User ({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profilePicture,
            friends,
            location,
            bio,
            occupation,
            viewdProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });
        const saveUser = await newUser.save();
        res.status(200).json(lodash.pick(saveUser, ['_id', 'firstName', 'lastName', 'email', 'profilePicture', 'friends', 'location', 'bio', 'occupation', 'viewedProfile', 'impressions', 'isAdmin']));
        } catch (err) {
            res.status(500).json(err);
        }
};

export const login = async (req, res) => {
    try {
        console.log('req.body: ',req.body)
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if (!user) return res.status(400).send('Invalid Email or Password');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid Email or Password');
        const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));   
        res.header('x-auth-token', token).status(200).send(lodash.pick(user, ['_id', 'firstName', 'lastName', 'email', 'profilePicture', 'friends', 'location', 'bio', 'occupation', 'viewedProfile', 'impressions', 'isAdmin']));     

    }
    catch (err) {
        res.status(500).json(err);
    }
}
function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required()
    })
    return schema.validate(req);
}