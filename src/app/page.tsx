"use server"
import { db } from "@/server/db"
import { files as fileSchema, folders as folderSchema } from "@/server/db/schema"
import DriveUI from "./drive-contents"
import { FileType, FolderType } from "@/types/schema"

export default async function DriveClone() {
  const files = await db.select().from(fileSchema) as FileType[]
  const folders = await db.select().from(folderSchema) as FolderType[]

  return (
    <DriveUI files={files} folders={folders} />
  )
}
