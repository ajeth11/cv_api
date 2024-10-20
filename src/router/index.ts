import Router from "express";
import userRouter from "../modules/user/router";
import cvRouter from "../modules/cv/router";

const router = Router();

router.use("/users", userRouter);
router.use("/cv", cvRouter);

export default router;