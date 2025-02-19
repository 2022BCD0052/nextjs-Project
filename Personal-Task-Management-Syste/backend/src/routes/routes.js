import express from "express";
import { createUser, getUsers, updateUser, deleteUser } from "./controllers/userController.js";
import { createProject, getProjects, updateProject, deleteProject } from "./controllers/projectController.js";
import { createTask, getTasks, updateTask, deleteTask } from "./controllers/taskController.js";

const router = express.Router();

// User Routes
router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Project Routes
router.get("/projects", getProjects);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

// Task Routes
router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
