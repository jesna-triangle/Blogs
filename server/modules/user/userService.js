const User = require('./userModel')

exports.registerUser = async (userData) => {
    try {
        const newUser = new User(userData);
        return await newUser.save();
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("User registration failed");
    }
};
exports.getAllUsers = async () => {
    try {
        const users = await User.find({ role: { $nin: ['admin'] } })
        return users
    } catch (error) {
        throw new Error('Unable to fetch users');
    }
};

exports.getUserById = async (userId) => {
    return await User.findById(userId,("firstName lastName email"));
};

exports.updateUserProfile = async (userId, userData) => {
  // console.log(userId);
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { ...userData } },
        { new: true, runValidators: true }
      );
      // console.log(updatedUser);
      if (!updatedUser) {
        throw new Error('User not found');
      }
  
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  exports.findLoginUser = async (email) => {
    return await User.findOne({ email });
  };

exports.followUser = async (currentUserId, targetUserId) => {
  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);
  // console.log(targetUser);

  if (!currentUser || !targetUser) {
    throw new Error('User not found');
  }
  if (!Array.isArray(currentUser.following)) {
    currentUser.following = [];
  }

  if (!Array.isArray(targetUser.followers)) {
    targetUser.followers = [];
  }
  currentUser.following.push(targetUserId);
 
  targetUser.followers.push(currentUserId);

  await currentUser.save();
  await targetUser.save();

  return { message: 'User followed successfully' };
};

exports.unfollowUser = async (currentUserId, targetUserId) => {
  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new Error('User not found');
  }

  if (!Array.isArray(currentUser.following)) {
    currentUser.following = [];
  }

  if (!Array.isArray(targetUser.followers)) {
    targetUser.followers = [];
  }
  currentUser.following = currentUser.following.filter(
    user => user.toString() !== targetUserId.toString()
  );

  targetUser.followers = targetUser.followers.filter(
    user => user.toString() !== currentUserId.toString()
  );

  await currentUser.save();
  await targetUser.save();

  return { message: 'User unfollowed successfully' };
};