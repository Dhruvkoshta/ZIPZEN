"use server"
import { db } from "@/server/db"
import { files as fileSchema, folders as folderSchema } from "@/server/db/schema"
import DriveUI from "../../drive-contents"
import { eq } from "drizzle-orm"


async function getAllParents(folderId:number) {
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
        parent.push(folder[0])
        currentFolder = folder[0].parent
       
    }
    return parent
}

export default async function DriveClone(props:{
    params: Promise<{folderId: string}>
}) {
    const params = await props.params;
    const parsedFolderId = parseInt(params.folderId)

    if(isNaN(parsedFolderId)) {
        return <div>Invalid Folder Id</div>
    }


    const filesPromise =  db
    .select()
    .from(fileSchema)
    .where(eq(fileSchema.parent,parsedFolderId))

    const foldersPromise =  db
    .select()
    .from(folderSchema)
    .where(eq(folderSchema.parent,parsedFolderId))

    const parentsPromise = getAllParents(parsedFolderId)

    const [files,folders,parents] = await Promise.all([filesPromise,foldersPromise,parentsPromise])

  return (
    <DriveUI files={files} folders={folders} parents={parents} />
  )
}
