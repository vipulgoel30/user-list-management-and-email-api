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

router.get("/", getList); // paginated route (optionally can specify limit and page)
router.get("/:id", verifyID, getListById);
router.post("/", createList);
router.patch("/adduser/:id", upload.single("user"), verifyID, addUser);
router.post("/sendmail/:id", verifyID, sendMail);

export default router;
