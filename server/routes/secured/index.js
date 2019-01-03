import { Router } from "express";
import users from "./users";

const api = Router();

api.use("/users", users);

export default api;
