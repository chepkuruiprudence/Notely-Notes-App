"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const zod_1 = require("zod");
const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ errors: (0, zod_1.treeifyError)(result.error) });
    }
    req.body = result.data;
    next();
  };
};
exports.validateBody = validateBody;
