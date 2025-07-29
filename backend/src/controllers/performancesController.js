import Performance from "../models/Performance.js";
import User from "../models/User.js";

// works
export async function getPerformances(req, res){
    try{
        const {sortStarredFirst} = req.query
        let performances
        if(sortStarredFirst === 'true'){
            performances = await Performance.find({userId: req.user.id}).sort({starred: -1, date: -1});
        }
        else{
            performances = await Performance.find({userId: req.user.id}).sort({date: -1});
        }
        res.status(200).json(performances);
    }catch(error){
        console.error("Error in getPerformances controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

// works
export async function getAllPerformances(_, res){
    try{
        const performances = await Performance.find().sort({date: -1});
        res.status(200).json(performances);
    }catch(error){
        console.error("Error in getPerformances controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

// works
export async function createPerformance(req, res){
    try{
        const {title, userId, type, date, duration, location, data} = req.body;
        if(!userId || !type || !date || !data){
            return res.status(400).json({message: `User: ${userId}. Type: ${type}. Date: ${date}. Data: ${data}`});
        }
        // check if userId from body matches token userId
        if(req.user.id !== userId) return res.status(400).json({message: "UserId does not match user from token"});
        const performance = new Performance({title, userId, type, date, duration, location, data});
        const savedPerformance = await performance.save();
        res.status(201).json(savedPerformance)
    }catch(error){
        console.error("Error in createPerformance controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

//works
export async function updatePerformance(req, res){
    try{
        const performance = await Performance.findById(req.params.id);
        if(!performance) return res.status(400).json({message: "Performance not found"});
        const user = await User.findById(req.user.id);
        if(!user) return res.status(401).json({message: "User not found" });
        // Make sure the logged in user matches the goal user
        if(performance.userId.toString() !== user.id){
            return res.status(401).json({message: "User not authorized"})
        }
        const updatedPerformance = await Performance.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedPerformance) return res.status(404).json({message: "Performance not found"})
        res.status(200).json({message: "Performance updated successfully"});
    }
    catch(error){
        console.error("Error in updatePerformance controller", error)
        res.status(500).json({message: "Internal server error"})
    }

}

// works
export async function deletePerformance(req, res){
    try{
        const performance = await Performance.findById(req.params.id);
        if(!performance) return res.status(404).json({message: "Performance not found"})
        const user = await User.findById(req.user.id);
        if(!user) return res.status(401).json({message: "User not found" });
        // Make sure the logged in user matches the goal user
        if(performance.userId.toString() !== user.id){
            return res.status(401).json({message: "User not authorized"})
        }
        const deletedPerformance = await Performance.deleteOne({_id: req.params.id});
        res.status(200).json({message: "Performance deleted successfully"})
    }
    catch(error){
        console.error("Error in deletePerformance controller", error);
        res.status(500).json({message: "Internal server error"})
    }

}
