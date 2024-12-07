import { Router } from "express";
import {
    createCourt,
    getAllCourts,
} from "../controllers/court.controller.js";
const router=new Router();

router.get("/",getAllCourts);
router.post("/",createCourt);
export default router;