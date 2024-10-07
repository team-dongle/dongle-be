import { Router } from "express";
import NoticeController from "./notice.controller";

export const router = Router();
export const path = "/notices";

router.get("/list", new NoticeController().listNotices);
