const router = require("./router");
const getUserController = require("../controller/getUserController");

router.get("/user/users", getUserController);

module.exports = router;
