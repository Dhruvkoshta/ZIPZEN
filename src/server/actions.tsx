"use server"

import { and, eq } from "drizzle-orm"
import { db } from "./db"
import { files_table, folders_table } from "./db/schema"
import { auth } from "@/auth"
import { cookies, headers } from "next/headers"
import { UTApi } from "uploadthing/server"
import { MUTATIONS } from "./db/queries"
import { revalidatePath } from "next/cache"

const utApi = new UTApi()

export async function deleteFile(fileId:number) {
    const session = await auth.api.getSession({
        headers: await headers() 
    })
    if(!session?.user.id){
        throw new Error("Unauthorized")
    }

    const [file] = await db.select().from(files_table).where(and(eq(files_table.id,fileId),eq(files_table.ownerId,session.user.id)));
    if(!file){
        throw new Error("File not found")
    }

   const utapiResult = await utApi.deleteFiles([file.url.replace("https://uqh4rulhai.ufs.sh/f/","")])

   console.log(utapiResult)

   const dbDeleteResult = await db.delete(files_table).where(eq(files_table.id,fileId));
   console.log(dbDeleteResult)

   const c = await cookies()
   c.set("force-refresh",JSON.stringify(Math.random()))
   
   return {success: true}
}

export async function deleteFolder(folderId:number) {
    const session = await auth.api.getSession({
        headers: await headers() 
    })
    if(!session?.user.id){
        throw new Error("Unauthorized")
    }

    const [folder] = await db.select().from(folders_table).where(and(eq(folders_table.id,folderId),eq(folders_table.ownerId,session.user.id)));
    if(!folder){
        throw new Error("Folder not found")
    }

    const files = await db.select().from(folders_table).where(eq(folders_table.parent,folderId));
    if(files.length > 0){
        throw new Error("Folder not empty")
    }

    const dbDeleteResult = await db.delete(folders_table).where(eq(folders_table.id,folderId));
    console.log(dbDeleteResult)

    const c = await cookies()
    c.set("force-refresh",JSON.stringify(Math.random()))
   
    return {success: true}
}
export async function createFolder(name: string, parentId: number) {
    const session = await auth.api.getSession({
      headers: await headers()
    })
  
    if (!session?.user) {
      throw new Error("Unauthorized")
    }
  
    await MUTATIONS.createFolder({
      folder: {
        name,
        parent: parentId
      },
      userId: session.user.id
    })
  
    revalidatePath('/f/[folderId]')
  }