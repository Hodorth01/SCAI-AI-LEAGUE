const express = require("express")
const router = express.Router()
const requireAuth = require("../middleware/requireAuth")
const { getStatus } = require("../controllers/statusController")

router.use(requireAuth)
router.get("/",getStatus)

module.exports = router;