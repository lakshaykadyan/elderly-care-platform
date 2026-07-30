const express = require("express");
const { sendMessage, getMessages, markAsRead } = require("../controllers/contactController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", sendMessage); 
router.get("/", auth, getMessages); // Admin only
router.put("/:id/read", auth, markAsRead); // Admin only

module.exports = router;