import { Router } from "express";
import MemberShip from "../controller/membershipController";

const membershipRouter = Router();

membershipRouter.get("/", MemberShip.updateGet);

export default membershipRouter;
