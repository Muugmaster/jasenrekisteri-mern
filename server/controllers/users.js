import User from "../models/User.js";

// Get all users from database
export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get one user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Create new user
export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const user = req.body;

  try {
    const updateUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          postalCode: user.postalCode,
          phone: user.phone,
          email: user.email,
          membershipStart: user.membershipStart,
        },
      }
    );
    res.json(updateUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.params.userId });
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};
