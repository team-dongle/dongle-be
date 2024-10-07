import { Router } from "express";
import UserController from "./user.controller";
import AuthMiddleware from "../../../common/middlewares/auth.middleware";

export const router = Router();
export const path = "/users";

router.get("/profile", AuthMiddleware, new UserController().getProfile);
router.post("/create", AuthMiddleware, new UserController().createUser);
