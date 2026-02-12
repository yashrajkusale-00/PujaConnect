require("dotenv").config();
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const connectDB = require("../config/db");

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@pujaconnect.com";

    const existingAdmin = await User.findOne({
      email: adminEmail,
      role: "admin"
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin user created successfully");
    process.exit(0);

  } catch (error) {
    console.error("Admin seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
