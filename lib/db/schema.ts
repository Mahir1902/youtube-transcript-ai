import {integer, pgEnum, pgTable, serial, text, timestamp} from 'drizzle-orm/pg-core'


export const roleEnum = pgEnum('role_enum', ['assistant', 'user'])

export const chats = pgTable('all_chats', {
    id: serial('id').primaryKey(),
    // videoName: text("video-name").notNull(),
    videoUrl: text('video-url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    // userid?
    // file key for s3?
})

export type DrizzleChat = typeof chats.$inferSelect

export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    chatId: integer('chat_id').references(() => chats.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    role: roleEnum('role').notNull()
})


