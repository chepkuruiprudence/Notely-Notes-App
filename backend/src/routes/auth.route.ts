import {Router} from "express"

import verifyPasswordStrength from "../middlewares/verifypasswordstrength"
import {validateBody} from "../middlewares/verifyuserinfo"
import { verifyuserinfo } from "../schemas/user.schema";
import { logInUser, registerUser, logOutUser } from "../controllers/auth.controller";
import checkUniquenessOfUsernameEmail from "../middlewares/checkUsernameEmailUniqueness";

const router: Router = Router();

router.post("/register", validateBody(verifyuserinfo), checkUniquenessOfUsernameEmail, verifyPasswordStrength, registerUser)

router.post("/login", logInUser)

router.post("/logout", logOutUser)

export default router