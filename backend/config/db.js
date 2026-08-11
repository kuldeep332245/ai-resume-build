const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // ✅ Direct URI daal di (Render ke liye)
    const uri = "mongodb+srv://kuldeep0203singh_db_user:Kuldeep0022@cluster0.5t2mdgh.mongodb.net/resume_builder?retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;