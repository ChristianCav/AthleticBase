import User from "../models/User.js"

export async function getAllUsers(_, res){
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        console.error("Error in getAllUsers controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getUserById(req, res){
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: "User not found"})
        res.status(200).json(user);
    }catch(error){
        console.error("Error in getUserById controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function createUser(req, res){
    try{
        const {username, email, passwordHash} = req.body;
        const user = new User({username, email, passwordHash});
        const savedUser = await user.save();
        res.status(201).json({savedUser})
    }catch(error){
        console.error("Error in createUser controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function updateUser(req, res){
    try{
        const {title, userId, type, date, duration, location, data} = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {title, userId, type, date, duration, location, data}, {new: true});
        if(!updatedUser) return res.status(404).json({message: "User not found"})
        res.status(200).json({message: "User updated successfully"});
    }
    catch(error){
        console.error("Error in updateUser controller", error)
        res.status(500).json({message: "Internal server error"})
    }

}

export async function deleteUser(req, res){
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({message: "User not found"})
        res.status(200).json({message: "User deleted successfully"})
    }
    catch(error){
        console.error("Error in deleteUser controller", error);
        res.status(500).json({message: "Internal server error"})
    }

}
