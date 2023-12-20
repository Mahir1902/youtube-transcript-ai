import { db } from "./db";
import { chats } from "./db/schema";



export const getChat = async () => {
    const _chats = await db.select().from(chats)
    console.log(_chats)
    return _chats
}