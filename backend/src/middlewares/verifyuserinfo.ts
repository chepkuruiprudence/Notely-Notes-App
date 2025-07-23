import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { treeifyError } from "zod";

export const validateBody = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: treeifyError(result.error) });
    }
    req.body = result.data; 
    next();
  };
};
