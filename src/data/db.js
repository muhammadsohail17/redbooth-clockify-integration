import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGO_DB CONNECTED");
  } catch (error) {
    console.error("MONGO_DB CONNECTION ERROR:", error);
  }
};

export default connectDB;
