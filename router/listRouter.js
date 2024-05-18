// Third party imports
import { Router } from "express";
import multer, { diskStorage } from "multer";

// User imports
import { addUser, createList, getList, getListById, sendMail, verifyID } from "../controllers/listController.js";
import AppError from "../utils/AppError.js";

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "files");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (file.mimetype === "text/csv") cb(null, true);
    else cb(new AppError("Supported file type is csv", 400), false);
  },
});

router.get("/", getList); // paginated route (specify limit and page) (Default limit 20 page 1)
router.get("/:id", verifyID, getListById); // paginated route (specify limit and page of no of users) (Default limit 100 and page 1)
router.post("/", createList);
router.patch("/adduser/:id", upload.single("user"), verifyID, addUser);
router.post("/sendmail/:id", verifyID, sendMail);

export default router;
