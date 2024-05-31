const express =  require("express");
const router = express.Router();
const {allContacts , getContact , postContact , putContact, deleteContact} = require("./controllers/contactControllers");
const validationToken = require("./middlewares/validateTokenHandler");

router.use(validationToken);

router.route("/").get(allContacts);

router.route("/").post(postContact);

router.route("/:id").put(putContact);

router.route("/:id").delete(deleteContact);

router.route("/:id").get(getContact);

module.exports = router;