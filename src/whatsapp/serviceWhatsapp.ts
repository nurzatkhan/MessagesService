
import { PrismaClient } from '@prisma/client';
import { ParsedQs } from 'qs';
import { whatsappMessageStatusEnum } from './dto/dto';
const prisma = new PrismaClient()


export async function createDataWhatsapp(data: { numberPhone: string; sid: string; message: string, uuid :string, sourceService?: string}) {
        return await prisma.whatsapp_messages.create({data})
}
export async function updateDataWhatsapp(data: { sid: any; messageStatus: any; }) {
    try{
    return await prisma.whatsapp_messages.update({
        where: {sid: data.sid,},
        data: {statusMessage_twilio: data.messageStatus},
    })
    }catch(err){

    }
}

export async function getOneUni(where:{id?: number, sid?: string,uuid?: string}) {
    return await prisma.whatsapp_messages.findUnique({
        where
    })
}
export async function getAllService() {
    return await prisma.whatsapp_messages.findMany()
}