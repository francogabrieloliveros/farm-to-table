import { type Response } from "express";
import {
  getConsumerUsers,
  updateUserProfile,
  getUserById,
  deleteUserById,
} from "../services/user.service.js";
import { type AuthRequest } from "../middlewares/auth.middleware.js";

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { firstName, lastName, middleName, password } = req.body;

    const updatedUser = await updateUserProfile(userId, {
      firstName,
      lastName,
      middleName,
      password,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const responseData = {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      middleName: updatedUser.middleName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      userType: updatedUser.userType,
    };

    return res.status(200).json(responseData);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Error updating user profile",
    });
  }
};

export const getRegisteredConsumers = async (
  _req: AuthRequest,
  res: Response,
) => {
  try {
    const users = await getConsumerUsers();

    return res.status(200).json({
      success: true,
      total: users.length,
      data: users,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error retrieving registered users",
    });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;
    const user = await getUserById(String(id));

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error retrieving registered users",
    });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;
    
    // Check if user is trying to delete themselves or a user
    const deleted = await deleteUserById(String(id));
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User and related data deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error deleting user",
    });
  }
};
