import { Router } from "express";
import ClubController from "./club.controller";
import AuthMiddleware from "../../../common/middlewares/auth.middleware";

export const router = Router();
export const path = "/clubs";

router.get("/list", new ClubController().list);
router.get("/search", new ClubController().search);
router.get("/:clubId/detail", new ClubController().detail);
router.post("/create", AuthMiddleware, new ClubController().create);
router.patch("/:clubId/update", AuthMiddleware, new ClubController().update);
router.delete("/:clubId/delete", AuthMiddleware, new ClubController().delete);
