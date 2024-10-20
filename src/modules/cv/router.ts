import { Router } from "express";
import  CVModal  from "./modal";

const cvRouter = Router();

cvRouter.post("/create", CVModal.create);
cvRouter.post("/update", CVModal.update);
cvRouter.post("/list", CVModal.read);
cvRouter.post("/delete", CVModal.delete);

export default cvRouter;