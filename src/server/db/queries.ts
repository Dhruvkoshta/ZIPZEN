import "server-only"

import { db } from "@/server/db"
import {  files_table as fileSchema, folders_table as folderSchema } from "@/server/db/schema"
import { eq } from "drizzle-orm"


export const QUERIES = {
    getAllParentsForFolders: async function (folderId:number) {
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
    },
    getFolders: async function (folderId:number){
        return db
        .select()
        .from(folderSchema)
        .where(eq(folderSchema.parent,folderId))
        .orderBy(folderSchema.name);
    },
    getFiles: async function (folderId:number){
        return db
        .select()
        .from(fileSchema)
        .where(eq(fileSchema.parent,folderId))
        .orderBy(fileSchema.name);
    },
    getFolderById: async function (folderId: number) {
        const folder = await db
          .select()
          .from(folderSchema)
          .where(eq(folderSchema.id, folderId));
        return folder[0];
    },
    // getRootFolderForUser: async function (userId: string) {
    //     const folder = await db
    //       .select()
    //       .from(folderSchema)
    //       .where(
    //         and(eq(folderSchema.ownerId, userId), isNull(folderSchema.parent)),
    //       );
    //     return folder[0];
    // },
}


export const MUTATIONS = {
    createFile: async function (input:{
        file:{
            name:string,
            size:number,
            url:string
        };
        userId:string
    }) {
        return await db.insert(fileSchema).values({
            ...input.file,
            parent:0
        })
    }
}