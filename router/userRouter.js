// Third party imports
import { Router } from "express";

// User imports
import { unsubscribe } from "../controllers/userController.js";

const router = Router();

router.get("/unsubscribe", unsubscribe);

export default router;
