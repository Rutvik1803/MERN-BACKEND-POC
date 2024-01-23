const router = require("./router");
const {
  signupController,
  signInController,
  googleController,
} = require("../controller/authController");

router.post("/auth/signup", signupController);
router.post("/auth/signin", signInController);
router.post("/auth/google", googleController);

module.exports = router;
