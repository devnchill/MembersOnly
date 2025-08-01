import { Router } from "express";
import MemberShip from "../controller/membershipController";
import ensureLoggedIn from "../middleware/ensureLoggedIn";

const membershipRouter = Router();

membershipRouter.get("/", ensureLoggedIn, MemberShip.elevateGet);

membershipRouter.post("/", ensureLoggedIn, MemberShip.elevatePost);

export default membershipRouter;
