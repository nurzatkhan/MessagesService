const routerWhatsapp = require("./whatsapp/routerWhatsapp")
const bodyParser = require('body-parser');
import createHttpError from 'http-errors';
require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express';

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 9000


app.use("/whatsapp", routerWhatsapp)



app.use((req, res, next) => {
  next(createHttpError(404, 'Not found'));
});
app.use((err: { status: number; message: string;}, req:Request, res:Response, next:NextFunction) => {
    res.status(err.status || 500).json({message: err.message})
  });

app.listen(port, ()=> console.log('Server running', port));