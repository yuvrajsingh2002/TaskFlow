import bcrypt from "bcryptjs";
import User from "../models/User.js";

const createAdmin = async () => {
  try {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const mobile = process.env.ADMIN_MOBILE?.trim();
    const password = process.env.ADMIN_PASSWORD;

    // Check required environment variables
    if (!name || !email || !mobile || !password) {
      throw new Error("Admin environment variables are missing");
    }

    // Check mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {
      throw new Error("Admin mobile must be a valid 10-digit number");
    }

    // Check password strength
    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(password)
    ) {
      throw new Error("Admin password does not meet security requirements");
    }

    // Check whether admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      return;
    }

    // Check duplicate email or mobile
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      throw new Error("Admin email or mobile already belongs to another user");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    await User.create({
      name: name.trim(),
      email,
      mobile,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
  } catch (error) {
    throw error;
  }
};

export default createAdmin;
