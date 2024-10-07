import { Router } from "express";
import NoticeController from "./notice.controller";
import AuthMiddleware from "../../../common/middlewares/auth.middleware";

export const router = Router();
export const path = "/notices";

router.get("/list", new NoticeController().listNotices);
router.get("/:noticeId/detail", new NoticeController().noticeDetail);
router.post("/create", AuthMiddleware, new NoticeController().createNotice);
router.delete(
    "/:noticeId/delete",
    AuthMiddleware,
    new NoticeController().deleteNotice
);
