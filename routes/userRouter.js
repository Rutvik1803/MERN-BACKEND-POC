const {
  getUser,
  updateUserController,
} = require("../controller/getUserController");
const verifyToken = require("../utils/verifyUser");
const router = require("./router");

router.get("/user/users", getUser);
router.post("/user/update/:id", verifyToken, updateUserController);

module.exports = router;
