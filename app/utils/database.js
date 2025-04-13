import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rajibmandal8010:qyu4qeCAnpXffhRc@cluster0.mqlircf.mongodb.net/",
      {
        dbName: "NextJS_Auth_App",
      }
    );
    console.log("MongoDB Connected Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;