const Router = require('express')
const router = new Router()
const controllerWhatsapp = require("./controllerWhatsapp")

router.post("/send", controllerWhatsapp.sendMessage);
router.post("/messageStatus", controllerWhatsapp.MessageStatus);
router.get("/get/:id", controllerWhatsapp.getOneId);
router.get("/getsid", controllerWhatsapp.getOneSid);
router.get("/getall", controllerWhatsapp.getAll);



module.exports = router;
