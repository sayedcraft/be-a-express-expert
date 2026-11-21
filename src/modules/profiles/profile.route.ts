import { Router } from "express";
import { profileControlle } from "./profile.controller";

const router = Router();

router.post("/",profileControlle.createProfile)

export const profileRoute = router;
