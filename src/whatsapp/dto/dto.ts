export enum whatsappMessageStatusEnum {
    queued,
    sending,
    sent,
    failed,
    delivered,
    undelivered,
    receiving,
    received,
    read,
}
export interface messagesDataType {
    numberPhone: string
    message: string
    sourceService?:string
    uuid: string
}