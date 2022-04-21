
import { PrismaClient } from '@prisma/client';
import { ParsedQs } from 'qs';
import { whatsappMessageStatusEnum } from './dto/dto';
const prisma = new PrismaClient()


export async function createDataWhatsapp(data: { number: any; sid: any; message: any; }) {
    return await prisma.whatsapp__messengs.create({
        data: {
            number: data.number,
            sid: data.sid,
            message: data.message
        }
    })
}
export async function updateDataWhatsapp(data: { sid: any; messageStatus: any; }) {
    return await prisma.whatsapp__messengs.update({
        where: {
            sid: data.sid,
        },
        data: {
            message_status: data.messageStatus
        },
    })
}

export async function getOneIdService(id: string) {
    return await prisma.whatsapp__messengs.findUnique({
        where: {
            id: Number(id)
        }
    })
}
export async function getOneSidService(sid:any) {
    console.log(sid)
    return await prisma.whatsapp__messengs.findUnique({
        where: {
            sid:sid
        }
    })
}
export async function getAllService() {
    return await prisma.whatsapp__messengs.findMany()
}