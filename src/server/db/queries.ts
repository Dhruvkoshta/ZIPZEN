import "server-only"

import { db } from "@/server/db"
import {  files_table as fileSchema, folders_table as folderSchema } from "@/server/db/schema"
import { and, eq, isNull } from "drizzle-orm"


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
    getRootFolderForUser: async function (userId: string) {
        const folder = await db
          .select()
          .from(folderSchema)
          .where(
            and(eq(folderSchema.ownerId, userId), isNull(folderSchema.parent)),
          );
        return folder[0];
    },
}


export const MUTATIONS = {
    createFile: async function (input:{
        file:{
            name:string,
            size:number,
            url:string,
            parent:number
        };
        userId:string
    }) {
        return await db.insert(fileSchema).values({
            ...input.file,
            ownerId: input.userId
        })
    },
    OnBoardUser: async function (userId:string){
        const rootFolder =  await db.insert(folderSchema).values({
            name: "Drive",
            parent: null,
            ownerId: userId
        }).returning({rootFolderId: folderSchema.id})

        const rootId = rootFolder[0]!.rootFolderId

        await db.insert(folderSchema).values([
            {
                name: "Documents",
                parent: rootId,
                ownerId: userId
            },
            {
                name: "Images",
                parent: rootId,
                ownerId: userId
            }
            
        ])

        return rootId
    },
    createFolder: async function (input:{
        folder:{
            name:string,
            parent:number
        };
        userId:string
    }) {
        return await db.insert(folderSchema).values({
            ...input.folder,
            ownerId: input.userId,
            createdAt: new Date()
        })
    }
    
}