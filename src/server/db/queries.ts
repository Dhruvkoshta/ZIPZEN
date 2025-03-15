import "server-only"

import { db } from "@/server/db"
import { files_table as fileSchema, folders_table as folderSchema } from "@/server/db/schema"
import { eq } from "drizzle-orm"


export async function getAllParentsForFolders(folderId:number) {
    const parent = []
    let currentFolder: number | null = folderId
    while(currentFolder!==null) {
        const folder = await db
        .select()
        .from(folderSchema)
        .where(eq(folderSchema.id,currentFolder));
        if(folder.length === 0) {
            throw new Error("Parent Folder not found")
        }
        parent.unshift(folder[0])
        currentFolder = folder[0].parent
       
    }
    return parent
}


export async function getFolders(folderId:number){
    return db
    .select()
    .from(folderSchema)
    .where(eq(folderSchema.parent,folderId))
}
export async function getFiles(folderId:number){
    return db
    .select()
    .from(fileSchema)
    .where(eq(fileSchema.parent,folderId))
}
    
