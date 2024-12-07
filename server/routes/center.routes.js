import { Router } from "express";
import {
    createCenter,
    getAllCenters,
} from "../controllers/center.controller.js";
const router=new Router();

router.get("/",getAllCenters);
router.post("/",createCenter);
export default router;