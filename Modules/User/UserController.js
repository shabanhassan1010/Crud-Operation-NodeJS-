const User = require("../../DBContext/Models/UserModel.js")


const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server Error: " + error.message });
  }
};

const GetUserById = async (req , res) =>{
  const {id} = req.params;
  const findUser = await User.findById(id);
  if(findUser){
    res.status(200).json({Message:"This user Is Exist",  findUser})
  }
    res.status(404).json({Message:"This user Is not Exist"})
  
}

const GetUser = async (req , res) =>{
    try{
    if (!req.user) {    // dh el user which is exist in middleware -> req.user = user;
      return res.status(404).json({ Message: "User not found" });
    }
    
    res.status(200).json({
      Message: "User found",
      user: { id: req.user._id, username: req.user.username, email: req.user.email }
    });
    
    } catch (error) {
      console.error("GetUser error:", error);
      res.status(500).json({ Message: "Server error" });
    }
}

const AddUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({success: false, error: "All fields (username, email, password) are required", });
    }

    // Check for existing user - using User consistently
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, error: "User with this email already exists" });
    }

    const newUser = new User({ username, email, password }); // Create new user
    const savedUser = await newUser.save(); // save new user

    // Return success response (excluding password)
    return res.status(201).json({
      success: "Added New User Successfully",
      data: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { username },
      { new: true }
    );
    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID parameter is required", success: false });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found", success: false });
    }

    return res.status(200).json({ success: true, data: deletedUser });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { GetAllUsers, AddUser, UpdateUser, DeleteUser  , GetUserById , GetUser};
