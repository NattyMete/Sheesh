import {Post, validatePost} from "../models/post.js";
import { User } from "../models/user.js";

export const createPost = async (req, res) => {
    // const newPost = new Post(req.body);
    const {error} = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json("User not found");
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.profilePicture,
            likes: {},
            comments: []
        });
        await newPost.save();
        const post = await Post.find()
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
}

export const getFeedPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        if (!posts) return res.status(404).json("No posts found");
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const posts = await Post.find({userId: req.params.id});
        if (!posts) return res.status(404).json("No posts found");
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
}


export const likePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json("Post not found");
        const isLiked = post.likes.get(userId);
        if (isLiked){
            post.likes.delete(userId);
        } else{
            post.likes.set(userId, true);
        }
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    }
    catch(err){
        res.status(500).json(err);
    }
}