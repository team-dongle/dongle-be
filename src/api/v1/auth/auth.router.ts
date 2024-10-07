import { Router } from "express";
import AuthController from "./auth.controller";

export const router = Router();
export const path = "/auth";

router.post("/login", new AuthController().login);
router.post("/logout", new AuthController().logout);
