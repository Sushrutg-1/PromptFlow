import app from "./app.js";
import connectToDB from "./db/db.config.js";
import env from "./config/env.js";

connectToDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERROR : ", error);
    });

    app.listen(env.PORT, () => {
      console.log(`Server is listening on port :${env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION ERROR : ", error);
  });
