import User, { type IUser } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

export interface UpdateUserData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  password?: string;
}

export const updateUserProfile = async (
  userId: string,
  updateData: UpdateUserData,
): Promise<IUser | null> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (updateData.firstName) user.firstName = updateData.firstName;
  if (updateData.lastName) user.lastName = updateData.lastName;
  if (updateData.middleName !== undefined)
    user.middleName = updateData.middleName;
  if (updateData.password) user.password = updateData.password;

  await user.save();

  return user;
};

// get all registered consumer users
export const getConsumerUsers = async (): Promise<IUser[]> => {
  return User.find({ userType: "Consumer" })
    .select("-password")
    .sort({ createdAt: -1 });
};

// get specific user
export const getUserById = (id: string): Promise<IUser | null> => {
  return User.findById(id).exec();
};

// delete user and related data
export const deleteUserById = async (id: string): Promise<boolean> => {
  const user = await User.findById(id);
  if (!user) {
    return false;
  }

  // delete cart
  await Cart.deleteOne({ userId: id });
  
  // delete orders
  await Order.deleteMany({ userId: id });
  
  // delete user
  await User.findByIdAndDelete(id);
  
  return true;
};
