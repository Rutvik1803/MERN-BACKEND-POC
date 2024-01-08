const router = require("./router");
const authController = require("../controller/authController");

router.post("/signup", authController);

module.exports = router;
