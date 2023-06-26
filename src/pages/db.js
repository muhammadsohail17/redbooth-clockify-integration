import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/timesheet', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//   }
// };
const connectDB = async () => mongoose.connect('mongodb://127.0.0.1:27017/timesheet');

export default connectDB;
