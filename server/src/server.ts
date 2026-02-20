import dotenv from "dotenv";
import app from "./app";
import dbConnect from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
