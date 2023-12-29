//import projectSchema
const projects = require('../Models/projectSchema')

//add project

exports.addProject = async(req,res)=>{
    console.log('inside addproject request');
    const userId = req.payload
    console.log(userId);

    const projectImage = req.file.filename
    //console.log(projectImage);

    const {title,language,github,website,overView} = req.body
    console.log(`${title},${language},${github},${website},${overView},${projectImage}`);

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('project already exist... Upload new project')
        }
        else{
            const newProject = new projects({
                title,
                projectImage,
                language,
                github,
                website,
                overView,
                userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(`request failed due to ${err}`)
    }


    //res.status(200).json('add project request recieved')
}

//getHomeProject
exports.getHomeProject = async(req,res)=>{
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)

    } catch(err){
        res.status(401).json(`Request Failed due to ${err}`)
    }
}

//getAllProject
exports.getAllProject = async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);

    const query={
        language:{
            //regular expression,options to remove case sensitive property
            $regex:searchKey,$options:"i"
        }
    }

    try{
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    } catch(err){
        res.status(401).json(`Request Failed due to ${err}`)
    }
}

//getUserProject
exports.getUserProject = async(req,res)=>{
    const userId = req.payload
    try{
        const allUserProject = await projects.find({userId})
        res.status(200).json(allUserProject)
    } catch(err){
        res.status(401).json(`Request Failed due to ${err}`)
    }
}

//editproject
exports.editUserProject = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title,projectImage,language,github,website,overView} = req.body

    const uploadProjectImage = req.file?req.file.filename:projectImage

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,projectImage:uploadProjectImage,language,github,website,overView,userId},{new:true})

        await updateProject.save()
        res.status(200).json(updateProject)

    } catch (err) {
        res.status(401).json(err)
    }
}

//deleteProject
exports.deleteUserProject = async(req,res)=>{
    const {id} = req.params

    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    } catch (err) {
        res.status(401).json(err)
    }
}