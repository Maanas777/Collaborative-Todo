import User from '../models/user.model.js'; 

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
  
    const user = await User.findById(userId).select('-password'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getUserById };
