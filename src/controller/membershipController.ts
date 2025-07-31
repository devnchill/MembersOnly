import { Request, Response, NextFunction } from "express";

export default class MemberShip {
  static async elevateGet(req: Request, res: Response, next: NextFunction) {
    console.log("add MemberShip ");
    const { secreateCode } = req.body;
    if (secreateCode === "hushhush") {
      const { id } = req.params;
    }
  }
}
