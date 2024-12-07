import { Router } from "express";
import {
    createSport,
    getAllSports,
} from "../controllers/sport.controller.js";
const router=new Router();

router.get("/",getAllSports);
router.post("/",createSport);
export default router;