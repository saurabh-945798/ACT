import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const demoUser = {
  name: "Demo User",
  email: "test@gmail.com",
  password: "test123",
};

async function seedDemoUser() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is required to seed the demo user");
    }

    await connectDB();

    const existingUser = await User.findOne({ email: demoUser.email });

    if (existingUser) {
      console.log(`Demo user already exists: ${demoUser.email}`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(demoUser.password, 10);

    await User.create({
      name: demoUser.name,
      email: demoUser.email,
      password: hashedPassword,
    });

    console.log("Demo user created successfully");
    console.log(`Email: ${demoUser.email}`);
    console.log(`Password: ${demoUser.password}`);
    process.exit(0);
  } catch (error) {
    console.error(`Failed to seed demo user: ${error.message}`);
    process.exit(1);
  }
}

seedDemoUser();
