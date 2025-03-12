import { integer, pgTable, varchar,index } from "drizzle-orm/pg-core";



export const files = pgTable("files", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  size: integer().notNull(),
  parent: integer().notNull(),
  url: varchar({ length: 255 }).notNull()
},
(t) => {
  return [index("parent_file_index").on(t.parent)]
}
)
export const folders = pgTable("folders", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  parent: integer()
},
  (t) => {
    return [index("parent_folder_index").on(t.parent)]
  }
)