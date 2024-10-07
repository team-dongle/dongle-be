import { Router } from "express";
import * as auth from "./auth/auth.router";
import * as user from "./user/user.router";
import * as club from "./club/club.router";
import * as category from "./category/category.router";
import * as notice from "./notice/notice.router";

export const router = Router();
export const path = "/v1";

router.use(auth.path, auth.router);
router.use(user.path, user.router);
router.use(club.path, club.router);
router.use(category.path, category.router);
router.use(notice.path, notice.router);
