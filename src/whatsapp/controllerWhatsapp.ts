require('dotenv').config()
import express, { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import { messagesDataType, whatsappMessageStatusEnum } from './dto/dto';
import { createDataWhatsapp, getAllService, getOneUni, updateDataWhatsapp } from './serviceWhatsapp';


const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


export async function sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
        const data: messagesDataType = req.body;
        const result = await twilioSendAndCreateData(data)
        res.json(result);
    } catch (e) {
        next(e);
    }

}

export async function MessageStatus(req: Request, res: Response) {
    try {
        const messageSid = req.body.MessageSid;
        const messageStatus: whatsappMessageStatusEnum = req.body.MessageStatus;
        await updateDataWhatsapp({ sid: messageSid, messageStatus })
        res.sendStatus(200);
    } catch (e) { console.log(e) }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await getAllService()
        res.json(result);
    } catch (e) { next(e) }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
    try {
        const data: { id?: number, sid?: string, uuid?: string } = req.body;
        if (!data.id && !data.sid && !data.uuid) throw createHttpError(400, "BAD REQUEST")

        const result = await getOneUni(data);
        res.json(result);
    } catch (e) { next(e) }
}

export async function sendManyMessages(req: Request, res: Response, next: NextFunction) {
    try {
        const data: messagesDataType[] = req.body;
        const result = await Promise.all(data.map(twilioSendAndCreateData))
        res.json(result);

    } catch (e) {
        next(e);
    }
}

async function twilioSendAndCreateData(oneData: messagesDataType) {
    // try {
    const twillioData = await client.messages
        .create({
            from: `whatsapp:${process.env.TWILIO_NUMBER}`,
            body: `${oneData.message}`,
            statusCallback: `${process.env.HOST}/whatsapp/messageStatus`,
            to: `whatsapp:${oneData.numberPhone}`
        })
    const dataResult = await createDataWhatsapp({
        numberPhone: oneData.numberPhone,
        sid: twillioData.sid,
        message: oneData.message,
        uuid: oneData.uuid,
        sourceService: oneData.sourceService
    });
    return dataResult;
    // } catch (e) {
    // throw createHttpError(400, "BAD REQUEST")
    // }
}