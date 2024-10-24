const userService = require('./userService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword, //use hashed psd
            role: role,
        };
        const user = await userService.registerUser(userData);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        // if (req.user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Access denied' });
        // }
        const users = await userService.getAllUsers();
        return res.status(200).json({ message: 'Users list', users });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.updateProfile = async (req, res) => {
    const {userId} = req.user;
    const userData = req.body;
    // console.log(userData);
    try {
        const updatedUser = await userService.updateUserProfile(userId, userData);
        //   console.log(updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    try {
        const user = await userService.findLoginUser(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_CRYPTO,
            { expiresIn: "24h" }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.JWT_CRYPTO === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            success: true,
            token: token,
            message: "Login successfull",
        });
    } catch (error) {
        console.error("Error authenticating user:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.json(error);
    }
};
exports.followUser = async (req, res) => {
    try {
      const currentUserId = req.body.userId; 
      const targetUserId = req.params.id;
  
      const result = await userService.followUser(currentUserId, targetUserId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
exports.unfollowUser = async (req, res) => {
    try {
      const currentUserId = req.body.userId;
      const targetUserId = req.params.id;
  
      const result = await userService.unfollowUser(currentUserId, targetUserId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
