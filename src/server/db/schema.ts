import "server-only"
import { integer, pgTable, text, timestamp, boolean, varchar, index, serial } from "drizzle-orm/pg-core";

export const files_table = pgTable("files", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  size: integer().notNull(),
  parent: integer().notNull(),
  url: varchar({ length: 255 }).notNull()
},
(t) => {
  return [index("parent_file_index").on(t.parent)]
}
)
export const folders_table = pgTable("folders", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  parent: integer()
},
  (t) => {
    return [index("parent_folder_index").on(t.parent)]
  }
)


export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text('name').notNull(),
email: text('email').notNull().unique(),
emailVerified: boolean('email_verified').notNull(),
image: text('image'),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull()
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
token: text('token').notNull().unique(),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull(),
ipAddress: text('ip_address'),
userAgent: text('user_agent'),
userId: text('user_id').notNull().references(()=> users.id, { onDelete: 'cascade' })
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text('account_id').notNull(),
providerId: text('provider_id').notNull(),
userId: text('user_id').notNull().references(()=> users.id, { onDelete: 'cascade' }),
accessToken: text('access_token'),
refreshToken: text('refresh_token'),
idToken: text('id_token'),
accessTokenExpiresAt: timestamp('access_token_expires_at'),
refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
scope: text('scope'),
password: text('password'),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull()
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text('identifier').notNull(),
value: text('value').notNull(),
expiresAt: timestamp('expires_at').notNull(),
createdAt: timestamp('created_at'),
updatedAt: timestamp('updated_at')
});
export type DB_FileType = typeof files_table.$inferSelect
export type DB_FolderType = typeof folders_table.$inferSelect