require('dotenv').config()
import express, { Request, Response, NextFunction } from 'express';
import { createDataWhatsapp, getAllService, getOneIdService, getOneSidService, updateDataWhatsapp } from './serviceWhatsapp';
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

import { PrismaClient } from '@prisma/client';
import { whatsappMessageStatusEnum } from './dto/dto';
const prisma = new PrismaClient()

export async function sendMessage(req: Request, res: Response) {
    try {
        client.messages
            .create({
                from: `whatsapp:${process.env.TWILIO_NUMBER}`,
                body: `${req.body.message}`,
                statusCallback: `${process.env.HOST}/whatsapp/messageStatus`,
                to: `whatsapp:${req.body.number}`
            })
            .then(
                async (message: any) => {

                    const result = await createDataWhatsapp({ number: req.body.number, sid: message.sid, message: req.body.message })
                    res.json(result);
                }

            );

    } catch (e) { console.log(e) }
}

export async function MessageStatus(req: Request, res: Response) {
    try {
        const messageSid = req.body.MessageSid;
        const messageStatus: whatsappMessageStatusEnum = req.body.MessageStatus;
        await updateDataWhatsapp({ sid: messageSid, messageStatus })

        res.sendStatus(200);
    } catch (e) { console.log(e) }
}


export async function getOneId(req: Request, res: Response) {
    try {
        const { id } = req.params;
        console.log(id);
        const result = await getOneIdService(id)
        res.json(result);
    } catch (e) { console.log(e) }
}
export async function getOneSid(req: Request, res: Response) {
    try {
        const sid = req.query.sid;
        const result = await getOneSidService(sid)
        res.json(result);
    } catch (e) { console.log(e) }
}
export async function getAll(req: Request, res: Response) {
    try {
        const result = await getAllService()
        res.json(result);
    } catch (e) { console.log(e) }
}

// id  number  message sid: uniq  messageStatus:enum 