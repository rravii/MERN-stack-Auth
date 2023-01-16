import { Router } from "express";
const router = Router();

// import all controllers
import * as controller from '../controllers/appController.js'
import Auth, { localVariables } from '../middleware/auth.js';
import { registerMail } from '../controllers/mailer.js'

// POST Methods
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app

router.route('/addTodo').post(Auth, controller.addTodo);

// GET Methods
router.route('/user/:username').get(controller.getUser) // get user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables

router.route('/readTodo').get(Auth, controller.readTodo);

// PUT Methods
router.route('/updateuser').put(Auth, controller.updateUser); // to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // to reset password

// DELETE Methods
router.route('/delete/:id').delete(controller.deleteTodo);

export default router;