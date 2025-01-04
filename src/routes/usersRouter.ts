import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";

const router = Router()

router.use(limiter)

router.get('/users', AuthController.getAllUsers)
router.post('/create-account', 
    body('name')
    .notEmpty().withMessage('Name can not be empty'),
    body('password')
    .isLength({min: 8}).withMessage('Password min length has to be 8 characters'),
    body('email')
    .isEmail().withMessage('Email not valid'),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account', 
    body('token')
    .notEmpty().isLength({min: 6, max: 6}).withMessage('Token not valid'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post("/login",
    body('email')
    .isEmail().withMessage("Email not valid"),
    body('password')
    .notEmpty().withMessage("password is mandatory"),
    handleInputErrors,
    AuthController.login
)

router.post('/forgot-password',
    body('email')
    .isEmail().withMessage("Email not valid"),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
    body('token')
    .notEmpty().isLength({min: 6, max: 6}).withMessage('Token not valid'),
    handleInputErrors,
    AuthController.validatetoken
)

router.post("/reset-password/:token", 
    param('token')
    .notEmpty().isLength({min: 6, max: 6}).withMessage('Token not valid'),
    body('password')
    .isLength({min: 8}).withMessage('Password min length has to be 8 characters'),
    handleInputErrors,
    AuthController.resetPasswordWithToken
)

router.get("/user",
    authenticate,
    AuthController.getUserAuthenticated
)

router.post("/update-password",
    authenticate,
    body('current_password')
    .notEmpty().withMessage("Current password can not be empty"),
    body('password')
    .notEmpty().isLength({min:8}).withMessage("New password is mandatory"),
    handleInputErrors,
    AuthController.updateCurrentUserPassword
)

router.post("/check-password",
    authenticate,
    body('password')
    .notEmpty().withMessage("Current password can not be empty"),
    handleInputErrors,
    AuthController.checkPassword
)

export default router