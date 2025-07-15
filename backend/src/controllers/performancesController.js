import Performance from "../models/Performance.js";

export async function getAllPerformances(_, res){
    try{
        const performances = await Performance.find().sort({date: -1});
        res.status(200).json(performances);
    }catch(error){
        console.error("Error in getAllPerformances controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getUserPerformances(req, res){
    try{
        const userId = req.params.userId
        const performances = await Performance.find({userId}).sort({date: -1});
        res.status(200).json(performances);
    }catch(error){
        console.error("Error in getUserPerformances controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getPerformanceById(req, res){
    try{
        const performance = await Performance.findById(req.params.id);
        if(!performance) return res.status(404).json({message: "Performance not found"})
        res.status(200).json(performance);
    }catch(error){
        console.error("Error in getPerformanceById controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function createPerformance(req, res){
    try{
        const {title, userId, type, date, duration, location, data} = req.body;
        console.log(title, userId, type, date, duration, location, data)
        const performance = new Performance({title, userId, type, date, duration, location, data});
        const savedPerformance = await performance.save();
        res.status(201).json(savedPerformance)
    }catch(error){
        console.error("Error in createPerformance controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function updatePerformance(req, res){
    try{
        const {title, userId, type, date, duration, location, data} = req.body;
        const updatedPerformance = await Performance.findByIdAndUpdate(req.params.id, {title, userId, type, date, duration, location, data}, {new: true});
        if(!updatedPerformance) return res.status(404).json({message: "Performance not found"})
        res.status(200).json({message: "Performance updated successfully"});
    }
    catch(error){
        console.error("Error in updatePerformance controller", error)
        res.status(500).json({message: "Internal server error"})
    }

}

export async function deletePerformance(req, res){
    try{
        const deletedPerformance = await Performance.findByIdAndDelete(req.params.id);
        if(!deletedPerformance) return res.status(404).json({message: "Performance not found"})
        res.status(200).json({message: "Performance deleted successfully"})
    }
    catch(error){
        console.error("Error in deletePerformance controller", error);
        res.status(500).json({message: "Internal server error"})
    }

}
