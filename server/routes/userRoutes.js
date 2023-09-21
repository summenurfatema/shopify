import { Router } from "express";
import { UserController } from "../controllers/index.js";
const route = Router();

route.get("/user", UserController.index);
route.post("/user", UserController.store);
/**
 * TODO
 *=========
 * PUT
 * DELETE
 */

export default route;
