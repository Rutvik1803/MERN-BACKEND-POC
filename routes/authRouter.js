const router = require("./router");
const {
  signupController,
  signInController,
} = require("../controller/authController");

router.post("/auth/signup", signupController);
router.post("/auth/signin", signInController);

module.exports = router;
