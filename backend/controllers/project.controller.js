import * as projectService from '../services/project.service.js';
import projectModel from '../models/project.model.js';
import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';

export const createProjectController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const userId = loggedInUser._id;

        const newProject = await projectService.createProject({ name, userId });

        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(400).send(error.message);
    }

}

export const getAllProject = async (req, res) => {  
    try {
        const loggedInUser = await userModel.findOne({email: req.user.email});

        const allUserProjects = await projectService.getAllProjectsByUserId({userId: loggedInUser._id});

        return res.status(200).json({
            projects: allUserProjects,
        }
        )
        
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(400).json({error:error.message});
        
    }
}

export const addUserToProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { projectId, users } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        
        const project = await projectService.addUsersToProject({ projectId, users, userId: loggedInUser._id });

        return res.status(200).json({
            project: project,
        });
        
    } catch (error) {
        console.error('Error adding user to project:', error);
        res.status(400).json({error:error.message});
        
    }
}

export const getProjectById = async (req, res) => {

    const { projectId } = req.params;
    try {
        const project = await projectService.getProjectById({ projectId });

        return res.status(200).json({
            project: project,
        });
    } catch (error) {
            console.log(error)
            res.status(400).json({error:error.message})
    }

}


export const updateFileTree = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { projectId, fileTree } = req.body;

        const project = await projectService.updateFileTree({
            projectId,
            fileTree
        })

        return res.status(200).json({
            project
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }

}

    