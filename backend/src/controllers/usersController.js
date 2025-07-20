import bcrypt from "bcryptjs";
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export async function getAllUsers(_, res){
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        console.error("Error in getAllUsers controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getMe(req, res){
    try{
        const user= await User.findById(req.user.id);
        if(!user) return res.status(404).json({message: "User not found"})
        res.status(200).json(user);
    }catch(error){
        console.error("Error in getUserById controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function createUser(req, res){
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: "Please input all fields"});
        }
        // find if email is already used
        const existingEmail = await User.findOne({email})
        if(existingEmail) return res.status(400).json({message: "Email is already taken"})

        // find if username is already taken
        const existingUsername = await User.findOne({username});
        if(existingUsername) return res.status(400).json({message: "Username is already taken"})

        const user = new User({username, email, password});
        const savedUser = await user.save();
        res.status(201).json({savedUser, token: generateToken(user._id)})
    }catch(error){
        console.error("Error in createUser controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function loginUser(req, res){
    try{
        const {email, password} = req.body;
        // Check for user using email
        const user = await User.findOne({email})

        // if the user is found, and there password matches the hashed password
        if(user && (await bcrypt.compare(password, user.password))){
            res.status(201).json({user, token: generateToken(user._id)})
        }
        else{
            return res.status(400).json({message: "Invalid credentials"})
        }
    }catch(error){
        console.error("Error in loginUser controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
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
