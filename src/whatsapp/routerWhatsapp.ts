const Router = require('express')
const router = new Router()
const controllerWhatsapp = require("./controllerWhatsapp")


// app.use("/whatsapp", routerWhatsapp)

router.post("/send", controllerWhatsapp.sendMessage);
router.post("/messageStatus", controllerWhatsapp.MessageStatus);

router.get("/getsid", controllerWhatsapp.getOne);
router.get("/getall", controllerWhatsapp.getAll);

router.post("/manysend", controllerWhatsapp.sendManyMessages)



module.exports = router;
