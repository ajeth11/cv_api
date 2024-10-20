import { Router } from "express";
import  UserModal  from "./modal";

const userRouter = Router();

userRouter.post("/create", UserModal.create);
userRouter.post("/update", UserModal.update);
userRouter.post("/list", UserModal.read);
userRouter.post("/delete", UserModal.delete);

export default userRouter;