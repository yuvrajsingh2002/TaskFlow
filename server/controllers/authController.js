
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Password validation
const isStrongPassword = (password) => {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(
    password
  );
};

// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check required fields
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMobile = String(mobile).trim();

    // Validate mobile number
    if (!/^[0-9]{10}$/.test(normalizedMobile)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number",
      });
    }

    // Validate password
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 digit and minimum 6 characters",
      });
    }

    // Check duplicate email or mobile
    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { mobile: normalizedMobile },
      ],
    });

    if (existingUser) {
      if (existingUser.email === normalizedEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already registered",
        });
      }

      if (existingUser.mobile === normalizedMobile) {
        return res.status(409).json({
          success: false,
          message: "Mobile number already registered",
        });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      mobile: normalizedMobile,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });

  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0];

      return res.status(409).json({
        success: false,
        message:
          duplicateField === "email"
            ? "Email already registered"
            : duplicateField === "mobile"
              ? "Mobile number already registered"
              : "This information is already registered",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // Check user
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        tokenVersion: user.tokenVersion,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change Password

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "New password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 digit and minimum 6 characters",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);

    // Invalidate old tokens
    user.tokenVersion += 1;

    await user.save();

    // Generate new JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        tokenVersion: user.tokenVersion,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};