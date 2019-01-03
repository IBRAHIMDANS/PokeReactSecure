import { Router } from "express";
import passport from "passport";
import auth from "./auth";
import secured from "./secured";

const api = Router();

api.get("/", (req, res) => {
  res.json({
    name: "sanji.Api",
    meta: {
      version: "1.0.0",
      status: "running"
    }
  });
});

api.use("/auth", auth);
api.use("/", passport.authenticate("jwt", { session: false }), secured);

export default api;
