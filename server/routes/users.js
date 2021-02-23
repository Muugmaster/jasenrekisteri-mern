import express from "express";

import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

// Get all users
router.get("/", getUsers);

// Get one user
router.get("/:userId", getUser);

// Create new user
router.post("/", createUser);

// Update user
router.put("/:userId", updateUser);

// Delete user
router.delete("/:userId", deleteUser);

export default router;
