import { Router } from "express";

export const router = Router();
export const path = "";

router.get("/healthCheck", (req, res) => {
    res.status(200).json({ result: 200 });
});
