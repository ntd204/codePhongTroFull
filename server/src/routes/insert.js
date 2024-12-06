import express from "express";
import * as insertService from "../controllers/insert";

const router = express.Router();
router.post("/", insertService.insert);

export default router;
