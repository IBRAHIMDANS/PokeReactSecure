import { Router } from "express";
import User from "../../models/user";

const api = Router();

api.get("/", async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({ data: { users } });
});

export default api;
