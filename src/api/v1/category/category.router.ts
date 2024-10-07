import { Router } from "express";
import CategoryController from "./category.controller";
import AuthMiddleware from "../../../common/middlewares/auth.middleware";

export const router = Router();
export const path = "/categories";

router.get("/list", new CategoryController().categoryList);
router.post("/create", AuthMiddleware, new CategoryController().createCategory);
router.patch(
    "/:categoryId/update",
    AuthMiddleware,
    new CategoryController().updateCategory
);
router.delete(
    "/:categoryId/delete",
    AuthMiddleware,
    new CategoryController().deleteCategory
);
