const router = require("./router");
const getUserController = require("../controller/getUserController");

router.get("/users", getUserController);

module.exports = router;
