import {User} from "../models/user.js"
import lodash from "lodash"
export const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json("User not found");
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err){
        res.status(500).json(err);
    }
}
export const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json("User not found");
        const friends = await Promise.all(
            user.friends.map(id => {
                User.findById(id)
            })
        );
        const formattedFriends = friends.map(friend=>{
            return lodash.pick(friend, ['_id', 'firstName', 'lastName', 'profilePicture', 'location', 'occupation', 'bio'])
            });
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export const addRemoveFriend = async (req, res) => {
    try{
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (!user || !friend) return res.status(404).json("User not found");
        if (id === friendId) return res.status(400).json("You can't add yourself");
        if (!user.friends.includes(friendId)){
            await user.updateOne({$push: {friends: friendId}});
            await friend.updateOne({$push: {friends: id}});
            // res.status(200).json("User has been added to your friends");
        }
        else{
            await user.updateOne({$pull: {friends: friendId}});
            await friend.updateOne({$pull: {friends: id}});
            // res.status(200).json("User has been removed from your friends");
        }
        const friends = await Promise.all(
            user.friends.map(id => {
                User.findById(id)
            })
        );
        const formattedFriends = friends.map(friend=>{
            return lodash.pick(friend, ['_id', 'firstName', 'lastName', 'profilePicture', 'location', 'occupation', 'bio'])
        })
        res.status(200).json(formattedFriends)

    }catch(err){
        res.status(500).json(err);
    }
}