import express from "express";
import bodyParser from "body-parser";
import api from "./routes";
import { db as database } from "./models";
import passport from "passport";
import cors from "cors";

import "./middlewares/passport";

const start = async () => {
  try {
    const host = process.env.HOST;
    const port = parseInt(process.argv[2] || process.env.PORT);
    const app = express();

    await database.authenticate();

    if (process.env.NODE_ENV) {
      await database.sync({ force: false });
    }

    app.use(cors());
    app.use(passport.initialize());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get("/", (request, response) => {
      response.send("Please feel free to use our api with /api");
    });

    app.use("/api", api);

    app.listen(port, () => {
      console.log(`Server is running in ${host} at ${port}`);
    });
  } catch (ex) {
    console.log(ex.message);
  }
};

// Let's Rock! :)
start();
