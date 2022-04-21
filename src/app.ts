const routerWhatsapp = require("./whatsapp/routerWhatsapp")
const bodyParser = require('body-parser');






require('dotenv').config()
import express from 'express';
const app = express();
app.use(express.json())
const port = process.env.PORT || 9000
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/whatsapp", routerWhatsapp)


app.listen(port, ()=> console.log('Server running', port));