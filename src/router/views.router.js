import { Router } from "express";
import fs from "fs";
const router = Router();


router.get("/", (req,res)=> {
    res.render("index",{})
})

export default router