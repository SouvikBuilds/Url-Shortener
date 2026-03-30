import { connectDB } from "./db/index.js";
import app from "./app.js";
import { config } from "./config/config.js";

connectDB()
  .then(() => {
    app.listen(config.PORT || 4000, () => {
      console.log(
        `Server is running on http://localhost:${config.PORT || 4000}`,
      );
    });
  })
  .catch((error) => {
    console.log("MongoDb Connection failed", error);
  });
